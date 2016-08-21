import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import NodeContainer from '../containers/nodeContainer'

const paperStyle = {
  padding: 20
}

class RootOutline extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Paper style={paperStyle} zDepth={1}>
        <ul>
          {
            this.props.topLevelNodes.map(tln => {
              return <NodeContainer key={tln.id} node={tln} />
            })
          }
        </ul>
      </Paper>
    )
  }
}

export default DragDropContext(HTML5Backend)(RootOutline)
