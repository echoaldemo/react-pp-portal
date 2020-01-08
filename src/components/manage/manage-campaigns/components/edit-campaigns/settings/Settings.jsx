import React, { useEffect, useState } from 'react';
import EditHeader from '../EditHeader';
import { Paper } from '@material-ui/core';
import { get } from '../../../../../../utils/api';
import { mockDataCampaigns } from '../../../../globalConstsVar';
export default function Settings({ match, history }) {
	const { uuid } = match.params;
	const [ data, setData ] = useState([]);

	useEffect(() => {
		get(`/identity/campaign/${uuid}`)
			.then((result) => {
				console.log('data');
				setData(result.data);
			})
			.catch((err) => {
				setData(mockDataCampaigns[0]);
			});
	}, []);

	return (
		<div>
			<EditHeader data={data} history={history} />
			<Paper square={true} className="mh-normal">
				{console.log(data, 'Data')}
			</Paper>
		</div>
	);
}
