
import React, { Component } from 'react';
import { Paper, TextField, FormControl, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
 
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

class IntentsMultiple extends Component {


    constructor(props) {
        super(props);

        this.state = {
            intents: [],
            status: this.props.status
        }
    }
  
    addIntent = () => {

        console.log("savlando intentes",this.state.intents)
        this.setState(
            { intents: [...this.state.intents, this.state.intents.length + 1] }
        )
    }


    saveIntent = (data) => {
        this.props.saveMultipleIntentsCallback(data)
    }

    render(props) {

        const { classes } = this.props;
        console.log("!multiplechoive",this.state.status);
        if (this.props.status == 'draft') {
            return (
                <Paper elevation={0} padding={3} variant='outlined' className={classes.gridColumn}  >

                    <div className={classes.gridRow}>

                        <span>Configure as intenções a serem utilizadas:</span>

                    </div >

                    <div>
                        <div >

                            {
                                this.state.intents.length > 0 ?

                                    this.state.intents.map((value) => {

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
                                                    onClick={() => this.addIntent()}
                                                    size="small"
                                                    className={classes.buttonAdd}
                                                    startIcon={<AddIcon />}>
                                                    Adicionar
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
                                            onClick={() => this.addIntent()}
                                            size="small"
                                            className={classes.buttonAdd}
                                            startIcon={<AddIcon />}>
                                            Intenção
                                        </Button>
                                    </div>
                            }
                        </div>

                    </div>

                    <div className={classes.gridRow}>
                        <Button
                            className={classes.optionButton}
                            variant="contained"
                            onClick={() => this.saveIntent(this.state.intents)}
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
                null
            )
        }
    }

}



export default withStyles(styles, { withTheme: true })(IntentsMultiple);

