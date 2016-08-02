import uuid from 'uuid'

const test = {
  rootNodeId: 999,
  nodes: [
    { id: 999, content: "ルートノード", children: [0, 3, 4, 5], collapsed:true },
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
  return copiedArray
}

const node = (state, action) => {
  switch (action.type) {

    case 'COLLAPSE_NODE': {
      if (state.id !== action.payload.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: true})
    }

    case 'UNCOLLAPSE_NODE': {
      if (state.id !== action.payload.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: false})
    }

    case 'MOVE_UP': {
      let target = state.children.indexOf(action.payload.nodeId)
      if (target > 0){
        return Object.assign({}, state, {
          children: swapInArray(state.children, target, target-1)
        })
      }
      return state
    }

    case 'MOVE_DOWN': {
      let target = state.children.indexOf(action.payload.nodeId)
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
      return Object.assign({}, state, {
        nodes: [...state.nodes, action.payload.newNode]
      })
    }

    case 'INSERT_CHILD': {
      return Object.assign({}, state, {nodes:
        [
          ...(state.nodes.map(n => {
            if(n.id == action.payload.parentNodeId) {
              let newChildren = n.children.concat()
              let position =　(
                (action.payload.position > 0)
                ? action.payload.action
                : newChildren.length + action.payload.position + 1
              )
              newChildren.splice(position, 0, action.payload.nodeId)
              return Object.assign({}, n, { children: newChildren })
            }
            return n
          }))
        ]
      })
    }

    case 'REMOVE_CHILD': {
      return Object.assign({}, state, {nodes:
        [
          ...(state.nodes.map(n => {
            if (n.children.indexOf(action.payload.nodeId) > -1) {
              let newChildren = n.children.concat()
              newChildren.splice(n.children.indexOf(action.payload.nodeId), 1)
              return Object.assign({}, n, { children: newChildren })
            }
            return n
          }))
        ]
      })
    }

    case 'UPDATE_NODE': {
      console.log(action)
      return Object.assign({}, state, { nodes:
        [
          ...(state.nodes.map(n => {
            if (n.id == action.payload.nodeId) {
              return Object.assign({}, n, { content: action.payload.text })
            }
            return n
          }))
        ]
      })
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
      return Object.assign({}, state, {nodes: state.nodes.map( n =>
          node(n, action)
        )
      })
    }

    case 'MOVE_DOWN': {
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
