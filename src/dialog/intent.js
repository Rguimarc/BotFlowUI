import React, { useState, useContext } from 'react';
import { FormControl, IconButton, Grid, TextField, Paper, Typography, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slot from './slot'
import styled from '@emotion/styled'
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import AccountIcon from '@material-ui/icons/AccountCircle';
import InteractionBlockContext from './interactionBlockContext';

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline; 
`
const Pill = styled.div`
  display: flex;
  border-radius: 90px;
  color: #4088f6;
  border-style:solid;
  border-width:2px;
  border-color:#3f50b5;
  padding: 2px 10px;
  margin-right: 10px;
  align-items: center;
  overflow-wrap: anywhere;
`

const styles = theme => ({
    card: {
        transition: '0.3s',
        padding: '2px 16px',
        width: "100%",
        borderRadius: '10px',
        border: '2px solid #3f50b5',
        display: 'flex',
        justify: 'flex-start',
        marginBottom: '10px'
    }
});

const Intent = (props) => {

    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);

    const [intentState, setIntentState] = useState({
        status: interactionContext.intent.status,
        hasSlot: interactionContext.intent.hasSlot,
        slot: interactionContext.intent.slot,
        data: ''
    });


    function onBlur(e) {
        setIntentState(
            {
                data: e.target.value,
                hasSlot: intentState.hasSlot,
                slot: intentState.slot
            })
    }

    function saveIntent(data) {

        let newIntent = { ...interactionContext.intent };

        newIntent.phrase = data;
        newIntent.saved = true;
        newIntent.slot = intentState.slot ? intentState.slot : {};
        newIntent.hasSlot = intentState.hasSlot;

        setIntentState(
            {
                status: 'saved',
                hasSlot: intentState.hasSlot,
                slot: intentState.slot,
                data: data
            })

        props.onSave(newIntent)
    }

    function onSave() {
        saveIntent(intentState.data)
    }

    function handleSaveVariableSwitch() {

        let slot = intentState.slot;

        if (intentState.hasSlot == true) {
            slot = [];
        }

        setIntentState({
            hasSlot: !intentState.hasSlot,
            slot: slot,
            data: intentState.data
        })
    }

    function saveSlot(slot) {

        setIntentState({
            slot: slot,
            hasSlot: true,
            data: intentState.data
        })
    }

    function saveSlotCallback(data) {
        saveSlot(data)
    }

    if (interactionContext.intent.saved == false) {

        return (

            <div style={{
                marginLeft: '40px',
                marginRight: '40px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left'
            }}>
                <div>
                    <FormControl size="large" style={{ width: '80%' }}>
                        <TextField

                            color='primary'
                            key={interactionContext.intent.id}
                            onBlur={(e) => onBlur(e)}
                        />
                    </FormControl>


                    <IconButton id='btnUserIntent' size="small" onClick={() => onSave(intentState.data)}>
                        <SaveIcon fontSize="large" variant="contained" color="primary" />
                    </IconButton  >

                </div>
                <div>
                    Salvar Resposta em variável?
                    <Switch color="primary" checked={intentState.hasSlot} onChange={() => handleSaveVariableSwitch()} />
                </div>
                {
                    intentState.hasSlot ?
                        <div item xs={12} sm={12}>
                            <Slot
                                saveSlotCallback={(data) => saveSlotCallback(data)}
                                slot={intentState.slot}
                                fromIntent={true}
                                id={interactionContext.intent.id}>
                            </Slot>
                        </div> : null
                }

            </div>
        )

    } else if (interactionContext.intent.saved == true) {
        return (
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                        <div style={{ padding: 10 }}>
                            <AccountIcon color="primary" />
                        </div>
                        <Paper className={props.classes.card} elevation={3}>
                            <p>{interactionContext.intent.phrase}</p>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {
                        interactionContext.intent.hasSlot ?
                            <PillContainer style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px', marginBottom: '10px' }}>
                                <span style={{ marginRight: '10px' }}>Resposta salva na variável:</span>

                                {interactionContext.intent.slot ?
                                    <Pill key={interactionContext.intent.slot.value}>
                                        <div>{interactionContext.intent.slot.value} - {interactionContext.intent.slot.type}</div>

                                        <IconButton size='small'>
                                            <CloseIcon />
                                        </IconButton>

                                    </Pill> : null
                                }
                            </PillContainer> : null
                    }

                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles, { withTheme: true })(Intent);

