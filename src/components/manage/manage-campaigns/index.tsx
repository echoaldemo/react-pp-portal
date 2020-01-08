import React from 'react';
import CampaignsSection from './Campaigns';
import EditHeader from './components/edit-campaigns/EditHeader';
import Settings from './components/edit-campaigns/settings/Settings';
import Dashboard from './components/edit-campaigns/dashboard/Dashboard';
import Pitch from './components/edit-campaigns/pitch/Pitch';
import DataPosting from './components/edit-campaigns/data-posting/DataPosting';
import { ContextProvider } from './ContextProvider';

const Campaigns = (props: any) => {
	return (
		<ContextProvider>
			<CampaignsSection {...props} />
		</ContextProvider>
	);
};

export { Campaigns, EditHeader, Settings, Pitch, DataPosting, Dashboard };
