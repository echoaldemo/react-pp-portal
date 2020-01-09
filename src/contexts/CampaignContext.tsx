import React, { useState, useEffect } from 'react';
import { mockDataCampaigns } from './mockData';
import { get } from '../utils/api';
import axios from 'axios';
import { async } from 'q';
type ContextProps = {
	data: Array<object>;
	setData: any;
	loading: boolean;
	setLoading: any;
	paginateList: Array<object>;
	setPaginateList: any;
	paginate: any;
	FilterApplyButton: any;

	getEditData: any;
};

const AppContext = React.createContext<Partial<ContextProps>>({});

function CampaignsContextProvider({ children }: any) {
	const [ data, setData ] = useState(mockDataCampaigns);
	const [ paginateList, setPaginateList ] = useState(mockDataCampaigns);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	async function getEditData(uuid: string) {
		let data = await fetch('https://5e00169a1fb99500141403ae.mockapi.io/api/v1/roles')
			.then((data) => data.json())
			.then((data) => {
				return data;
			});

		return data;
	}
	function FilterApplyButton(params: any) {
		var parameter = {
			...params.sortby !== ' ' && { order_by: params.sortby },
			...params.active !== ' ' && { active: params.active },
			...params.company !== ' ' && { company: params.company },
			...params.realm !== ' ' && { realms: params.realm },
			...params.campaign !== ' ' && { campaigns: params.campaign },
			...params.roles !== ' ' && { groups: params.roles },
			...params.hasCompany !== ' ' && { no_company: !params.hasCompany }
		};

		get('/identity/campaign/list/', parameter)
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

				getEditData
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext, CampaignsContextProvider };
