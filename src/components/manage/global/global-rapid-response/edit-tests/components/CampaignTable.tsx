import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import { FileCopyOutlined as Icon } from '@material-ui/icons'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { AsyncTable, EditButton, ActiveCell } from 'common-components'

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
}

function CampaignTable({ userData, headers, innerLoading }: Props) {
	//
	const [copy, setCopy] = useState(false)

	return (
		<React.Fragment>
			{innerLoading === true ? (
				<div style={{ height: '100%' }}>
					<div style={{ textAlign: 'center', padding: '200px 0' }}>
						<CircularProgress />
					</div>
				</div>
			) : null}
			{userData.length !== 0 ? (
				<AsyncTable
					headers={headers}
					tableData={userData}
					render={(campaigns: any, { row, cell, uuid, icon }: any) => {
						return campaigns.map((campaign: any) => (
							<TableRow className={row} key={campaign.uuid} id="demo-body">
								<TableCell
									className={cell}
									style={{
										width: '20%'
									}}
								>
									<Link
										to={`/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`}
										style={{ color: '#777777' }}
										onClick={() => {
											localStorage.setItem(`companyslug`, campaign.slug)
											localStorage.setItem(`campaignuuid`, campaign.uuid)
										}}
									>
										{campaign.name}
									</Link>
								</TableCell>
								<TableCell
									className={cell}
									style={{ color: '#777777', width: '20%' }}
								>
									{campaign.slug}
								</TableCell>

								<TableCell className={uuid}>
									<p>{campaign.uuid}</p>
									<CopyToClipboard
										text={campaign.uuid}
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
									{campaign.active}
								</ActiveCell>
								<TableCell className={cell} align="right">
									<Link
										to={`/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`}
									>
										<EditButton
											text="Edit"
											onClickFunc={() => {
												localStorage.setItem(`companyslug`, campaign.slug)
												localStorage.setItem(`campaignuuid`, campaign.uuid)
											}}
											style={{
												color: '#444851',
												margin: 5
											}}
										/>
									</Link>
								</TableCell>
							</TableRow>
						))
					}}
				/>
			) : (
					<div style={{ height: '100%' }}>
						<div style={{ textAlign: 'center', padding: '200px 0' }}>
							<h1
								style={{
									color: '#7c8a97'
								}}
							>
								No results...
            </h1>
							<h4
								style={{
									color: '#7c8a97'
								}}
							>
								Try filtering other fields
            </h4>
						</div>
					</div>
				)}
		</React.Fragment>
	)
}
export default CampaignTable
