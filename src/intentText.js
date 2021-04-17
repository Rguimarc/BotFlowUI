import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    card: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        boxshadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        padding: '2px 16px',
        background: '#3f50b5',
        color: '#FFFFFF',
        width: "100%"
    }
});

class IntentText extends Component {

    constructor(props) {

        super(props)

        this.state = {
            status : this.props.status
        }
    }
 
    onBlur (e) {
        console.log(e.target.value)
         this.setState({ status: 'draft', data: e.target.value })
         console.log(e)
         console.log(e.target.value)
         console.log(this.state.data)
         console.log("no blur")
         this.props.handleTextChangeCallback(this.props.id, e.target.value)
    }

       
    saveIntent(data) {
        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].phrase = data;
        this.props.dialogs[foundIndex].saved = true;    
    }

    onSave () {
        this.saveIntent (this.state.data)
        this.setState({ status: 'saved' })
        this.props.onSave();
    }   

    render(props) {

        const { classes } = this.props;
        console.log("no render")
        console.log(this.state.data)
        console.log(this.state.status)
        if (this.state.status == 'draft') {
  
            return (
                
                <Grid container>
                    <Grid item xs={10} sm={10}>
                        <FormControl fullWidth size="small" className={classes.root}>
                            <TextField
                                color='primary'
                                key={this.props.id}
                                onBlur={(e) => this.onBlur(e)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} sm={2}>
                        <IconButton id='btnUserIntent' size="small" onClick={() => this.onSave(this.state.data)}>
                            <SaveIcon fontSize="large" variant="contained" color="primary" />
                        </IconButton  >
                    </Grid>
                </Grid>

            )

        } else if (this.state.status == 'saved') {
            return (
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <div style={{ display: "flex", alignItems: 'baseline',  width: "100%" }}>
                            <div  style={{padding:10}}>
                                <AccountIcon color="primary" />
                            </div>
                            <div className={classes.card}>
                                <p>{this.state.data}</p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            )
        }
    }
}

export default withStyles(styles, { withTheme: true })(IntentText);

