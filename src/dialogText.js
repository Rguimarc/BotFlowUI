import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SaveIcon from '@material-ui/icons/Save';
import AccountIcon from '@material-ui/icons/AccountCircle';
import RedditIcon from '@material-ui/icons/Reddit';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    gridText: {
        margin: 10
    },
    root: {
        "& .MuiFilledInput-root": {
            background: "rgba( 249, 240, 255, 1 )",
        }
    }
});

class DialogText extends Component {

    render(props) {

        const { classes } = this.props;
        
        return (

            <div className={classes.gridText}>
                <Grid container>
                    <Grid item xs={10} sm={10}>
                        <FormControl fullWidth size="small" className={classes.root}>
                            <FilledInput
                                color={this.props.item.type == 'bot' ? 'secondary' : 'primary'}

                                key={this.props.item.id}
                                onBlur={(e) => this.props.handleTextChangeCallback(this.props.item.id, e)}

                                endAdornment={
                                    this.props.item.type == 'bot' ?
                                        <InputAdornment position="end" ><RedditIcon color="secondary" /></InputAdornment>
                                        : null
                                }
                                startAdornment={
                                    this.props.item.type == 'intent' ?
                                        <InputAdornment position="start"><AccountIcon color="primary" /></InputAdornment>
                                        : null
                                }
                            />
                        </FormControl>
                    </Grid>
                    {this.props.saved == false ?
                        <Grid item xs={1} sm={2}>
                            <IconButton id='btnUserIntent' size="small" onClick={() => this.props.saveIntentCallback()}>
                                <SaveIcon fontSize="large" variant="contained" color="primary" />
                            </IconButton  >
                        </Grid> : null
                    }
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(DialogText);

