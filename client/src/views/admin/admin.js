import React from 'react'
import { Container, Divider, Header, Tab, Segment } from 'semantic-ui-react'
const Admin = props => {
  return (
    <Container>
      <Divider hidden />
      <Header as="h1" dividing inverted>
        Admin accessible page with restricted access.
      </Header>
    </Container>
  )
}

export default Admin
