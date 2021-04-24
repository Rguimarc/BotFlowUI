
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


    }

});

class Decisor extends Component {


    constructor(props) {
        console.log("asdasdasdsad")
        super(props);

        this.state = {
            decisions: [0]
        }
    }

    addDecision = () => {

        this.setState(
            { decisions: [...this.state.decisions, this.state.decisions.length + 1] }
        )
    }

    render(props) {
        const { classes } = this.props;

        console.log("asdasdasdsad")
        return (



            <Grid container style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                <Grid container item xs={7} sm={7}>

                    <Grid item xs={3} sm={3}>
                        <Button
                            variant="contained"

                            size="small"
                            color='primary'
                            startIcon={<SaveIcon />}
                        >
                            Salvar
                     </Button>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Button
                            variant="contained"
                            onClick={() => this.addDecision()}
                            size="small"
                            className={classes.buttonAdd}
                            startIcon={<AddIcon />}
                        >
                            Condição
                         </Button>
                    </Grid>
                </Grid>

           
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



            </Grid>


        )
    }

}



export default withStyles(styles, { withTheme: true })(Decisor);

