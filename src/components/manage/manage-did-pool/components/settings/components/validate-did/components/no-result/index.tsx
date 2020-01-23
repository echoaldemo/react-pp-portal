import React from 'react'
import { Typography } from '@material-ui/core'
import { Error } from '@material-ui/icons'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import styled from 'styled-components'

const Head = styled.div`
  height: 120px;
  border-radius: 3px;
  background-color: #7c8a97;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeadText = styled(Typography)`
  font-size: 34px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
`

const SubText = styled(Typography)`
  font-size: 18px !important;
  font-weight: 500 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #7c8a97;
  margin: 36px 0 22px 0 !important;
`

const Tag = styled(Typography)`
  width: 280px;
  height: 38px;
  font-size: 16px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #777777;
`

const Body = styled.div`
  height: 380px;
  border-radius: 3px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const theme = createMuiTheme({})

const useStyles = makeStyles({
	container: {
		width: 'inherit',
		height: '500px'
	}
})

const NoResult = () => {
	let classes = useStyles()
	return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.container}>
				<Head>
					<HeadText>ID's validation</HeadText>
				</Head>

				<Body>
					<Error
						style={{
							fontSize: '30px',
							color: '#ff504d'
						}}
					/>

					<SubText>
						<strong>The validation cannot be fetch right now</strong>
					</SubText>

					<Tag>Refresh the browser window and please try again.</Tag>
				</Body>
			</div>
		</MuiThemeProvider>
	)
}

export default NoResult
