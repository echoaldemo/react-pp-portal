import React, { useState } from 'react';
import { NavTabs, BackButton, StatusLabel, ChangeServer } from 'common-components';
import { Typography } from '@material-ui/core';

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
	const { data, history, match } = props;

	const { slug, uuid, name } = data ? data : match;
	return (
		<div>
			<div className="campaign-edit-header-container pb-normal">
				<BackButton text="Back to campaigns" backFn={() => history.push('/manage/campaigns')} />
				<ChangeServer selected={selected} options={options} onChangeFn={setSelected} />
			</div>
			<div className="campaign-edit-header-container pb-normal">
				<div className="title-container">
					<Typography className="edit-title">{name ? name : '22200033 - none (changed)'}</Typography>
					&emsp;
					<StatusLabel active={true} />
				</div>

				<NavTabs
					tabnames={[
						{
							name: <b>DASHBOARD</b>,
							active: checkUrl('dashboard'),
							onClickFn: () => alert('No design yet')
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
