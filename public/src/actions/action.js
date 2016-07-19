export const ADD_NODE = 'ADD_NODE'
export const EDIT_NODE = 'EDIT_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const INDENT_NODE = 'INDENT_NODE'
export const UNINDENT_NODE = 'UNINDENT_NODE'
export const MOVE_NODE = 'MOVE_NODE'
export const COLLAPSE_NODE = 'COLLAPSE_NODE'
export const UNCOLLAPSE_NODE = 'UNCOLLAPSE_NODE'

export const addNode = (text, deriveFrom) => {
  return {
    type: ADD_NODE,
    text,
    deriveFrom
  }
}

export const editNode = (text, nodeId) => {
  return {
    type: EDIT_NODE,
    text
  }
}

export deleteNode = (nodeId) => {
  return {
    type: DELETE_NODE,
    nodeId
  }
}

export indentNode = (nodeId) => {
  return {
    type: INDENT_NODE,
    nodeId
  }
}

export unindentNode = (nodeId) => {
  return {
    type: UNINDENT_NODE,
    nodeId
  }
}

export moveNode = (nodeId, newParentId, newPrevId) => {
  return {
    type: MOVE_NODE,
    nodeId
    parentId,
    prevId
  }
}

export collapseNode = (nodeId) => {
  return {
    type: COLLAPSE_NODE,
    nodeId
  }
}

export uncollapseNode = (nodeId) => {
  return {
    type: UNCOLLAPSE_NODE,
    nodeId
  }
}
