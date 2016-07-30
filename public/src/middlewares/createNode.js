// Decompose 'createNode' action into some simple Actions

export const mwCreateNode = store => next => action => {
  if (action.type == 'CREATE_NODE') {

  }
  next(action)
}
