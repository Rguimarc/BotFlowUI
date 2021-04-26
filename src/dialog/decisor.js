
import React, { Component } from 'react';
import { Paper, TextField, FormControl, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({

    buttonAdd: {
        color: '#FFFFFF',
        backgroundColor: '#3BB143',

        '&:hover': {
            backgroundColor: '#3BB143'
        }
    },
    cardDecision: {
        transition: '0.3s',
        padding: '2px 16px',
        borderRadius: '10px',
        border: '2px solid rgba( 241, 90, 36, 1 )',
    },
    iconDecision: {
        backgroundColor: '#FFFFFF',
        color: 'rgba( 241, 90, 36, 1 )',
    },
    gridOptions2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

});

class Decisor extends Component {


    constructor(props) {
        super(props);

        this.state = {
            decisions: [],
            status: this.props.status
        }
    }

    addDecision = () => {

        this.setState(
            { decisions: [...this.state.decisions, this.state.decisions.length + 1] }
        )
    }


    saveDecision = (data) => {

        var foundIndex = this.props.dialogs.findIndex(x => x.id == this.props.id);
        this.props.dialogs[foundIndex].saved = true;
        this.setState({ status: 'saved' })
        this.props.saveDecisorCallback(data)
    }

    render(props) {

        const { classes } = this.props;

        if (this.state.status == 'draft') {
            return (
                <Grid container style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>

                    <div className={classes.gridOptions2}>

                        <Button
                            variant="contained"
                            onClick={() => this.saveDecision(this.state.decisions)}
                            size="small"
                            color='primary'

                            startIcon={<SaveIcon />}
                        >
                            Condição
                         </Button>


                        <Button
                            variant="contained"
                            onClick={() => this.addDecision()}
                            size="small"
                            className={classes.buttonAdd}
                            startIcon={<AddIcon />}
                        >
                            Condição
                         </Button>

                    </div >



                    <Grid item xs={12} sm={12}>
                        <List style={{

                            maxWidth: 360

                        }}>

                            {this.state.decisions.map((value) => {

                                const labelId = `checkbox-list-label-${value}`;

                                return (

                                    <ListItem key={value} role={undefined} dense button  >

                                        <FormControl fullWidth size="small" >
                                            <TextField
                                                color='primary'
                                                key={this.props.id}
                                                label="Nome"
                                            />
                                        </FormControl>


                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="comments">
                                                <BuildIcon color="primary" />
                                            </IconButton>

                                        </ListItemSecondaryAction>
                                    </ListItem>)

                            })}

                        </List>

                    </Grid>

                </Grid >

            )
        }
        else if (this.state.status == 'saved') {
            return (
                <Grid container >
                    <Grid item xs={12} sm={12}>
                        <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                            <div style={{ padding: 10 }}>
                                <HelpIcon className={classes.iconDecision} />
                            </div>
                            <Paper className={classes.cardDecision}>
                                <div style={{ padding: 10 }}>
                                    <div>
                                        {this.state.decisions.map((item) => {
                                            return <p>Decisao - {item}</p>
                                        })}
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            )
        }
    }

}



export default withStyles(styles, { withTheme: true })(Decisor);

