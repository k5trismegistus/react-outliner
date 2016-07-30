// Decompose 'createNode' action into some simple Actions

import uuid from 'uuid'
import {
  CREATE_NODE,
  addNode,
  insertChild
} from '../actions/action.js'

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

export const mwCreateNode = store => next => action => {
  if (action.type == CREATE_NODE) {
    // Add node to nodes list
    let newNodeId = uuid.v4()
    let newNode = {
      id: newNodeId,
      content: action.payload.text,
      children: [],
      collapsed: true
    }
    let addNodeAction = addNode(newNode)
    next(addNodeAction)

    // Register node with parent node
    let nodes = store.getState().nodes.nodes
    let derivedFrom = findNodeById(nodes, action.payload.nodeId)
    if (derivedFrom.children.length > 0) {
      let insertChildAction = insertChild(newNodeId, derivedFrom.id, 0)
      next(insertChildAction)
    } else {
      let parent = findParentNodeById(nodes, derivedFrom.id)
      let position = parent.children.indexOf(derivedFrom.id) + 1
      let insertChildAction = insertChild(newNodeId, parent.id, position)
      next(insertChildAction)
    }
    return
  }
  next(action)
}
