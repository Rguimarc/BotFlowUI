import React, { useState } from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
import Intent from './intent'
import Response from './response';
import Decisor from './decisor';
import InteractionBlockContext from './interactionBlockContext';

const styles = theme => ({
    gridDialog: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

    },
    gridText: {
        margin: 10,
        width: '100%'
    }

});

const InteractionBlock = (props) => {

    const [interactionContext, setInteractionContext] = useState({
        mode: 'selection',
        decisor: [],
        intent: undefined,
        dialogs: []
    });


    function createIntent() {

        setInteractionContext({
            mode: 'createIntent',
            intent: { id: 'dialogIntent' + (interactionContext.dialogs.length + 1), phrase: '', hasSlot: false, saved: false, type: 'intent' },
            dialogs : []
        })

    }

    function createBotResponse() {
        setInteractionContext({
            mode: 'createIntent',
            dialogs: [...interactionContext.dialogs, { id: 'dialogBot' + (interactionContext.dialogs.length + 1), phrase: '', saved: false, type: 'bot' }]
        })
    }

    function saveIntent(data) {

        //let cpDialog = [...interactionContext.dialogs];

        // if (data)
        //     cpDialog = [...cpDialog, data]

        // setInteractionContext({
        //     dialogs: cpDialog,
        //     mode: 'selection'
        // })

        setInteractionContext({
            dialogs: [],
            mode: 'selection',
            intent : data
        })

    }

    function saveDecisor(data) {

        props.createDecisorNodeCallback(data);

        setInteractionContext({
            mode: 'createIntent',
            decisor: [...interactionContext.decisor, data]
        })
    }

    function createDecisor() {

        setInteractionContext({
            mode: 'createIntent',
            dialogs: [...interactionContext.dialogs, { id: 'decisorBot' + (interactionContext.dialogs.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }]
        })
    }

    function saveIntentCallback(data) {
        saveIntent(data)
    }

    function createIntentCallback() {
        createIntent()
    }

    function createBotResponseCallback() {
        createBotResponse()
    }

    function createDecisorCallback() {
        createDecisor()
    }

    function saveDecisorCallback(data) {
        saveDecisor(data)
    }

    return (

        <InteractionBlockContext.Provider value={{ interactionContext, setInteractionContext }}>
            <Container>
                <Paper elevation={3} style={{ padding: 4 }}>
                    <Box className={props.classes.gridDialog}>
                        <Grid >

                            {
                                interactionContext.intent ?

                                    <div className={props.classes.gridText}>

                                        <Intent
                                            hasSlot={interactionContext.intent.hasSlot}
                                            slot={interactionContext.intent.slot}
                                            status={interactionContext.intent.saved == false ? 'draft' : 'saved'}
                                            onSave={(data) => saveIntentCallback(data)}
                                            id={interactionContext.intent.id}
                                        ></Intent>

                                    </div> : null
                            }

                            {interactionContext.dialogs.map((itemDialog) => {

                                if (itemDialog.type == 'bot')
                                    return (

                                        <div className={props.classes.gridText}>
                                            <Response
                                                dialogs={interactionContext.dialogs}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                onSave={() => saveIntentCallback()}
                                                id={itemDialog.id}>
                                            </Response>
                                        </div>)


                                else if (itemDialog.type == 'decisor') {
                                    return (
                                        <div className={props.classes.gridText}>
                                            <Decisor id={itemDialog.id}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                dialogs={interactionContext.dialogs}
                                                saveDecisorCallback={(data) => saveDecisorCallback(data)}>
                                            </Decisor>
                                        </div>)
                                }
                            })}

                        </Grid>

                        {interactionContext.dialogs ?
                            <Options mode={interactionContext.mode}
                                createIntentCallback={createIntentCallback}
                                createBotResponseCallback={createBotResponseCallback}
                                createDecisorCallback={createDecisorCallback}
                                dialogs={interactionContext.dialogs}>
                            </Options> :
                            <Options mode={interactionContext.mode}
                                createBotResponseCallback={createBotResponseCallback}
                                createDecisorCallback={createDecisorCallback}
                                dialogs={interactionContext.dialogs}>
                            </Options>

                        }

                    </Box>
                </Paper>
            </Container >
        </InteractionBlockContext.Provider>
    )
}

export default withStyles(styles, { withTheme: true })(InteractionBlock);
