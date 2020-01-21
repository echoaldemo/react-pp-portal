import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import PlayIcon from "@material-ui/icons/PlayArrow";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";

import "./scrollbar.css";
import { styles } from "./css-styles";
import CallsSetting from "./modal/callsSetting";
import AddEvent from "./modal/add";
import SMSSetting from "./modal/smsSetting";
import SnackBar from "../../common-components/SnackBar";
import Confirmation from "./modal/confirmation";

interface Props {
	id: any;
	audio: any;
	loaded: any;
	CDcallsmsChange: any;
	callsms: any;
}
interface State {
	dataid: any;
	eventid: any;
	events: any;
	name: any;
	callsms: any;
	calls: boolean;
	sms: boolean;
	addevent: boolean;
	openDelete: boolean;
	type: any;
	open?: any;
	message?: any;
}
class CallsAndSMS extends Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			dataid: "",
			eventid: "",
			events: {
				id: "",
				name: "",
				content: "",
				delay: "",
				minutesBefore: ""
			},
			name: "",
			callsms: this.props.callsms,
			calls: false,
			sms: false,
			addevent: false,
			openDelete: false,
			type: ""
		};
	}

	handleClose = () => {
		this.setState({
			calls: false,
			sms: false,
			addevent: false,
			openDelete: false,
			type: ""
		});
	};

	cancelDelete = (type: any) => {
		if (type === "sms") {
			this.setState({
				sms: true
			});
		} else {
			this.setState({
				calls: true
			});
		}
	};

	submit = (id: any, data: any, type: any) => {
		this.props.CDcallsmsChange(id, data, type);
		this.handleClose();
	};

	handleSnackBar = () => {
		this.setState({
			open: true,
			message: "SMS details updated"
		});
	};
	handleCallSnackBar = () => {
		this.setState({
			open: true,
			message: "Call details updated"
		});
	};
	handleSnackClose = () => {
		this.setState({
			open: false
		});
	};
	handleEventSnackBar = () => {
		this.setState({
			open: true,
			message: "Added Event"
		});
	};
	handleDeleteSMSSnackBar = () => {
		this.setState({
			open: true,
			message: "SMS Deleted"
		});
	};
	handleDeleteCallSnackBar = () => {
		this.setState({
			open: true,
			message: "Call Deleted"
		});
	};

	openDeleteFunc = (type: any) => {
		if (type === "sms") {
			this.setState({
				openDelete: true,
				sms: false,
				type: type
			});
		} else {
			this.setState({
				openDelete: true,
				calls: false,
				type: type
			});
		}
	};

	delete = () => {
		let data = {
			id: this.state.events.id
		};
		this.submit(this.state.dataid, data, "delete");
		this.setState({
			openDelete: false
		});
	};

	render() {
		const { classes, audio, loaded }: any = this.props;
		return (
			<React.Fragment>
				<Grid container spacing={3}>
					{this.state.callsms.map((data: any) => (
						<Grid item xs={12} sm={6} md={6} lg={4} key={data.id}>
							<Card className={classes.card} id="data-cy-callSmsHours">
								{data.maxEvents === data.totalEvents ? (
									<CardContent>
										<Typography variant="h6" className={classes.title}>
											{data.name}
										</Typography>
									</CardContent>
								) : (
										<CardContent className={classes.headerWithButton}>
											<Typography variant="h6" className={classes.title}>
												{data.name}
											</Typography>
											<Button
												id={data.name.replace(/\s/g, "")}
												className={classes.add}
												style={{ backgroundColor: "white" }}
												onClick={() => {
													this.setState({
														name: data.name,
														dataid: data.id,
														addevent: true
													});
												}}
											>
												<AddIcon /> Add Event
                    </Button>
										</CardContent>
									)}
								<Divider light />
								<div
									style={{
										backgroundColor: "#F8F9FA",
										height: "250px",
										overflowX: "auto"
									}}
									id="style-1"
								>
									{data.events.map((event: any, i: number) =>
										event.name === "SMS" ? (
											<ListItem className={classes.list} key={event.id}>
												<Grid container spacing={3}>
													<Grid item xs={12} className={classes.content}>
														<span className={classes.callsms}>
															<Typography
																variant="subtitle2"
																style={{
																	fontWeight: "bold",
																	textDecoration: "underline",
																	fontSize: 14
																}}
															>
																{event.name}
															</Typography>
															<IconButton
																data-cy={`IOH${i}`}
																onClick={() => {
																	this.setState({
																		dataid: data.id,
																		name: data.name,
																		sms: true,
																		events: {
																			id: event.id,
																			name: event.name,
																			content: event.content,
																			delay: event.delay,
																			minutesBefore: event.minutesBefore
																		}
																	});
																}}
															>
																<SettingsIcon />
															</IconButton>
														</span>
														<span
															style={{
																display: "flex",
																flexDirection: "column",
																fontSize: 14
															}}
														>
															<Typography
																variant="caption"
																style={{ color: "#777777" }}
															>
																{event.content}
															</Typography>
															{event.delay === 0 ? (
																""
															) : (
																	<Typography
																		variant="caption"
																		style={{ color: "#777777" }}
																	>
																		Delay: {event.delay}
																	</Typography>
																)}
															{event.minutesBefore === 0 ? (
																""
															) : (
																	<Typography
																		variant="caption"
																		style={{ color: "#777777" }}
																	>
																		Minutes before: {event.minutesBefore}
																	</Typography>
																)}
														</span>
													</Grid>
												</Grid>
											</ListItem>
										) : (
												<ListItem className={classes.list} key={event.id}>
													<Grid container spacing={3}>
														<Grid item xs={12} className={classes.content}>
															<span className={classes.callsms}>
																<Typography
																	variant="subtitle2"
																	style={{
																		fontWeight: "bold",
																		textDecoration: "underline"
																	}}
																>
																	{event.name}
																</Typography>
																{event.liveAudio.url ? (
																	<span className={classes.callPlay}>
																		<Button
																			className={classes.play}
																			onClick={() => {
																				var audio = new Audio(
																					event.liveAudio.url
																				);
																				audio.play();
																			}}
																		>
																			<PlayIcon /> Play audio
                                  </Button>
																		<IconButton
																			id="audioEditSettings"
																			onClick={() => {
																				this.setState({
																					dataid: data.id,
																					name: data.name,
																					calls: true,
																					events: {
																						id: event.id,
																						name: event.name,
																						content: event.content,
																						delay: event.delay,
																						liveAudio: event.liveAudio,
																						transferDigit: event.transferDigit,
																						phoneNumber: event.phoneNumber,
																						transferAudio: event.transferAudio,
																						callBackDigit: event.callBackDigit,
																						callBackAudio: event.callBackAudio
																					}
																				});
																			}}
																		>
																			<SettingsIcon />
																		</IconButton>
																	</span>
																) : (
																		<IconButton
																			onClick={() => {
																				this.setState({
																					dataid: data.id,
																					name: data.name,
																					calls: true,
																					events: {
																						id: event.id,
																						name: event.name,
																						content: event.content,
																						delay: event.delay,
																						liveAudio: event.liveAudio,
																						transferDigit: event.transferDigit,
																						phoneNumber: event.phoneNumber,
																						transferAudio: event.transferAudio,
																						callBackDigit: event.callBackDigit,
																						callBackAudio: event.callBackAudio
																					}
																				});
																			}}
																		>
																			<SettingsIcon />
																		</IconButton>
																	)}
															</span>
															<span
																style={{
																	display: "flex",
																	flexDirection: "column"
																}}
															>
																<Typography
																	variant="caption"
																	style={{ color: "#777777" }}
																>
																	{event.content}
																</Typography>
																{event.delay === 0 ? (
																	""
																) : (
																		<Typography
																			variant="caption"
																			style={{ color: "#777777" }}
																		>
																			Delay: {event.delay}
																		</Typography>
																	)}
															</span>
														</Grid>
													</Grid>
												</ListItem>
											)
									)}
									{data.events.length !== 0 ? null : (
										<div className={classes.noData}>
											{/* <img
                        alt="NoData"
                        src={NoDataImage}
                        width="50px"
                        style={{ marginTop: "15%" }}
                      /> */}
											<Typography
												variant="body2"
												color="textSecondary"
												component="p"
												style={{ marginTop: "30%" }}
											>
												No Event Scheduled
                      </Typography>
										</div>
									)}
								</div>
							</Card>
						</Grid>
					))}
				</Grid>
				{this.state.calls === true ? (
					<CallsSetting
						open={this.state.calls}
						handleClose={this.handleClose}
						dataid={this.state.dataid}
						name={this.state.name}
						events={this.state.events}
						audio={audio}
						loaded={loaded}
						submit={this.submit}
						snackbar={this.handleCallSnackBar}
						deleteSnackbar={this.handleDeleteCallSnackBar}
						openDelete={this.openDeleteFunc}
					/>
				) : this.state.sms === true ? (
					<SMSSetting
						open={this.state.sms}
						handleClose={this.handleClose}
						dataid={this.state.dataid}
						name={this.state.name}
						events={this.state.events}
						submit={this.submit}
						snackbar={this.handleSnackBar}
						deleteSnackbar={this.handleDeleteSMSSnackBar}
						openDelete={this.openDeleteFunc}
					/>
				) : this.state.addevent === true ? (
					<AddEvent
						open={this.state.addevent}
						handleClose={this.handleClose}
						dataid={this.state.dataid}
						submit={this.submit}
						current={this.state.callsms}
						audio={audio}
						loaded={loaded}
						snackbar={this.handleEventSnackBar}
					/>
				) : this.state.openDelete === true ? (
					<Confirmation
						open={this.state.openDelete}
						confirmDelete={this.openDeleteFunc}
						submit={this.submit}
						delete={this.delete}
						deleteSMSSnackbar={this.handleDeleteSMSSnackBar}
						deleteCallSnackbar={this.handleDeleteCallSnackBar}
						handleClose={this.handleClose}
						type={this.state.type}
						cancelDelete={this.cancelDelete}
					/>
				) : null}
				<SnackBar
					open={this.state.open}
					onClose={this.handleSnackClose}
					message={this.state.message}
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(CallsAndSMS);
