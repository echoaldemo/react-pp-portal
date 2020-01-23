import React, { useReducer, useEffect, useState } from 'react';
import { get, remove, patch } from 'utils/api'; // eslint-disable-line
import mockData from './mockData.json';
import { setTimeout } from 'timers';

const initialState = {
	realms: mockData.realms,
	campaignDetails: mockData.campaignDetails,
	loading: false,
	campaignRealms: mockData.campaignRealms,
	companies: mockData.companies,
	deleteLoading: false,
	openDeleteModal: false,
	panels: [],
	pitch: { name: 'Sample Pitch', panel: 'Standard', active_version: 1 },
	option_groups: [],
	panel_tab: 0
};

// const filterRealm = (data: Array<object>, initialRealms: any) => {
// 	let newArr: any = [];

// 	initialRealms.map((item: any) => {
// 		const value = data.find((realm: any) => {
// 			return realm.uuid == item;
// 		});

// 		newArr.push(value);
// 	});

// 	return newArr;
// };

const IdentityContext = React.createContext<any>(initialState);

const IdentityProvider = ({ children }: any) => {
	const [ tab, setTab ] = useState(0);
	const [ openModal, setOpenModal ] = useState(false);
	const [ editGroup, setEditGroup ] = useState(false);
	const [ openCreatePanelModal, setOpenCreatePanelModal ] = useState(false);
	const [ editPanel, setEditPanel ] = useState(false);
	const [ newFieldModal, setNewFieldModal ] = useState(false);
	const setLoading = (val: boolean) => {
		dispatch({ type: 'LOADING', payload: { loading: val } });
	};

	const handleSaveCampaignDetails = (val: any) => {
		setLoading(true);
		setTimeout(() => {
			dispatch({ type: 'SAVE_INFO', payload: { campaign_details: val } });
			setLoading(false);
		}, 1000);
	};

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	const [ state, dispatch ] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case 'SET_PANEL_TAB':
				return { ...state, panel_tab: action.payload.panel_tab };
			case 'LOADING':
				return { ...state, loading: action.payload.loading };

			case 'SAVE_INFO':
				return {
					...state,
					campaignDetails: action.payload.campaign_details
				};
			case 'NEW_PITCH':
				return {
					...state,
					pitch: action.payload.new_pitch
				};

			case 'CREATE_PANEL':
				return { ...state, panels: action.payload.panel };

			case 'CREATE_OPTION_GROUPS':
				return { ...state, option_groups: action.payload.option_group };

			case 'CREATE_OPTION':
				return { ...state, option_groups: action.payload.option };
			default:
				return null;
		}
	}, initialState);

	return (
		<IdentityContext.Provider
			value={{
				state,
				dispatch,
				handleSaveCampaignDetails,
				setLoading,
				setTab,
				tab,
				openModal,
				setOpenModal,
				editGroup,
				setEditGroup,
				// filterRealm,
				openCreatePanelModal,
				setOpenCreatePanelModal,
				editPanel,
				setEditPanel,
				newFieldModal,
				setNewFieldModal
			}}
		>
			{children}
		</IdentityContext.Provider>
	);
};

export { IdentityProvider, IdentityContext };
