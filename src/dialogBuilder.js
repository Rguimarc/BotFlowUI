import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { TextField, Box, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { borders } from '@material-ui/system';


import FilledInput from '@material-ui/core/FilledInput';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';

import AccountCircle from '@material-ui/icons/AccountCircle';


const styles = theme => ({
    buttonUser: {
        margin: 10,
    },
    buttonBot: {
        margin: 10
    },
    buttonItent: {
        backgroundColor: '#ffc107',
        fontSize: 'small'

    },
    dialogContainer: {
        backgroundColor: '#EEEDE7',

    },


    intent: {
        width: '100%',
        backgroundColor: '#B9B7BD'
    },
    box1: {
        margin: 50
    }
});

class DialogBuilder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            mode: 'selection',
            intents: [],
            currentid: '',
            currentPhrase: ''
        }

        this.createIntent = this.createIntent.bind(this);
        //this.handleTextChange = this.handleTextChange.bind(this);
        this.saveIntent = this.saveIntent.bind(this);
    }

    createIntent() {
        this.setState({
            mode: 'createIntent',
            intents: [...this.state.intents, { id: 'intent' + this.state.intents.length + 1, phrase: '' }]
        })
        console.log(JSON.stringify(this.state.intents))
    }

    saveIntent() {
        console.log("entrou saveIntent ")
        console.log(JSON.stringify(this.state.intents))
        var foundIndex = this.state.intents.findIndex(x => x.id == this.state.currentid);
        console.log("current id ")
        console.log(this.state.currentid)
        console.log("foundIndex ")
        console.log(foundIndex)

        this.state.intents[foundIndex].phrase = this.state.currentPhrase;

        let newIntents = this.state.intents;



        console.log("new intent ")

        console.log(JSON.stringify(newIntents))


        this.setState({
            intents: [...this.state.intents, { id: 'intent' + this.state.intents.length + 1, phrase: '' }]
        })

        console.log("depois do set state  ")
        console.log(JSON.stringify(this.state.intents))
    }

    handleTextChange(id, e) {
        console.log("entrou handleTextChange ")
        this.state.currentid = id
        this.state.currentPhrase = e.target.value


        console.log(this.state.currentid)
        console.log(JSON.stringify(this.state.intents))
    }

    render() {

        const { classes } = this.props;

        if (this.state.mode == 'selection') {
            return (
                <Container>
                    <Box color="text.primary" border={1} height={200} padding={10}  >
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <Button className={classes.buttonUser}
                                    variant='contained'
                                    color='primary'
                                    id='btnUserIntent'
                                    onClick={this.createIntent}>
                                    Usuário
                            </Button >
                                <Button
                                    variant='containedSecondary'
                                    color='palette.secondary.light'
                                    id='btnBotResponse'
                                    className={classes.buttonBot}>
                                    Bot
                             </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            )
        }
        else if (this.state.mode == 'createIntent') {

            return (
                <Container>
                    <Box borderColor="grey.500" border={1} height={200} padding={10}    >
                        <Grid>
                            {this.state.intents.map((itemDialog) => (
                                <Grid container spacing={1}>
                                    <Grid item xs={10} sm={10}>
                                        <FormControl fullWidth  >
                                            <FilledInput
                                                key={itemDialog.id}
                                                onBlur={(e) => this.handleTextChange(itemDialog.id, e)}
                                                startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>} />

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={1} sm={2}>
                                        <IconButton id='btnUserIntent' size="small" onClick={this.saveIntent}>
                                            <AddIcon fontSize="large" variant="contained" color="primary" />
                                        Intenção
                                    </IconButton  >
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            )
        }
    }
}

export default withStyles(styles, { withTheme: true })(DialogBuilder);