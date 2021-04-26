import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../menuOptions';

const styles = theme => ({
    buttonOption: {
        marginRight: '15px'
    },
    buttonDecision: {

        backgroundColor: 'rgba( 241, 90, 36, 1 )'
    },
    gridOptions: {
        display: 'flex',
        justifyContent: 'center',


    },
    gridOptions2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

class Options extends Component {

    render(props) {

        const { classes } = this.props;

        if (this.props.mode == 'selection')

            return (

                <div className={classes.gridOptions}>
                    <div className={classes.gridOptions2}>


                        <Button className={classes.buttonOption}
                            variant='contained'
                            color='primary'
                            id='btnUserIntent'
                            width='100%'
                            onClick={() => { this.props.createIntentCallback() }}>
                            Usuário
                        </Button >

                        <SimpleMenu
                            simpleResponse={this.props.createBotResponseCallback}>
                        </SimpleMenu>



                        <Button
                            className={classes.buttonOption}
                            variant="contained"
                            color="primary"
                            className={classes.buttonDecision}
                            onClick={() => { this.props.createDecisorCallback() }}>
                            decisao
                        </Button>

                    </div>
                </div>
            )
        else
            return null

    }
}

export default withStyles(styles, { withTheme: true })(Options);
