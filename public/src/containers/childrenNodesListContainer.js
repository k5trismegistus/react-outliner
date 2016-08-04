import { connect } from 'react-redux'
import ChildrenNodesList from '../components/ChildrenNodesList'

const mapStateToProps = (state, ownProps) => {
    state.nodes.nodes.filter(n => {
      return (ownProps.children.indexOf(n.id) > -1)
    })

  return {
    nodes: state.nodes.nodes.filter(n => {
      return (ownProps.children.indexOf(n.id) > -1)
    }),
    children: ownProps.children
  }
}

const ChildrenNodesListContainer = connect(
  mapStateToProps
)(ChildrenNodesList)

export default ChildrenNodesListContainer
