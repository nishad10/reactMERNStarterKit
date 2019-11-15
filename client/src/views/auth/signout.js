import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signUserOut } from '../../actions'
import { Header, Container } from 'semantic-ui-react'
class Signout extends Component {
  componentDidMount() {
    this.props.signUserOut()
  }
  render() {
    return (
      <Container text textAlign="center">
        <Header inverted>Hope to see you soon!</Header>
      </Container>
    )
  }
}
const mapDispatchToProps = { signUserOut }

export default connect(
  null,
  mapDispatchToProps
)(Signout)
