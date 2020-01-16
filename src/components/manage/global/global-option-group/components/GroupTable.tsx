import React, { useState, useContext } from 'react'
import {
	Button,
	Menu,
	MenuItem,
	TableCell,
	TableRow,
	Tooltip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
	DeleteOutline,
	FileCopyOutlined as Icon,
	Settings
} from '@material-ui/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { cancel } from 'utils/api'
import { AsyncTable, DeleteModal, LoadingModal, SuccessModal, UnderlineCell } from 'common-components'
import { store } from 'contexts/OptionGroupContext'

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11
	}
}))(Tooltip)

interface Props {
	handleDelete: Function
	history: any
	fetchData: Function
}

const GroupTable: React.FC<Props> = ({ handleDelete, history, fetchData }) => {
	const { state, dispatch } = useContext(store)
	const [copy, setCopy] = useState(false)
	const [current, setCurrent] = useState<any>({})
	const [anchorEl, setAnchorEl] = useState(null)

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	const handleClose = () => {
		dispatch({
			type: 'GROUP_STATE', payload: {
				groupState: { ...state.groupState, delete: false, done2: false }
			}
		})
		fetchData()
	}
	const handleCancel = () => {
		cancel()
		dispatch({
			type: 'GROUP_STATE', payload: {
				groupState: { ...state.groupState, load2: false }
			}
		})
	}

	return (
		<>
			<DeleteModal
				open={state.groupState.delete}
				header="Delete option group"
				msg="group"
				name={current.name}
				closeFn={() => {
					dispatch({
						type: 'GROUP_STATE', payload: {
							groupState: { ...state.groupState, delete: false, done2: false }
						}
					})
				}}
				//change id to uuid
				delFn={() => {
					handleDelete(current.uuid)
				}}
			/>
			<LoadingModal
				open={state.groupState.load2}
				text={'One moment. We’re deleting the group…'}
				cancelFn={handleCancel}
			/>
			<SuccessModal
				open={state.groupState.done2}
				text={`You have deleted ${current.name}`}
				closeFn={handleClose}
				btnText={'ADD NEW GROUP'}
				btnFn={() =>
					dispatch({
						type: 'GROUP_STATE', payload: {
							groupState: { ...state.groupState, create: true, done2: false, name: '' }
						}
					})
				}
			/>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
			>
				<MenuItem
					className='menu-item'
					style={{ padding: 15 }}
					onClick={() => {
						handleCloseMenu()
						history.push(`/manage/global-option-group/edit/${current.uuid}`)
					}}
				>
					<Settings style={{ marginRight: 16 }} />
					Modify
        </MenuItem>
				<MenuItem
					className='menu-item'
					style={{ padding: 15 }}
					onClick={() => {
						dispatch({
							type: 'GROUP_STATE', payload: {
								groupState: { ...state.groupState, delete: true }
							}
						})
						handleCloseMenu()
					}}
				>
					<DeleteOutline style={{ marginRight: 16 }} />
					Delete
        </MenuItem>
			</Menu>
			<AsyncTable
				headers={['Name', 'Slug', 'UUID', '']}
				tableData={state.groupList}
				render={(groups: any, { row, cell, uuid, icon }: any) =>
					groups.map((group: any) => (
						<TableRow className={row} key={group.uuid}>
							<UnderlineCell
								className={cell}
								style={{ paddingRight: 50 }}
								onClick={() =>
									history.push(`/manage/global-option-group/edit/${group.uuid}`)
									//change id to uuid
								}
							>
								{group.name}
							</UnderlineCell>
							<TableCell style={{ paddingRight: 50 }} className={cell}>
								{group.slug}
							</TableCell>
							<TableCell
								className={uuid}
								onClick={e => e.stopPropagation()}
								style={{ paddingRight: 50 }}
							>
								<p>{group.uuid}</p>
								<CopyToClipboard
									text={group.uuid}
									onCopy={() => setCopy(true)}
									onPointerLeave={() => setCopy(false)}
								>
									{copy ? (
										<LightTooltip title="UUID Copied!" placement="top">
											<Icon
												className={icon}
												rotate={360}
											/>
										</LightTooltip>
									) : (
											<LightTooltip title="Copy UUID" placement="top">
												<Icon
													className={icon}
													rotate={360}
												/>
											</LightTooltip>
										)}
								</CopyToClipboard>
							</TableCell>
							<TableCell
								align="right"
								className={cell}
								onClick={e => e.stopPropagation()}
							>
								<Button style={{ color: '#777777' }}>
									<Settings
										onClick={(e: any) => {
											setAnchorEl(e.currentTarget)
											setCurrent(group)
										}}
									/>
								</Button>
							</TableCell>
						</TableRow>
					))
				}
			/>
		</>
	)
}

export default GroupTable
