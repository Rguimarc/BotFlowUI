import React from 'react';

const InteractionBlockContext = React.createContext({
    interaction: {
        mode: 'selection',
        decisor: [],
        dialogs: [],
        intent : {}
    },
    setInteractionContext: () => { }
});

export default InteractionBlockContext;