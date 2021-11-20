import React, { useState, useRef } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from '../options/options';
import Intent from '../events/components/intent/intent'
import Response from '../events/components/response/response';
import Slot from '../events/components/intent/slot';
import { EVENT_TYPE } from '../events/enums/eventEnum';
import { MODE } from '../blocks/enums/blockEnums';
const uuid = require('uuid');
import { NODE_TYPE } from '../../diagram/enums/dialogNodeEnum';

const styles = theme => ({
    gridDialog: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

    },
    gridText: {
        marginTop: 10,
        marginBottom: 10
    }

});

const Block = (props) => {

    console.log("Block Component Init Props: ", props);

    let block = {};

    const [mode, setMode] = useState(MODE.DISPLAY);
    const [dialogEvents, setDialogEvent] = useState([]);
    const [createSlot, setCreateSlot] = useState(false);
    const [parentNode] = useState(props.parentNode);
    const [hasChildren, setHasChildren] = useState(false);
    const [initalized, setInitialized] = useState(!!props.blockInit);

    if (props.blockInit && initalized) {
        block = {
            mode: props.blockInit.mode,
            dialogEvents: props.blockInit.dialogEvents,
            hasChildren,
            createSlot,
            parentNode
        }
    } else {
        block = {
            mode,
            dialogEvents,
            hasChildren,
            createSlot,
            parentNode
        }
    }


    console.log("Block Component State: ", block);

    const createIntent = () => {
        const newIntent = {
            id: uuid.v4(),
            phrase: undefined,
            saved: false,
            slot: [],
            hasSlot: false,
            type: EVENT_TYPE.USER
        }
        const initChildBlock = {
            dialogEvents: [newIntent], mode: MODE.CREATION
        };
        props.createNodeCallback(initChildBlock, parentNode);
    }

    const createBotResponse = () => {
        console.log("CREATE BOT RESPONSE")

        setDialogEvent([...dialogEvents, {
            id: uuid.v4(),
            phrase: '',
            saved: false,
            type: EVENT_TYPE.BOT
        }])
        setMode(MODE.CREATION);
    }

    const saveIntent = (intentData) => {
        console.log("Block Component:saveIntent:",intentData)
        setHasChildren(true);
        const dialogEventsUpdated = [...dialogEvents].filter(x => x.id != intentData.id);
        setDialogEvent([...dialogEventsUpdated, intentData]);
        console.log("dialogEventsUpdated", [...dialogEventsUpdated, intentData]);
        setInitialized(false);
        setMode(MODE.DISPLAY);
    }


    const saveResponse = (responseData) => {
        console.log("Block Component:saveResponse:",responseData)
        const dialogEventsUpdated = [...dialogEvents].filter(x => x.id != responseData.id);
        setDialogEvent([...dialogEventsUpdated, responseData]);
        setInitialized(false);
        setMode(MODE.DISPLAY);
    }



    const saveSlot = (slot) => {

        let newIntent = { ...dialogEvents };
        newIntent.hasSlot = true;

        if (!newIntent.slot)
            newIntent.slot = [];

        newIntent.slot.push(slot);
        newIntent.hasSlot = true;

        setMode(MODE.CREATION);
        setDialogEvent(newIntent);
        setDialogEvent([...dialogEvents, { id: 'decisorBot' + (dialogEvents.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }])
        setCreateSlot(false);

    }


    return (

        <Paper elevation={3} style={{ padding: 4, minWidth: '400px' }}>
            <Box className={props.classes.gridDialog}>
                <Grid >

                    {block.dialogEvents.map((itemDialog) => {
                        console.log("ITEM DIALOG", itemDialog)
                        if (itemDialog.type == EVENT_TYPE.BOT)
                            return (

                                <div className={props.classes.gridText}>
                                    <Response
                                        saved={itemDialog.saved}
                                        response={itemDialog}
                                        onSave={(id, data) => saveResponse(id, data)}
                                        id={itemDialog.id}>
                                    </Response>
                                </div>)


                        else if (itemDialog.type == EVENT_TYPE.USER)
                            return (

                                <div className={props.classes.gridText}>
                                    <Intent
                                        intent={itemDialog}
                                        onSave={(data) => saveIntent(data)}
                                    ></Intent>
                                </div>)


                    })}


                    {/* {
                        createSlot == true ?
                            <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                <span>Informe antes alguma variável para adicionar a condicação</span>
                                <Slot
                                    saveSlotCallback={(data) => saveSlot(data)}
                                    id={intent.id}>
                                </Slot> </div> : null
                    } */}

                </Grid>

                <Options
                    mode={block.mode}
                    responses={block.dialogEvents.filter(x => x.type === EVENT_TYPE.BOT)}
                    isStartBlock={block.parentNode.type == NODE_TYPE.START}
                    hasChildren={block.hasChildren}
                    intent={block.dialogEvents.filter(x => x.type === EVENT_TYPE.USER)[0]}
                    createIntentCallback={() => createIntent()}
                    createBotResponseCallback={() => createBotResponse()}
                >
                </Options>


            </Box>
        </Paper>

    )
}

export default withStyles(styles, { withTheme: true })(Block);
