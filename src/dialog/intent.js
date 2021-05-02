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
  background-color: #b2acfa;
  border-radius: 10px;
  padding: 4px;
  margin-right: 5px;
  margin-top: 5px;
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
        justify: 'flex-start'
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

    console.log("CONSTRUTOR")
    console.log(interactionContext)
    console.log(intentState)

    function onBlur(e) {
        setIntentState(
            {
                status: 'draft',
                data: e.target.value,
                slot: intentState.slot               
            })
    }

    function saveIntent(data) {

        console.log("NO SAVE INTENT")

        console.log(data)
        console.log(interactionContext.intent)

        let newIntent = { ...interactionContext.intent };

        newIntent.phrase = data;
        newIntent.saved = true;
        newIntent.slot = intentState.slot ? intentState.slot : [];
        newIntent.hasSlot = intentState.hasSlot;

        setIntentState({ status: 'saved', data: data })

        props.onSave(newIntent)
    }

    function onSave() {
        saveIntent(intentState.data)
    }

    function handleSaveVariableSwitch() {
        console.log("NO handle vriable")
        console.log(intentState)
        setIntentState({
            hasSlot: !intentState.hasSlot,
            slot: intentState.slot,
            data: intentState.data
        })

        console.log(intentState)
    }

    function saveSlot(slot) {

        console.log("NO SAVE SLOT")
        console.log(intentState.slot)
        setIntentState({
            slot: [...intentState.slot, slot],
            hasSlot: true,
            data: intentState.data
        })
    }

    function saveSlotCallback(data) {
        saveSlot(data)
    }

    console.log("ENTROU")
    console.log(interactionContext)
    if (interactionContext.intent.saved == false) {

        return (

            <Grid container style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                <Grid item xs={10} sm={10}>
                    <FormControl fullWidth size="small" >
                        <TextField
                            color='primary'
                            key={interactionContext.intent.id}
                            onBlur={(e) => onBlur(e)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={2}>
                    <IconButton id='btnUserIntent' size="small" onClick={() => onSave(intentState.data)}>
                        <SaveIcon fontSize="large" variant="contained" color="primary" />
                    </IconButton  >
                </Grid>
                <Grid>
                    Salvar Resposta em variável ?
                    <Switch color="primary" checked={intentState.hasSlot} onChange={() => handleSaveVariableSwitch()} />
                </Grid>
                {
                    intentState.hasSlot ?
                        <Grid item xs={12} sm={12}>
                            <Slot
                                saveSlotCallback={(data) => saveSlotCallback(data)}
                                slot={intentState.slot}
                                id={interactionContext.intent.id}>
                            </Slot>
                        </Grid> : null
                }

            </Grid>
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
                            <PillContainer style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                <Typography variant="subtitle2" display="block" gutterBottom><p style={{ paddingRight: 10 }}>salva na variável: </p></Typography>
                                {interactionContext.intent.slot.map((o) => (
                                    <Pill key={o.value}>
                                        <div>{o.value} - {o.type}</div>


                                        <IconButton size='small'>
                                            <CloseIcon />
                                        </IconButton>

                                    </Pill>
                                ))}
                            </PillContainer> : null
                    }

                </Grid>
            </Grid>
        )
    }

}

export default withStyles(styles, { withTheme: true })(Intent);

