import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SimpleMenu from '../menuOptions';
import InteractionBlockContext from './interactionBlockContext';

const styles = theme => ({
    buttonOption: {
        marginRight: '15px'
    },
    buttonDecision: {

        backgroundColor: 'rgba( 241, 90, 36, 1 )'
    },
    gridOptions: {
        display: 'flex',
        justifyContent: 'center',


    },
    gridOptions2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});


const Options = (props) => {


    const { interactionContext, setInteractionContext } = useContext(InteractionBlockContext);

    const [itentState, setOptionsState] = useState({
      
    });

        console.log("No options ")
        console.log(interactionContext)
        if (interactionContext.mode == 'selection')

            return (

                <div className={props.classes.gridOptions}>
                    <div className={props.classes.gridOptions2}>

                        {
                            (!interactionContext.intent) ?

                                <Button className={props.classes.buttonOption}
                                    variant='contained'
                                    color='primary'
                                    id='btnUserIntent'
                                    width='100%'
                                    onClick={() => {  props.createIntentCallback() }}>
                                    Bloco Usuário
                                </Button> :

                                <>
                                    <SimpleMenu
                                        simpleResponse={ props.createBotResponseCallback}
                                        conditionalResponse={ props.createDecisorCallback}>
                                    </SimpleMenu>
                                </>
                        }

                    </div>
                </div>
            )
        else
            return null

 
}

export default withStyles(styles, { withTheme: true })(Options);
