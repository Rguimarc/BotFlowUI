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
            intents: [],
            currentid: '',
            currentPhrase: ''
        }

        this.createIntent = this.createIntent.bind(this);
        this.saveIntent = this.saveIntent.bind(this);
    }

    createIntent() {
        console.log(this.state.mode)
        this.setState({
            mode: 'createIntent',
            intents: [...this.state.intents, { id: 'intent' + this.state.intents.length + 1, phrase: '', saved: false }]
        })
    }

    saveIntent() {

        var foundIndex = this.state.intents.findIndex(x => x.id == this.state.currentid);
        this.state.intents[foundIndex].phrase = this.state.currentPhrase;
        this.state.intents[foundIndex].saved = true;

        this.setState({
            intents: this.state.intents,
            mode: 'selection'
        })

    }

    handleTextChange(id, e) {

        this.state.currentid = id
        this.state.currentPhrase = e.target.value
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

    render() {

        const { classes } = this.props;


        return (

            <Container>
                <Box borderColor="grey.500" height='100%' width='100%'  >

                    <Grid className={classes.gridDialog}>
                        {this.state.intents.map((itemDialog) => (
                            <DialogText item={itemDialog} saved={itemDialog.saved}
                                handleTextChangeCallback={this.handleTextChangeCallback}
                                saveIntentCallback={this.saveIntentCallback}>
                            </DialogText>
                        ))}
                    </Grid>

                    <DialogOptions mode={this.state.mode}
                        createIntentCallback={this.createIntentCallback}>
                    </DialogOptions>
                </Box>
            </Container >
        )

    }
}

export default withStyles(styles, { withTheme: true })(DialogBuilder);