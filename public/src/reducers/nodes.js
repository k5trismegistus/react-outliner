import uuid from 'uuid'

const test = {
  rootNodeId: 999,
  nodes: [
    { id: 999, content: "ルートノード", collapsed:true },
    { id: 0, content: "ノード0", collapsed: true },
    { id: 1, content: "ノード1", collapsed: true },
    { id: 2, content: "ノード2", collapsed: true },
    { id: 3, content: "ノード3", collapsed: true },
    { id: 4, content: "ノード4", collapsed: true },
    { id: 5, content: "ノード5", collapsed: true },
    { id: 6, content: "ノード6", collapsed: true },
    { id: 7, content: "ノード7", collapsed: true }
  ]
}

const node = (state, action) => {
  switch (action.type) {

    case 'COLLAPSE_NODE': {
      if (state.id !== action.payload.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: true})
    }

    case 'UNCOLLAPSE_NODE': {
      if (state.id !== action.payload.nodeId) {
        return state
      }
      return Object.assign({}, state, {collapsed: false})
    }
  }
}

const nodes = (state=test, action) => {
  switch (action.type) {

    case 'ADD_NODE': {
      return Object.assign({}, state, {
        nodes: [...state.nodes, action.payload.newNode]
      })
    }

    case 'UPDATE_NODE': {
      return Object.assign({}, state, { nodes:
        [
          ...(state.nodes.map(n => {
            if (n.id == action.payload.nodeId) {
              return Object.assign({}, n, { content: action.payload.text })
            }
            return n
          }))
        ]
      })
    }

    case 'REMOVE_NODE': {
      return Object.assign({}, state, { nodes:
        [
          ...(state.nodes.filter(n => {
            return (n.id != action.payload.nodeId)
          }))
        ]
      })
    }

    case 'COLLAPSE_NODE': {
      return Object.assign({}, state, {　nodes: state.nodes.map( n =>
        node(n, action)
      )})
    }

    case 'UNCOLLAPSE_NODE': {
      return Object.assign({}, state, {　nodes: state.nodes.map( n =>
        node(n, action)
      )})
    }

    default:
      return state
  }
}

export default nodes
