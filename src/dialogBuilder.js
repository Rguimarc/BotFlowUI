import React, { Component } from 'react';
import { Box, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DialogOptions from './dialogOptions';
import DialogText from './dialogText';

const styles = theme => ({
    gridDialog: {
        margin: 20
    }
});

class DialogBuilder extends Component {

    constructor(props) {

        super(props);

        this.state = {
            mode: 'selection',
            dialogs: [],
            currentid: '',
            currentPhrase: ''
        }

        this.createIntent = this.createIntent.bind(this);
        this.saveIntent = this.saveIntent.bind(this);
    }

    createIntent() {
        this.setState({
            mode: 'createIntent',
            dialogs: [...this.state.dialogs, { id: 'dialogIntent' + this.state.dialogs.length + 1, phrase: '', saved: false, type: 'intent' }]
        })
    }
    
    createBotResponse() {
       
        this.setState({
            mode: 'createIntent',
            dialogs: [...this.state.dialogs, { id: 'dialogBot' + this.state.dialogs.length + 1, phrase: '', saved: false, type: 'bot' }]
        })
        console.log("CREATE BOT RESPONSE")

    }


    
    saveIntent() {
        // console.log('NO SAVE ')
        // console.log(this.state.dialogs)
        // console.log(this.state.currentid)
        // console.log(data)
        // var foundIndex = this.state.dialogs.findIndex(x => x.id == this.state.currentid);
        // this.state.dialogs[foundIndex].phrase = data;
        // this.state.dialogs[foundIndex].saved = true;

        this.setState({
            dialogs: this.state.dialogs,
            mode: 'selection'
        })
    }

    handleTextChange(id, e) {
        console.log('NO HANDLETEXT CHANGE ')

        console.log(id)
        console.log(e)
        this.state.currentid = id
        this.state.currentPhrase = e
    }


    createDecisor() {     
        console.log('CREATE DECISOR')
        console.log(this.props.nodeInfo)
        this.props.createDecisorNodeCallback(this.props.nodeInfo);
    }

    handleTextChangeCallback = (id, e) => {
        this.handleTextChange(id, e)
    }

    saveIntentCallback = () => {
        this.saveIntent()
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
                        {this.state.dialogs.map((itemDialog) => (
                            <DialogText 
                                item={itemDialog} 
                                saved={itemDialog.saved}
                                dialogs = {this.state.dialogs}
                                handleTextChangeCallback={this.handleTextChangeCallback}
                                saveIntentCallback={this.saveIntentCallback}>
                            </DialogText>
                        ))}
                    </Grid>

                    <DialogOptions mode={this.state.mode}
                        createIntentCallback={this.createIntentCallback}
                        createBotResponseCallback={this.createBotResponseCallback}
                        createDecisorCallback = {this.createDecisorCallback}>
                    </DialogOptions>
                </Box>
            </Container >
        )

    }
}

export default withStyles(styles, { withTheme: true })(DialogBuilder);