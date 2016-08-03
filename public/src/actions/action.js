export const CREATE_NODE = 'CREATE_NODE'
export const ADD_NODE = 'ADD_NODE'
export const UPDATE_NODE = 'UPDATE_NODE'
export const INSERT_CHILD = 'INSERT_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const DELETE_NODE = 'DELETE_NODE'
export const INDENT_NODE = 'INDENT_NODE'
export const UNINDENT_NODE = 'UNINDENT_NODE'
export const MOVE_NODE = 'MOVE_NODE'
export const MOVE_UP = 'MOVE_UP'
export const MOVE_DOWN = 'MOVE_DOWN'
export const COLLAPSE_NODE = 'COLLAPSE_NODE'
export const UNCOLLAPSE_NODE = 'UNCOLLAPSE_NODE'

// This action is decomposed in Middleware.
// Never reach to reducers
// @params nodeId: ID of new node
// @params text: Text of new Node
export const createNode = (nodeId, startOffset, endOffset) => {
  return {
    type: CREATE_NODE,
    payload: {
      nodeId,
      startOffset,
      endOffset
    }
  }
}

// Only add node to nodes list.
// Only with this action, node will not be shown.
// @params newNode: New node as JS object
export const addNode = (newNode) => {
  return {
    type: ADD_NODE,
    payload: {
      newNode
    }
  }
}

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

// @params nodeId: Node ID to be updated
// @params text: Updated text content
export const updateNode = (nodeId, text) => {
  return {
    type: UPDATE_NODE,
    payload: {
      nodeId,
      text
    }
  }
}

// @params nodeId: Node ID to be deleted
// @params text: Remaining text to be appended to prev node
export const deleteNode = (nodeId, text) => {
  return {
    type: DELETE_NODE,
    payload: {
      nodeId,
      text
    }
  }
}

// @params nodeId: Node ID to be indented
// @params text: Current text of node
export const indentNode = (nodeId, text) => {
  return {
    type: INDENT_NODE,
    payload: {
      nodeId,
      text
    }
  }
}

// @params nodeId: Node ID to be unindented
// @params text: Current text of node
export const unindentNode = (nodeId, text) => {
  return {
    type: UNINDENT_NODE,
    payload: {
      nodeId,
      text
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

// This action should be decomposed in middleware.
// @params nodeId: Node ID to be moved
// @params newParentId: New Parent node ID
// @params newPrevId: New sibling node ID in previous position
export const moveNode = (nodeId, newParentId, newPrevId) => {
  return {
    type: MOVE_NODE,
    payload: {
      nodeId,
      parentId,
      prevId
    }
  }
}

export const collapseNode = (nodeId) => {
  return {
    type: COLLAPSE_NODE,
    payload: {
      nodeId
    }
  }
}

export const uncollapseNode = (nodeId) => {
  return {
    type: UNCOLLAPSE_NODE,
    payload: {
      nodeId
    }
  }
}
