import React from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { Modal } from 'common-components'
import { Table } from './components'
const theme = createMuiTheme({})

const Validation = (props: any) => {
	return (
		<MuiThemeProvider theme={theme}>
			<Modal
				open={props.open}
				onClose={props.onClose}
				title="Validation results"
				width={1245}
			>
				<Table props={props} />
			</Modal>
		</MuiThemeProvider>
	)
}

export default Validation
