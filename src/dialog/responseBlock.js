import React, { useState } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
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

        setInteractionContext({
            mode: 'selection',
            intent: interactionContext.intent,
            responses: cpResponses,
            createSlot: false
        })

        props.createNodeCallback(data);

    }

    function createDecisor() {

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
                responses: [...interactionContext.responses, {
                    conditionals: [
                        {
                            id: 'conditionalResponse' + (interactionContext.responses.length + 1),
                            condition: '',
                            saved: false,
                            phrase: '',
                            type: 'conditionalResponse'
                        }],
                }],
                createSlot: false
            })
        }

    }

 
    function saveResponseCallback(id, data) {
        saveResponse(id, data)
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

            <Paper elevation={3} style={{ padding: 4, minWidth: '400px' }}>
                <Box className={props.classes.gridDialog}>
                    <Grid >
 
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

                  
                    </Grid>

                    <Options
                        blockType = 'Response'
                        createBotResponseCallback={createBotResponseCallback}
                        createDecisorCallback={createDecisorCallback}>
                    </Options>


                </Box>
            </Paper>

        </InteractionBlockContext.Provider>
    )
}

export default withStyles(styles, { withTheme: true })(InteractionBlock);
