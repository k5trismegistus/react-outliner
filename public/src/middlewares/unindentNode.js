// Decompose 'INDENT_NODE' action into some simple Actions

import { UNINDENT_NODE } from '../actions/compositeActions'
import { updateNode } from '../actions/nodes'
import { removeChild, insertChild } from '../actions/children'

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

    let updateAction = updateNode(action.payload.nodeId, action.payload.text)

    let nodes = store.getState().nodes.nodes
    let removeChildAction = removeChild(action.payload.nodeId)

    let currentParentNode = findParentNodeById(nodes, action.payload.nodeId)
    let newParentNode = findParentNodeById(nodes, currentParentNode.id)
    if (!newParentNode){
      return
    }
    let position = newParentNode.children.indexOf(currentParentNode.id) + 1
    let insertChildAction = insertChild(action.payload.nodeId, newParentNode.id, position)

    next(updateAction)
    next(removeChildAction)
    next(insertChildAction)
  }
  next(action)
}
