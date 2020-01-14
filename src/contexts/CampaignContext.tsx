import React, { useState, useEffect } from 'react';
import { mockDataCampaigns } from './mockData';
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
	getAllCompanies: any;
	getAllRealms: any;
};

const AppContext = React.createContext<Partial<ContextProps>>({});

function CampaignsContextProvider({ children }: any) {
	const [ data, setData ] = useState(mockDataCampaigns);
	const [ paginateList, setPaginateList ] = useState(mockDataCampaigns);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		setLoading(true);
		// setTimeout(() => {
		// 	setLoading(false);
		// }, 500);

		get('/identity/campaign/list/').then((res: any) => {
			setData(res.data);
			setLoading(false);
		});
	}, []);

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

	const getAllRealms = async () => {
		let data = await fetch('https://dev-api.perfectpitchtech.com/identity/realm/list/', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'token f6620e466b3902fa6f2edf7f8d28332bd875c79d'
			}
		})
			.then((data) => data.json())
			.then((data) => data);
		return data;
	};

	const getAllCompanies = () => {
		return [];
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
				setPaginateList
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext, CampaignsContextProvider };
