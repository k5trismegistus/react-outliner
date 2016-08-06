import { connect } from 'react-redux'
import RootOutline from '../components/RootOutline'

const findNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.id == nodeId)
  }))
}

const topNodes = (state) => {
  const rootNodeId = state.nodes.rootNodeId
  const rootChildrenIds = state.relations.relations.find(c =>
    (c.id === rootNodeId)
  ).childrenIds
  return rootChildrenIds.map(rcid =>
    (findNodeById(state.nodes.nodes, rcid))
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    rootNodeId: state.nodes.rootNodeId,
    topLevelNodes: topNodes(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootOutline)

export default App
