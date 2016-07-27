import React, { Component } from 'react'
import $ from 'jquery'
import ChildrenNodesList from './ChildrenNodesList'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  _onKeyDown(e) {
    // Add new node
    if (!e.shiftKey && e.keyCode == '13') {
      e.preventDefault()
      this.props.addNode(this.props.node.id, 'hello')
      return
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

  render() {
    return(
      <li onClick={ this.props.onNodeClick }>
        <div
          className="node"
          contentEditable
          onClick={ this._onClick.bind(this) }
          onBlur={ this.props.onNodeBlur }
          onKeyDown={ this._onKeyDown.bind(this) } >
          { this.props.node.content }
        </div>
        {
          (() => {
            if ((this.props.node.children.length > 0) && this.props.node.collapsed) {
              return <ChildrenNodesList nodes={ this.props.nodes } children={ this.props.node.children } />
            }
          })()
        }
      </li>
      // {
      //     return <ChildrenNodesList nodes={this.props.ndoes} children={this.props.node.children} />
      // }
    )
  }
}
