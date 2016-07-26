import React, { Component } from 'react'
import NodeContainer from '../container/nodeContainer'

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
                return <NodeContainer key={node.id} node={node} />
            }
          }
        ) }
      </ul>
    )
  }

}
