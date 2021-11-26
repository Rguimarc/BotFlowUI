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

    const onEdit = (status) => {
        const respUpdate = { ...response };
        respUpdate.saved = status;
        setResponseState(respUpdate);
    }

    const onDelete = () => {
        props.onDelete(responseState.id);
    }

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

    if (responseState.saved === false) {
        return (
            <ResponseCreation
                phrase={responseState.phrase}
                onSaveRichText={onSaveRichText}>
            </ResponseCreation>)
    } else if (responseState.saved === true) {
        return (
            <ResponseEdition
                phrase={{ __html: responseState.phrase }}
                onDeleteCallback={onDelete}
                onEditCallback={onEdit}>
            </ResponseEdition>
        )
    }
}

export default Response;
