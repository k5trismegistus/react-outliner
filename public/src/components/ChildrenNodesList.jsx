import React, { Component } from 'react'
import Node from './Node'

export default class ChildrenNodesList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        { this.props.nodes.map(
          (node, idx) => {
            if (this.props.children.indexOf(node.id) > -1) {
                return <Node key={node.id} node={node} nodes={this.props.nodes} />
            }
          }
        ) }
      </ul>
    )
  }

}
