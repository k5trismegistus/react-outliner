import React, { Component } from 'react'
import $ from 'jquery'
import ChildrenNodesList from './ChildrenNodesList'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  caretPosition(e) {
    if (e.keyCode == '38') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      if (range.startOffset == 0) {
        let currentIdx = $('.node').get().indexOf(e.target)
        $('.node')[currentIdx - 1].focus()
      }
    }
    if (e.keyCode == '40') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      if (range.endOffset == e.target.textContent.length) {
        let currentIdx = $('.node').get().indexOf(e.target)
        $('.node')[currentIdx + 1].focus()
      }
    }
  }

  previousBox() {

  }

  render() {
    console.log(this.props)
    return(
      <li onClick={ this.props.onNodeClick }>
        <div
          className="node"
          contentEditable
          onBlur={ this.props.onNodeBlur }
          onKeyDown={ this.caretPosition } >
          { this.props.node.content }
        </div>
        {
          (() => {
            if (this.props.node.children.length > -1) {
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
