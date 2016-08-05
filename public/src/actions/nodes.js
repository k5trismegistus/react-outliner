export const ADD_NODE = 'ADD_NODE'
export const UPDATE_NODE = 'UPDATE_NODE'
export const REMOVE_NODE = 'REMOVE_NODE'
export const COLLAPSE_NODE = 'COLLAPSE_NODE'
export const UNCOLLAPSE_NODE = 'UNCOLLAPSE_NODE'


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

export const removeNode = (nodeId) => {
  return {
    type: REMOVE_NODE,
    payload: {
      nodeId
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
