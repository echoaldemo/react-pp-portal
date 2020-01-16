import React, { useContext, useEffect } from 'react'
import { BackButton, TableLoader, TableNoResult, SaveButton, Modal, AsyncTable } from 'common-components'
import { store, StateProvider } from 'contexts/EditOptionGroupContext'
import Header from './components/Header'
import NewOptionHeader from './components/NewOptionHeader'
import Modals from './components/Modals'
import { TableRow, TableCell, Button } from '@material-ui/core'
import { Add, Settings } from '@material-ui/icons'
import SEO from 'utils/seo'
import { get, patch } from 'utils/api'
import '../style/style.scss'

const EditComponent = ({ match, history }: any) => {
	const { state, dispatch } = useContext(store)

	useEffect(() => {
		getData()
	}, [])

	const handleSaveName = (name: any) => {
		dispatch({ type: 'LOADING', payload: { loading: true } })
		patch(`/pitch/global/gui/field-option-group/${match.params.uuid}/`, {
			name
		})
			.then(getData)
			.catch((err: any) => console.log(err));
	};

	const getData = () => {
		get(`/pitch/global/gui/field-option-group/${match.params.uuid}/`).then(
			(res: any) => {
				dispatch({ type: 'GROUP', payload: { group: res.data } })
				//change id with uuid
				dispatch({
					type: 'EDIT',
					payload: { edit: { ...state.edit, uuid: res.data.uuid } }
				})
				dispatch({ type: 'LOADING', payload: { loading: false } })
			}
		);
	};

	return (
		<>
			<SEO title="Edit Option Group" />
			<BackButton
				text="Back to Option groups"
				to="/manage/global-option-group/"
			/>
			{state.loading ? <TableLoader /> :
				<>
					<span style={{ fontSize: 24, color: '#444851' }}>{state.group.name}</span>
					<div className='edit-container'>
						<div className='edit-container-2'>
							<Header
								saveFn={handleSaveName}
								delFn={() => dispatch({
									type: 'EDIT',
									payload: { edit: { ...state.edit, delete: true } }
								})}
							/>
							{!state.group.options.length ? (
								<TableNoResult
									headerText="Options"
									mainMessage="No options have been created for this group"
									subMessage="Would you like to creat one? Just hit the “Create new option” button."
									renderButton={
										<SaveButton className='add-btn' onClick={() => dispatch({
											type: 'EDIT',
											payload: { edit: { ...state.edit, open: true } }
										})}>
											<Add />
											Create new option
									</SaveButton>
									}
								/>
							) :
								<>
									<NewOptionHeader />
									<AsyncTable
										headers={["Description", "Value", ""]}
										tableData={state.group.options}
										render={(options: any, { row, cell }: any) =>
											options.map((option: any, i: number) => (
												<TableRow className={row} key={i}>
													<TableCell
														className={cell}
														style={{ paddingRight: 100 }}
													>
														{option.description}
													</TableCell>
													<TableCell className={cell}>{option.value}</TableCell>
													<TableCell align="right" className={cell}>
														<Button style={{ color: "#777777" }}>
															<Settings
																onClick={e => {
																	dispatch({ type: 'ANCHOR_EL', payload: { anchorEl: e.currentTarget } })
																	dispatch({ type: 'CURRENT', payload: { current: option } })
																}}
															/>
														</Button>
													</TableCell>
												</TableRow>
											))
										}
									/>
								</>
							}
						</div>
					</div>
					<Modals history={history} />
				</>
			}
		</>
	)
}



const EditOptionGroup = ({ match, history }: any) => {
	return (
		<StateProvider>
			<EditComponent match={match} history={history} />
		</StateProvider>
	)
}

export default EditOptionGroup