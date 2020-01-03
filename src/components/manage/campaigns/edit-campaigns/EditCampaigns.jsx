import React, { useEffect } from 'react';
import { mockDataCampaigns } from '../../globalConstsVar';

export default function EditCampaigns({ match }) {
	useEffect(() => {
		console.log(mockDataCampaigns[0]);
	}, []);

	return (
		<div>
			<EditHeaders />
		</div>
	);
}

const EditHeaders = () => {
	return <h1>Head</h1>;
};
