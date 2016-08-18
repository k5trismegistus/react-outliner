import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import NodeContainer from '../containers/nodeContainer'

class RootOutline extends Component {

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

export default DragDropContext(HTML5Backend)(RootOutline)
