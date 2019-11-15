import React from 'react'
import { Form, Header, Dimmer, Loader, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { updateUserProfile } from '../../actions/index'

const Account = props => {
  const { loading } = props
  return (
    <div>
      <Dimmer active={loading}>
        <Loader active={loading}>Loading...</Loader>
      </Dimmer>
      <Container text style={{ paddingTop: '3vw' }}>
        <Header inverted content="Account Page" />
        <Header
          inverted
          content="A place to show account info for logged in users"
        />
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.general.loading
})
const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Account)
