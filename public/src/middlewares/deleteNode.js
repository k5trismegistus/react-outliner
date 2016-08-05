// Decompose 'DELETE_NODE' action into some simple Actions

import { DELETE_NODE } from '../actions/compositeActions'
import { removeNode } from '../actions/nodes'
import { removeChild } from '../actions/children'

export const mwDeleteNode = store => next => action => {
  if (action.type != DELETE_NODE) {
    next(action)
    return
  }
  const removeChildAction = removeChild(action.payload.nodeId)
  const removeNodeAction = removeNode(action.payload.nodeId)

  next(removeChildAction)
  next(removeNodeAction)
}
