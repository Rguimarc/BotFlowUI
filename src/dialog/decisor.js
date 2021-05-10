
import React, { useState, useContext } from 'react';
import { Paper, TextField, FormControl, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Help';
import InteractionBlockContext from './interactionBlockContext';
import Conditional from './conditional';

const styles = theme => ({

    buttonAdd: {
        color: '#FFFFFF',
        backgroundColor: '#3BB143',

        '&:hover': {
            backgroundColor: '#3BB143'
        },
        margin: '10px'

    },
    cardDecision: {
        transition: '0.3s',
        padding: '2px 16px',
        borderRadius: '10px',
        marginBottom: '10px',
        marginTop: '10px',
        border: '2px solid rgba( 241, 90, 36, 1 )',
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
    gridColumn: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        marginBottom: '10px',
        padding: 4,
        width: '100%'
    },
    optionButton: {
        margin: '10px',
        marginLeft: '0px'
    }

});




const Decisor = (props) => {

    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);

    let conds;

    conds = interactionContext.responses.find(obj => {
        return (obj.conditionals)
    })

    const [decisorState, setDecisorState] = useState({
        conditionals: conds.conditionals
    });

    function addDecision() {

        let cpConditionals = [...decisorState.conditionals, {
            id: 'conditionalResponse' + (decisorState.conditionals.length + 1),
            condition: '',
            name: decisorState.currentName,
            saved: false,
            type: 'conditionalResponse'
        }];

        setDecisorState(
            {
                conditionals: cpConditionals
            }
        )
    }

    function updateDecision(id, value) {

        let cpDec  = [...decisorState.conditionals]; 
        let index = decisorState.conditionals.findIndex(x => x.id == id)
 
        cpDec[index].name = value;

        setDecisorState(
            {
                conditionals: cpDec 
            }
        )
    }

    function saveDecision(data) {

        decisorState.conditionals.forEach((x) => {
            x.saved = true
        })
 
        props.saveDecisorCallback(decisorState.conditionals)
    }

    function updateDecisionCallback(id, value) {
        updateDecision(id, value);
    }

    function addDecisionCallback() {
        addDecision();
    }


    let saved = true;

    if (decisorState.conditionals) {
        decisorState.conditionals.forEach((x) => {
            if (x.saved == false) {
                saved = false;
            }
        });
    }

    if (!saved) {

        return (
            <Paper elevation={0} padding={3} variant='outlined' className={props.classes.gridColumn}  >

                <div className={props.classes.gridRow}>

                    <span>Configure as condicionais a serem utilizadas:</span>

                </div >

                <div>
                    <div >

                        {decisorState.conditionals.map((item) => {

                            return (
                                <Conditional
                                    conditional={item}
                                    updateDecisionCallback={(id, value) => updateDecisionCallback(id, value)}
                                    addDecisionCallback={() => addDecision()}>
                                </Conditional>
                            )
                        })}
                    </div>

                </div>

                <div className={props.classes.gridRow}>
                    <Button
                        className={props.classes.optionButton}
                        variant="contained"
                        onClick={() => saveDecision(decisorState.conditionals)}
                        size="small"
                        color='primary'
                        startIcon={<SaveIcon />}>
                        Salvar
                         </Button>
                </div>


            </ Paper >

        )
    }
    else {
        return (
            <Grid container >
                <Grid item xs={12} sm={12}>
                    <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                        <div style={{ padding: 10 }}>
                            <HelpIcon className={props.classes.iconDecision} />
                        </div>
                        <Paper className={props.classes.cardDecision}>
                            <div style={{ padding: 10 }}>
                                <div>
                                    {decisorState.conditionals.map((item) => {
                                        return <p>Decisao - {item.name}</p>
                                    })}
                                </div>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            </Grid>
        )
    }


}



export default withStyles(styles, { withTheme: true })(Decisor);

