import React, { useState } from 'react';
import IntentCreation from './intentCreation';
import IntentEdition from './intentEdition';

const Intent = (props) => {

    console.log("Intent Component Init Props: ", props);

    const [intentState, setIntentState] = useState({
        id: props.intent.id,
        phrase: props.intent.phrase,
        saved: props.intent.saved,
        slot: props.intent.slot,
        hasSlot: props.intent.hasSlot,
        type: props.intent.type
    });

    console.log("Intent Component Init State: ", intentState);


    const onBlur = (e) => {
        let intent = { ...intentState };
        intent.phrase = e.target.value;
        setIntentState(intent)
    }

    const onSave = () => {
        let intent = { ...intentState }
        intent.saved = true;
        setIntentState(intent)
        props.onSave(intent)
    }

    const handleSaveVariableSwitch = () => {
        let intent = { ...intentState }
        intent.hasSlot = !intentState.hasSlot;
        setIntentState(intent);
    }

    const saveSlot = (slot) => {

        let intent = { ...intentState };
        intent.slot = slot;
        intent.hasSlot = true;
        setIntentState(intent);
    }

    const saveSlotCallback = (data) => {
        saveSlot(data)
    }

    const onEdit = (status) => {
        const intentUpdate = { ...intentState };
        intentUpdate.saved = status;
        setIntentState(intentUpdate);
    }

    const onDelete = () => {
        props.onDelete(intentState.id);
    }

    if (intentState.saved === false) {

        return (
            <IntentCreation
                onSave={onSave}
                handleSaveVariableSwitch={handleSaveVariableSwitch}
                saveSlotCallback={saveSlotCallback}
                onBlur={onBlur}
                intent={intentState}
            ></IntentCreation>

        )

    } else {
        return (
            <IntentEdition
                onDeleteCallback={onDelete}
                onEditCallback={onEdit}
                intent={intentState}>
            </IntentEdition>
        )
    }

}

export default Intent;

