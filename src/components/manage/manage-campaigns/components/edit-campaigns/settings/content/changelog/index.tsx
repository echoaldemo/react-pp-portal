import React, { useState, useEffect } from 'react';

import LogsFilter from './logs-filter';
import { Modal } from 'common-components';

import ChangeLogTable from './components/change-log-table';
import ModalDetails from './components/modal-details';
import { getChangeLogData } from '../../../Functions';
import mock_data from './mock_data.json';

const ChangeLog = () => {
	const [ data, setData ] = useState(mock_data.data);
	const [ origData, setOrigData ] = useState(mock_data.data);
	const [ activeData, setActiveData ] = useState([]);
	const [ openModal, setOpenModal ] = useState(false);

	const handleFilterUpdate = (data: any) => {
		setData(data);
	};

	const handleActiveData = (data: any) => {
		console.log(data, 'xxxxx');
		setActiveData(data);
		setOpenModal(true);
	};
	const handleCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<div>
			{console.log(mock_data, 'MD')}
			<LogsFilter
				data={data}
				originalData={origData}
				handleFilterUpdate={handleFilterUpdate}
				modalFunc={handleActiveData}
			/>
			<ChangeLogTable tableData={data} setActiveData={handleActiveData} />
			{activeData ? (
				<Modal open={openModal} title="Change Details" onClose={handleCloseModal} width={651}>
					<ModalDetails data={activeData} onClose={handleCloseModal} />
				</Modal>
			) : null}
		</div>
	);
};

export default ChangeLog;
