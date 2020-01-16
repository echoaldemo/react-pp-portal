import React from 'react';

import Campaigns from './Campaigns';
import EditHeader from './components/edit-campaigns/EditHeader';
import SettingsSection from './components/edit-campaigns/settings/Settings';
import Dashboard from './components/edit-campaigns/dashboard/Dashboard';
import Pitch from './components/edit-campaigns/pitch/Pitch';
import DataPosting from './components/edit-campaigns/data-posting/DataPosting';

import { IdentityProvider } from 'contexts/IdentityProvider';

const Settings = (props: any) => {
	return (
		<IdentityProvider {...props}>
			<SettingsSection {...props} />
		</IdentityProvider>
	);
};

export { Campaigns, EditHeader, Settings, Pitch, DataPosting, Dashboard };
