import React, { useState, useEffect } from 'react';
import { HeaderLink, HeaderButton, SearchBar, FilterToolBar, Pagination } from 'common-components';
import { menus, mockDataCampaigns } from '../globalConstsVar';
import CampaignTable from './CampaignTable';
import SEO from 'utils/seo';
import { get } from '../../../utils/api';
import { Paper, Divider } from '@material-ui/core';
export default function Campaigns({ history }) {
	const [ loading, setLoading ] = useState(false);
	const [ data, setData ] = useState([]);
	const [ paginateList, setPaginateList ] = useState([]);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			get('/identity/campaign/list/')
				.then((result) => {
					setData(result.data);
					setPaginateList(result.data);
					setLoading(false);
				})
				.catch(() => {
					setData(mockDataCampaigns);
					setLoading(false);
					setPaginateList(mockDataCampaigns);
				});
		}, 200);
	}, []);

	function FilterApplyButton(params) {
		setLoading(true);
		var parameter = {
			...(params.sortby !== ' ' && { order_by: params.sortby }),
			...(params.active !== ' ' && { active: params.active }),
			...(params.company !== ' ' && { company: params.company }),
			...(params.realm !== ' ' && { realms: params.realm }),
			...(params.campaign !== ' ' && { campaigns: params.campaign }),
			...(params.roles !== ' ' && { groups: params.roles }),
			...(params.hasCompany !== ' ' && { no_company: !params.hasCompany })
		};

		get('/identity/campaign/list/', parameter)
			.then((res) => {
				setData(res.data);
				setPaginateList(res.data);
				setLoading(false);
			})
			.catch(() => {
				setData([]);
				setPaginateList([]);
				setLoading(false);
			});
	}
	const paginate = (from, to) => {
		setPaginateList(data.slice(from, to));
	};
	return (
		<div>
			<SEO title="Manage Campaigns" />
			{renderHeader(data)}
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

				<CampaignTable loading={loading} data={paginateList} history={history} />
				<div style={{ width: '100%' }}>
					<Divider />
					{Boolean(paginateList.length) && (
						<Pagination
							paginateFn={paginate}
							totalItems={data.length}
							paginateList={data}
							itemsPerPage={7}
						/>
					)}
				</div>
			</Paper>
		</div>
	);
}

function renderHeader(data) {
	return (
		<div className="header-container">
			<HeaderLink menu={menus} title="Campaigns" />
			{data.length > 0 && (
				<HeaderButton
					openFunction={() => {
						return null;
					}}
					buttonText="New Campaign"
				/>
			)}
		</div>
	);
}
