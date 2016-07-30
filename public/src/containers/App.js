import { connect } from 'react-redux'
import RootOutline from '../components/RootOutline'

const mapStateToProps = (state, ownProps) => {
  return {
    rootNodeId: state.nodes.rootNodeId,
    nodes: state.nodes.nodes
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
