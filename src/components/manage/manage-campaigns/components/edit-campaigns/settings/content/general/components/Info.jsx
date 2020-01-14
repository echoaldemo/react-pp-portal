import React from 'react';
import { TableLoader } from 'common-components';
import EditForm from './EditForm';

export default function Info(props) {
	const { loading } = props;

	return <div>{loading ? <TableLoader /> : <EditForm {...props} />}</div>;
}
