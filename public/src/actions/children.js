export const INSERT_CHILD = 'INSERT_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const MOVE_UP = 'MOVE_UP'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_NODE = 'MOVE_NODE'

// @params nodeId: Child node ID
// @params parentNodeId: Parent node ID
// @params position: New child node should be inserted at
export const insertChild = (nodeId, parentNodeId, position) => {
  return {
    type: INSERT_CHILD,
    payload: {
      nodeId,
      parentNodeId,
      position
    }
  }
}

// @params nodeId: Child node ID should be removed from parent's 'children'
export const removeChild = (nodeId) => {
  return {
    type: REMOVE_CHILD,
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
