// Decompose 'INDENT_NODE' action into some simple Actions

import {
  UNINDENT_NODE,
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

export const mwUnindentNode = store => next => action => {
  if (action.type == UNINDENT_NODE) {
    let nodes = store.getState().nodes.nodes
    let removeChildAction = removeChild(action.payload.nodeId)

    let currentParentNode = findParentNodeById(nodes, action.payload.nodeId)
    let newParentNode = findParentNodeById(nodes, currentParentNode.id)
    if (!newParentNode){
      return
    }
    let position = newParentNode.children.indexOf(currentParentNode.id) + 1
    let insertChildAction = insertChild(action.payload.nodeId, newParentNode.id, position)

    next(removeChildAction)
    next(insertChildAction)
  }
  next(action)
}
