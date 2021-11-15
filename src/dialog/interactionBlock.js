import React, { StrictMode, useState } from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options/options';
import Intent from './intent'
import Response from './response';
import IntentsMultiple from './intentsMultiple';
import Slot from './slot';
import { INTERACTION_TYPE, MODE } from './enums/interactionBlockEnums';



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

const InteractionBlock = (props) => {

    // const [interactionBlockState, setinteractionBlockState] = useState({
    //         mode: MODE,
    //         decisor: [],
    //         intent: undefined,
    //         currentIntent: { type: undefined },
    //         responses: []
    //     });

    const [mode, setMode] = useState(1);
    const [currentIntent, setCurrentIntent] = useState(undefined);
    const [responses, setResponses] = useState([]);
    const [intent, setIntent] = useState(undefined);
    const [createSlot, setCreateSlot] = useState(false);
    const [parentNode] = useState(props.parentNode);

    const createIntent = () => {
        setIntent({
            id: 'dialogIntent' + (responses.length + 1),
            phrase: '',
            hasSlot: false,
            saved: false,
            slot: [],
            type: INTERACTION_TYPE.INTENT
        });
        setMode(MODE.CREATION)
    }

    const createBotResponse = () => {
        setMode(MODE.CREATION)
        setResponses([...responses, {
            id: 'dialogBot' + (responses.length + 1),
            phrase: '',
            saved: false,
            type: INTERACTION_TYPE.BOT
        }])
    }

    const saveIntent = (intentData) => {
        setMode(MODE.DISPLAY)
        setIntent(intentData);
    }


    const saveResponse=  (id, responseData) =>  {  
        const responsesUpdated = [...responses].filter(x => x.id != id);
        setResponses([...responsesUpdated, responseData]);
        setMode(MODE.DISPLAY);   
    }



    const saveDecisor = (data) => {
        setMode(MODE.CREATION);
        props.createDecisorNodeCallback(data);
        // setInteractionBlockContext({
        //     mode: MODE.CREATION,
        //     decisor: [...decisor, data]
        // })
    }

    const saveMultipleIntents = (data) => {
        props.createDecisorNodeCallback(data);
        setMode(INTERACTION_TYPE.DISPLAY);
        setCurrentIntent({
            id: 'dialogIntent' + (responses.length + 1),
            phrase: '',
            hasSlot: false,
            saved: true,
            slot: [],
            type: INTERACTION_TYPE.MULTIPLECHOICE
        });
    }

    const createDecisor = () => {
        if (intent.slot.length == 0) {
            // setInteractionBlockContext({
            //     mode: MODE.CREATION,
            //     createSlot: true
            // })
        } else {

            // setInteractionBlockContext({
            //     mode: MODE.CREATION,
            //     responses: [...responses, { id: 'decisorBot' + (responses.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }]
            // })
        }
    }


    const createMultipleIntents = () => {
        setMode(MODE.CREATION);
        setCurrentIntent({
            id: 'dialogIntent' + (responses.length + 1),
            phrase: '',
            hasSlot: false,
            saved: false,
            slot: [],
            type: INTERACTION_TYPE.CREATION
        });
    }


    const saveIntentCallback = (data) => {
        saveIntent(data)
    }

    const saveResponseCallback = (id, data) => {
        saveResponse(id, data)
    }

    const createIntentCallback = () => {
        createIntent()
    }

    const createBotResponseCallback = () => {
        createBotResponse()
    }

    const createDecisorCallback = () => {
        createDecisor()
    }

    const createMultipleIntentsCallback = () => {
        createMultipleIntents()
    }

    const saveMultipleIntentsCallback = (data) => {
        saveMultipleIntents(data)
    }

    const saveDecisorCallback = (data) => {
        saveDecisor(data)
    }

    const saveSlot = (slot) => {

        let newIntent = { ...intent };
        newIntent.hasSlot = true;

        if (!newIntent.slot)
            newIntent.slot = [];

        newIntent.slot.push(slot);
        newIntent.hasSlot = true;

        setMode(MODE.CREATION);
        setIntent(newIntent);
        setResponses([...responses, { id: 'decisorBot' + (responses.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }])
        setCreateSlot(false);

    }

    const saveSlotCallback = (data) => {
        saveSlot(data)
    }

    console.log("RENDEREZIOU PAPAI");
    console.log('mode', mode);
    console.log('intent', intent);
    console.log('currentIntent', currentIntent);
    console.log('responses', responses);
    console.log('parentNode', parentNode);

    return (

        <Paper elevation={3} style={{ padding: 4, minWidth: '400px' }}>
            <Box className={props.classes.gridDialog}>
                <Grid >

                    {
                        intent ?

                            <div className={props.classes.gridText}>
                                <Intent
                                    intent={intent}
                                    onSave={(data) => saveIntentCallback(data)}
                                ></Intent>
                            </div> : null
                    }

                    {responses.map((itemDialog) => {

                        if (itemDialog.type == INTERACTION_TYPE.BOT)
                            return (

                                <div className={props.classes.gridText}>
                                    <Response
                                        saved={itemDialog.saved}
                                        responses={responses}
                                        onSave={(id, data) => saveResponseCallback(id, data)}
                                        id={itemDialog.id}>
                                    </Response>
                                </div>)


                        else if (itemDialog.type == 'decisor') {
                            return (
                                <div className={props.classes.gridText}>
                                    <IntentsMultiple id={itemDialog.id}
                                        status={itemDialog.saved == false ? 'draft' : 'saved'}
                                        responses={responses}
                                        saveDecisorCallback={(data) => saveDecisorCallback(data)}>
                                    </IntentsMultiple>
                                </div>)
                        }
                    })}


                    {
                        currentIntent && currentIntent.type == INTERACTION_TYPE.DISPLAY ?

                            <div className={props.classes.gridText}>
                                <IntentsMultiple id={currentIntent.id}
                                    status={currentIntent.saved == true ? 'saved' : 'draft'}
                                    saveMultipleIntentsCallback={(data) => saveMultipleIntentsCallback(data)}>
                                </IntentsMultiple>
                            </div>
                            : null
                    }


                    {
                        createSlot == true ?
                            <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                <span>Informe antes alguma variável para adicionar a condicação</span>
                                <Slot
                                    saveSlotCallback={(data) => saveSlotCallback(data)}
                                    id={intent.id}>
                                </Slot> </div> : null
                    }

                </Grid>

                <Options
                    mode={mode}
                    responses={responses}
                    isStartBlock={parentNode}
                    createIntentCallback={createIntentCallback}
                    createBotResponseCallback={createBotResponseCallback}
                    createIntentsMultipleCallback={createMultipleIntentsCallback}>
                </Options>


            </Box>
        </Paper>

    )
}

export default withStyles(styles, { withTheme: true })(InteractionBlock);
