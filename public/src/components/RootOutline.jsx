import React, { Component } from 'react'
import Node from './Node'

export default class RootOutline extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        { this.props.data.nodes.map(
          (node, idx) => {
            if (node.id in this.props.data.rootNodes) {
                return <Node key={node.id} data={node} />
            }
          }
        ) }
      </ul>
    )
  }

}
