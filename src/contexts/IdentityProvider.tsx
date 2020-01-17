import React, { useReducer, useEffect, useState } from 'react';
import { get, remove, patch } from 'utils/api';
import mockData from './mockData.json';
import { setTimeout } from 'timers';

const initialState = {
	realms: mockData.realms,
	campaignDetails: mockData.campaignDetails,
	loading: false,
	campaignRealms: mockData.campaignRealms,
	companies: mockData.companies,
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

	const [ infoLoading, setInfoLoading ] = useState(false);

	const [ state, dispatch ] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case 'TEST':
				return { ...state, campaignDetails: {} };
			default:
				return null;
		}
	}, initialState);

	useEffect(() => {
		setInfoLoading(true);

		setTimeout(() => {
			setInfoLoading(false);
		}, 1000);
	}, []);
	return (
		<IdentityContext.Provider
			value={{
				state,
				dispatch,
				infoLoading
			}}
		>
			{children}
		</IdentityContext.Provider>
	);
};

export { IdentityProvider, IdentityContext };
