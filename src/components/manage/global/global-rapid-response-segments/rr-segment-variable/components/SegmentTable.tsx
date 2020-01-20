import React, { useState, useEffect } from 'react'
import { AsyncTable, UnderlineCell } from 'common-components'
import TableRow from '@material-ui/core/TableRow'
import { FileCopyOutlined as Icon } from '@material-ui/icons'
import SwapIcon from '@material-ui/icons/SwapHoriz'

import DeleteIcon from '@material-ui/icons/Delete'

import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Typography, Menu, MenuItem } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
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
	const [activeData, setActiveData] = React.useState(null)

	const handleClick = (event: any, data: any) => {
		setAnchorEl(event.currentTarget)
		setActiveData(data)
	}

	useEffect(() => {
		console.log(userData)
	}, [])

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
						render={(variables: any, { row, cell, uuid, icon }: any) => {
							return variables.map((variable: any, index: number) => (
								<TableRow className={row} key={index} id="demo-body">
									<UnderlineCell className={cell}>
										{variable.name}
									</UnderlineCell>
									<TableCell className={cell} style={{ color: '#777777' }}>
										{/* {Object.values(variable)[0]} */}
									</TableCell>

									<TableCell
										className={cell}
										style={{
											color: '#777777',
											height: '100%'
										}}
									>
										{variable.values}
									</TableCell>
									<TableCell className={uuid} >
										<p>{variable.key}</p>

										<CopyToClipboard
											text={variable.key}
											onCopy={() => setCopy(true)}
											onPointerLeave={() => setCopy(false)}
										>
											{copy ? (
												<LightTooltip
													title="Variable Usage Copied!"
													placement="top"
												>
													<Icon
														className={icon}
														rotate={360}
													/>
												</LightTooltip>
											) : (
													<LightTooltip
														title="Copy Variable Usage"
														placement="top"
													>
														<Icon
															className={icon}
															rotate={360}
														/>
													</LightTooltip>
												)}
										</CopyToClipboard>
									</TableCell>
									<TableCell
										className={cell}
										style={{ color: '#777777' }}
									></TableCell>
									<TableCell className={cell}></TableCell>
									<TableCell className={cell}>
										<SettingsIcon
											onClick={e => handleClick(e, variable)}
											style={{
												color: '#777777',
												display: 'flex',
												margin: 5,
												alignItems: 'center',
												cursor: 'pointer',
												marginLeft: 'auto'
											}}
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
								paddingTop: 0,
								paddingBottom: 0
							}}
						>
							<SwapIcon />{' '}
							<Typography style={{ marginLeft: 40 }}>Change Values</Typography>
						</MenuItem>
						<MenuItem
							onClick={openDelete1}
							style={{
								color: '#777777',
								width: 250,
								paddingTop: 0,
								paddingBottom: 0
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
