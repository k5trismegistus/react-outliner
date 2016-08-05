import { connect } from 'react-redux'
import Node from '../components/Node'
import { createNode, deleteNode } from '../actions/compositeActions'
import { collapseNode, uncollapseNode } from '../actions/nodes'
import { moveUp, moveDown, indentNode, unindentNode } from '../actions/children'

const mapStateToProps = (state, ownProps) => {
  return {
    node: ownProps.node
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    indentNode: (nodeId, text) => {
      dispatch(indentNode(nodeId, text))
    },
    unindentNode: (nodeId, text) => {
      dispatch(unindentNode(nodeId, text))
    },
    createNode: (nodeId, startOffset, endOffset) => {
      dispatch(createNode(nodeId, startOffset, endOffset))
    },
    deleteNode: (nodeId, text) => {
      dispatch(deleteNode(nodeId, text))
    },
    onNodeClick: (e) => {
    },
    onNodeBlur: (e) => {
    },
    collapse: (nodeId) => {
      dispatch(collapseNode(nodeId))
    },
    uncollapse: (nodeId) => {
      dispatch(uncollapseNode(nodeId))
    },
    moveUp: (nodeId) => {
      dispatch(moveUp(nodeId))
    },
    moveDown: (nodeId) => {
      dispatch(moveDown(nodeId))
    },
  }
}

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)

export default NodeContainer
