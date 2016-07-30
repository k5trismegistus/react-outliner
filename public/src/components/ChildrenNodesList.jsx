import React, { Component } from 'react'
import NodeContainer from '../containers/nodeContainer'

export default class ChildrenNodesList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {
          this.props.children.map(childId => {
            let node = this.props.nodes.find((n) => {
              return(n.id == childId)
            })
            return <NodeContainer key={node.id} node={node} />
          })
        }
      </ul>
    )
  }
}
