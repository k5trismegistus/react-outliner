const test = {
  relations: [
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

const relation = (state, action) => {
  switch (action.type) {
    case 'INSERT_RELATION': {
      if (state.id !==  !action.payload.parentNodeId) {
        return state
      }
      let newChildrenIds = state.childrenIds.concat()
      let position =　(
        (action.payload.position > 0)
        ? action.payload.position
        : newChildrenIds.length + action.payload.position + 1)
      newChildrenIds.splice(position, 0, action.payload.nodeId)
      return Object.assign({}, state, { childrenIds: newChildrenIds })
    }

    case 'MOVE_UP': {
      let target = state.childrenIds.indexOf(action.payload.nodeId)
      if (target > 0){
        return Object.assign({}, state, {
          relations: swapInArray(state.childrenIds, target, target-1)
        })
      }
      return state
    }

    case 'MOVE_DOWN': {
      let target = state.childrenIds.indexOf(action.payload.nodeId)
      if ((target > -1) && (target < state.childrenIds.length-1) ){
        return Object.assign({}, state, {
          relations: swapInArray(state.childrenIds, target, target+1)
        })
      }
      return state
    }

    default: {
      return state
    }
  }
}

const relations = (state=test, action) => {
  switch (action.type) {

    case 'ADD_RELATION': {
      return Object.assign({}, state, {
        relations: [...state.relations.relatons, action.payload.newRelation]
      })
    }

    case 'INSERT_RELATION': {
      return Object.assign({}, state, { relations: state.relations.map(c =>
        node(c, action)
      )})
    }

    case 'REMOVE_RELATION': {
      return Object.assign({}, state, {
        relations: [...(state.relations).map(c => {
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
      return Object.assign({}, state, { relations: state.nodes.map( n =>
          node(n, action)
        )
      })
    }

    default: {
      return state
    }
  }
}

export default relations
