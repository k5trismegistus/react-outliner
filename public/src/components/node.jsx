import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import ChildrenNodesListContainer from '../containers/childrenNodesListContainer'

const nodeSource = {
  beginDrag: (props, monitor, component) => {
    return { id: props.node.id}
  },
  endDrag: (props, monitor, component) => {
    if (!monitor.didDrop()) {
      return
    }

    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    props.moveNode(props.node.id, dropResult.id)
    return { id: props.id }
  }
}
const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

const nodeTarget = {
  drop: (props, monitor, component) => {
    const hasDroppedOnChild = monitor.didDrop()
    if (hasDroppedOnChild) {
      return
    }
    return { id: props.node.id }
  }
}
const collectTarget = (connect) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Node extends Component {

  constructor(props) {
    super(props)
  }

  _onBlur(e) {
    this.props.updateNode(this.props.node.id, this.refs.editableField.textContent)
  }

  _onKeyDown(e) {
    // Indent node
    if (!e.shiftKey && e.keyCode == '9') {
      e.preventDefault()
      this.props.indentNode(this.props.node.id, this.refs.editableField.textContent)
    }
    // Unindent node
    else if (e.shiftKey && e.keyCode == '9') {
      e.preventDefault()
      this.props.unindentNode(this.props.node.id, this.refs.editableField.textContent)
    }
    // Add new node
    else if (!e.shiftKey && e.keyCode == '13') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      console.log(range)
      e.preventDefault()
      this.props.createNode(this.props.node.id, range.startOffset, range.endOffset)
      return
    }
    // Delete node
    else if (e.keyCode == '8') {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)
      if (range.startOffset == 0 && range.endOffset == 0) {
        e.preventDefault
        this.props.deleteNode(this.props.node.id, this.refs.editableField.textContent)
      }
    }
    // Move to Upper Node
    else if ((!e.ctrlKey && !e.metaKey) && e.keyCode == '38') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      if (range.startOffset == 0) {
        let nodes = [].slice.call(document.getElementsByClassName('node'))
        let currentIdx = nodes.indexOf(e.target)
        nodes[currentIdx - 1].focus()
      }
      return
    }
    // Move to Upper Node
    else if ((!e.ctrlKey && !e.metaKey) && e.keyCode == '40') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      if (range.endOffset == e.target.textContent.length) {
        let nodes = [].slice.call(document.getElementsByClassName('node'))
        let currentIdx = nodes.indexOf(e.target)
        nodes[currentIdx + 1].focus()
      }
      return
    }
    // Uncollapse Children Nodes
    else if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && !e.shiftKey && e.keyCode == '38') {
      e.preventDefault()
      this.props.uncollapse(this.props.node.id)
      return
    }
    // Collapse Children Nodes
    else if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && !e.shiftKey && e.keyCode == '40') {
      e.preventDefault()
      this.props.collapse(this.props.node.id)
      return
    }
    // Move Up Current Node
    else if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.shiftKey && e.keyCode == '38') {
      e.preventDefault()
      this.props.moveUp(this.props.node.id)
      return
    }
    // Move Down Current Node
    else if (((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) && e.shiftKey && e.keyCode == '40') {
      e.preventDefault()
      this.props.moveDown(this.props.node.id)
      return
    }
  }

  _onClick(e) {
  }

  componentDidMount() {
    this.refs.editableField.focus()
  }

  render() {
    const { connectDragSource, connectDragPreview, isDragging } = this.props
    return this.props.connectDragPreview(this.props.connectDropTarget(
      <li onClick={ this.props.onNodeClick }>
        { this.props.connectDragSource(
          <div>@</div>
        ) }
        <div
          ref='editableField'
          className="node"
          contentEditable
          onClick={ this._onClick.bind(this) }
          onBlur={ this._onBlur.bind(this) }
          onKeyDown={ this._onKeyDown.bind(this) } >
          { this.props.node.content }
        </div>
        <ChildrenNodesListContainer
          key={ this.props.node.id }
          show={ this.props.node.collapsed }
          parentNodeId={ this.props.node.id } />
      </li>
    ))
  }
}

export default DragSource('Node', nodeSource, collectSource)(
  DropTarget('Node', nodeTarget, collectTarget)(Node)
)
