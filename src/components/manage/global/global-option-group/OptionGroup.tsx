import React, { useEffect, useContext, useState } from 'react'
import { Paper, Divider } from '@material-ui/core'
import { IoIosGlobe } from 'react-icons/io'
import { Add } from '@material-ui/icons'
import { HeaderLink, HeaderButton, SearchBar, TableNoResult, TableLoader, SaveButton, Pagination, SuccessModal, LoadingModal } from 'common-components'
import { store, StateProvider } from 'contexts/OptionGroupContext'
import SEO from 'utils/seo'
import { get, remove, post, cancel } from 'utils/api' //eslint-disable-line
import { menu, uuidv4 } from './utils/const-var'
import './style/style.scss'
import GroupTable from './components/GroupTable'
import NewOptionGroup from './components/NewOptionGroup'

const OptionGroup = ({ history }: any) => {
	const [loading, setLoading] = useState(true)
	const { state, dispatch } = useContext(store)

	useEffect(() => {
		fetchData()
	}, []) // eslint-disable-line

	const fetchData = () => {
		setLoading(true)
		// get('/pitch/global/gui/field-option-group/')
		// 	.then((res: any) => {
		// 		dispatch({ type: 'GROUP_LIST', payload: { groupList: res.data } })
		// 		dispatch({ type: 'PAGINATE', payload: { paginateList: res.data } })
		// 		setLoading(false)
		// 	})
		//mock
		setTimeout(() => {
			dispatch({ type: 'GROUP_LIST', payload: { groupList: state.mockData } })
			dispatch({ type: 'PAGINATE', payload: { paginateList: state.mockData } })
			setLoading(false)
		}, 1000)
	}

	const handleDelete = (uuid: string) => {
		dispatch({
			type: 'GROUP_STATE', payload: {
				groupState: { ...state.groupState, load2: true }
			}
		})
		// remove(`/pitch/global/gui/field-option-group/${uuid}/`).then(() => {
		// 	dispatch({
		// 		type: 'GROUP_STATE', payload: {
		// 			groupState: { ...state.groupState, load2: false, delete: false, done2: true }
		// 		}
		// 	})
		// })
		//mock
		setTimeout(() => {
			dispatch({
				type: 'MOCK', payload: {
					mockData: state.mockData.filter((mock: any) => mock.uuid !== uuid)
				}
			})
			dispatch({
				type: 'GROUP_STATE', payload: {
					groupState: { ...state.groupState, load2: false, delete: false, done2: true }
				}
			})
		}, 1000)
	}

	const paginate = (from: number, to: number) => {
		dispatch({ type: 'GROUP_LIST', payload: { groupList: state.paginateList.slice(from, to) } })
	}

	const handleClose = () => {
		dispatch({
			type: 'GROUP_STATE', payload: {
				groupState: { ...state.groupState, create: false, done: false, name: '' }
			}
		})
	}

	const handleCreate = () => {
		dispatch({
			type: 'GROUP_STATE', payload: {
				groupState: { ...state.groupState, load: true }
			}
		})
		// post('/pitch/global/gui/field-option-group/', {
		// 	name: state.groupState.name
		// }).then(() => {
		// 	fetchData()
		// 	dispatch({
		// 		type: 'GROUP_STATE', payload: {
		// 			groupState: { ...state.groupState, load: false, done: true }
		// 		}
		// 	})
		// })
		//mock
		const mock = [...state.mockData, {
			uuid: uuidv4(),
			slug: 'test-slug',
			name: state.groupState.name,
			company: 'company 5',
			options: []
		}]
		setLoading(true)
		setTimeout(() => {
			dispatch({ type: 'MOCK', payload: { mockData: mock } })
			dispatch({ type: 'GROUP_LIST', payload: { groupList: mock } })
			dispatch({ type: 'PAGINATE', payload: { paginateList: mock } })
			setLoading(false)
		}, 1000)
		setTimeout(() => {
			dispatch({
				type: 'GROUP_STATE', payload: {
					groupState: { ...state.groupState, load: false, done: true }
				}
			})
		}, 2000)
	}

	return (
		<>
			<SEO title="Manage Option Group" />
			<div className='option-header-container'>
				<HeaderLink
					menu={menu}
					title="Option Group"
				/>
				{state.groupList.length !== 0 ? (
					<HeaderButton
						openFunction={() => dispatch({ type: 'GROUP_STATE', payload: { groupState: { ...state.groupState, create: true } } })}
						buttonText="New Option Group"
					/>
				) : null}
			</div>
			<Paper>
				{!loading && state.groupList.length === 0 ?
					<TableNoResult
						icon={<IoIosGlobe className='option-globe' />}
						headerText="Global option groups"
						mainMessage="No global option groups have been created"
						subMessage="Would you like to creat one? Just hit the “New option group” button."
						renderButton={
							<SaveButton onClick={() => dispatch({ type: 'GROUP_STATE', payload: { groupState: { ...state.groupState, create: true } } })}>
								<Add />
								New option group
						</SaveButton>
						}
					/> :
					<>
						<SearchBar
							title="Option Group"
							userData={state.groupList}
							headers={['name', 'slug', 'uuid']}
							loading={loading}
							link={true}
							pathnameData={{
								firstLink: `/manage/global-option-group/edit/`,
								fetchData: ['uuid'],
								lastLink: ``
							}}
						/>
						{loading ? (
							<TableLoader />
						) : (
								<>
									<GroupTable
										handleDelete={handleDelete}
										history={history}
										fetchData={fetchData}
									/>
									<Divider />
									{Boolean(state.paginateList.length) && (
										<Pagination
											paginateFn={paginate}
											totalItems={state.paginateList.length}
											itemsPerPage={6}
										/>
									)}
								</>
							)}
					</>
				}
			</Paper>
			<NewOptionGroup
				closeCreate={handleClose}
				createFn={handleCreate}
			/>
			<LoadingModal
				open={state.groupState.load}
				text={'One moment. We’re adding the group…'}
				cancelFn={() => {
					cancel()
					dispatch({
						type: 'GROUP_STATE', payload: {
							groupState: { ...state.groupState, load: false }
						}
					})
				}}
			/>
			<SuccessModal
				open={state.groupState.done}
				text={`You have created ${state.groupState.name}`}
				closeFn={handleClose}
				btnText={'ADD NEW GROUP'}
				btnFn={() =>
					dispatch({
						type: 'GROUP_STATE', payload: {
							groupState: { ...state.groupState, create: true, done: false, name: '' }
						}
					})
				}
			/>
		</>
	)
}

const GlobalOptionGroup = ({ history }: any) => {
	return (
		<StateProvider>
			<OptionGroup history={history} />
		</StateProvider>
	)
}

export default GlobalOptionGroup