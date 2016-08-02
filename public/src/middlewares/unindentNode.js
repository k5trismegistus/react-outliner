// Decompose 'INDENT_NODE' action into some simple Actions

import { UNINDENT_NODE } from '../actions/action'

export const mwUnindentNode = store => next => action => {
  if (action.type == UNINDENT_NODE) {

  }
  next(action)
}
