import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    gridText: {
        margin: 10
    }
});

class DialogText extends Component {

    render(props) {

        const { classes } = this.props;

        return (

            <div className={classes.gridText}>
                <Grid container>
                    <Grid item xs={10} sm={10}>
                        <FormControl fullWidth size="small" >
                            <FilledInput
                                key={this.props.item.id}
                                onBlur={(e) => this.props.handleTextChangeCallback(this.props.item.id, e)}
                                startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>} />

                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sm={2}>
                        <IconButton id='btnUserIntent' size="small" onClick={() => this.props.saveIntentCallback()}>
                            <AddIcon fontSize="large" variant="contained" color="primary" />
                              Intenção
                        </IconButton  >
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DialogText);

