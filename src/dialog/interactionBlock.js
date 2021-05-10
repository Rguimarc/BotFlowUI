import React, { useState } from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
import Intent from './intent'
import Response from './response';
import Decisor from './decisor.js';
import Slot from './slot';
import InteractionBlockContext from './interactionBlockContext';

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

    const [interactionContext, setInteractionContext] = useState({
        mode: 'selection',
        decisor: [],
        intent: undefined,
        responses: []
    });


    function createIntent() {

        setInteractionContext({
            mode: 'create',
            intent: {
                id: 'dialogIntent' + (interactionContext.responses.length + 1),
                phrase: '',
                hasSlot: false,
                saved: false,
                slot: {},
                type: 'intent'
            },
            responses: []
        })

    }

    function createBotResponse() {


        setInteractionContext({
            mode: 'create',
            responses: [
                ...interactionContext.responses,
                {
                    id: 'dialogBot' + (interactionContext.responses.length + 1),
                    phrase: '',
                    saved: false,
                    type: 'response'
                }
            ],
            intent: interactionContext.intent
        })
    }

    function saveIntent(intentData) {


        setInteractionContext({
            responses: [],
            mode: 'selection',
            intent: intentData
        })

    }


    function saveResponse(id, responseData) {


        let responsesUpdated = [...interactionContext.responses].filter(x => x.id != id);

        responsesUpdated = [...responsesUpdated, responseData];

        if (responseData) {
            setInteractionContext({
                responses: [],
                mode: 'selection',
                responses: responsesUpdated,
                intent: interactionContext.intent
            })
        }
    }


    function saveDecisor(data) {

        let cpResponses = [];

        interactionContext.responses.forEach((x) => {
            if (x.type) {
                cpResponses.push(x)
            }
        })

        cpResponses.push({ conditionals: data });

        setInteractionContext({
            mode: 'selection',
            intent: interactionContext.intent,
            responses: cpResponses,
            createSlot: false
        })

        props.createNodeCallback(data);

    }

    function createDecisor(newIntent) {


        if (!newIntent && interactionContext.intent.slot && !interactionContext.intent.slot.type) {
            setInteractionContext({
                mode: 'create',
                intent: interactionContext.intent,
                responses: interactionContext.responses,
                createSlot: true
            })
        } else {
            setInteractionContext({
                mode: 'create',
                intent: newIntent ? newIntent : interactionContext.intent,
                responses: [...interactionContext.responses, {
                    conditionals: [
                        {
                            id: 'conditionalResponse' + (interactionContext.responses.length + 1),
                            condition: '',
                            saved: false,
                            name: '',
                            type: 'conditionalResponse'
                        }],
                }],
                createSlot: false
            })
        }

    }

    function saveIntentCallback(data) {
        saveIntent(data)
    }

    function saveResponseCallback(id, data) {
        saveResponse(id, data)
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

    function saveSlot(slot) {


        let newIntent = { ...interactionContext.intent };
        newIntent.hasSlot = true;

        if (!newIntent.slot)
            newIntent.slot = {};

        newIntent.slot = slot;
        newIntent.hasSlot = true;

        createDecisor(newIntent);
    }

    function saveSlotCallback(data) {
        saveSlot(data)
    }


    return (


        <InteractionBlockContext.Provider value={{ interactionContext, setInteractionContext }}>

            <Paper elevation={3} style={{ padding: 4, minWidth: '400px' }}>
                <Box className={props.classes.gridDialog}>
                    <Grid >

                        {
                            interactionContext.intent ?

                                <div className={props.classes.gridText}>

                                    <Intent
                                        onSave={(data) => saveIntentCallback(data)}
                                    ></Intent>

                                </div> : null
                        }

                        {interactionContext.responses.map((itemDialog) => {

                            if (itemDialog.type == 'response')
                                return (

                                    <div className={props.classes.gridText}>
                                        <Response
                                            saved={itemDialog.saved}
                                            onSave={(id, data) => saveResponseCallback(id, data)}
                                            id={itemDialog.id}>
                                        </Response>
                                    </div>)


                            else if (itemDialog.conditionals) {
                                return (
                                    <div className={props.classes.gridText}>
                                        <Decisor id={itemDialog.id}
                                            saveDecisorCallback={(data) => saveDecisorCallback(data)}>
                                        </Decisor>
                                    </div>)
                            }
                        })}

                        {
                            interactionContext.createSlot == true ?
                                <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                    <span>Informe antes alguma variável para adicionar a condicação</span>
                                    <Slot
                                        saveSlotCallback={(data) => saveSlotCallback(data)}
                                        id={interactionContext.intent.id}>
                                    </Slot> </div> : null
                        }

                    </Grid>

                    <Options
                        blockType='Interaction'
                        createIntentCallback={createIntentCallback}
                        createBotResponseCallback={createBotResponseCallback}
                        createDecisorCallback={createDecisorCallback}>
                    </Options>


                </Box>
            </Paper>

        </InteractionBlockContext.Provider>
    )
}

export default withStyles(styles, { withTheme: true })(InteractionBlock);
