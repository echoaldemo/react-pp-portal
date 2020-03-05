import React, {useContext, useState, useEffect} from 'react';
import {IdentityContext} from "contexts/IdentityProvider"
import {post} from "utils/api"

import LogsFilter from './logs-filter';
import { Modal } from 'common-components';
import ChangeLogTable from './components/change-log-table'
import ModalDetails from './components/modal-details';

const ChangeLog = () => {
	const [data, setData] = useState([]);
	const [origData, setOrigData] = useState([]); // eslint-disable-line
	const [activeData, setActiveData] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const { state } = useContext(IdentityContext);
	const {campaignDetails } = state

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

	const getData = () => {
		post(`/identity/changelog/filter/`, {
			campaign: campaignDetails.slug,
		  } )
		.then((res:any) => {
			setData(res.data.data)
			setOrigData(res.data.data)
		}).catch((err:any) => {
			console.error(err); 
		  })
	}

	useEffect(() => {
		if("uuid" in campaignDetails){ 
			getData()
		}
	}, [campaignDetails])


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
