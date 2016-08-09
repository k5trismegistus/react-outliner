// Decompose 'INDENT_NODE' action into some simple Actions

import { INDENT_NODE } from '../actions/compositeActions'
import { updateNode } from '../actions/nodes'
import { unregisterRelation, insertRelation } from '../actions/relations'

const findRelationById = (relations, nodeId) => {
  return (relations.find(r => {
    return (r.id === nodeId)
  }))
}

const findParentRelationById = (relations, nodeId) => {
  return (relations.find(r => {
    return (r.childrenIds.indexOf(nodeId) > -1)
  }))
}

const findPrevSiblingRelationById = (relations, nodeId) => {
  let parent = findParentRelationById(relations, nodeId)
  let prevSiblingId = parent.childrenIds[parent.childrenIds.indexOf(nodeId) - 1]
  return findRelationById(relations, prevSiblingId)
}

export const mwIndentNode = store => next => action => {
  if (action.type == INDENT_NODE) {

    const updateAction = updateNode(action.payload.nodeId, action.payload.text)

    const relations = store.getState().relations.relations
    const unregisterRelationAction = unregisterRelation(action.payload.nodeId)

    const prevSiblingRelation = findPrevSiblingRelationById(relations, action.payload.nodeId)
    if (!prevSiblingRelation) {
      return
    }

    const insertRelationAction = insertRelation(action.payload.nodeId, prevSiblingRelation.id, -1)
    next(updateAction)
    next(unregisterRelationAction)
    next(insertRelationAction)
    return
  }
  next(action)
}
