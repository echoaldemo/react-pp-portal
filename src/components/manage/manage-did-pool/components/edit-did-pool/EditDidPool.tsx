import React, { useEffect, useState } from 'react'
import { BackButton, StatusLabel } from 'common-components'
import { mockDid, InputField } from '../../utils/const-var'
import './style.scss'
import { Paper, Grid } from '@material-ui/core'

interface Props {
	match: any
}

const EditDidPool: React.FC<Props> = ({ match }) => {
	const [didPool, setDidPool] = useState(mockDid)

	useEffect(() => {
		setDidPool(mockDid)
	}, [])

	return (
		<div>
			<BackButton text='Back to DID pool' to='/manage/did-pool' />
			<div className='name-container'>
				<p>{didPool.name}</p>
				<StatusLabel status={didPool.active} />
			</div>
			<Paper className='did-paper-container'>
				<span>DID pool settings</span>
				<Grid container spacing={6}>
					<Grid item xs={12} md={6}>
						<InputField fullWidth label='Pool name' required />
					</Grid>
					<Grid item direction='row' xs={12} md={6}>
						<InputField fullWidth />
					</Grid>
				</Grid>
			</Paper>
		</div>
	)
}

export default EditDidPool