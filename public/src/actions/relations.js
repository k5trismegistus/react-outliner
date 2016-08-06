export const ADD_RELATION = 'ADD_RELATION'
export const INSERT_RELATION = 'INSERT_RELATION'
export const REMOVE_RELATION = 'REMOVE_RELATION'
export const MOVE_UP = 'MOVE_UP'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_NODE = 'MOVE_NODE'

// @params newRelation: Object
export const addRelation = (newRelation) => {
  return {
    type: ADD_RELATION,
    payload: {
      newRelation
    }
  }
}

// @params nodeId: Relation node ID
// @params parentNodeId: Parent node ID
// @params position: New relation node should be inserted at
export const insertRelation = (nodeId, parentNodeId, position) => {
  return {
    type: INSERT_RELATION,
    payload: {
      nodeId,
      parentNodeId,
      position
    }
  }
}

// @params nodeId: Relation node ID should be removed from parent's 'relations'
export const removeRelation = (nodeId) => {
  return {
    type: REMOVE_RELATION,
    payload: {
      nodeId
    }
  }
}

export const moveUp = (nodeId) => {
  return {
    type: MOVE_UP,
    payload: {
      nodeId
    }
  }
}

export const moveDown = (nodeId) => {
  return {
    type: MOVE_DOWN,
    payload: {
      nodeId
    }
  }
}
