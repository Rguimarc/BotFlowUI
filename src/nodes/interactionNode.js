import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import InteractionBlock from '../dialog/interactionBlock';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { IconButton } from '@material-ui/core';

const InteractionNode = (props) => {


    function createDecisorNodeCallback(data) {       
        props.createDecisorNodeCallback( data,props.nodeInfo);
    }


    return (
        <>
            <InteractionBlock 
     
            createNodeCallback={(data) => createDecisorNodeCallback(data)}>
            </InteractionBlock>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Handle
                    type='source'
                    position='bottom'
                    style={{
                        background: '#3f50b5',
                        opacity: 0
                    }}
                    id='out'

                >
                </Handle>

                <IconButton
                    onClick={() =>  createDecisor()}
                    style={{ padding: '0' }} >
                    <CallSplitIcon
                        style={{ transform: "rotate(-180deg)", borderRadius: '50%', color: '#FFFFFF', background: '#3f50b5', marginTop: '-10' }}
                        fontSize='large' />
                </IconButton>

            </div>
        </>
    );
}




export default InteractionNode;