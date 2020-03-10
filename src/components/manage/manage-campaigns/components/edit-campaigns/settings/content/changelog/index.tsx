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
    const handleFilterUpdate = (data: any) => {
        setData(data);
    };
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
};
export default ChangeLog;