import React, { useContext } from 'react'
import styled from 'styled-components'
import { Divider } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { store } from 'contexts/EditOptionGroupContext'

const Container = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 22px;
  font-size: 18px;
`
const AddText = styled.span`
  color: #1194f6;
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const NewOptionHeader = () => {
	const { state, dispatch } = useContext(store)
	return (
		<>
			<Divider />
			<Container>
				Options
        <AddText onClick={() => dispatch({
					type: 'EDIT',
					payload: { edit: { ...state.edit, open: true } }
				})}>
					<Add />
					Add new option
        </AddText>
			</Container>
		</>
	)
}

export default NewOptionHeader
