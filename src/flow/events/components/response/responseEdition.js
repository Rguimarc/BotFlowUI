
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import RedditIcon from '@material-ui/icons/Reddit';
import { Paper, Grid, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    card: {
        transition: '0.3s',
        padding: '2px 16px',
        width: "100%",
        borderRadius: '10px',
        border: '2px solid #e33371',
        display: 'flex',
        justify: 'flex-start',
        marginBottom: '10px',
        marginTop: '10px'
    }
});


const ResponseEdition = (props) => {

    console.log("ResponseEdition Component Init Props: ", props);


    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <div style={{ display: "flex", alignItems: 'baseline', width: "100%" }}>
                    <div style={{ padding: 10 }}>
                        <RedditIcon color="secondary" />
                    </div>
                    <Paper className={props.classes.card} elevation={3}
                        dangerouslySetInnerHTML={props.phrase}>
                    </Paper>
                    <IconButton id='btnUserIntent' size="small" onClick={() => props.onDeleteCallback()}>
                        <DeleteIcon fontSize="medium" variant="contained" color="secondary" />
                    </IconButton>
                    <IconButton id='btnUserIntent' size="small" onClick={() => props.onEditCallback(false)}  >
                        <EditIcon fontSize="medium" variant="contained" color="secondary" />
                    </IconButton>
                </div>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles, { withTheme: true })(ResponseEdition);
