import React, { Component } from 'react'
import RootOutline from './RootOutline'

var test = {
  rootNodes: [0, 3, 4, 5],
  nodes: [
    { id: 0, content: "ノード0", children: [1], collapsed: true },
    { id: 1, content: "ノード1", children: [2], collapsed: true },
    { id: 2, content: "ノード2", children: [], collapsed: true },
    { id: 3, content: "ノード3", children: [], collapsed: true },
    { id: 4, content: "ノード4", children: [], collapsed: true },
    { id: 5, content: "ノード5", children: [6, 7], collapsed: true },
    { id: 6, content: "ノード6", children: [], collapsed: true },
    { id: 7, content: "ノード7", children: [], collapsed: true }
  ]
}

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <RootOutline data={ test } />
    )
  }

}
