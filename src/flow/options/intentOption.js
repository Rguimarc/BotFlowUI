import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    buttonOption: {
        marginRight: '15px'
    }
});


function IntentOption(props) {

    return (
        <div>
            <Button className={props.classes.buttonOption}
                variant='contained'
                color='primary'
                id='btnUserIntent'
                width='100%'
                onClick={props.singleIntent}>
                Bloco Usuário
            </Button>
        </div>
    );
}


export default withStyles(styles, { withTheme: true })(IntentOption);