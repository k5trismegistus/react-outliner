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

const swapInArray = (array, sourceIdx, targetIdx) => {
  let copiedArray = array.concat()
  copiedArray[sourceIdx] = array[targetIdx]
  copiedArray[targetIdx] = array[sourceIdx]
  console.log(copiedArray)
  return copiedArray
}

const isParent = (childrenList, childNodeId) => {
  return (childrenList.indexOf(childNodeId) > -1)
}

const node = (state, action) => {
  switch (action.type) {
    case 'COLLAPSE_NODE': {
      if (state.id !== action.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: true})
    }
    case 'UNCOLLAPSE_NODE': {
      if (state.id !== action.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: false})
    }
    case 'MOVE_UP': {
      let target = state.children.indexOf(action.nodeId)
      if (target > 0){
        return Object.assign({}, state, {
          children: swapInArray(state.children, target, target-1)
        })
      }
      return state
    }
    case 'MOVE_DOWN': {
      let target = state.children.indexOf(action.nodeId)
      if ((target > -1) && (target < state.children.length-1) ){
        return Object.assign({}, state, {
          children: swapInArray(state.children, target, target+1)
        })
      }
      return state
    }
  }
}

const nodes = (state=test, action) => {
  switch (action.type) {
    case 'ADD_NODE': {
      return state
    }
    case 'EDIT_NODE': {
      return state
    }
    case 'DELETE_NODE': {
      return state
    }
    case 'INDENT_NODE': {
      return state
    }
    case 'UNINDENT_NODE': {
      return state
    }
    case 'MOVE_NODE':{
      return state
    }
    case 'MOVE_UP': {
      let target = state.rootNodes.indexOf(action.nodeId)
      if (target > 0) {
        let target = state.rootNodes.indexOf(action.nodeId)
        return Object.assign({}, state, {
          rootNodes: swapInArray(state.rootNodes, target, target-1)})
      }
      return Object.assign({}, state, {nodes: state.nodes.map( n =>
          node(n, action)
        )
      })
    }
    case 'MOVE_DOWN': {
      let target = state.rootNodes.indexOf(action.nodeId)
      if (target > -1 && (target < state.rootNodes.length-1)) {
        let target = state.rootNodes.indexOf(action.nodeId)
        return Object.assign({}, state, {
          rootNodes: swapInArray(state.rootNodes, target, target+1)})
      }
      return Object.assign({}, state, {nodes: state.nodes.map( n =>
          node(n, action)
        )
      })
    }
    case 'COLLAPSE_NODE': {
        return Object.assign({}, state, {nodes: state.nodes.map( n =>
          node(n, action)
        )
      })
    }
    case 'UNCOLLAPSE_NODE': {
        return Object.assign({}, state, {nodes: state.nodes.map( n =>
          node(n, action)
        )
      })
    }
    default:
      return state
  }
}

export default nodes
