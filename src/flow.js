import React, { Component } from 'react'
import './index.css'
import ReactFlow from 'react-flow-renderer';
import DialogBuilder from './dialogBuilder';


class Flow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: [
        {
          id: '1',
          type: 'input', // input node
          data: { label: 'Input Node' },
          position: { x: 250, y: 25 },
        },
        // default node
        {
          id: '2',
          // you can also pass a React component as a label
          data: { label: <DialogBuilder /> },
          position: { x: 100, y: 125 },
          style: {
            width: 600,
          },
        },
        {
          id: '3',
          type: 'output', // output node
          data: { label: 'Output Node' },
          position: { x: 250, y: 250 },
        },

        // animated edge
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3' },
      ]
    }

    this.addNode1 = this.addNode1.bind(this);
    this.addNode2 = this.addNode2.bind(this);
  };


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
      <div className="App" style={{ height: 3000 }}>
        <button onClick={this.addNode1}>addNode1</button>
        <button onClick={this.addNode2}>addNode2</button>
        <ReactFlow elements={this.state.elements} />

      </div>
    )
  }
}

export default Flow;


