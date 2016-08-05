const test = {
  children: [
    { id: 999 , childrenIds: [0, 3, 4, 5] },
    { id: 0 , childrenIds: [1] },
    { id: 1 , childrenIds: [2] },
    { id: 2 , childrenIds: [] },
    { id: 3 , childrenIds: [] },
    { id: 4 , childrenIds: [] },
    { id: 5 , childrenIds: [6, 7] },
    { id: 6 , childrenIds: [] },
    { id: 7 , childrenIds: [] },
  ]
}

const swapInArray = (array, sourceIdx, targetIdx) => {
  let copiedArray = array.concat()
  copiedArray[sourceIdx] = array[targetIdx]
  copiedArray[targetIdx] = array[sourceIdx]
  return copiedArray
}

const child = (state, action) => {
  switch (action.type) {
    case 'INSERT_CHILD': {
      if (state.id !==  !action.payload.parentNodeId) {
        return state
      }
      let newChildren = state.children.concat()
      let position =　(
        (action.payload.position > 0)
        ? action.payload.position
        : newChildren.length + action.payload.position + 1)
      newChildren.splice(position, 0, action.payload.nodeId)
      return Object.assign({}, state, { children: newChildren })
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

    default: {
      return state
    }
  }
}

const children = (state=test, action) => {
  switch (action.type) {
    case 'INSERT_CHILD': {
      return Object.assign({}, state, { children: state.children.map(c =>
        node(c, action)
      )})
    }

    case 'REMOVE_CHILD': {
      return Object.assign({}, state, { children:
        [...(state.children).map(c => {
          const pos = c.indexOf(action.payload.nodeId)
          if (pos == -1) {
            return c.concat().splice(pos, 1)
          }
          return c
        })]
      })
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

    default: {
      return state
    }
  }
}

export default children
