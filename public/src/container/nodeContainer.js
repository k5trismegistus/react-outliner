import { connect } from 'react-redux'
import Node from '../components/Node'

const mapStateToProps = (state, ownProps) => {
  return {
    node: ownProps.node,
    nodes: state.nodes.nodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNodeClick: (e) => {
    },
    onNodeBlur: (e) => {
    },
    onNodeKeyDown: (e) => {
      if (e.keyCode == '38') {
        let selection = window.getSelection()
        console.log(selection)
        let range = selection.getRangeAt(0)
        console.log(range)
        console.log(e.target.selectionStart)
      }
    }
  }
}

const NodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)

export default NodeContainer
