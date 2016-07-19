import React, { Component } from 'react'
import ChildrenNodesList from './ChildrenNodesList'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li>
        <div>{ this.props.node.content }</div>
        {
          (() => {
            if (this.props.node.children.length > -1) {
              return <ChildrenNodesList nodes={this.props.nodes} children={this.props.node.children} />
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
