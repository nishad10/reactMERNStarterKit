import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/signin')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  })
  Authentication.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps)(Authentication)
}
