import React, { useState } from 'react';
import {
	TableNoResult,
	SaveButton,
	TableLoader,
	AsyncTable,
	UnderlineCell,
	ActiveCell,
	EditButton
} from 'common-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { LightTooltip } from '../globalConstsVar';
import { mdiContentCopy } from '@mdi/js';

import { Add, FileCopyOutlined as Icon } from '@material-ui/icons';
import { TableCell, TableRow } from '@material-ui/core';

export default function CampaignTable({ data, loading, history, setOpenCreateModal }) {
	return (
		<div>
			{!data.length > 0 && !loading ? (
				renderNoData(setOpenCreateModal)
			) : loading ? (
				<TableLoader />
			) : (
				DataTable(data, history)
			)}
		</div>
	);
}

function renderNoData(setOpenCreateModal) {
	return (
		<TableNoResult
			headerText="Campagaigns"
			mainMessage="No campaigns have been created"
			subMessage="Would you like to create one? Just hit the “New Campaign button."
			renderButton={
				<SaveButton
					onClick={() => {
						setOpenCreateModal(true);
					}}
				>
					{' '}
					<Add /> New Campaign
				</SaveButton>
			}
		/>
	);
}

function DataTable(data, history) {
	const [ copy, setCopy ] = useState(false);
	return (
		<AsyncTable
			headers={[ 'Name', 'Slug', 'UUID', 'Status', '' ]}
			tableData={data}
			render={(data, { row, cell, icon, uuid }) =>
				data.map((campaign) => (
					<TableRow key={campaign.uuid} className={row}>
						<UnderlineCell
							className={cell}
							onClick={() => history.push(`/manage/campaign/edit/${campaign.uuid}`)}
						>
							{campaign.name}
						</UnderlineCell>
						<TableCell className={cell}>{campaign.slug}</TableCell>
						<TableCell className={uuid}>
							<span>{campaign.uuid}</span>
							&nbsp;
							<CopyToClipboard
								text={campaign.uuid}
								onCopy={() => setCopy(true)}
								onPointerLeave={() => setCopy(false)}
							>
								{copy ? (
									<LightTooltip title="UUID Copied!" placement="top">
										<Icon path={mdiContentCopy} className={icon} size={1} rotate={360} />
									</LightTooltip>
								) : (
									<LightTooltip title="Copy UUID" placement="top">
										<Icon path={mdiContentCopy} className={icon} size={1} rotate={360} />
									</LightTooltip>
								)}
							</CopyToClipboard>
						</TableCell>
						<ActiveCell className={cell}>{campaign.active}</ActiveCell>
						<TableCell className={cell} align="right">
							<EditButton
								text="Edit"
								onClickFunc={() => history.push(`/manage/campaign/edit/${campaign.uuid}`)}
								style={{
									color: '#444851'
								}}
							/>
						</TableCell>
					</TableRow>
				))}
		/>
	);
}
