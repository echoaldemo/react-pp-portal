import React, { useState, useEffect } from 'react';
import { mockDataCampaigns } from '../globalConstsVar';

const AppContext = React.createContext();

function ContextProvider(props) {
	return (
		<AppContext.Provider
			value={{
				first_name: 'dasd'
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export { AppContext, ContextProvider };
