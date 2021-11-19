import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import Block from '../flow/blocks/block';

const DialogNode = (props) => {

    const [parentNode] = useState(props.parentNode);

    console.log("DialogNode Component Init Props: ", props);

    return (
        <>

            <Block
                blockInit={props.blockInit}
                parentNode={parentNode}
                createNodeCallback={(data, nodeInfo) => props.createNodeCallback(data, nodeInfo)}>
            </Block>


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

            </div>
        </>
    );

}



export default DialogNode;