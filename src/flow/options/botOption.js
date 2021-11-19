import React from 'react';
import Button from '@material-ui/core/Button';

export default function BotOptions(props) {

    console.log("BotOptions Component Init Props: ", props);

    const btnText = (!props.greetingsBlock) ? 'Bloco Bot' : 'Saudação';

    return (
        <div>
            <Button
                variant='containedSecondary'
                style={{ width: '80%' }}
                color='palette.secondary.light'
                style={{ marginRight: '15px' }}
                id='btnBotResponse'
                onClick={()=>props.simpleResponse()}>
                {btnText}
            </Button>

        </div>
    );
}
