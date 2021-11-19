import React, { Component } from 'react'
import '../index.css'
import ReactFlow from 'react-flow-renderer';
import DialogNode from './dialogNode';
import { withStyles } from '@material-ui/core/styles';
import { NODE_TYPE } from './enums/dialogNodeEnum';
const uuid = require('uuid');

const styles = theme => ({
  divFlow: {
    "& .react-flow__handle.connectable": {
      opacity: 0
    }
  }

});


class DialogTree extends Component {

  constructor(props) {
    super(props);
    const nodeInfo = {
      cords: { x: 250, y: 250 },
      type: NODE_TYPE.START,
      id: uuid.v4()
    }


    this.state = {
      elements: [
        {
          id: nodeInfo.id,
          data: {
            label: <DialogNode
              createNodeCallback={(data, nodeInfo) => this.createNodeCallback(data, nodeInfo)}
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

  createNode(initChildBlock, parentNode) {
    
    console.log("createNode")

    console.log("PARENT NODE", parentNode);
    console.log("INIT ",initChildBlock)
    let nodes = []
    let x = -200;

    const childNode = {
      cords: { x: Number(parentNode.cords.x + x), y: Number(parentNode.cords.y + 200) },
      type: NODE_TYPE.INTERMEDIARY,
      id: uuid.v4()
    }


    console.log("CHILD NODE", childNode);

    let newNode = {
      id: String(childNode.id),
      data: {
        label: <DialogNode
          blockInit={initChildBlock}
          parentNode={childNode}
          createNodeCallback={this.createNodeCallback} />
      },
      type: NODE_TYPE.INTERMEDIARY,
      position: { x: childNode.cords.x, y: childNode.cords.y },
      style: {
        width: 600,
      },
    };

    x = x + 400;


    nodes.push(newNode)
    nodes.push({ id: 'edge' + parentNode.id, source: String(parentNode.id), target: childNode.id, animated: true })


    this.setState({
      elements: [...this.state.elements, ...nodes]
    })

  }

  createNodeCallback = (data, nodeInfo, source) => {
    this.createNode(data, nodeInfo, source)
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

export default withStyles(styles, { withTheme: true })(DialogTree);



