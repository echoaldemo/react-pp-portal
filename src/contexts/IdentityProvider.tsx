import React, { useReducer } from 'react';

const initialState = {
	realms: [],
	campaign: []
};

const IdentityContext = React.createContext<any>(initialState);

const IdentityProvider = ({ children }: any) => {
	const [ state, dispatch ] = useReducer((state: any, action: any) => {
		switch (action.type) {
			case 'realms':
				return { ...state, realms: [] };

			default:
				return null;
		}
	}, initialState);

	return (
		<IdentityContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</IdentityContext.Provider>
	);
};

export default { IdentityProvider, IdentityContext };
