import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { IoIosSettings } from 'react-icons/io'
import { Collapse, Divider } from '@material-ui/core'
import { InputField, SaveButton } from 'common-components'
import { store } from 'contexts/EditOptionGroupContext'

const CancelBtn = styled(SaveButton)`
  background-color: #eeeeee;
  strong {
    color: #444851;
  }
`
const DelBtn = styled(SaveButton)`
  background: #ff504d;
  text-transform: none;
`

interface Props {
	saveFn: Function
	delFn: Function
}

const Header: React.FC<Props> = ({ saveFn, delFn }) => {
	const { state } = useContext(store)
	const [open, setOpen] = useState(false)
	const [groupName, setGroupName] = useState(state.group.name)
	const [dis, setDis] = useState(true)

	const handleChange = (e: any) => {
		setGroupName(e.target.value)
		if (e.target.value === state.group.name || !e.target.value) {
			setDis(true)
		} else {
			setDis(false)
		}
	}

	const handleCancel = () => {
		setOpen(false)
		setDis(true)
		setGroupName(state.group.name)
	}

	return (
		<>
			<div className='header-cont'>
				<span className='header-name'>{state.group.name}</span>
				<span
					className='header-icon'
					onClick={() => {
						setOpen(!open)
						setGroupName(state.group.name)
					}}
				>
					<IoIosSettings className='cog-icon' />
					{open ? 'Close' : state.group.name}
				</span>
			</div>
			<Collapse in={open}>
				<Divider />
				<div className='header-action-cont'>
					<InputField
						value={groupName}
						onChange={handleChange}
						label="Group name"
						style={{ maxWidth: 460, minWidth: 120 }}
						fullWidth
					/>
					<SaveButton disabled={dis} onClick={() => saveFn(groupName)}>
						SAVE
          </SaveButton>
					<SaveButton className='del-btn' onClick={delFn}>Delete</SaveButton>
					<SaveButton className='cancel-btn' onClick={handleCancel} style={{ marginLeft: 'auto' }}>
						Cancel
          </SaveButton>
				</div>
			</Collapse>
		</>
	)
}

export default Header
