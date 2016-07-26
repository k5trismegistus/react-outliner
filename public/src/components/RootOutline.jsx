import React, { Component } from 'react'
import NodeContainer from '../container/nodeContainer'

export default class RootOutline extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {
          this.props.rootNodes.map(nodeId => {
            let node = this.props.nodes.find((n) => {
              return(n.id == nodeId)
            })
            return <NodeContainer key={node.id} node={node} />
          })
        }
      </ul>
    )
  }

}
