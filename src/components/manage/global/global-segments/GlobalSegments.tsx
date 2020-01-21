import React, { useState, useEffect } from "react";
// import NewSegment from "./components/NewSegment";
import {
	Paper,
	Divider,
	Snackbar,
	IconButton,
	MenuItem,
	Typography
} from "@material-ui/core";

//Header
import {
	HeaderLink,
	HeaderButton,
	Pagination,
	SearchBar,
	TableLoader,
	DeleteModal,
	LoadingModal,
	SuccessModal
} from "common-components";
import SegmentTable from "./components/SegmentTable";
import { get, patch, post, remove, cancel } from "../../../../utils/api";
import SEO from "../../../../utils/seo";
import XMLDialog from "./components/Form";
import { Clear } from "@material-ui/icons";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";

interface Props { }
interface State {
	globalSegment: any;
	innerLoading: boolean;
	loading: boolean;
	paginateList: any;
	filterlist: any;
	data: any;
	open: boolean;
	dataXML: string;
	error: any;
	openSnackBar: boolean | string;
	openDelete: boolean;
	openLoading: boolean;
	openSuccess: boolean;
}

const GlobalSegments: React.FC<Props> = () => {
	const [state, setState] = useState<State>({
		globalSegment: [],
		innerLoading: false,
		loading: true,
		paginateList: [],
		filterlist: [],
		data: [],
		open: false,
		dataXML: "",
		error: null,
		openSnackBar: false,
		openDelete: false,
		openLoading: false,
		openSuccess: false
	});

	useEffect(() => {
		get(`/identity/location/list`).then((res: any) => {
			setState({
				...state,
				globalSegment: res.data,
				innerLoading: false,
				loading: false,
				paginateList: res.data,
				filterlist: res.data
			});
		});
		// eslint-disable-next-line
	}, []);

	const fetchData = () => {
		setState({ ...state, loading: true });
		get(`/pitch/global/segments/`).then((res: any) => {
			setState({
				...state,
				globalSegment: res.data,
				innerLoading: false,
				loading: false,
				paginateList: res.data,
				filterlist: res.data
			});
		});
	};

	const paginate = (from: any, to: any) => {
		setState({
			...state,
			globalSegment: state.paginateList.slice(from, to)
		});
	};
	// eslint-disable-next-line
	const handlClose = () => {
		setState({ ...state, open: false });
	};

	const handleClickOpen = (data: any) => {
		setState({ ...state, data, open: !state.open, dataXML: data.xml });
	};

	const setActiveDataMethod = (data: any) => {
		setState({ ...state, data });
	};

	const handleChangeXML = (data: any) => {
		setState({ ...state, dataXML: data });
	};

	const showErrorMessage = (error: any) => {
		setState({ ...state, error });
	};

	const getFirst = (n: any) => {
		var x = n.firstChild;
		if (x !== null) {
			while (x.nodeType !== 1) {
				x = x.nextSibling;
			}
			return x.parentNode.nodeName;
		} else {
			return n.nodeName;
		}
	};

	const UpdateSegment = (data: any, label: any) => {
		const parser = new DOMParser();
		const theDom = parser.parseFromString(data.xml, "application/xml");
		const rootNode = getFirst(theDom.documentElement);
		if (
			rootNode === "defaults" ||
			rootNode === "options" ||
			rootNode === "response-tests" ||
			rootNode === "failures" ||
			rootNode === "intros" ||
			rootNode === "no-responses" ||
			rootNode === "endings" ||
			rootNode === "nodes"
		) {
			if (theDom.getElementsByTagName("parsererror").length > 0) {
				showErrorMessage(
					theDom
						.getElementsByTagName("parsererror")[0]
						.getElementsByTagName("div")[0].innerHTML
				);
			} else {
				setState({ ...state, error: null });
				var submitdata = {
					name: data.name,
					active: data.active,
					type: data.type,
					xml: data.xml,
					variables: data.variables
				};
				if (label === "edit") {
					patch(`/pitch/global/segments/${data.uuid}/`, submitdata)
						.then((res: any) => {
							if (res.status !== 400) {
								setState({
									...state,
									openSnackBar: "Segment Updated!",
									loading: true,
									open: false
								});
								fetchData();
							}
						})
						.catch((err: any) => {
							if (err) console.log(err);
							return showErrorMessage("Error Updating! Please Try Again");
						});
				} else if (label === "create") {
					post(`/pitch/global/segments/`, submitdata)
						.then((res: any) => {
							if (res.status !== 400) {
								setState({
									...state,
									openSnackBar: "Segment Created!",
									loading: true,
									open: false
								});
								fetchData();
							}
						})
						.catch((err: any) => {
							if (err) console.log(err);
							return showErrorMessage("Error Creating! Please Try Again");
						});
				}
			}
		} else {
			return showErrorMessage(
				`The xml provided contains an invalid root node "${rootNode}", allowed root nodes are: defaults, options, nodes, response-tests, failures, intros, no-responses, endings`
			);
		}
	};

	const closeError = () => {
		setState({
			...state,
			error: null
		});
	};

	const closeSnackBar = () => {
		setState({
			...state,
			openSnackBar: false
		});
	};

	const openNewSegment = () => {
		setState({
			...state,
			data: "",
			open: !state.open,
			dataXML: " "
		});
	};

	const handleClose = () => {
		setState({
			...state,
			openDelete: false,
			open: false
		});
	};
	const openDelete = (data: any) => {
		setState({
			...state,
			openDelete: true,
			data
		});
	};

	const handleCancel = () => {
		cancel();
		setState({
			...state,
			openLoading: false
		});
	};
	const handleCloseSucess = () => {
		setState({
			...state,
			openSuccess: false,
			loading: true
		});
	};

	const handleDelete = () => {
		//code here
		setState({
			...state,
			openDelete: false,
			openLoading: true
		});
		remove(`/pitch/global/segments/${state.data.uuid}/`)
			.then(() => {
				setState({
					...state,
					openSuccess: true,
					openLoading: false
				});
			})
			.catch((err: any) => console.log(err));
	};

	return (
		<div
			style={{
				margin: "0 auto"
			}}
		>
			<>
				<SEO title="Manage Pitch Segments" />
				<div
					style={{
						paddingBottom: 30,
						display: "flex",
						justifyContent: "space-between"
					}}
				>
					<HeaderLink
						menu={[
							{
								title: "Phrase Books",
								path: "/manage/global-pitch-phrasebooks"
							},
							{
								title: "Option Group",
								path: "/manage/global-option-group"
							},
							{
								title: "Rapid Response",
								path: "/manage/global-rapid-response/tests"
							}
						]}
						title="Segments"
					/>
					<HeaderButton
						openFunction={state.loading === true ? () => null : openNewSegment}
						buttonText="New Segment"
					/>
				</div>
				<Paper style={{ height: "auto" }}>
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							alignContent: "space-between",
							height: "auto"
						}}
					>
						<div style={{ width: "100%", height: "100%" }}>
							<div style={{ height: "auto" }}>
								<SearchBar
									title="Global Segment"
									userData={state.filterlist}
									headers={["name", "slug", "uuid"]}
									active={true}
									loading={state.loading}
									setActiveDataMethod={setActiveDataMethod}
									settings={
										<>
											<MenuItem
												onClick={() => handleClickOpen(state.data)}
												style={{
													color: "#777777",
													width: 250,
													paddingTop: 0,
													paddingBottom: 0
												}}
											>
												<CodeIcon />{" "}
												<Typography style={{ marginLeft: 40 }}>XML</Typography>
											</MenuItem>
											<MenuItem
												onClick={() => openDelete(state.data)}
												style={{
													color: "#777777",
													width: 250,
													paddingTop: 0,
													paddingBottom: 0
												}}
											>
												<DeleteIcon />{" "}
												<Typography style={{ marginLeft: 40 }}>
													Delete
                        </Typography>
											</MenuItem>
										</>
									}
								/>
							</div>
							{state.dataXML !== "" ? (
								<>
									<XMLDialog
										stopLoading={state.openSnackBar}
										error={state.error}
										UpdateSegment={UpdateSegment}
										handleChangeXML={handleChangeXML}
										dataXML={state.dataXML}
										data={state.data}
										open={state.open}
										closeError={closeError}
										handlClose={handleClose}
									/>
								</>
							) : null}
							<Divider />
							{state.loading ? (
								<div style={{ height: 600, overflow: "hidden" }}>
									<TableLoader />
								</div>
							) : (
									<>
										{state.globalSegment.length !== 0 ? (
											<>
												<SegmentTable
													closeF={() => null}
													openDelete={openDelete}
													handleClickOpen={handleClickOpen}
													userData={state.globalSegment}
													innerLoading={state.innerLoading}
													headers={[
														"Name",
														"Slug",
														"Type",
														"UUID",
														"Active",
														"Variables",
														" "
													]}
												/>

												{state.data.length !== 0 && (
													<>
														<DeleteModal
															open={state.openDelete}
															header="Delete Global Segment"
															msg="segment"
															name={`${state.data.name}`}
															closeFn={handleClose}
															delFn={handleDelete}
														/>
														<LoadingModal
															open={state.openLoading}
															text={`${state.data.name}`}
															cancelFn={handleCancel}
														/>

														<SuccessModal
															open={state.openSuccess}
															text={`You have removed “${state.data.name}”`}
															closeFn={handleCloseSucess}
														/>
													</>
												)}
												<div style={{ width: "100%" }}>
													<Divider />
													<Pagination
														paginateFn={paginate}
														totalItems={state.paginateList.length}
														itemsPerPage={6}
													/>
												</div>
											</>
										) : (
												<div style={{ width: "100%", height: "100%" }}>
													<div style={{ height: 70 }}></div>
													<Divider />
													<div
														style={{
															height: "100%",
															padding: 100,
															marginTop: 70
														}}
													>
														<div style={{ textAlign: "center" }}>
															<h4 style={{ color: "#7c8a97", fontSize: "18px" }}>
																No Rapid Response Segments have been created
                          </h4>
														</div>
													</div>
												</div>
											)}
									</>
								)}
						</div>
					</div>
				</Paper>
				<Snackbar
					anchorOrigin={{
						vertical: "top",
						horizontal: "right"
					}}
					open={Boolean(state.openSnackBar)}
					autoHideDuration={3000}
					onClose={closeSnackBar}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					message={<span id="message-id">{state.openSnackBar}</span>}
					action={[
						// <Button key="undo" color="secondary" size="small" onClick={handleClose}>
						//   UNDO
						// </Button>,
						<IconButton
							key="close"
							aria-label="close"
							color="inherit"
							onClick={closeSnackBar}
						>
							<Clear />
						</IconButton>
					]}
				/>
			</>
		</div>
	);
};
export default GlobalSegments;
