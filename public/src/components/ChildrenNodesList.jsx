import React, { Component } from 'react'
import NodeContainer from '../containers/nodeContainer'

export default class ChildrenNodesList extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    if ((this.props.childrenNodes.length === 0) || !this.props.show) {
      return null
    }
    return (
      <ul>
        {
          this.props.childrenNodes.map(n => {
            return <NodeContainer key={ n.id } node={ n } />
          })
        }
      </ul>
    )
  }
}
