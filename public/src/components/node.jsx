import React, { Component } from 'react'
import ChildrenNodesListContainer from '../containers/childrenNodesListContainer'

export default class Node extends Component {

  constructor(props) {
    super(props)
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
    return(
      <li onClick={ this.props.onNodeClick }>
        <div
          ref='editableField'
          className="node"
          contentEditable
          onClick={ this._onClick.bind(this) }
          onBlur={ this.props.onNodeBlur }
          onKeyDown={ this._onKeyDown.bind(this) } >
          { this.props.node.content }
        </div>
        <ChildrenNodesListContainer
          key={ this.props.node.id }
          show={ this.props.node.collapsed }
          parentNodeId={ this.props.node.id } />
      </li>
    )
  }
}
