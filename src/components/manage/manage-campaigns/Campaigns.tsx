import React, { useState, useEffect } from 'react';

import { HeaderLink, HeaderButton, SearchBar, FilterToolBar, Pagination, Modal } from 'common-components';
import { menus, mockDataCampaigns } from '../globalConstsVar';
import CampaignTable from './CampaignTable';
import SEO from 'utils/seo';
import { get } from '../../../utils/api';
import { Paper, Divider } from '@material-ui/core';
import NewCampaign from './components/new-campaign/NewCampaign';

const Campaigns = ({ history }: any) => {
	const [ loading, setLoading ] = useState(false);
	const [ data, setData ] = useState(mockDataCampaigns);
	const [ paginateList, setPaginateList ] = useState(mockDataCampaigns);
	const [ openCreateModal, setOpenCreateModal ] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	function FilterApplyButton(params: any) {
		setLoading(true);
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