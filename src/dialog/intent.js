import React, { useState, useContext } from 'react';
import { FormControl, IconButton, Grid, TextField, Paper, Typography,Switch } from '@material-ui/core';
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

    const [itentState, setIntentState] = useState({
        status: props.status,
        hasSlot: props.hasSlot,
        slot: props.slot ? props.slot : [],
        data: ''
    });

    function onBlur(e) {
        setIntentState({ status: 'draft', data: e.target.value })
    }

    function saveIntent(data) {

        let newIntent =interactionContext.intent;
        newIntent.phrase = data;
        newIntent.saved = true;
        newIntent.slot = itentState.slot;
        newIntent.hasSlot = itentState.hasSlot;

        setIntentState({ status: 'saved', data: data })
        setInteractionContext(newIntent)
        
        props.onSave()
    }

    function onSave() {
        saveIntent(itentState.data)
    }

    function handleSaveVariableSwitch() {
        setIntentState({
            hasSlot: !itentState.hasSlot
        })
    }

    function saveSlot(slot) {
        setIntentState({
            slot: [...itentState.slot, slot]
        })
    }

    function saveSlotCallback(data) {
        saveSlot(data)
    }


    if (itentState.status == 'draft') {

        return (

            <Grid container style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                <Grid item xs={10} sm={10}>
                    <FormControl fullWidth size="small" >
                        <TextField
                            color='primary'
                            key={props.id}
                            onBlur={(e) => onBlur(e)}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={1} sm={2}>
                    <IconButton id='btnUserIntent' size="small" onClick={() => onSave(itentState.data)}>
                        <SaveIcon fontSize="large" variant="contained" color="primary" />
                    </IconButton  >
                </Grid>
                <Grid>
                    Salvar Resposta em variável ?
                    <Switch color="primary" checked={itentState.hasSlot} onChange={() => handleSaveVariableSwitch()} />
                </Grid>
                {
                    itentState.hasSlot ?
                        <Grid item xs={12} sm={12}>
                            <Slot
                                saveSlotCallback={(data) => saveSlotCallback(data)}
                                slot={itentState.slot}
                                id={props.id}>
                            </Slot>
                        </Grid> : null
                }

            </Grid>
        )

    } else if (itentState.status == 'saved') {
        return (
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                        <div style={{ padding: 10 }}>
                            <AccountIcon color="primary" />
                        </div>
                        <Paper className={props.classes.card} elevation={3}>
                            <p>{itentState.data}</p>
                        </Paper>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {
                        itentState.hasSlot ?
                            <PillContainer style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                <Typography variant="subtitle2" display="block" gutterBottom><p style={{ paddingRight: 10 }}>salva na variável: </p></Typography>
                                {itentState.slot.map((o) => (
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

