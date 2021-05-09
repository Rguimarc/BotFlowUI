import React from 'react';

const InteractionBlockContext = React.createContext({
    interaction: {
        mode: 'selection',
        responses: [],
        intent : {}
    },
    setInteractionContext: () => { }
});

export default InteractionBlockContext;