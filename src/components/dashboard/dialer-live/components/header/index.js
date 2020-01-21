import React from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { makeStyles } from '@material-ui/styles'

import HeaderContainer from '../../../../common-components/HeaderContainer/HeaderContainer'
import HeaderLink from '../../../../common-components/HeaderLink/HeaderLink'
import BackButton from '../../../../common-components/back-button'
import { PauseComponent } from '../../../components'

const theme = createMuiTheme({})

const useStyles = makeStyles({})

const Header = props => {
  let classes = useStyles()

  function renderHeaderLink() {
    return (
      <div
        style={{
          fontSize: 24,
          color: '#444851'
        }}
      >
        Live dialer status
      </div>
    )
  }

  function renderHeaderButton() {
    return (
      <PauseComponent time="10:59:32 AM" onClick={() => alert('no design')} />
    )
  }

  return (
    <MuiThemeProvider theme={theme}>
      {/* <BackButton
        text="Back to overview"
        to={`/dashboard/all/${
          props.match ? props.match.params.slug : ""
        }/overview`}
      /> */}
      <HeaderContainer>
        {renderHeaderLink()}
        {renderHeaderButton()}
      </HeaderContainer>
    </MuiThemeProvider>
  )
}

export default Header
