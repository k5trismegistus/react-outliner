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
          this.props.topLevelNodes.map(tln => {
            return <NodeContainer key={tln.id} node={tln} />
          })
        }
      </ul>
    )
  }

}
