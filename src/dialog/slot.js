import React, { Component } from "react"
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import { Grid, IconButton, InputLabel, MenuItem, FormControl, Select, TextField, Typography } from '@material-ui/core';

const styles = theme => ({

    root: {
        "& .MuiSelect-select.MuiSelect-select": {
            paddingBottom: "11px",
            minWidth: 120
        }
    },
    buttonAdd: {
        color: '#3BB143',
        padding: '5px',
        marginTop: '15px'
    },
    inputSlot: {

        width: '80%',

    }
});


class Slot extends Component {

    constructor(props) {

        super(props)

        this.state = {
            value: this.props.slot.value,
            type: this.props.slot.type
        }
    }

    handleTextFieldChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handleSelectChange = (e) => {

        this.setState({
            type: e.target.value,
        });
    }

    handleAddClick = () => {

        let newSlot = undefined

        newSlot = {
            value: this.state.value,
            type:  this.state.type,
        }  
    
 
        this.props.saveSlotCallback(newSlot);

    }

    render(props) {

        const { classes } = this.props;

        return (


            <Grid container style={{ marginTop: 10 }}>
                <Grid item xs={12} sm={12} style={{ display: 'flex', justify: 'flexflex-start' }}><Typography variant="subtitle2" display="block" gutterBottom>Configure a váriavel a ser preenchida: </Typography></Grid>
                <Grid item xs={1} sm={1}>

                    <IconButton id='btnUserIntent' size="small"  >
                        <AddIcon  onClick={() => this.handleAddClick()} fontSize="large" variant="contained" className={classes.buttonAdd} />
                    </IconButton  >
                </Grid>
                <Grid item xs={5} sm={6}>
                    <FormControl fullWidth size="small" className={classes.inputSlot}>
                        <TextField
                            onChange={(e) => { this.handleTextFieldChange(e) }}
                            style={{ paddingTop: "20px" }}
                            color='primary'
                            key={this.props.id + 'slot'}
                            value={this.state.value}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={5} sm={5}>
                    <FormControl className={classes.root}>
                        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.type}
                            onChange={(e) => { this.handleSelectChange(e) }}>
                            <MenuItem value={10}>Nome</MenuItem>
                            <MenuItem value={20}>Email</MenuItem>
                            <MenuItem value={30}>CPF</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }
}


export default withStyles(styles, { withTheme: true })(Slot);
