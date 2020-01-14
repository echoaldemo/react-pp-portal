import React, { useContext } from 'react'
import { Divider } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { store } from 'contexts/EditOptionGroupContext'

const NewOptionHeader = () => {
	const { state, dispatch } = useContext(store)
	return (
		<>
			<Divider />
			<div className='new-header-cont'>
				Options
        <span className='new-header-text' onClick={() => dispatch({
					type: 'EDIT',
					payload: { edit: { ...state.edit, open: true } }
				})}>
					<Add />
					Add new option
        </span>
			</div>
		</>
	)
}

export default NewOptionHeader
