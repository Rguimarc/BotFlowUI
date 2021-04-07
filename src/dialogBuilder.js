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
            mode: 'selection'
        }

        this.createIntent = this.createIntent.bind(this);
    }

    createIntent() {
        this.setState({
            mode: 'createIntent'
        })
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
        else if (this.state.mode == 'createIntent')
            return (
                <Container>
                    <Box borderColor="grey.500" border={1} height={200} padding={10}    >
                        <Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={10} sm={10}>
                                    <FormControl fullWidth  >
                           
                                        <FilledInput 
                                            startAdornment={<InputAdornment position="start">
                                                <AccountCircle />  
                                            </InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} sm={2}>
                                    <IconButton id='btnUserIntent' size="small">
                                        <AddIcon fontSize="large" variant="contained" color="primary" />
                                        Intenção

                                    </IconButton  >
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            )
    }
}

export default withStyles(styles, { withTheme: true })(DialogBuilder);