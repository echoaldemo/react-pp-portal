import React, { useState } from 'react';
import { NavTabs, BackButton, StatusLabel, ChangeServer } from 'common-components';
import { Typography } from '@material-ui/core';
import SEO from 'utils/seo';

import { AppContext } from 'contexts/CampaignContext';

const options = [
	{
		name: 'PP23',
		uuid: '1'
	},
	{
		name: 'PP33',
		uuid: '2'
	}
];

export default function EditHeader(props) {
	const [ selected, setSelected ] = useState('1');

	return (
		<AppContext.Consumer>
			{({ getEditData }) => {
				const { name, slug, uuid } = getEditData();

				return (
					<div>
						<SEO title={name ? `Edit Campaign: ${name}` : 'Portal'} />
						<div className="campaign-edit-header-container pb-normal">
							<BackButton text="Back to campaigns" backFn={() => history.push('/manage/campaigns')} />
							<ChangeServer selected={selected} options={options} onChangeFn={setSelected} />
						</div>
						<div className="campaign-edit-header-container pb-normal">
							<div className="title-container">
								<Typography className="edit-title">
									{name ? name : '22200033 - none (changed)'}
								</Typography>
								&emsp;
								<StatusLabel active={true} />
							</div>

							<NavTabs
								tabnames={[
									{
										name: <b>DASHBOARD</b>,
										active: checkUrl('home'),
										onClickFn: () => history.push(`/manage/campaign/edit/${slug}/${uuid}/home`)
									},
									{
										name: <b>SETTINGS</b>,
										active: checkUrl('settings'),
										onClickFn: () => history.push(`/manage/campaign/edit/${slug}/${uuid}/settings`)
									},
									{
										name: <b>PITCH</b>,
										active: checkUrl('pitch'),
										onClickFn: () =>
											history.push(`/manage/campaign/edit/${slug}/${uuid}/pitch/details`)
									},
									{
										name: <b>DATA POSTING</b>,
										active: checkUrl('dataposting'),
										onClickFn: () =>
											history.push(`/manage/campaign/edit/${slug}/${uuid}/dataposting`)
									}
								]}
							/>
						</div>
					</div>
				);
			}}
		</AppContext.Consumer>
	);
}
function checkUrl(str) {
	if (window.location.href.indexOf(str) > -1) {
		return true;
	}
	return false;
}
