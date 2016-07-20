import React, { Component } from 'react'
import ChildrenNodesList from './ChildrenNodesList'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return(
      <li onClick={ this.props.onNodeClick }>
        <input type='text' value={this.props.node.content} />
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
