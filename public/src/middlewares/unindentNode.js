// Decompose 'INDENT_NODE' action into some simple Actions

import { UNINDENT_NODE } from '../actions/compositeActions'
import { updateNode } from '../actions/nodes'
import { unregisterRelation, insertRelation } from '../actions/relations'

const findNodeById = (nodes, nodeId) => {
  return (nodes.find(n => {
    return (n.id == nodeId)
  }))
}

const findParentRelationById = (relations, nodeId) => {
  return (relations.find(r => {
    return (r.childrenIds.indexOf(nodeId) > -1)
  }))
}

export const mwUnindentNode = store => next => action => {
  if (action.type == UNINDENT_NODE) {

    const updateAction = updateNode(action.payload.nodeId, action.payload.text)

    const relations = store.getState().relations.relations
    const unregisterRelationAction = unregisterRelation(action.payload.nodeId)

    const currentParentRelation = findParentRelationById(relations, action.payload.nodeId)
    const newParentRelation = findParentRelationById(relations, currentParentRelation.id)
    if (!newParentRelation){
      return
    }
    const position = newParentRelation.childrenIds.indexOf(currentParentRelation.id) + 1
    const insertRelationAction = insertRelation(action.payload.nodeId, newParentRelation.id, position)

    next(updateAction)
    next(unregisterRelationAction)
    next(insertRelationAction)
  }
  next(action)
}
