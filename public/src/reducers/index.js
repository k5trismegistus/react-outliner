import { combineReducers } from 'redux'
import nodes from './nodes'
import relations from './relations'

const rootReducer = combineReducers({
  nodes,
  relations
})

export default rootReducer
