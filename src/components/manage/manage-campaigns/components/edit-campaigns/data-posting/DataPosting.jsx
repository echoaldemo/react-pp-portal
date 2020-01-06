import React from 'react';
import EditHeader from '../EditHeader';
import { Paper } from '@material-ui/core';

export default function DataPosting({ match, history }) {
	return (
		<div>
			<EditHeader match={match} history={history} />
			<Paper square={true} className="mh-normal">
				dada
			</Paper>
		</div>
	);
}
