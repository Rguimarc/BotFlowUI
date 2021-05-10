
import React, { useState, useContext } from 'react';
import { Paper, TextField, FormControl, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Help';
import InteractionBlockContext from './interactionBlockContext';

const styles = theme => ({

    buttonAdd: {
        color: '#FFFFFF',
        backgroundColor: '#3BB143',

        '&:hover': {
            backgroundColor: '#3BB143'
        },
        margin: '10px'

    },
    iconDecision: {
        backgroundColor: '#FFFFFF',
        color: 'rgba( 241, 90, 36, 1 )',
    },
    gridRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: '40px',
        marginRight: '40px',
        marginTop: '10px',
        width: '100%'
    },
    optionButton: {
        margin: '10px',
        marginLeft: '0px'
    }

});



const Conditional = (props) => {

    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);


    console.log("RENDER CONDITIONAL")

    console.log(props.id)
    console.log(props.name)
    const [conditionalState, setConditionalState] = useState({
       name : props.conditional.name,
       id : props.conditional.id
    });


    function onBlur(e) {
        console.log("blurrrr")
        console.log(e.target.value)
       
        setConditionalState(
            {
                name : e.target.value,
                id : conditionalState.id
            }
        )
        console.log(conditionalState)
        props.updateDecisionCallback(conditionalState.id,e.target.value);
    }

    
    return (
        <div className={props.classes.gridRow}>
            <FormControl size="small" >
                <TextField
                    color='primary'
                    key={props.id}
                    label="Nome"
                    onBlur={(e) => onBlur(e)}
                />
            </FormControl>

            <IconButton edge="end" aria-label="comments">
                <BuildIcon color="primary" />
            </IconButton>
            <Button
                variant="contained"
                onClick={() => props.addDecisionCallback()}
                size="small"
                className={props.classes.buttonAdd}
                startIcon={<AddIcon />}>
                Condição
             </Button>
        </div>

    )

}


export default withStyles(styles, { withTheme: true })(Conditional);

