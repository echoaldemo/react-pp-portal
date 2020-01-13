import React, { useEffect, useContext } from 'react'
import { InputField } from '../../utils/const-var'
import { SaveButton } from 'common-components'
import { store } from 'contexts/EditOptionGroupContext'
import { patch } from 'utils/api'
import styled from 'styled-components'

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
const EditOption = () => {
	const { state, dispatch } = useContext(store)

	useEffect(() => {
		dispatch({ type: 'EDIT', payload: { edit: { ...state.edit, editData: state.current } } })
	}, [])

	const handleEdit = () => {
		//console.log('EDIT', state.edit.editData)
		if (state.current.value === state.edit.editData.value) {
			delete state.edit.editData.value;
		}
		dispatch({
			type: 'EDIT', payload: {
				edit: { ...state.edit, load: true, edit: false }
			}
		})
		patch(
			`/pitch/global/gui/field-option-group/${state.group.uuid}/options/${state.edit.editData.uuid}/`,
			{
				...state.edit.editData
			}
		)
			.then((res: any) => {
				dispatch({
					type: 'GROUP', payload: {
						group: {
							...state.group,
							options: state.group.options.map((op: any) =>
								op.uuid === state.editData.uuid ? res.data : op
							)
						}
					}
				})
				dispatch({
					type: 'EDIT', payload: {
						edit: { ...state.edit, load: false, edit: false }
					}
				})
			})
			.catch((err: any) => {
				try {
					if (err.response.data) {
						dispatch({
							type: 'EDIT', payload: {
								edit: { ...state.edit, snackErr: err.response.data.value[0] }
							}
						})
					}
				} catch {
					console.log(err);
				}
			});
	};

	const handleChange = (e: any) => {
		if (e.target.value) {
			dispatch({
				type: 'EDIT', payload: {
					edit: {
						...state.edit,
						editData: { ...state.edit.editData, [e.target.id]: e.target.value },
						error: { ...state.edit.error, [e.target.id]: '' }
					}
				}
			})
		} else {
			dispatch({
				type: 'EDIT', payload: {
					edit: {
						...state.edit,
						editData: { ...state.edit.editData, [e.target.id]: e.target.value },
						error: { ...state.edit.error, [e.target.id]: `${[e.target.id]} is required` }
					}
				}
			})
		}
	}

	return (
		<Cont>
			<InputField
				value={state.edit.editData.description ? state.edit.editData.description : ''}
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
				value={state.edit.editData.value ? state.edit.editData.value : ''}
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
				onClick={handleEdit}
				disabled={state.edit.error.description || state.edit.error.value ? true : false}
			>
				save option
      </SaveButton>
		</Cont>
	)
}

export default EditOption
