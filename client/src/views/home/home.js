import React, { useState, useEffect } from 'react'
import { Grid, Divider, Header, Container } from 'semantic-ui-react'
import HomepageHeader from '../../components/homepageHeader'

const Home = props => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowSizeChange)
  }, [])
  const mobile = width < 600

  return (
    <div>
      <Grid>
        <Grid.Row>
          <HomepageHeader mobile={mobile} />
        </Grid.Row>
        <Divider inverted style={{ margin: '6em 7em' }} />
        <Grid.Row centered />
      </Grid>
    </div>
  )
}
export default Home
