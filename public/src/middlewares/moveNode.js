import { MOVE_NODE } from '../actions/compositeActions'
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

export const mwMoveNode = store => next => action => {
  if (action.type !== MOVE_NODE) {
    next(action)
    return
  }
  const nodeId = action.payload.nodeId
  const targetId = action.payload.targetId
  if (nodeId === targetId) { return }

  const relations = store.getState().relations.relations
  const targetRelations = findRelationById(relations, targetId)

  const unregisterRelationAction = unregisterRelation(nodeId)

  if (targetRelations.childrenIds.length > 0) {
    const insertRelationAction = insertRelation(nodeId, targetId, 0)
    next(unregisterRelationAction)
    next(insertRelationAction)
    return
  } else {
    const parentRelation = findParentRelationById(relations, targetId)
    const insertRelationAction = insertRelation(nodeId, parentRelation.id, parentRelation.childrenIds.indexOf(targetId)+1)
    next(unregisterRelationAction)
    next(insertRelationAction)
    return
  }
}
