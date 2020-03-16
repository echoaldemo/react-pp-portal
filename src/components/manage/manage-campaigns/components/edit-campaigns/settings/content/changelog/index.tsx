<<<<<<< HEAD
import React, { useState } from "react";

import LogsFilter from "./logs-filter";
import { Modal } from "common-components";

import ChangeLogTable from "./components/change-log-table";
import ModalDetails from "./components/modal-details";
import mock_data from "./mock_data.json";

const ChangeLog = () => {
  const [data, setData] = useState(mock_data.data);
  const [origData, setOrigData] = useState(mock_data.data); // eslint-disable-line
  const [activeData, setActiveData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
=======
import React, {useContext, useState, useEffect} from 'react';
import {IdentityContext} from "contexts/IdentityProvider"
import {post} from "utils/api"
import LogsFilter from './logs-filter';
import { Modal, TableLoader } from 'common-components';
import ChangeLogTable from './components/change-log-table'
import ModalDetails from './components/modal-details';

const ChangeLog: React.FC= () => {
	const [data, setData] = useState([]);
	const [origData, setOrigData] = useState([]);
	const [activeData, setActiveData] = useState({});
	const [openModal, setOpenModal] = useState(false);
	const { state } = useContext(IdentityContext);
	const {campaignDetails } = state
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

  const handleFilterUpdate = (data: any) => {
    setData(data);
  };

<<<<<<< HEAD
  const handleActiveData = (data: any) => {
    console.log(data, "xxxxx");
    setActiveData(data);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {console.log(mock_data, "MD")}
      <LogsFilter
        data={data}
        originalData={origData}
        handleFilterUpdate={handleFilterUpdate}
        modalFunc={handleActiveData}
      />
      <ChangeLogTable tableData={data} setActiveData={handleActiveData} />
      {activeData ? (
        <Modal
          open={openModal}
          title="Change Details"
          onClose={handleCloseModal}
          width={651}
        >
          <ModalDetails data={activeData} onClose={handleCloseModal} />
        </Modal>
      ) : null}
    </div>
  );
=======
	const handleActiveData = (data: any) => {
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

	const onSortData = (isSorted:boolean, type:string) => {
		let results = []

		if (isSorted)
			results = data.sort((a, b) => (a[type] > b[type] ? -1 : 1))
		else results = data.sort((a, b) => (a[type] < b[type] ? -1 : 1))

		setData(results)
	}

	useEffect(() => {
		if("uuid" in campaignDetails){ 
			getData();
		}
	}, [campaignDetails])

	return (
		<div>
			{state.loading ? 
				<TableLoader /> :
				<React.Fragment> 
					{ data.length > 0 && 
						<LogsFilter
						data={data}
						originalData={origData}
						handleFilterUpdate={handleFilterUpdate}
						modalFunc={handleActiveData} /> 
					}
					<ChangeLogTable onSortData={(isSorted:boolean, type:string) => onSortData(isSorted, type)} tableData={data} setActiveData={handleActiveData} />
				{ activeData && (
					<Modal open={openModal} title="Change Details" onClose={handleCloseModal} width={651}>
						<ModalDetails data={activeData} onClose={handleCloseModal} />
					</Modal>) 
				}
				</React.Fragment>
			}
		</div>
	);
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
};

export default ChangeLog;