import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BotOption from './botOption';
import IntentOption from './intentOption';
import { INTERACTION_TYPE, MODE } from '../enums/interactionBlockEnums';

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

    console.log(props.responses)

    if (props.mode == MODE.DISPLAY)

        return (

            <div className={props.classes.gridOptions}>
                <div className={props.classes.gridOptions2}>

                    {
                        (props.isStartBlock && props.responses.length == 0) ?

                            <BotOption
                                greetingsBlock={true}
                                simpleResponse={props.createBotResponseCallback}>
                            </BotOption> :

                            <>
                                <IntentOption
                                    singleIntent={props.createIntentCallback}
                                    multipleIntents={props.createIntentsMultipleCallback}>
                                </IntentOption>
                                <BotOption
                                    simpleResponse={props.createBotResponseCallback}>
                                </BotOption>
                            </>
                    }

                </div>
            </div>
        )
    else
        return null


}

export default withStyles(styles, { withTheme: true })(Options);
