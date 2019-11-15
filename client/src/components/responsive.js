import React from 'react'
import DesktopContainer from './desktop'
import MobileContainer from './mobile'

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)
export default ResponsiveContainer
