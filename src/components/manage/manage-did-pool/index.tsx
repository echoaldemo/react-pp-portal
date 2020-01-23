/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Paper, Divider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import SEO from "utils/seo";
import { get } from "utils/api";
import {
	HeaderLink,
	HeaderButton,
	NavTabs,
	SaveButton,
	TableNoResult,
	SearchBar,
	TableLoader,
	Pagination,
	FilterToolBar
} from "common-components";
import { menus, new_did_const, mockDidPool, mockCompany, mockCampaign, mockVoice, uuidv4 } from "./utils/const-var";
import { DidPoolProps } from "./utils/types";
import DIDPoolTable from "./components/DIDPoolTable";
import NewDidPool from "./components/NewDidPool";
import "./style/style.css";

const DidPool: React.FC<DidPoolProps> = ({ history }) => {
	const [state, setState] = useState<any>({
		didPools: [],
		ogPools: [{ test: 1 }],
		paginateList: [],
		open: false,
		load: false,
		done: false,
		loading: true,
		nameErr: "",
		voiceErr: "",
		companyErr: "",
		campaignErr: ""
	});
	const [companies, setCompanies] = useState<any>([]);
	const [campaigns, setCampaigns] = useState<any>({
		fil: [],
		og: []
	});
	const [voice, setVoice] = useState<any>([]);
	const [data, setData] = useState(new_did_const);

	useEffect(() => {
		// get("/did/company/all/campaign/all/pool/").then(
		// 	(res: any) => {
		// 		setState({
		// 			...state,
		// 			didPools: res.data,
		// 			ogPools: res.data,
		// 			paginateList: res.data,
		// 			loading: false
		// 		});
		// 	}
		// );
		// get("/identity/company/list/", {
		// 	assignable: true
		// }).then((res: any) => setCompanies(res.data));

		// get("/identity/campaign/list/", {
		// 	assignable: true
		// }).then((res: any) =>
		// 	setCampaigns({ ...campaigns, fil: res.data, og: res.data })
		// );
		// get("/did/voice_provider/").then((res: any) => setVoice(res.data));
		setTimeout(() => {
			setState({
				...state,
				didPools: mockDidPool,
				ogPools: mockDidPool,
				paginateList: mockDidPool,
				loading: false
			})
			setCompanies(mockCompany)
			setCampaigns({ ...campaigns, fil: mockCampaign, og: mockCampaign })
			setVoice(mockVoice)
		}, 1000)
	}, []);

	const paginate = (from: any, to: any) => {
		setState({ ...state, didPools: state.paginateList.slice(from, to) });
	};

	const FilterApplyButton = (params: any) => {
		setState({ ...state, loading: true });
		if (params.company === " " || params.campaign === " ") {
			get(`/did/company/all/campaign/all/pool/`).then((result: any) => {
				setState({
					...state,
					didPools: result.data,
					paginateList: result.data,
					loading: false
				});
			});
		} else {
			Promise.all([
				get(`/identity/company/${params.company}`),
				get(`/identity/campaign/${params.campaign}`)
			]).then(res => {
				get(
					`/did/company/${res[0].data.slug}/campaign/${res[1].data.slug}/pool/`
				).then((result: any) => {
					setState({
						...state,
						didPools: result.data,
						paginateList: result.data,
						loading: false
					});
				});
			});
		}
	};

	const handleClose = () => {
		setState({ ...state, open: false, done: false });
		setData(new_did_const);
	};

	const handleNewDidPool = () => {
		// const company = companies.find((company: any) => company.uuid === data.company)
		// const campaign = campaigns.og.find(
		//   (campaign: any) => campaign.uuid === data.campaign
		// )
		// setState({ ...state, load: true })
		// post(
		//   `/did/company/${company.slug}/campaign/${campaign.slug}/pool/`,
		//   data
		// ).then(res => {
		//   setState({
		//     ...state,
		//     open: false,
		//     load: false,
		//     done: true,
		//     didPools: [...state.didPools, res.data],
		//     paginateList: [...state.paginateList, res.data]
		//   })
		// })
		//mock
		setState({ ...state, load: true })
		setTimeout(() => {
			setState({
				...state,
				open: false,
				load: false,
				done: true,
				didPools: [...state.didPools, { ...data, uuid: uuidv4() }],
				paginateList: [...state.paginateList, { ...data, uuid: uuidv4() }]
			})
		}, 1000)
		console.log(data)
	};

	return (
		<div>
			<SEO title="Manage Did Pool" />
			<div className="header-container">
				<HeaderLink menu={menus} title="DID Pools" />
				<div style={{ display: "flex" }}>
					{state.ogPools.length === 0 ? null : (
						<HeaderButton
							openFunction={() => setState({ ...state, open: true })}
							buttonText="New DID Pool"
							style={{ marginRight: 24 }}
						/>
					)}
					<NavTabs
						tabnames={[
							{
								name: "DID POOLS",
								active: true,
								onClickFn: () => history.push("/manage/did-pool")
							},
							{
								name: "SEARCH DIDS",
								active: false,
								onClickFn: () => history.push("/manage/dids")
							}
						]}
					/>
				</div>
			</div>
			<Paper style={{ height: "auto" }}>
				{!state.loading && state.ogPools.length === 0 ? (
					<TableNoResult
						headerText="DID Pools"
						mainMessage="No did pool have been created"
						subMessage="Would you like to creat one? Just hit the “New DID Pool” button."
						renderButton={
							<SaveButton
								handleClick={() => setState({ ...state, open: true })}
							>
								<Add />
								New DID Pool
              </SaveButton>
						}
					/>
				) : (
						<div className="header-container">
							<div style={{ width: "100%" }}>
								<SearchBar
									title="DID Pool"
									userData={state.didPools}
									headers={["name", "uuid"]}
									active={true}
									link={true}
									loading={state.loading}
									pathnameData={{
										firstLink: `/manage/did-pool/edit/`,
										fetchData: ["uuid"],
										lastLink: ``
									}}
								/>
								<Divider />
								<FilterToolBar
									FilterApplyButton={FilterApplyButton}
									company={true}
									campaign={true}
								/>
								{state.loading ? (
									<TableLoader />
								) : (
										<>
											<DIDPoolTable state={state} history={history} />
											<Divider />
											{Boolean(state.paginateList.length) && (
												<Pagination
													paginateFn={paginate}
													totalItems={state.paginateList.length}
													itemsPerPage={6}
												/>
											)}
										</>
									)}
							</div>
						</div>
					)}
			</Paper>
			<NewDidPool
				state={state}
				setState={setState}
				companies={companies}
				campaigns={campaigns}
				setCampaigns={setCampaigns}
				voice={voice}
				data={data}
				setData={setData}
				handleNewDidPool={handleNewDidPool}
				handleClose={handleClose}
			/>
		</div>
	);
};

export default DidPool;
