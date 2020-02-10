import React, { useState } from 'react';
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
};

const AppContext = React.createContext<Partial<ContextProps>>({});

function CampaignsContextProvider({ children }: any) {
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
				setPaginateList
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext, CampaignsContextProvider };
