import React from "react";
import { Grid, TextField, MenuItem, withStyles } from "@material-ui/core";
import { Filter } from "./constant";
import { ApplyBtn, useStyles } from "./styles";

interface Props {
	FilterApplyButton: any;
	sortBy?: boolean;
	activeStatus?: boolean;
	realm?: boolean;
	company?: boolean;
	hasCompany?: boolean;
	campaign?: boolean;
	roles?: boolean;
	sortByUser?: boolean;
	status?: boolean;
	classes: any;
}
interface State {
	SortBy?: string;
	ActiveStatus?: string;
	Realm?: string;
	Company?: string;
	HasCompany?: string;
	Campaign?: string;
	Roles?: string;
	FilterLabel?: any;
	companyData?: any;
	realmData?: any;
	campaignData?: any;
	rolesData?: any;
	campaignDataO?: any;
	Status?: string;
}

class FilterToolBarComp extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			SortBy: "-datetime_modified",
			ActiveStatus: " ",
			Realm: " ",
			Company: " ",
			HasCompany: " ",
			Campaign: " ",
			Roles: " ",
			FilterLabel: [],
			companyData: null,
			realmData: null,
			campaignData: null,
			rolesData: null,
			campaignDataO: null,
			Status: " "
		};
	}

	handleChangeFilter = (e: any, label: any) => {
		if (label === "Company") {
			this.setState({ Campaign: " " });
			if (this.state.campaignData !== null) {
				this.setState({
					campaignData:
						this.state.campaignDataO !== null ||
							this.state.campaignDataO !== undefined
							? this.state.campaignDataO.filter(
								(camp: any) => camp.company === e
							)
							: null
				});
			}
			if (e === " ") {
				this.setState({
					campaignData: this.state.campaignDataO
				});
			}
		}
		if (label === "SortByUser") {
			label = "SortBy";
		}
		this.setState({
			[label]: e
		});
	};

	ApplyFilter = () => {
		this.props.FilterApplyButton({
			sortby: this.state.SortBy,
			active:
				this.state.ActiveStatus === " "
					? this.state.Status
					: this.state.ActiveStatus,
			realm: this.state.Realm,
			company: this.state.Company,
			roles: this.state.Roles,
			hasCompany: this.state.HasCompany,
			campaign: this.state.Campaign
		});
	};

	componentDidMount() {
		const filterArr = [];
		if (this.props.sortBy) {
			filterArr.push("Sort By");
		}
		if (this.props.activeStatus) {
			filterArr.push("Active Status");
		}
		if (this.props.realm) {
			filterArr.push("Realm");
		}
		if (this.props.company) {
			filterArr.push("Company");
		}
		if (this.props.hasCompany) {
			filterArr.push("Has Company");
		}
		if (this.props.campaign) {
			filterArr.push("Campaign");
		}
		if (this.props.roles) {
			filterArr.push("Roles");
		}
		if (this.props.sortByUser) {
			filterArr.push("Sort By User");
		}
		if (this.props.status) {
			filterArr.push("Status");
		}
		this.setState({
			FilterLabel: filterArr
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid container style={{ margin: 10 }}>
					<Grid item xs={10}>
						<Grid
							container
							spacing={4}
							style={{
								display: "flex",
								alignItems: "center",
								flexDirection: "row",
								width: "100%",
								padding: "0px 8px"
							}}
						>
							{Filter !== null &&
								Filter.map((toolbar: any, i: number) => {
									if (this.state.FilterLabel.includes(toolbar.Label)) {
										return (
											<Grid
												item
												key={i}
												xs={
													this.state.FilterLabel.length <= 3
														? 4
														: this.state.FilterLabel.length === 4
															? 3
															: this.state.FilterLabel.length === 5 ||
																this.state.FilterLabel.length === 6
																? 2
																: 1
												}
											>
												<TextField
													margin="normal"
													disabled={
														this.state.Company !== " "
															? toolbar.Label.replace(/\s/g, "") ===
																"HasCompany"
																? true
																: false
															: false
													}
													select
													value={
														toolbar.Label.replace(/\s/g, "") === "SortByUser"
															? this.state.SortBy
															: toolbar.Label.replace(/\s/g, "") === "SortBy"
																? this.state.SortBy
																: toolbar.Label.replace(/\s/g, "") ===
																	"ActiveStatus"
																	? this.state.ActiveStatus
																	: toolbar.Label.replace(/\s/g, "") === "Realm"
																		? this.state.Realm
																		: toolbar.Label.replace(/\s/g, "") === "Company"
																			? this.state.Company
																			: toolbar.Label.replace(/\s/g, "") ===
																				"HasCompany"
																				? this.state.HasCompany
																				: toolbar.Label.replace(/\s/g, "") === "Campaign"
																					? this.state.Campaign
																					: toolbar.Label.replace(/\s/g, "") === "Roles"
																						? this.state.Roles
																						: toolbar.Label.replace(/\s/g, "") === "Status"
																							? this.state.Status
																							: ""
													}
													label={
														toolbar.Label === "Sort By User"
															? "Sort By"
															: toolbar.Label
													}
													onChange={(e) =>
														this.handleChangeFilter(
															e.target.value,
															toolbar.Label.replace(/\s/g, "")
														)
													}
													style={{ width: "100%" }}
													InputProps={{
														classes: {
															underline: classes.inputField,
															root: classes.inputField
														}
													}}
												>
													{toolbar.Label.replace(/\s/g, "") === "Roles" ||
														toolbar.Label.replace(/\s/g, "") === "Company" ||
														toolbar.Label.replace(/\s/g, "") === "Campaign" ||
														toolbar.Label.replace(/\s/g, "") === "Realm" ? (
															<MenuItem
																key={i}
																value=" "
																style={{ textAlign: "left" }}
															>
																All
                            </MenuItem>
														) : null}
													{toolbar.Label.replace(/\s/g, "") === "Roles" &&
														this.state.rolesData !== null &&
														this.state.rolesData !== undefined
														? this.state.rolesData.map(
															(option: any, i: number) => (
																<MenuItem
																	key={i}
																	value={option.pk}
																	style={{ textAlign: "left" }}
																>
																	{option.name}
																</MenuItem>
															)
														)
														: toolbar.Label.replace(/\s/g, "") === "Company" &&
															this.state.companyData !== null &&
															this.state.companyData !== undefined
															? this.state.companyData.map(
																(option: any, i: number) => (
																	<MenuItem
																		key={i}
																		value={option.uuid}
																		style={{ textAlign: "left" }}
																	>
																		{option.name}
																	</MenuItem>
																)
															)
															: toolbar.Label.replace(/\s/g, "") === "Campaign" &&
																this.state.campaignData !== null &&
																this.state.campaignData !== undefined
																? this.state.campaignData.map(
																	(option: any, i: number) => (
																		<MenuItem
																			key={i}
																			value={option.uuid}
																			style={{ textAlign: "left" }}
																		>
																			{option.name}
																		</MenuItem>
																	)
																)
																: toolbar.Label.replace(/\s/g, "") === "Realm" &&
																	this.state.realmData !== null &&
																	this.state.realmData !== undefined
																	? this.state.realmData.map(
																		(option: any, i: number) => (
																			<MenuItem
																				key={i}
																				value={option.uuid}
																				style={{ textAlign: "left" }}
																			>
																				{option.name}
																			</MenuItem>
																		)
																	)
																	: toolbar.options.map((option: any, i: number) => (
																		<MenuItem
																			key={i}
																			value={`${option.value}`}
																			style={{ textAlign: "left" }}
																		>
																			{option.display}
																		</MenuItem>
																	))}
												</TextField>
											</Grid>
										);
									} else {
										return null;
									}
								})}
						</Grid>
					</Grid>
					<Grid
						item
						xs={2}
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Grid item style={{ paddingTop: "25px", width: "70%" }}>
							<ApplyBtn
								variant="contained"
								style={{
									width: "100%",
									backgroundColor: "#7C8A97",
									color: "#eeeeee"
								}}
								onClick={() => this.ApplyFilter()}
							>
								Apply
              </ApplyBtn>
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	}
}

const FilterToolBar = withStyles(useStyles)(FilterToolBarComp);

FilterToolBar.defaultProps = {
	FilterApplyButton: () => { },
};

export { FilterToolBar };
