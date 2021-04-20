import React, { Component } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Options from './options';
import Intent from './intent'
import Response from './response';
import Slot from './slot'

const styles = theme => ({
    gridDialog: {
        margin: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent : 'center'
 
    },
    gridText: {
        margin: 10,
        width:'100%'
    },
    root: {
        "& .MuiFilledInput-root": {
            background: "rgba( 249, 240, 255, 1 )",
        }
    }
});

class Builder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            mode: 'selection',
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
 
    createDecisor() {
        console.log('CREATE DECISOR')
        console.log(this.props.nodeInfo)
        this.props.createDecisorNodeCallback(this.props.nodeInfo);
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

    render() {

        console.log(this.state.dialogs)
        const { classes } = this.props;

        return (

            <Container>
                <Box borderColor="grey.500" height='100%' width='100%'  >

                    <Grid className={classes.gridDialog}>
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
                                            status={itemDialog.saved == false ? 'draft' : 'saved'}
                                            onSave={(data) => this.saveIntentCallback(data)}
                                            handleTextChangeCallback={() => this.props.handleTextChangeCallback}
                                            id={itemDialog.id}
                                        ></Intent>
                                    </div>
                                )

                            else if (itemDialog.type == 'slot')
                                return (
                                    <div className={classes.gridText}>
                                        <Slot></Slot>
                                    </div>
                                )
                        })}

                    </Grid>

                    <Options mode={this.state.mode}
                        createIntentCallback={this.createIntentCallback}
                        createBotResponseCallback={this.createBotResponseCallback}
                        createDecisorCallback={this.createDecisorCallback}>
                    </Options>

                </Box>
            </Container >
        )

    }
}

export default withStyles(styles, { withTheme: true })(Builder);