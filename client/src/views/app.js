import React, { Component } from 'react'
import ResponsiveContainer from '../components/responsive'

export default class App extends Component {
  render() {
    return (
      <div>
        <ResponsiveContainer>
          <div className="cointainer">{this.props.children}</div>
        </ResponsiveContainer>
      </div>
    )
  }
}
