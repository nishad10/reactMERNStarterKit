import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Menu,
  Icon,
  Responsive,
  Container,
  Visibility
} from 'semantic-ui-react'
class DesktopContainer extends Component {
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
    this.hideFixedMenu = this.hideFixedMenu.bind(this)
    this.showFixedMenu = this.showFixedMenu.bind(this)
  }
  UNSAFE_componentWillMount() {
    axios.get(`/user/profile`).then(r => {
      this.setState({ profile: r.data })
    })
  }
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }
  renderSignButton(activeItem, profile) {
    if (this.props.authenticated) {
      return profile.admin ? (
        <Menu.Menu position="right" inverted icon="labeled">
          <Menu.Item as={Link} to="/signout" name="signout">
            <Icon name="sign-out" />
            SignOut
          </Menu.Item>

          <Menu.Item as={Link} to="/" name="admin">
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
  hideFixedMenu() {
    this.setState({ fixed: false })
  }
  showFixedMenu() {
    this.setState({ fixed: true })
  }
  getWidth() {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
  }
  render() {
    const { children } = this.props
    const { fixed, activeItem, profile } = this.state
    return (
      <Responsive
        getWidth={this.getWidth}
        minWidth={Responsive.onlyTablet.minWidth}
      >
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted
            style={{
              background: fixed ? '#1b1c1d' : 'black',
              color: 'white',
              minHeight: '3.5em',
              paddingTop: '1em'
            }}
            pointing
            secondary
            //tabular={fixed}
            size="large"
          >
            <Container>
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
              {this.renderSignButton(activeItem, profile)}
            </Container>
          </Menu>
        </Visibility>
        {children}
      </Responsive>
    )
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
})

export default connect(mapStateToProps, actions)(DesktopContainer)
