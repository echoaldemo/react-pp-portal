import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Settings from "./settings/settings";
import Schedule from "./schedule/schedule";
import { mockData } from "../Campaigns/mockData";
import { styles } from "./styles/style";
// import api from "../../services/fetchApi";
interface Props {
	match: any;
	classes: any;
}
interface State {
	main: any;
	id: any;
	CampaignDetails: any;
	token: any;
	audio?: any;
	loaded?: any;
}
class EditCampaign extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
		let type: any = "";
		if (this.props.match.params.type === "schedule") {
			type = 1;
		} else {
			type = 0;
		}
		this.state = {
			token: "",
			main: type,
			id: this.props.match.params.cid,
			CampaignDetails: {
				name: "",
				uuid: "",
				longTransfer: 0,
				closeLead: "",
				closeDuration: 0,
				revenue: 0,
				setLongTransfers: true,
				repostRules: "",
				localMatch: true,
				// numberList: "",
				aiRules: 0,
				voiceSched: false,
				amd: false,
				leadsPerDay: "",
				delType: "",
				transfers: 0,
				maxCps: 0,
				recordCalls: false,
				fallbackTransfer: false,
				fallbackTimeOut: 0,
				fallbackNumber: 0,
				callsms: [],
				audio: [{ url: "", name: "" }],
				loaded: false,
				token: ""
			}
		};
	}

	componentDidMount() {
		// api
		// 	.fetch(API_URL, "get", null, "application/json", `Token ${token}`)
		// 	.then(res => {
		// 		res.data.map(data => {
		// 			const API_URL2 = `http://devswarm.perfectpitchtech.com/pitch/audio/version/d2f8b470-89ff-11e8-a0f9-12000c78c501/prospect/91dd2102-9283-11e7-a3d8-02420aff0015/${data.key}/`;
		// 			api
		// 				.fetch(API_URL2, "get", null, "application/json", `Token ${token}`)
		// 				.then(res => {
		// 					audio.push({
		// 						url: res.data.original_url,
		// 						name: res.data.audio.text
		// 					});
		// 				});
		// 		});
		// 		this.setState({
		// 			audio,
		// 			loaded: true
		// 		});
		//   });
		//--------------

		// api.fetch(`/data/${this.state.id}`, "get").then(res => {
		//   this.setState({
		//     CampaignDetails: {
		//       name: res.data.name,
		//       longTransfer: res.data.longTransfer,
		//       closeLead: res.data.closeLead,
		//       closeDuration: res.data.closeDuration,
		//       revenue: res.data.revenue,
		//       setLongTransfers: res.data.setLongTransfers,
		//       repostRules: res.data.repostRules,
		//       numberList_id: res.data.numberList_id,
		//       localMatch: res.data.localMatch,
		//       aiRules: res.data.aiRules,
		//       voiceSched: res.data.voiceSched,
		//       amd: res.data.amd,
		//       leadsPerDay: res.data.leadsPerDay,
		//       delType: res.data.delType,
		//       transfers: res.data.transfers,
		//       maxCps: res.data.maxCps,
		//       recordCalls: res.data.recordCalls,
		//       fallbackTransfer: res.data.fallbackTransfer,
		//       fallbackTimeOut: res.data.fallbackTimeOut,
		//       fallbackNumber: res.data.fallbackNumber,
		//       days: res.data.days,
		//       callsms: res.data.callsms,
		//       uuid: res.data.uuid
		//     }
		//   });
		//   document.title = res.data.name;
		// });

		this.fetchCampaignDetails();
		this.setState({
			token: localStorage.getItem("ngStorage-ppToken")
		});
	}

	fetchCampaignDetails = () => {
		var temp: any = mockData.data;
		var index = temp.indexOf(temp.find(({ id }: any) => id === this.state.id));
		var res = { data: temp[index] };
		this.setState({
			CampaignDetails: {
				name: res.data.name,
				longTransfer: res.data.longTransfer,
				closeLead: res.data.closeLead,
				closeDuration: res.data.closeDuration,
				revenue: res.data.revenue,
				setLongTransfers: res.data.setLongTransfers,
				repostRules: res.data.repostRules,
				numberList_id: res.data.numberList_id,
				localMatch: res.data.localMatch,
				aiRules: res.data.aiRules,
				voiceSched: res.data.voiceSched,
				amd: res.data.amd,
				leadsPerDay: res.data.leadsPerDay,
				delType: res.data.delType,
				transfers: res.data.transfers,
				maxCps: res.data.maxCps,
				recordCalls: res.data.recordCalls,
				fallbackTransfer: res.data.fallbackTransfer,
				fallbackTimeOut: res.data.fallbackTimeOut,
				fallbackNumber: res.data.fallbackNumber,
				days: res.data.days,
				callsms: res.data.callsms,
				uuid: res.data.uuid
			}
		});
	};

	mainTabChange = (e: any, value: any) => {
		this.setState({
			main: value
		});
	};

	// Changes to data
	CDDataChange = (name: any, value: any) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				[name]: value
			}
		});

		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify(data),
		//   "application/json"
		// );

		if (name === "Name") {
			document.title = value;
		}
	};

	updateCampaigndetails = (
		name: any,
		longTransfer: any,
		closeLead: any,
		closeDuration: any,
		revenue: any,
		setLongTransfers: any,
		repostRules: any
	) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				name,
				longTransfer,
				closeLead,
				closeDuration,
				revenue,
				setLongTransfers,
				repostRules
			}
		});

		// api
		//   .fetch(
		//     `/data/${this.state.id}`,
		//     "patch",
		//     JSON.stringify({
		//       name,
		//       longTransfer,
		//       closeLead,
		//       closeDuration,
		//       revenue,
		//       setLongTransfers,
		//       repostRules
		//     }),
		//     "application/json",
		//     null
		//   )
		//   .then(() => {

		////-----------
		// const API_URL = "http://devswarm.perfectpitchtech.com/identity/";
		// const TOKEN = `Token ${this.state.token}`;
		// api
		// 	.fetch(
		// 		`${API_URL}campaign/${this.state.CampaignDetails.uuid}`,
		// 		"get",
		// 		null,
		// 		"application/json",
		// 		TOKEN
		// 	)
		// 	.then(res => {
		// 		api.fetch(
		// 			`${API_URL}campaign/${this.state.CampaignDetails.uuid}/`,
		// 			"patch",
		// 			{
		// 				realms: res.data.realms,
		// 				company: res.data.company,
		// 				name: name,
		// 				active: true,
		// 				archived: true
		// 			},
		// 			"application/json",
		// 			TOKEN
		// 		);
		//   });
		////-----

		// });
	};

	updateAISettings = (aiRules: any, voiceSched: any, amd: any) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				aiRules,
				voiceSched,
				amd
			}
		});
		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify({
		//     aiRules,
		//     voiceSched,
		//     amd
		//   }),
		//   "application/json"
		// );
	};

	updatPhoneNumbers = (numberList_id: any, localMatch: any) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				numberList_id,
				localMatch
			}
		});
		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify({
		//     numberList_id,
		//     localMatch
		//   }),
		//   "application/json"
		// );
	};

	updatDelSettings = (
		leadsPerDay: any,
		delType: any,
		transfers: any,
		maxCps: any
	) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				leadsPerDay,
				delType,
				transfers,
				maxCps
			}
		});

		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify({
		//     leadsPerDay,
		//     delType,
		//     transfers,
		//     maxCps
		//   }),
		//   "application/json"
		// );
	};

	updateTransferCallback = (
		fallbackTransfer: any,
		fallbackTimeOut: any,
		fallbackNumber: any
	) => {
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				fallbackTransfer,
				fallbackTimeOut,
				fallbackNumber
			}
		});

		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify({
		//     fallbackTransfer,
		//     fallbackTimeOut,
		//     fallbackNumber
		//   }),
		//   "application/json"
		// );
	};
	CDcallsmsChange = (id: any, data: any, type: any) => {
		var cs = this.state.CampaignDetails.callsms;
		if (type === "add") {
			for (var x in cs) {
				if (cs[x].id === id) {
					cs[x].totalEvents = cs[x].totalEvents + 1;
					cs[x].events.push(data);
				}
			}
		} else if (type === "delete") {
			for (var y in cs) {
				if (cs[y].id === id) {
					cs[y].totalEvents = cs[y].totalEvents - 1;
					cs[y].events = cs[y].events.filter(
						(event: any) => event.id !== data.id
					);
				}
			}
		} else {
			for (var i in cs) {
				if (cs[i].id === id) {
					for (var j in cs[i].events) {
						if (cs[i].events[j].id === data.id) {
							if (type === "sms") {
								cs[i].events[j].content = data.content;
								cs[i].events[j].minutesBefore = data.minutesBefore;
								cs[i].events[j].delay = data.delay;
								break;
							} else if (type === "calls")
								cs[i].events[j].liveAudio = data.liveAudio;
							cs[i].events[j].transferDigit = data.transferDigit;
							cs[i].events[j].phoneNumber = data.phoneNumber;
							cs[i].events[j].transferAudio = data.transferAudio;
							cs[i].events[j].callBackDigit = data.callBackDigit;
							cs[i].events[j].callBackAudio = data.callBackAudio;
						}
					}
					break;
				}
			}
		}
		this.setState({
			CampaignDetails: {
				...this.state.CampaignDetails,
				callsms: cs
			}
		});
		// let upData = {
		// 	callsms: cs
		// };

		// api.fetch(
		//   `/data/${this.state.id}`,
		//   "patch",
		//   JSON.stringify(upData),
		//   "application/json"
		// );
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.main}>
				<Typography>
					<Link href={"/manage/sms-dashboard"} className={classes.link}>
						<KeyboardArrowLeftIcon /> Back to SMS Dashboard
          </Link>
				</Typography>
				<div className={classes.campaignTitle}>
					{this.state.CampaignDetails.name}
				</div>
				<Paper className={classes.root}>
					<div className={classes.header}>Edit Campaign</div>
					<AppBar position="static" className={classes.tab}>
						<Tabs
							value={this.state.main}
							indicatorColor="secondary"
							onChange={this.mainTabChange}
						>
							<Tab label="Settings" className={classes.text} />
							<Tab label="Schedule" className={classes.text} />
						</Tabs>
					</AppBar>
					{this.state.main === 0 ? (
						<Settings
							id={this.state.id}
							campaignDetails={this.state.CampaignDetails}
							CDDataChange={this.CDDataChange}
							updateCampaigndetails={this.updateCampaigndetails}
							updateAISettings={this.updateAISettings}
							updatPhoneNumbers={this.updatPhoneNumbers}
							updatDelSettings={this.updatDelSettings}
							updateTransferCallback={this.updateTransferCallback}
						/>
					) : (
							<Schedule
								id={this.state.id}
								campaignDetails={this.state.CampaignDetails}
								CDDataChange={this.CDDataChange}
								CDcallsmsChange={this.CDcallsmsChange}
								audio={this.state.audio}
								loaded={this.state.loaded}
							/>
						)}
				</Paper>
			</div>
		);
	}
}

const SMSEdit = withStyles(styles)(EditCampaign);
export { SMSEdit };
