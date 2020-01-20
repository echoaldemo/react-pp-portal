import React, { useState } from 'react'
import { AsyncTable } from 'common-components'
import {
	TableRow,
	TableCell,
	Divider,
	FormControlLabel,
	Checkbox
} from '@material-ui/core'
import {
	FileCopyOutlined as Icon,
	Settings,
	KeyboardArrowDown
} from '@material-ui/icons'
import { mdiContentCopy } from '@mdi/js'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { Menu, MenuItem } from '@material-ui/core'

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11
	}
}))(Tooltip)

const Img = styled.img`
  border-radius: 50%;
  height: 35px;
`
const Span = styled.span`
  display: flex;
  align-items: center;
`

interface Props {
	history: any
	agents: Array<object>
	activeData: any
	OpenMonitorFunc: Function
}

const AgentTable = ({ history, agents, activeData, OpenMonitorFunc }: Props) => {
	const [copy, setCopy] = useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)
	const [dataActive, setDataActive] = React.useState<any>({})

	const handleClick = (event: any, data: any) => {
		setAnchorEl(event.currentTarget)
		setDataActive(data)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleViewAgent = () => {
		history.push({
			pathname: `/dashboard/agent-dashboard/rep`,
			state: {
				data: dataActive
			}
		})
	}
	return (
		<>
			<AsyncTable
				headers={[
					'Avatar',
					'Name',
					'Email',
					<Span>
						Status
            <KeyboardArrowDown />
					</Span>,
					'Date & Time',
					<Span>
						Campaign
            <KeyboardArrowDown />
					</Span>,
					''
				]}
				tableData={agents}
				render={(agents: Array<object>, { row, cell, icon }: any) =>
					agents.map((agent: any, i: number) => (
						<TableRow className={row} key={i}>
							<TableCell className={cell}>
								<Img src={agent.avatar} alt="avatar" />
							</TableCell>
							<TableCell className={cell}>{agent.name}</TableCell>
							<TableCell className={cell}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									{agent.email}
									<CopyToClipboard
										text={agent.email}
										onCopy={() => setCopy(true)}
										onPointerLeave={() => setCopy(false)}
									>
										{copy ? (
											<LightTooltip title="Email Copied!" placement="top">
												<Icon
													className={icon}
													style={{ marginLeft: 4 }}
													rotate={360}
												/>
											</LightTooltip>
										) : (
												<LightTooltip title="Copy Email" placement="top">
													<Icon
														className={icon}
														style={{ marginLeft: 4 }}
														rotate={360}
													/>
												</LightTooltip>
											)}
									</CopyToClipboard>
								</div>
							</TableCell>
							<TableCell className={cell}>{agent.status}</TableCell>
							<TableCell className={cell}>{agent.date}</TableCell>
							<TableCell className={cell}>{agent.campaign}</TableCell>
							<TableCell className={cell} align="right">
								<Settings
									style={{ cursor: 'pointer' }}
									onClick={e => handleClick(e, agent)}
								/>
							</TableCell>
						</TableRow>
					))
				}
			/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleClose}
				style={{ marginTop: 45 }}
			>
				<MenuItem onClick={handleViewAgent}>View agent details</MenuItem>
				{dataActive.name === activeData.name ? (
					<MenuItem
						onClick={() => {
							handleClose()
							OpenMonitorFunc('')
						}}
						disabled={
							activeData.status === 'On Call'
								? dataActive.name === activeData.name
									? false
									: true
								: activeData.length === 0
									? false
									: dataActive.name === activeData.name
										? false
										: true
						}
					>
						Stop Monitoring
          </MenuItem>
				) : (
						<MenuItem
							onClick={() => {
								handleClose()
								OpenMonitorFunc(dataActive)
							}}
							disabled={
								activeData.length !== 0
									? true
									: dataActive.status === 'On Call'
										? false
										: true
							}
						>
							Monitoring
          </MenuItem>
					)}

				<MenuItem onClick={handleClose}>Send Rapid Response</MenuItem>
				<Divider />
				<MenuItem>
					<FormControlLabel
						disabled
						control={<Checkbox value="checkedD" />}
						label={
							<span style={{ fontSize: '14px' }}>
								Record all calls this session
              </span>
						}
					/>
				</MenuItem>
			</Menu>
		</>
	)
}

export default AgentTable
