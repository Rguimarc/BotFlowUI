import React from 'react';
import { FormControl, IconButton, TextField, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Slot from './slot'
import SaveIcon from '@material-ui/icons/Save';

const IntentCreation = (props) => {

    console.log("IntentCreation Component Init Props: ", props);

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
                        value={props.intent.phrase}
                        color='primary'
                        key={props.intent.id}
                        onBlur={(e) => props.onBlur(e)}
                    />
                </FormControl>


                <IconButton id='btnUserIntent' size="small" onClick={() => props.onSave()}>
                    <SaveIcon fontSize="large" variant="contained" color="primary" />
                </IconButton  >

            </div>
            <div>
                Salvar Resposta em variável?
                <Switch color="primary" checked={props.intent.hasSlot} onChange={() => props.handleSaveVariableSwitch()} />
            </div>
            {
                props.intent.hasSlot ?
                    <div item xs={12} sm={12}>
                        <Slot
                            saveSlotCallback={(data) => props.saveSlotCallback(data)}
                            slot={props.intent.slot}
                            id={props.intent.id}>
                        </Slot>
                    </div> : null
            }

        </div>
    )



}

export default IntentCreation;

