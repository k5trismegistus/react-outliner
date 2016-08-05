// Decompose 'createNode' action into some simple Actions

import uuid from 'uuid'
import { CREATE_NODE } from '../actions/compositeActions'
import { addNode, updateNode } from '../actions/nodes'
import { insertChild } from '../actions/children'

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
    let nodes = store.getState().nodes.nodes
    let derivedFrom = findNodeById(nodes, action.payload.nodeId)

    // Update node derived from
    let updateAction = updateNode(
      action.payload.nodeId,
      derivedFrom.content.slice(0, action.payload.startOffset)
    )
    next(updateAction)

    // Add node to nodes list
    let newNodeId = uuid.v4()
    let newNode = {
      id: newNodeId,
      content: derivedFrom.content.slice(action.payload.endOffset),
      children: [],
      collapsed: true
    }
    let addNodeAction = addNode(newNode)
    next(addNodeAction)

    // Register node with parent node
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
