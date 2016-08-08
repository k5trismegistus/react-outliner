// Decompose 'DELETE_NODE' action into some simple Actions

import { DELETE_NODE } from '../actions/compositeActions'
import { removeNode } from '../actions/nodes'
import { removeRelation, unregisterRelation } from '../actions/relations'

export const mwDeleteNode = store => next => action => {
  if (action.type != DELETE_NODE) {
    next(action)
    return
  }

  const removeNodeAction = removeNode(action.payload.nodeId)
  const removeRelationAction = removeRelation(action.payload.nodeId)
  const unregisterRelationAction = unregisterRelation(action.payload.nodeId)

  next(removeNodeAction)
  next(removeRelationAction)
  next(unregisterRelationAction)
}
