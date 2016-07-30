import React, { Component } from 'react'
import NodeContainer from '../containers/nodeContainer'

export default class RootOutline extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {
          (() => {
            let root = this.props.nodes.find(n => {
              return(n.id == this.props.rootNodeId)
            })
            return (root.children.map(nodeId => {
                let node = this.props.nodes.find((n) => {
                  return(n.id == nodeId)
                })
                return <NodeContainer key={node.id} node={node} />
              })
            )
          })()
        }
      </ul>
    )
  }

}
