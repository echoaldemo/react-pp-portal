import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import {
  Settings,
  ExitToApp,
  Search,
  KeyboardArrowDown
} from '@material-ui/icons'
import { Container, Header, Card } from './style'
import SEO from 'utils/seo'

const Gateway = () => {
  return (
    <Container>
      <SEO title="Gateway" />
      <span>
        <Tooltip title="Manage Settings" placement="right">
          <IconButton>
            <Settings />
          </IconButton>
        </Tooltip>
        <h1>Welcome to the Perfect Pitch Portal</h1>
        <Tooltip title="Logout" placement="right">
          <IconButton>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </span>
      <Header>
        <h2>Campaigns</h2>
        <span>
          <Search />
          <KeyboardArrowDown />
        </span>
      </Header>
      <Card></Card>
    </Container>
  )
}

export default Gateway
