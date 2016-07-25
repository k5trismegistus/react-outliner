import React, { Component } from 'react'
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
        console.log('start of line')
      }
    }
    if (e.keyCode == '40') {
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      if (range.endOffset == e.target.textContent.length) {
        console.log('end of line')
        let ne = new KeyboardEvent("keydown",
          {bubbles : true, cancelable : true, key : "Tab", keyCode: '9', shiftKey : false}
        )
        document.dispatchEvent(ne)
      }
    }
  }

  render() {
    console.log(this.props)
    return(
      <li onClick={ this.props.onNodeClick }>
        <div contentEditable
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
