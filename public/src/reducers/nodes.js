const test = {
  rootNodes: [0, 3, 4, 5],
  nodes: [
    { id: 0, content: "ノード0", children: [1], collapsed: true },
    { id: 1, content: "ノード1", children: [2], collapsed: true },
    { id: 2, content: "ノード2", children: [], collapsed: true },
    { id: 3, content: "ノード3", children: [], collapsed: true },
    { id: 4, content: "ノード4", children: [], collapsed: true },
    { id: 5, content: "ノード5", children: [6, 7], collapsed: true },
    { id: 6, content: "ノード6", children: [], collapsed: true },
    { id: 7, content: "ノード7", children: [], collapsed: true }
  ]
}

const node = (state, action) => {
  switch (action.type) {
    case 'COLLAPSE_NODE':
      if (state.id !== action.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: true})
    case 'UNCOLLAPSE_NODE':
      if (state.id !== action.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: false})
  }
}

const nodes = (state=test, action) => {
  switch (action.type) {
    case 'ADD_NODE':
      // @todo
      return state
    case 'EDIT_NODE':
      // @todo
      return state
    case 'DELETE_NODE':
      // @todo
      return state
    case 'INDENT_NODE':
      // @todo
      return state
    case 'UNINDENT_NODE':
      // @todo
      return state
    case 'MOVE_NODE':
      // @todo
      return state
    case 'COLLAPSE_NODE':
      return Object.assign({}, state, {nodes: state.nodes.map( n =>
        node(n, action)
      )
    })
    case 'UNCOLLAPSE_NODE':
      return Object.assign({}, state, {nodes: state.nodes.map( n =>
        node(n, action)
      )
    })

    default:
      return state
  }
}

export default nodes
