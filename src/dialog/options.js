import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import SimpleMenu from '../menuOptions';

const styles = theme => ({
    buttonBot: {
        width: '80%'
    },
    buttonDecision: {
        width: '80%',
        backgroundColor: 'rgba( 241, 90, 36, 1 )'
    },
    gridOptions: {
        margin: 10
    }
});

class Options extends Component {

    render(props) {

        const { classes } = this.props;

        if (this.props.mode == 'selection')

            return (

                <div className={classes.gridOptions}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Button
                                variant='contained'
                                color='primary'
                                id='btnUserIntent'
                                width='100%'
                                onClick={() => { this.props.createIntentCallback() }}>
                                Usuário
                        </Button >
                        </Grid>
                        <Grid item xs={2}>
                            <SimpleMenu
                                simpleResponse={this.props.createBotResponseCallback}>
                            </SimpleMenu>
                           
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonDecision}
                                onClick={() => { this.props.createDecisorCallback() }}
                                endIcon={<CallSplitIcon></CallSplitIcon>}>
                                decisao
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            )
        else
            return null

    }
}

export default withStyles(styles, { withTheme: true })(Options);
