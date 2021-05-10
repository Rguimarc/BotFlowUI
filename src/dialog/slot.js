import React, { useState, useContext } from "react"
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, InputLabel, MenuItem, FormControl, Select, TextField, Typography } from '@material-ui/core';
import InteractionBlockContext from './interactionBlockContext';

const styles = theme => ({

    root: {
        "& .MuiSelect-select.MuiSelect-select": {
            paddingBottom: "11px",
            minWidth: 120
        }
    },
    buttonAdd: {
        color: '#3BB143',
        padding: '5px',
        marginTop: '15px'
    },
    inputSlot: {
        marginRight: '20px'
    },
    gridColumn: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '10px',
        padding: 4,
        width: '100%'
    },
    gridRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '10px',
        width: '100%'
    }
});

const Slot = (props) => {

    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);

    const [slotState, setSlotState] = useState({
        status: interactionContext.intent.slot.status,
        type: interactionContext.intent.slot.type,
    });


    function handleTextFieldChange(e) {

        setSlotState({
            value: e.target.value,
            type: slotState.type
        });
 
        let newSlot = {
            value : e.target.value,
            type: slotState.type
        }
        if (props.fromIntent)
            props.saveSlotCallback(newSlot);
    }

    function handleSelectChange(e) {

        setSlotState({
            value: slotState.value,
            type: e.target.value,
        });

        let newSlot = {
            value : slotState.value,
            type: e.target.value
        }

        if (props.fromIntent)
            props.saveSlotCallback(newSlot);
    }

    function handleAddClick() {

        let newSlot = undefined

        newSlot = {
            value: slotState.value,
            type: slotState.type,
        }
 
        props.saveSlotCallback(newSlot);

    }

    return (


        <div className={props.classes.gridColumn}>

            <div >
                <span>Configure a váriavel a ser preenchida: </span>
            </div>

            <div className={props.classes.gridRow}>

                {
                    props.fromIntent ? null :
                        <IconButton id='btnAddSlot' size="small"  >
                            <AddIcon onClick={() => handleAddClick()} fontSize="large" variant="contained" className={props.classes.buttonAdd} />
                        </IconButton>
                }

                <FormControl size="small" className={props.classes.inputSlot}>
                    <TextField
                        onChange={(e) => { handleTextFieldChange(e) }}
                        style={{ paddingTop: "20px" }}
                        color='primary'
                        key={props.id + 'slot'}
                        value={slotState.value}
                    />
                </FormControl>

                <FormControl className={props.classes.root}>
                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={slotState.type}
                        onBlur={(e) => { handleSelectChange(e) }}>
                        <MenuItem value={10}>Nome</MenuItem>
                        <MenuItem value={20}>Email</MenuItem>
                        <MenuItem value={30}>CPF</MenuItem>
                    </Select>
                </FormControl>

            </div>
        </div>
    )
}



export default withStyles(styles, { withTheme: true })(Slot);
