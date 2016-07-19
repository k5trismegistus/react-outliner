import React, { Component } from 'react'

export default class ChildrenNodesList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        { this.props.data.nodes.map(
          (node, idx) => {
            if (node.id in this.props.data.rootNodes) {
                return <Node node={node}  />
            }
          }
        ) }
      </ul>
    )
  }

}
