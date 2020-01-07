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
interface Props {
	data: Array<object>;
	loading: any;
	history: any;
	setOpenCreateModal: any;
}

const CampaignTable: React.FC<Props> = ({ data, loading, history, setOpenCreateModal }) => {
	const [ copy, setCopy ] = useState(false);

	return (
		<div>
			{loading ? (
				<TableLoader />
			) : data.length !== 0 ? (
				<AsyncTable
					headers={[ 'Name', 'Slug', 'UUID', 'Status', '' ]}
					tableData={data}
					render={(campaigns: any, { row, cell, uuid, icon }: any) => {
						return campaigns.map((campaign: any) => (
							<TableRow className={row} key={campaign.uuid} id="demo-body">
								<UnderlineCell
									className={cell}
									onClick={() =>
										history.push(
											`/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`
										)}
								>
									{campaign.name}
								</UnderlineCell>
								<TableCell className={cell} style={{ color: '#777777', width: '20%' }}>
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
													// path={mdiContentCopy}
													className={icon}
													rotate={360}
												/>
											</LightTooltip>
										) : (
											<LightTooltip title="Copy UUID" placement="top">
												<Icon className={icon} rotate={360} />
											</LightTooltip>
										)}
									</CopyToClipboard>
								</TableCell>
								<ActiveCell className={cell} style={{ color: '#777777' }}>
									{campaign.active}
								</ActiveCell>
								<TableCell className={cell} align="right">
									<EditButton
										text="Edit"
										onClickFunc={() =>
											history.push(
												`/manage/campaign/edit/${campaign.slug}/${campaign.uuid}/settings`
											)}
										style={{
											color: '#444851'
										}}
									/>
								</TableCell>
							</TableRow>
						));
					}}
				/>
			) : (
				renderNoData(setOpenCreateModal)
			)}
		</div>
	);
};

function renderNoData(setOpenCreateModal: any) {
	return (
		<TableNoResult
			headerText="Campaigns"
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

export default CampaignTable;
