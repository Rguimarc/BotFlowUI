
import React, { Component } from 'react';
import { Paper, TextField, FormControl, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Help';

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
        marginTop: '10px'
    },
    gridColumn: {
        display: 'flex',
        flexDirection: 'column',
        marginTop:'20px',
        marginBottom:'10px',
        marginLeft: '40px',
        marginRight: '40px',
        padding: 4 
    },
    optionButton: {
        margin: '10px',
        marginLeft: '0px'
    }

});

class Decisor extends Component {


    constructor(props) {
        super(props);

        this.state = {
            decisions: [],
            status: this.props.status
        }
    }

    addDecision = () => {

        this.setState(
            { decisions: [...this.state.decisions, this.state.decisions.length + 1] }
        )
    }


    saveDecision = (data) => {

        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].saved = true;
        this.setState({ status: 'saved' })
        this.props.saveDecisorCallback(data)
    }

    render(props) {

        const { classes } = this.props;

        if (this.state.status == 'draft') {
            return (
                <Paper elevation={0} padding={3} variant='outlined' className={classes.gridColumn}  >

                    <div className={classes.gridRow}>

                        <span>Configure as condicionais a serem utilizadas:</span>

                    </div >

                    <div>
                        <div >

                            {
                                this.state.decisions.length > 0 ?

                                    this.state.decisions.map((value) => {

                                        return (
                                            <div className={classes.gridRow}>
                                                <FormControl size="small" >
                                                    <TextField
                                                        color='primary'
                                                        key={this.props.id}
                                                        label="Nome"
                                                    />
                                                </FormControl>

                                                <IconButton edge="end" aria-label="comments">
                                                    <BuildIcon color="primary" />
                                                </IconButton>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => this.addDecision()}
                                                    size="small"
                                                    className={classes.buttonAdd}
                                                    startIcon={<AddIcon />}>
                                                    Condição
                                                </Button>
                                            </div>

                                        )

                                    }) : <div className={classes.gridRow}>
                                        <FormControl size="small" >
                                            <TextField
                                                color='primary'
                                                key={this.props.id}
                                                label="Nome"
                                            />
                                        </FormControl>

                                        <IconButton edge="end" aria-label="comments">
                                            <BuildIcon  />
                                        </IconButton>
                                        <Button
                                            variant="contained"
                                            onClick={() => this.addDecision()}
                                            size="small"
                                            className={classes.buttonAdd}
                                            startIcon={<AddIcon />}>
                                            Condição
                                        </Button>
                                    </div>
                            }
                        </div>

                    </div>

                    <div className={classes.gridRow}>
                        <Button
                            className={classes.optionButton}
                            variant="contained"
                            onClick={() => this.saveDecision(this.state.decisions)}
                            size="small"
                            color='primary'
                            startIcon={<SaveIcon />}>
                            Salvar
                         </Button>
                    </div>


                </ Paper >

            )
        }
        else if (this.state.status == 'saved') {
            return (
                <Grid container >
                    <Grid item xs={12} sm={12}>
                        <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                            <div style={{ padding: 10 }}>
                                <HelpIcon className={classes.iconDecision} />
                            </div>
                            <Paper className={classes.cardDecision}>
                                <div style={{ padding: 10 }}>
                                    <div>
                                        {this.state.decisions.map((item) => {
                                            return <p>Decisao - {item}</p>
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

}



export default withStyles(styles, { withTheme: true })(Decisor);

