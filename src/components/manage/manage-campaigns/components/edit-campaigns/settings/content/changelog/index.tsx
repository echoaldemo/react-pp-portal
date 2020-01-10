import React, { useState, useEffect } from 'react';

import LogsFilter from './logs-filter';
import { Modal } from 'common-components';

import ChangeLogTable from './components/change-log-table';
import ModalDetails from './components/modal-details';
import { getChangeLogData } from '../../../Functions';
const ChangeLog = ({ match, history }: any) => {
	const { slug } = match.params;

	const [ data, setData ] = useState([]);
	const [ origData, setOrigData ] = useState([]);
	const [ activeData, setActiveData ] = useState([]);
	const [ openModal, setOpenModal ] = useState(false);

	useEffect(() => {
		getChangeLogData(slug).then((result) => {
			setData(result.data);
			setOrigData(result.data);
		});
	}, []);

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
