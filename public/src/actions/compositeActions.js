// Actions declared in this file are not processed in Reducers
// Decomposed in Middlewares

export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const MOVE_NODE = 'MOVE_NODE'
export const INDENT_NODE = 'INDENT_NODE'
export const UNINDENT_NODE = 'UNINDENT_NODE'


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

// @params newParentId: New Parent node ID
// @params newPrevId: New sibling node ID in previous position
export const moveNode = (nodeId, targetId) => {
  return {
    type: MOVE_NODE,
    payload: {
      nodeId,
      targetId
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
