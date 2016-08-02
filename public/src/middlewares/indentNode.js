// Decompose 'INDENT_NODE' action into some simple Actions

import {
  INDENT_NODE,
  removeChild,
  insertChild
} from '../actions/action'

const findNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.id == nodeId)
  }))
}

const findParentNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.children.indexOf(nodeId) > -1)
  }))
}

const findPrevSiblingById = (nodes, nodeId) => {
  let parent = findParentNodeById(nodes, nodeId)
  let prevSiblingId = parent.children[parent.children.indexOf(nodeId) - 1]
  return findNodeById(nodes, prevSiblingId)
}

export const mwIndentNode = store => next => action => {
  let nodes = store.getState().nodes.nodes
  if (action.type == INDENT_NODE) {
    let removeChildAction = removeChild(action.payload.nodeId)

    let prevSibling = findPrevSiblingById(nodes, action.payload.nodeId)
    if (!prevSibling) {
      return
    }

    let insertChildAction = insertChild(action.payload.nodeId, prevSibling.id, -1)
    next(removeChildAction)
    next(insertChildAction)
    return
  }
  next(action)
}
