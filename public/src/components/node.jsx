import React, { Component } from 'react'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return(
      <li>{ this.props.data.content }</li>
    )
  }
}
