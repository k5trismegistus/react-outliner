import { connect } from 'react-redux'
import RootOutline from '../components/RootOutline'

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    rootNodes: state.nodes.rootNodes,
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
