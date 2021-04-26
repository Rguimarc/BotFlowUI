import React, { Component } from 'react';
import { FormControl, IconButton, Grid, TextField, Paper, Button, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Slot from './slot'
import styled from '@emotion/styled'
import CloseIcon from '@material-ui/icons/Close';
import slot from './slot';

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline; 
`
const Pill = styled.div`
  display: flex;
  background-color: #b2acfa;
  border-radius: 10px;
  padding: 4px;
  margin-right: 5px;
  margin-top: 5px;
  align-items: center;
  overflow-wrap: anywhere;
`


const styles = theme => ({
    card: {
        transition: '0.3s',
        padding: '2px 16px',
        width: "100%",
        borderRadius: '10px',
        border: '2px solid #3f50b5',
        display: 'flex',
        justify: 'flex-start'
    }
});

class Intent extends Component {

    constructor(props) {

        super(props)

        this.state = {
            status: this.props.status,
            hasSlot: this.props.hasSlot,
            slot: this.props.slot ? this.props.slot : []
        }
    }

    onBlur(e) {
        this.setState({ status: 'draft', data: e.target.value })
    }

    saveIntent(data) {

        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].phrase = data;
        this.props.dialogs[foundIndex].saved = true;
        this.props.dialogs[foundIndex].slot = this.state.slot;
        this.props.dialogs[foundIndex].hasSlot = this.state.hasSlot;
        this.props.onSave()
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

    saveSlot = (slot) => {
        this.setState({
            slot: [...this.state.slot, slot]
        })
    }

    saveSlotCallback = (data) => {
        this.saveSlot(data)
    }

    render(props) {

        const { classes } = this.props;

        if (this.state.status == 'draft') {

            return (

                <Grid container style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                    <Grid item xs={10} sm={10}>
                        <FormControl fullWidth size="small" >
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
                    {
                        this.state.hasSlot ?
                            <Grid item xs={12} sm={12}>
                                <Slot
                                    saveSlotCallback={(data) => this.saveSlotCallback(data)}
                                    slot={this.state.slot}
                                    id={this.props.id}>
                                </Slot>
                            </Grid> : null
                    }

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
                            <Paper className={classes.card} elevation={3}>
                                <p>{this.state.data}</p>
                            </Paper>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        {
                            this.state.hasSlot ?
                                <PillContainer style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                                    <Typography variant="subtitle2" display="block" gutterBottom><p style={{ paddingRight: 10 }}>salva na variável: </p></Typography>
                                    {this.state.slot.map((o) => (
                                        <Pill key={o.value}>
                                            <div>{o.value} - {o.type}</div>
                                          

                                            <IconButton size='small'>
                                                <CloseIcon />
                                            </IconButton>

                                        </Pill>
                                    ))}
                                </PillContainer> : null
                        }

                    </Grid>
                </Grid>

            )
        }
    }
}

export default withStyles(styles, { withTheme: true })(Intent);

