// Decompose 'createNode' action into some simple Actions

import uuid from 'uuid'
import { CREATE_NODE } from '../actions/compositeActions'
import { addNode, updateNode } from '../actions/nodes'
import { addRelation, insertRelation, removeRelation } from '../actions/relations'

const findNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.id === nodeId)
  }))
}

const findRelationById = (relations, nodeId) => {
  return (relations.find(r => {
    return (r.id === nodeId)
  }))
}

const findParentsRelationById = (relations, nodeId) => {
  return (relations.find(r => {
    return (r.childrenIds.indexOf(nodeId) > -1)
  }))
}

export const mwCreateNode = store => next => action => {
  if (action.type == CREATE_NODE) {
    const nodes = store.getState().nodes.nodes
    const derivedFrom = findNodeById(nodes, action.payload.nodeId)
    const relations = store.getState().relations.relations
    const derivedFromRelations = findRelationById(relations, action.payload.nodeId)

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
      collapsed: true
    }
    let addNodeAction = addNode(newNode)
    next(addNodeAction)

    // Add relation to children
    const newRelation = {
      id: newNodeId,
      childrenIds: []
    }
    const addNewRelationAction = addRelation(newRelation)
    next(addNewRelationAction)

    // Register node with parent node
    if (derivedFromRelations.childrenIds.length > 0) {
      let insertRelationAction = insertRelation(newNodeId, derivedFrom.id, 0)
      next(insertRelationAction)
    } else {
      let parentsRelations = findParentsRelationById(relations, derivedFrom.id)
      let position = parentsRelations.childrenIds.indexOf(derivedFrom.id) + 1
      let insertRelationAction = insertRelation(newNodeId, parentsRelations.id, position)
      next(insertRelationAction)
    }
    return
  }
  next(action)
}
