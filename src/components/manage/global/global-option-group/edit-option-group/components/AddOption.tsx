import React, { useContext } from 'react'
import { SaveButton } from 'common-components'
import { InputField } from '../../utils/const-var'
import styled from 'styled-components'
import { store } from 'contexts/EditOptionGroupContext'

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin: 8px 0;
  }
  /* button {
    margin-top: 8px;
  } */
`
const AddOption = ({ handleAdd }: { handleAdd: Function }) => {
	const { state, dispatch } = useContext(store)
	const handleChange = (e: any) => {
		if (e.target.value) {
			dispatch({
				type: 'EDIT', payload: {
					edit: {
						...state.edit,
						[e.target.id]: e.target.value,
						error: { ...state.edit.error, [e.target.id]: '' }
					}
				}
			})
		} else {
			dispatch({
				type: 'EDIT', payload: {
					edit: {
						...state.edit,
						[e.target.id]: e.target.value,
						error: { ...state.edit.error, [e.target.id]: `${[e.target.id]} is required` }
					}
				}
			})
		}
	}

	return (
		<Cont>
			<InputField
				value={state.edit.description}
				onChange={handleChange}
				onBlur={handleChange}
				id="description"
				fullWidth
				label="Field description"
				required
				error={state.edit.error.description ? true : false}
				helperText={state.edit.error.description ? state.edit.error.description : ' '}
			/>
			<InputField
				value={state.edit.value}
				onChange={handleChange}
				onBlur={handleChange}
				id="value"
				fullWidth
				label="Field value"
				required
				error={state.edit.error.value ? true : false}
				helperText={state.edit.error.value ? state.edit.error.value : ' '}
			/>
			<SaveButton
				onClick={handleAdd}
				disabled={
					state.edit.error.description ||
						state.edit.error.value ||
						!state.edit.description ||
						!state.edit.value
						? true
						: false
				}
			>
				save option
      </SaveButton>
		</Cont>
	)
}

export default AddOption
