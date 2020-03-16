<<<<<<< HEAD
import React, { useState } from "react";
import mockData from "./mockData.json";
import { get } from "utils/api";

type ContextProps = {
  data: Array<object>;
  setData: any;
  loading: boolean;
  setLoading: any;
  paginateList: Array<object>;
  setPaginateList: any;
  paginate: any;
  FilterApplyButton: any;
=======
import React, { useState, useEffect } from 'react';
import mockData from './mockData.json';
import { get } from 'utils/api';

type ContextProps = {
	data: Array<object>;
	setData: any;
	loading: boolean;
	setLoading: any;
	paginateList: Array<object>;
	setPaginateList: any;
	paginate: any;
	FilterApplyButton: any;
	getCampaign: any,
	activeCampaign: object
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
};

const AppContext = React.createContext<Partial<ContextProps>>({});

function CampaignsContextProvider({ children }: any) {
<<<<<<< HEAD
  const [data, setData] = useState(mockData.campaigns);
  const [paginateList, setPaginateList] = useState(mockData.campaigns);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // 	setLoading(true);
  // 	setTimeout(() => {
  // 		setLoading(false);
  // 	}, 1000);

  // 	// getAllData()
  // }, []);

  // function getAllData() {
  // 	// eslint-disable-line
  // 	setLoading(true);
  // 	get('/identity/campaign/list/').then((res: any) => {
  // 		setData(res.data);
  // 		setLoading(false);
  // 	});
  // }
=======
	const [data, setData] = useState(mockData.campaigns);
	const [paginateList, setPaginateList] = useState(mockData.campaigns);
	const [loading, setLoading] = useState(false);
	const [activeCampaign, setActiveCampaign] = useState({})

	useEffect(() => getAllData(), []);

	function getAllData() {
		// eslint-disable-line
		setLoading(true);
		get('/identity/campaign/list/', {
			editable:true,
			order_by: "-datetime_modified"
		}).then((res: any) => {
			setData(res.data);
			setLoading(false);
		});
	}

	function getCampaign(UUID:  string){
		let campaign = data.filter(item => item.uuid === UUID)
		setActiveCampaign(campaign)
		return campaign
	}
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38

  function FilterApplyButton(params: any) {
    var parameter = {
      ...(params.sortby !== " " && { order_by: params.sortby }),
      ...(params.active !== " " && { active: params.active }),
      ...(params.company !== " " && { company: params.company }),
      ...(params.realm !== " " && { realms: params.realm }),
      ...(params.campaign !== " " && { campaigns: params.campaign }),
      ...(params.roles !== " " && { groups: params.roles }),
      ...(params.hasCompany !== " " && { no_company: !params.hasCompany })
    };

    get("/identity/campaign/list/", parameter)
      .then((res: any) => {
        setData(res.data);
        setPaginateList(res.data);
        setLoading(false);
      })
      .catch(() => {
        setPaginateList([]);
        setLoading(false);
      });
  }

  const paginate = (from: any, to: any) => {
    setPaginateList(data.slice(from, to));
  };

<<<<<<< HEAD
  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        paginate,
        FilterApplyButton,
        paginateList,
        setPaginateList
      }}
    >
      {children}
    </AppContext.Provider>
  );
=======
	return (
		<AppContext.Provider
			value={{
				data,
				setData,
				loading,
				setLoading,
				paginate,
				FilterApplyButton,
				paginateList,
				setPaginateList,
				getCampaign,
				activeCampaign
			}}
		>
			{children}
		</AppContext.Provider>
	);
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
}

export { AppContext, CampaignsContextProvider };
