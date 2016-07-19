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
            if (this.props.data.rootNodes.indexOf(node.id) > -1) {
                return <Node key={node.id} node={node} nodes={this.props.data.nodes} />
            }
          }
        ) }
      </ul>
    )
  }

}
