import React, { useState, useEffect } from 'react';
import { NavTabs, BackButton, StatusLabel, ChangeServer } from 'common-components';
import { Typography } from '@material-ui/core';
import SEO from 'utils/seo';
import { getEditData } from './Functions';
import { CircularProgress } from '@material-ui/core';

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

export default function EditHeader({ history, match }) {
	const [ selected, setSelected ] = useState('1');
	const [ data, setData ] = useState([]);

	const { name, active } = JSON.parse(localStorage.getItem('campaignData'));
	const { uuid, slug } = match.params;
	return (
		<div>
			<SEO title={name ? `Edit Campaign: ${name}` : 'Portal'} />
			<div className="campaign-edit-header-container pb-normal">
				<BackButton text="Back to campaigns" backFn={() => history.push('/manage/campaigns')} />
				{/* <ChangeServer selected={selected} options={options} onChangeFn={setSelected} /> */}
			</div>
			<div className="campaign-edit-header-container pb-normal">
				<div className="title-container">
					<Typography className="edit-title">{name}</Typography>
					&emsp;
					<StatusLabel status={active} />
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
							onClickFn: () => history.push(`/manage/campaign/edit/${slug}/${uuid}/pitch/details`)
						},
						{
							name: <b>DATA POSTING</b>,
							active: checkUrl('dataposting'),
							onClickFn: () => history.push(`/manage/campaign/edit/${slug}/${uuid}/dataposting`)
						}
					]}
				/>
			</div>
		</div>
	);
}
function checkUrl(str) {
	if (window.location.href.indexOf(str) > -1) {
		return true;
	}
	return false;
}
