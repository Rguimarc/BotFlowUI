import React, { Component } from 'react'
import '../index.css'
import ReactFlow from 'react-flow-renderer';
import InteractionNode from '../interactionNode';
import { withStyles } from '@material-ui/core/styles';
import { NODE_TYPE } from '../dialog/enums/interactionNodeEnum';

const styles = theme => ({
  divFlow: {
    "& .react-flow__handle.connectable": {
      opacity: 0
    }
  }

});


class Flow extends Component {

  constructor(props) {
    super(props);
    const nodeInfo = {
      cords: { x: 250, y: 250, id: 1 },
      type: NODE_TYPE.START
    }

    this.state = {
      elements: [
        {
          id: '1',
          data: {
            label: <InteractionNode
              createDecisorNodeCallback={(data, nodeInfo) => this.createDecisorNodeCallback(data, this.nodeInfo)}
              parentNode={nodeInfo}
            />
          },
          position: { x: 200, y: 200 },
          type: 'start',
          style: {
            width: 500,

          },
        }
      ]
    }
  };

  createDecisorNode(data, nodeInfo) {

    let nodes = []
    let x = -200;
    let nodeId = nodeInfo.id;


    data.forEach((item) => {

      nodeId++;

      let newNode = {
        id: String(nodeId),
        data: {
          label: <InteractionNode parentNode={{ cords: { nodeInfo }, type: NODE_TYPE.INTERMEDIARY }}
            createDecisorNodeCallback={this.createDecisorNodeCallback} />
        },
        type: 'start',
        position: { x: nodeInfo.x + x, y: nodeInfo.y + 200 },
        style: {
          width: 600,
        },
      };

      x = x + 400;


      nodes.push(newNode)
      nodes.push({ id: 'e' + nodeInfo.id + '-' + nodeId, source: String(nodeInfo.id), target: String(nodeId), animated: true })
    });


    this.setState({
      elements: [...this.state.elements, ...nodes]
    })

  }

  createDecisorNodeCallback = (data, nodeInfo) => {
    this.createDecisorNode(data, nodeInfo)
  }


  render() {
    console.log(this.state.elements)
    const { classes } = this.props;
    return (
      <div className={classes.divFlow} style={{ height: 6000, width: 6000 }}>

        <ReactFlow

          elements={this.state.elements} />

      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Flow);



