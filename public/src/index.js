import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import App from './containers/App'
import rootReducer from './reducers/index'
import { mwCreateNode } from './middlewares/createNode'
import { mwIndentNode } from './middlewares/indentNode'
import { mwUnindentNode } from './middlewares/unindentNode'
import { mwDeleteNode } from './middlewares/deleteNode'
import { mwMoveNode } from './middlewares/moveNode'

const store = applyMiddleware(
  mwCreateNode,
  mwIndentNode,
  mwUnindentNode,
  mwDeleteNode,
  mwMoveNode
)(createStore)(rootReducer, window.devToolsExtension && window.devToolsExtension());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
