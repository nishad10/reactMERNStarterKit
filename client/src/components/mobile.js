import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import {
  Menu,
  Icon,
  Sidebar,
  Responsive,
  Container,
  Segment
} from 'semantic-ui-react'
import axios from 'axios'

class MobileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'home',
      mobile: false,
      sidebarOpened: false,
      profile: {}
    }
    this.handleItemClick = this.handleItemClick.bind(this)
    // this.handleStack = this.handleStack.bind(this)
    this.getWidth = this.getWidth.bind(this)
    this.handleSidebarHide = this.handleSidebarHide.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }
  UNSAFE_componentWillMount() {
    axios.get(`/user/profile`).then(r => {
      this.setState({ profile: r.data })
    })
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
    this.handleSidebarHide()
  }

  handleSidebarHide() {
    this.setState({ sidebarOpened: false })
  }

  handleToggle() {
    this.setState({ sidebarOpened: true })
  }

  getWidth() {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }

  renderSignButton(activeItem, profile) {
    if (this.props.authenticated) {
      return profile.admin ? (
        <Menu.Menu position="right" inverted icon="labeled">
          <Menu.Item as={Link} to="/signout" name="signout">
            <Icon name="sign-out" />
            SignOut
          </Menu.Item>

          <Menu.Item as={Link} to="/admin" name="admin">
            <Icon name="archive" />
            Admin
          </Menu.Item>
        </Menu.Menu>
      ) : (
        <Menu.Menu position="right" inverted icon="labeled">
          <Menu.Item as={Link} to="/signout" name="signout">
            <Icon name="sign-out" />
            SignOut
          </Menu.Item>
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position="right" inverted icon="labeled">
          <Menu.Item
            active={activeItem === 'signin'}
            onClick={this.handleItemClick}
            as={Link}
            to="/signin"
            name="signin"
          >
            <Icon name="sign-in" />
            SignIn
          </Menu.Item>
          <Menu.Item
            active={activeItem === 'signup'}
            onClick={this.handleItemClick}
            as={Link}
            to="/signup"
            name="signup"
          >
            <Icon name="signup" />
            SignUp
          </Menu.Item>
        </Menu.Menu>
      )
    }
  }

  render() {
    const { children } = this.props

    const { activeItem, sidebarOpened, profile } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={this.getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link}
            to="/"
            name="home"
          />
          <Menu.Item
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
            as={Link}
            to="/about"
            name="about"
          />
          <Menu.Item
            active={activeItem === 'account'}
            onClick={this.handleItemClick}
            as={Link}
            to="/account"
            name="account"
          />
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: '0.7em', padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                {this.renderSignButton(activeItem, profile)}
              </Menu>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, actions)(MobileContainer)
