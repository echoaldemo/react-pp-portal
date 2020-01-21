import React, { useState } from 'react'
import { AsyncTable, ActiveCell, UnderlineCell } from 'common-components'
import TableRow from '@material-ui/core/TableRow'
import { FileCopyOutlined as Icon } from '@material-ui/icons'
import { mdiContentCopy } from '@mdi/js'
import CodeIcon from '@material-ui/icons/Code'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/Visibility'

import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Menu, MenuItem } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'
// import DeleteSegment from "./DeleteSegment";

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11
	}
}))(Tooltip)

interface Props {
	userData: any
	headers: Array<string>
	innerLoading: boolean
	handleClickOpen: Function
	openDelete: Function
}

function SegmentTable({
	userData,
	headers,
	innerLoading,
	handleClickOpen,
	openDelete
}: Props) {
	//
	const [copy, setCopy] = useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [activeData, setActiveData] = React.useState<any>('')

	const handleClick = (event: any, data: any) => {
		setAnchorEl(event.currentTarget)
		setActiveData(data)
	}

	const openDelete1 = () => {
		openDelete(activeData)
		setAnchorEl(null)
	}

	const handClose = () => {
		setAnchorEl(null)
	}
	const handleClose = () => {
		setAnchorEl(null)
		handleClickOpen(activeData)
	}
	return (
		<React.Fragment>
			{innerLoading === true ? (
				<div style={{ height: '100%' }}>
					<div style={{ textAlign: 'center', padding: '10px 0' }}>
						<CircularProgress />
					</div>
				</div>
			) : null}
			{
				<>
					<AsyncTable
						headers={headers}
						tableData={userData}
						render={(segments: any, { row, cell, uuid, icon }: any) => {
							return segments.map((segment: any) => (
								<TableRow className={row} key={segment.uuid} id="demo-body">
									<UnderlineCell className={cell}>{segment.name}</UnderlineCell>
									<TableCell className={cell} style={{ color: '#777777' }}>
										{segment.slug}
									</TableCell>

									<TableCell
										className={cell}
										style={{
											color: '#777777',
											height: '100%'
										}}
									>
										{segment.type}
									</TableCell>
									<TableCell className={uuid}>
										<p>{segment.uuid}</p>

										<CopyToClipboard
											text={segment.uuid}
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
									<ActiveCell className={cell} style={{ color: '#777777' }}>
										{segment.active}
									</ActiveCell>

									<TableCell className={cell} align="right">
										<SettingsIcon
											onClick={e => handleClick(e, segment)}
											style={{ cursor: 'pointer' }}
										/>
									</TableCell>
								</TableRow>
							))
						}}
					/>
					<Menu
						onClose={handClose}
						style={{ marginTop: 40 }}
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
					>
						<MenuItem
							onClick={handleClose}
							style={{
								color: '#777777',
								width: 250,
								padding: 15
							}}
						>
							<CodeIcon />{' '}
							<Typography style={{ marginLeft: 40 }}>XML</Typography>
						</MenuItem>
						<Link
							key={activeData.length !== 0 ? activeData.uuid : '1'}
							style={{
								textDecoration: 'none',
								color: '#000'
							}}
							to={{
								pathname: `/manage/edit-segment-variables/company/global-rapid-response/segment/${
									activeData.length !== 0 ? activeData.uuid : '1'
									}`,
								state: {
									company: activeData.length !== 0 ? activeData : '1'
								}
							}}
						>
							<MenuItem
								style={{
									color: '#777777',
									width: 250,
									padding: 15
								}}
							>
								<ViewIcon />
								<Typography style={{ marginLeft: 40 }}>View</Typography>
							</MenuItem>
						</Link>
						<MenuItem
							onClick={openDelete1}
							style={{
								color: '#777777',
								width: 250,
								padding: 15
							}}
						>
							<DeleteIcon />{' '}
							<Typography style={{ marginLeft: 40 }}>Delete</Typography>
						</MenuItem>
					</Menu>
				</>
			}
		</React.Fragment>
	)
}
export default SegmentTable
