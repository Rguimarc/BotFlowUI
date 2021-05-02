import React, { useState } from 'react';
import { Box, Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
import Intent from './intent'
import Response from './response';
import Decisor from './decisor';
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
        margin: 10,
        width: '100%'
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
                slot: [],
                type: 'intent'
            },
            responses: []
        })


        console.log("criou INTENCAO")
        console.log(interactionContext)
    }

    function createBotResponse() {


        console.log("no create bot response");
        console.log(interactionContext.Intent)
        setInteractionContext({
            mode: 'create',
            responses: [
                ...interactionContext.responses,
                {
                    id: 'dialogBot' + (interactionContext.responses.length + 1),
                    phrase: '',
                    saved: false,
                    type: 'bot'
                }
            ],
            intent: interactionContext.intent
        })
    }

    function saveIntent(intentData) {

        console.log("save INTENTTTT")
        console.log(intentData)
        setInteractionContext({
            responses: [],
            mode: 'selection',
            intent: intentData
        })
        console.log(interactionContext)
    }


    function saveResponse(id, responseData) {

        console.log('ENTROU NO saveresponse')
        console.log(id)
        console.log(responseData)
        console.log(interactionContext)
        let responsesUpdated = [...interactionContext.responses].filter(x => x.id != id);

        console.log(responsesUpdated)

        console.log(interactionContext.intent)
        responsesUpdated = [...responsesUpdated, responseData];
        console.log(responsesUpdated)
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

        props.createDecisorNodeCallback(data);

        setInteractionContext({
            mode: 'create',
            decisor: [...interactionContext.decisor, data]
        })
    }

    function createDecisor() {


        console.log("!sadfouihdofas")
        if (interactionContext.intent.slot.length == 0) {
            setInteractionContext({
                mode: 'create',
                intent: interactionContext.intent,
                responses: interactionContext.responses,
                createSlot: true
            })
        } else {

            setInteractionContext({
                mode: 'create',
                intent: interactionContext.intent,
                responses: [...interactionContext.responses, { id: 'decisorBot' + (interactionContext.responses.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }]
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


        console.log("caiu no save slot do paiiuii")
        console.log(interactionContext)
        console.log(slot)
        let newIntent = { ...interactionContext.intent };
        newIntent.hasSlot = true;

        if (!newIntent.slot)
            newIntent.slot = [];

        newIntent.slot.push(slot);

        console.log(newIntent)
        setInteractionContext({
            mode: 'selection',
            intent: newIntent,
            responses: interactionContext.responses,
            createSlot: false
        })


        setInteractionContext({
            mode: 'create',
            intent: interactionContext.intent,
            responses: [...interactionContext.responses, { id: 'decisorBot' + (interactionContext.responses.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }]
        })


    }

    function saveSlotCallback(data) {
        saveSlot(data)
    }


    console.log("RENDEREZIOU PAPAI")

    console.log(interactionContext)
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
                                            onSave={(data) => saveIntentCallback(data)}
                                        ></Intent>

                                    </div> : null
                            }

                            {interactionContext.responses.map((itemDialog) => {

                                if (itemDialog.type == 'bot')
                                    return (

                                        <div className={props.classes.gridText}>
                                            <Response
                                                saved={itemDialog.saved}
                                                onSave={(id, data) => saveResponseCallback(id, data)}
                                                id={itemDialog.id}>
                                            </Response>
                                        </div>)


                                else if (itemDialog.type == 'decisor') {
                                    return (
                                        <div className={props.classes.gridText}>
                                            <Decisor id={itemDialog.id}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                responses={interactionContext.responses}
                                                saveDecisorCallback={(data) => saveDecisorCallback(data)}>
                                            </Decisor>
                                        </div>)
                                }
                            })}

                            {
                                interactionContext.createSlot == true ?
                                    <div style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                        <Slot
                                            saveSlotCallback={(data) => saveSlotCallback(data)}
                                            id={interactionContext.intent.id}>
                                        </Slot> </div> : null
                            }

                        </Grid>

                        <Options
                            createIntentCallback={createIntentCallback}
                            createBotResponseCallback={createBotResponseCallback}
                            createDecisorCallback={createDecisorCallback}>
                        </Options>


                    </Box>
                </Paper>
            </Container >
        </InteractionBlockContext.Provider>
    )
}

export default withStyles(styles, { withTheme: true })(InteractionBlock);
