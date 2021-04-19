import React, { Component } from 'react';
import { FormControl, IconButton, Grid, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    card: {
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        boxshadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        padding: '2px 16px',
        width: "100%",
        borderRadius: '25px',
        border: '2px solid #3f50b5'
    }
});

class Intent extends Component {

    constructor(props) {

        super(props)

        this.state = {
            status: this.props.status,
            hasSlot: this.props.hasSlot
        }
    }

    onBlur(e) {

        this.setState({ status: 'draft', data: e.target.value })
    }


    saveIntent(data) {

        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].phrase = data;
        this.props.dialogs[foundIndex].saved = true;

        let dialogItem

        if (this.state.hasSlot)
            dialogItem = { id: 'dialogSlot' + (this.props.dialogs.length + 1), phrase: '', hasSlot: this.state.hasSlot, saved: false, type: 'slot' }

        this.props.onSave(dialogItem);
    }

    onSave() {
        this.setState({ status: 'saved' })
        this.saveIntent(this.state.data)
    }

    handleSaveVariableSwitch() {
        this.setState({
            hasSlot: !this.state.hasSlot
        })

    }

    render(props) {

        const { classes } = this.props;

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
                    <Grid>
                        Salvar Resposta em variável ?
                    <Switch color="primary" checked={this.state.hasSlot} onChange={() => this.handleSaveVariableSwitch()} />
                    </Grid>
                </Grid>


            )

        } else if (this.state.status == 'saved') {
            return (
                <Grid container>
                    <Grid item xs={12} sm={12}>
                        <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                            <div style={{ padding: 10 }}>
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

export default withStyles(styles, { withTheme: true })(Intent);

