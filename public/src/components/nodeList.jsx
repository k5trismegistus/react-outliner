import React, { Component } from 'react'
import Node from './node'

export default class NodeList extends Component {

  constructor(props) {
    super(props);
  }



  render() {
    console.log(this.props)
    return (
      <ul>
        { this.props.data.nodes.map(
          (node, idx) => {
            if (node.id in this.props.data.rootNodes) {
                return <Node data={node} />
            }
          }
        ) }
      </ul>
    )
  }

}
