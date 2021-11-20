import React from 'react';
import { IconButton, Grid, Paper, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styled from '@emotion/styled'
import CloseIcon from '@material-ui/icons/Close';
import AccountIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const PillContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline; 
`
const Pill = styled.div`
  display: flex;
  border-radius: 90px;
  color: #4088f6;
  border-style:solid;
  border-width:2px;
  border-color:#3f50b5;
  padding: 2px 10px;
  margin-right: 10px;
  margin-top: 10px;
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
        justify: 'flex-start',
        marginBottom: '10px'
    }
});

const IntentEdition = (props) => {


    console.log("IntentEdition Component Init Props: ", props);

    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                    <div style={{ padding: 10 }}>
                        <AccountIcon color="primary" />
                    </div>
                    <Paper className={props.classes.card} elevation={3}>
                        <p>{props.intent.phrase}</p>
                    </Paper>
                    <IconButton id='btnUserIntent' size="small"  >
                        <DeleteIcon fontSize="medium" variant="contained" color="primary" />
                    </IconButton>
                    <IconButton id='btnUserIntent' size="small"  >
                        <EditIcon fontSize="medium" variant="contained" color="primary" />
                    </IconButton>
                </div>
            </Grid>
            <Grid item xs={12} sm={12}>
                {
                    props.intent.hasSlot ?
                        <PillContainer style={{ marginLeft: '40px', marginRight: '40px', marginTop: '10px' }}>
                            <span style={{ marginRight: '10px' }}>Resposta salva na variável:</span>
                            {props.intent.slot.map((o) => (
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

export default withStyles(styles, { withTheme: true })(IntentEdition);

