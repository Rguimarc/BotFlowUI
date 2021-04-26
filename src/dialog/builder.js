import React, { Component } from 'react';
import { Box, Container, Grid, Paper, Button, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
import Intent from './intent'
import Response from './response';
import Decisor from './decisor';

const styles = theme => ({
    gridDialog: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'

    },
    gridText: {
        margin: 10,
        width: '100%'
    }

});

class Builder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            mode: 'selection',
            decisor: [],
            dialogs: []
        }

        this.createIntent = this.createIntent.bind(this);
        this.saveIntent = this.saveIntent.bind(this);
    }

    createIntent() {
        this.setState({
            mode: 'createIntent',
            dialogs: [...this.state.dialogs, { id: 'dialogIntent' + (this.state.dialogs.length + 1), phrase: '', hasSlot: false, saved: false, type: 'intent' }]
        })
    }

    createBotResponse() {

        this.setState({
            mode: 'createIntent',
            dialogs: [...this.state.dialogs, { id: 'dialogBot' + (this.state.dialogs.length + 1), phrase: '', saved: false, type: 'bot' }]
        })
    }

    saveIntent(data) {

        let cpDialog = [...this.state.dialogs];

        if (data)
            cpDialog = [...cpDialog, data]

        this.setState({
            dialogs: cpDialog,
            mode: 'selection'
        })
    }

    saveDecisor(data) {

        this.props.createDecisorNodeCallback(data);

        this.setState({
            mode: 'createIntent',
            decisor: [...this.state.decisor, data]
        })

    }

    createDecisor() {

        this.setState({
            mode: 'createIntent',
            dialogs: [...this.state.dialogs, { id: 'decisorBot' + (this.state.dialogs.length + 1), phrase: '', conditions: [], saved: false, type: 'decisor' }]
        })
    }

    saveIntentCallback = (data) => {
        this.saveIntent(data)
    }

    createIntentCallback = () => {
        this.createIntent()
    }


    createBotResponseCallback = () => {
        this.createBotResponse()
    }

    createDecisorCallback = () => {
        this.createDecisor()
    }

    saveDecisorCallback = (data) => {
        this.saveDecisor(data)
    }

    render() {

        const { classes } = this.props;

        return (

            <Container>
                <Paper elevation={3} style={{ padding: 4 }}>
                    <Box className={classes.gridDialog}>

                        <Grid >
                            {this.state.dialogs.map((itemDialog) => {

                                if (itemDialog.type == 'bot')
                                    return (

                                        <div className={classes.gridText}>
                                            <Response
                                                dialogs={this.state.dialogs}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                onSave={() => this.saveIntentCallback()}
                                                handleTextChangeCallback={() => this.props.handleTextChangeCallback}
                                                id={itemDialog.id}>
                                            </Response>
                                        </div>)

                                else if (itemDialog.type == 'intent')

                                    return (
                                        <div className={classes.gridText}>

                                            <Intent
                                                dialogs={this.state.dialogs}
                                                hasSlot={itemDialog.hasSlot}
                                                slot={itemDialog.slot}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                onSave={(data) => this.saveIntentCallback(data)}
                                                handleTextChangeCallback={() => this.props.handleTextChangeCallback}
                                                id={itemDialog.id}
                                            ></Intent>

                                        </div>
                                    )
                                else if (itemDialog.type == 'decisor') {
                                    return (
                                        <div className={classes.gridText}>
                                            <Decisor id={itemDialog.id}
                                                status={itemDialog.saved == false ? 'draft' : 'saved'}
                                                dialogs={this.state.dialogs}
                                                saveDecisorCallback={(data) => this.saveDecisorCallback(data)}>
                                            </Decisor>
                                        </div>)
                                }


                            })}

                        </Grid>

                        <Options mode={this.state.mode}
                            createIntentCallback={this.createIntentCallback}
                            createBotResponseCallback={this.createBotResponseCallback}
                            createDecisorCallback={this.createDecisorCallback}>
                        </Options>



                    </Box>
                </Paper>
            </Container >
        )

    }
}

export default withStyles(styles, { withTheme: true })(Builder);