import React, { useState } from 'react';

import { HeaderLink, HeaderButton, SearchBar, FilterToolBar, Pagination, Modal } from 'common-components';
import { menus } from '../globalConstsVar';
import CampaignTable from './CampaignTable';
import SEO from 'utils/seo';
import { Paper, Divider } from '@material-ui/core';
import NewCampaign from './components/new-campaign/NewCampaign';
import { AppContext } from 'contexts/CampaignContext';
const Campaigns = ({ history }: any) => {
	const [ openCreateModal, setOpenCreateModal ] = useState(false);

	return (
		<AppContext.Consumer>
			{({ data, FilterApplyButton, loading, paginateList, paginate, setLoading }: any) => {
				return (
					<div>
						<SEO title="Manage Campaigns" />
						<CampaignHeader data={data} setOpenCreateModal={setOpenCreateModal} />
						<Paper>
							<SearchBar
								title="Campaign"
								userData={data}
								headers={[ 'name', 'slug', 'uuid' ]}
								loading={loading}
								active={true}
								link={true}
								pathnameData={{
									firstLink: `/manage/campaign/edit/`,
									fetchData: [ 'slug', 'uuid' ],
									lastLink: `/settings`
								}}
							/>
							<Divider />
							<FilterToolBar
								FilterApplyButton={FilterApplyButton}
								sortBy={true}
								activeStatus={true}
								realm={true}
								company={true}
							/>

							<CampaignTable
								loading={loading}
								setLoading={setLoading}
								data={paginateList}
								history={history}
								setOpenCreateModal={setOpenCreateModal}
							/>
							<div style={{ width: '100%' }}>
								<Divider />
								{Boolean(paginateList.length) && (
									<Pagination paginateFn={paginate} totalItems={data.length} itemsPerPage={7} />
								)}
							</div>
						</Paper>
						<Modal
							open={openCreateModal}
							onClose={() => {
								setOpenCreateModal(false);
							}}
							title="Create New Campaign"
						>
							<NewCampaign
								closeFn={() => {
									setOpenCreateModal(false);
								}}
								realms={[]}
								companys={[]}
								newFn={() => {
									return null;
								}}
							/>
						</Modal>
					</div>
				);
			}}
		</AppContext.Consumer>
	);
};

function CampaignHeader({ data, setOpenCreateModal }: any) {
	return (
		<div className="header-container">
			<HeaderLink menu={menus} title="Campaigns" />
			{data.length > 0 && (
				<HeaderButton
					openFunction={() => {
						setOpenCreateModal(true);
					}}
					buttonText="New Campaign"
				/>
			)}
		</div>
	);
}

export default Campaigns;
