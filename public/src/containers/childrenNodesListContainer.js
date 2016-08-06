import { connect } from 'react-redux'
import ChildrenNodesList from '../components/ChildrenNodesList'

const findNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.id == nodeId)
  }))
}

const childrenNodes = (state, parentNodeId) => {
  let childrenIds = state.relations.relations.find(c =>
    (c.id === parentNodeId)
  ).childrenIds
  return childrenIds.map(cid =>
    (findNodeById(state.nodes.nodes, cid))
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    show: ownProps.show,
    childrenNodes: childrenNodes(state, ownProps.parentNodeId)
  }
}

const ChildrenNodesListContainer = connect(
  mapStateToProps
)(ChildrenNodesList)

export default ChildrenNodesListContainer
