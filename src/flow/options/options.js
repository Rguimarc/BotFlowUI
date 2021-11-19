import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BotOption from './botOption';
import IntentOption from './intentOption';
import { EVENT_TYPE, MODE } from '../blocks/enums/blockEnums';

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

    console.log("Options Component Init Props: ", props);

    if (props.mode == MODE.DISPLAY)

        return (

            <div className={props.classes.gridOptions}>
                <div className={props.classes.gridOptions2}>


                    {renderOptions(props)}

                </div>
            </div>
        )
    else
        return null


}

export default withStyles(styles, { withTheme: true })(Options);


const renderOptions = (props) => {


    if (props.isStartBlock && props.responses.length == 0) {
        console.log("OPCAO 1")
        return (<BotOption
            greetingsBlock={true}
            simpleResponse={props.createBotResponseCallback}>
        </BotOption>)
    } else if (props.isStartBlock && props.responses.length != 0 && !props.intent) {
        console.log("OPCAO 2")
        return (
            <>
                <IntentOption
                    singleIntent={props.createIntentCallback}
                    multipleIntents={props.createIntentsMultipleCallback}>
                </IntentOption>
                <BotOption
                    greetingsBlock={false}
                    simpleResponse={props.createBotResponseCallback}>
                </BotOption>
            </>)
    } else if (props.isStartBlock && props.responses.length != 0 && props.intent) {
        console.log("OPCAO 3")
        return (<BotOption
            greetingsBlock={false}
            simpleResponse={props.createBotResponseCallback}>
        </BotOption>)
    }
    else if (!props.isStartBlock && !props.intent) {
        console.log("OPCAO 4")
        return (
            <>
                <IntentOption
                    singleIntent={props.createIntentCallback}
                    multipleIntents={props.createIntentsMultipleCallback}>
                </IntentOption>
                <BotOption
                    simpleResponse={props.createBotResponseCallback}>
                </BotOption>
            </>)
    }
    else if (!props.isStartBlock && props.intent && props.responses.length == 0) {
        console.log("OPCAO 5")
        return (<BotOption
            greetingsBlock={false}
            simpleResponse={props.createBotResponseCallback}>
        </BotOption>)

    } else if (!props.isStartBlock && props.intent && props.responses.length != 0) {
        return (
            <>
                <IntentOption
                    singleIntent={props.createIntentCallback}
                    multipleIntents={props.createIntentsMultipleCallback}>
                </IntentOption>
                <BotOption
                    simpleResponse={props.createBotResponseCallback}>
                </BotOption>
            </>)
    }


}