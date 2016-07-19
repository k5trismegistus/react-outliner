import React, { Component } from 'react'

export default class Node extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.data)
    return(
      <li>{ this.props.data.content }</li>
    )
  }
}
