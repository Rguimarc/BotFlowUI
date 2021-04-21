import React, { Component } from 'react'
import '../index.css'
import ReactFlow from 'react-flow-renderer';
import Builder from './builder';


class Flow extends Component {

  constructor(props) {
    super(props);
    this.nodeInfo = { x: 250, y: 250, id: 1 }
    this.state = {
      elements: [
        {
          id: '1',
          data: { label: <Builder nodeInfo={this.nodeInfo} createDecisorNodeCallback={this.createDecisorNodeCallback} /> },
          position: { x: 250, y: 250 },
          style: {
            width: 700,
          },
        }
      ]
    }

    this.addNode1 = this.addNode1.bind(this);
    this.addNode2 = this.addNode2.bind(this);
  };

  createDecisorNode(nodeInfo) {
    console.log("no create do flow")
    console.log(nodeInfo)
    let nodes = []

    let newNodeinfo1 = {
      x: nodeInfo.x - 200, y: nodeInfo.y + 200, id: String(nodeInfo.id + 1)
    }
    let node1 = {
      id: String(nodeInfo.id + 1),
      data: { label: <Builder nodeInfo={newNodeinfo1} createDecisorNodeCallback={this.createDecisorNodeCallback} /> },
      position: { x: nodeInfo.x - 200, y: nodeInfo.y + 200 },
      style: {
        width: 600,
      },
    };

    let newNodeinfo2 = {
      x: nodeInfo.x - 200, y: nodeInfo.y + 200, id: String(nodeInfo.id + 2)
    }

    let node2 = {
      id: String(nodeInfo.id + 2),
      data: { label: <Builder nodeInfo={newNodeinfo2} createDecisorNodeCallback={this.createDecisorNodeCallback} /> },
      position: { x: nodeInfo.x + 200, y: nodeInfo.y + 200 },
      style: {
        width: 600,
      },
    };

    nodes.push(node1)
    nodes.push(node2)

    console.log("CRIADO!")
    nodes.push({ id: 'e' + nodeInfo.id + '-' + node1.id, source: String(nodeInfo.id), target: String(node1.id), animated: true })
    nodes.push({ id: 'e' + nodeInfo.id + '-' + node2.id, source: String(nodeInfo.id), target: String(node2.id), animated: true })



    console.log(nodes)
    this.setState({
      elements: [...this.state.elements, ...nodes]
    })

  }

  createDecisorNodeCallback = (nodeInfo) => {
    this.createDecisorNode(nodeInfo)
  }

  addNode1() {
    let newelement = {
      id: '4',
      type: 'output', // output node
      data: { label: 'Output Node1' },
      position: { x: 350, y: 350 },
    };

    this.setState({
      elements: [...this.state.elements, newelement]
    })
  }

  addNode2() {
    let newelement2 = {
      id: '5',
      type: 'output', // output node
      data: { label: 'Output Node2' },
      position: { x: 550, y: 550 },
    };
    this.setState({
      elements: [...this.state.elements, newelement2]
    })
  }

  render() {
    console.log(this.state.elements)
    return (
      <div className="App" style={{ height: 6000,width: 6000 }}>
        <button onClick={this.addNode1}>addNode1</button>
        <button onClick={this.addNode2}>addNode2</button>
        <ReactFlow elements={this.state.elements} />

      </div>
    )
  }
}

export default Flow;


