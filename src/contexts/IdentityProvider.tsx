import React, { useState, useEffect } from 'react';
import { get, remove, patch } from 'utils/api';
import mockData from './mockData.json';
import { setTimeout } from 'timers';

const initialState = {
	realms: [],
	campaignDetails: {},
	loading: false,
	campaignRealms: [],
	companies: [],
	deleteLoading: false,
	openDeleteModal: false
};

const filterRealm = (data: Array<object>, initialRealms: any) => {
	let newArr: any = [];

	initialRealms.map((item: any) => {
		const value = data.find((realm: any) => {
			return realm.uuid == item;
		});

		newArr.push(value);
	});

	return newArr;
};
const IdentityContext = React.createContext<any>(initialState);

const IdentityProvider = ({ children, match, history }: any) => {
	const { uuid } = match.params;

	const [ state, setState ] = useState(initialState);

	useEffect(() => {
		fetchAllData();
		// setState({ ...state, loading: true });

		// setTimeout(() => {
		// 	setState({
		// 		...state,

		// 	});
		// }, 1000);
	}, []);

	const fetchAllData = () => {
		setState({ ...state, loading: true });
		get(`/identity/campaign/${uuid}`)
			.then((res: any) => {
				setState({ ...state, campaignDetails: res.data });
				return res.data;
			})
			.then((campaignResult: any) => {
				get('/identity/realm/list/')
					.then((res: any) => {
						console.log('result', campaignResult);

						setState({
							...state,
							realms: res.data,
							campaignRealms: filterRealm(res.data, campaignResult.realms)
						});
					})
					.then(() => {
						get('/identity/company/list/').then((res: any) => {
							setState({ ...state, companies: res.data, loading: false });
						});
					});
			});
	};

	const deleteCompany = () => {
		setState({ ...state, deleteLoading: true, openDeleteModal: false });
		remove(`/identity/campaign/${uuid}/`)
			.then((res: any) => {
				setState({ ...state, deleteLoading: false });
				history.push('/manage/campaigns');
			})
			.catch((err: any) => {
				console.log('Error response => ', err.response);
			});
	};

	const handleSaveData = (state: any) => {
		const { uuid, realms } = state;
		setState({ ...state, loading: true });

		const newRealms = realms.map((item: any) => {
			return item.uuid;
		});

		patch(`/identity/campaign/${uuid}/`, {
			name: state.name,
			company: state.company,
			realms: newRealms,
			slug: state.slug,
			active: state.active
		})
			.then((res: any) => {
				fetchAllData();
			})
			.catch((err: any) => {
				setState({ ...state, loading: false });
			});
	};

	return (
		<IdentityContext.Provider
			value={{
				state,
				setState,
				deleteCompany,
				handleSaveData
			}}
		>
			{children}
		</IdentityContext.Provider>
	);
};

export { IdentityProvider, IdentityContext };
