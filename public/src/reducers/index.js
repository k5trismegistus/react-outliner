import { combineReducers } from 'redux'
import nodes from './nodes'
import children from './children'

const rootReducer = combineReducers({
  nodes,
  children
})

export default rootReducer
