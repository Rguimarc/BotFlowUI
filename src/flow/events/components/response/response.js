import { convertFromRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import React, { useEffect, useState } from 'react';

import ResponseCreation from './responseCreation';
import ResponseEdition from './responseEdition';

const Response = (props) => {

    console.log("Response Component Init Props: ", props);

    const response = {
        id: props.response.id,
        phrase: props.response.phrase,
        saved: props.response.saved,
        type: props.response.type
    }

    const [responseState, setResponseState] = useState(response);

    console.log("Response Component Init State: ", responseState);

    const onSaveRichText = async (data) => {
        setResponseState(
            {
                id: props.response.id,
                phrase: stateToHTML(convertFromRaw(JSON.parse(data))),
                saved: true,
                type: props.response.type
            })

    }

    useEffect(() => {
        if (responseState.saved)
            props.onSave(responseState)
    }, [responseState]);

    if (props.saved == false) {
        return (
            <ResponseCreation
                onSaveRichText={onSaveRichText}>
            </ResponseCreation>)
    } else if (props.saved == true) {
        return (
            <ResponseEdition
                phrase={{ __html: responseState.phrase }}>
            </ResponseEdition>
        )
    }
}

export default Response;
