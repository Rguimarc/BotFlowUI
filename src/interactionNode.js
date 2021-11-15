import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import InteractionBlock from './dialog/interactionBlock';
import { NODE_TYPE } from './dialog/enums/interactionNodeEnum'

const InteractionNode = (props) => {

    const [parentNode] = useState(props.parentNode);

    return (
        <>

            <InteractionBlock
                parentNode={parentNode}
                createDecisorNodeCallback={(data, nodeInfo) => this.props.createDecisorNodeCallback(data, nodeInfo)}>
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

            </div>
        </>
    );

}



export default InteractionNode;