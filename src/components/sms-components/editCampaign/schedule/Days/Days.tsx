import React from "react";
import { withStyles } from "@material-ui/core/styles";
import EventCard from "./EventCardComponent";
import Grid from "@material-ui/core/Grid";
import SmsSettings from "./SmsSettings";
import Loader from "../../common-components/LoaderDialog";
import SnackBar from "../../common-components/SnackBar";
import ConfirmDelete from "../../common-components/Confirmation";
import * as currWeek from "./Week";
import { mockData } from "../../../Campaigns/mockData";

// import api from "../../../../services/fetchApi";

const styles = (theme: any) => ({
	tab: {
		backgroundColor: "#eeeeee"
	}
});
interface Props {
	id: any;
}

interface State {
	openAddEvent: boolean;
	minutes: string;
	minutesOptions: any;
	days: any;
	message: string;
	addDialog: boolean;
	showLoader: boolean;
	showSnackbar: boolean;
	successMessage: string;
	id: string;
	currDayId: string;
	schedules: any;
	confirmDelete: boolean;
	day1: any;
	day2: any;
	day3: any;
	day4: any;
	day5: any;
	day6: any;
	day7: any;
	[x: number]: any;
	[x: string]: any;
}
class Days extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);

		this.state = {
			openAddEvent: false,
			minutes: "",
			minutesOptions: [],
			days: [],
			message: "",
			addDialog: true,
			showLoader: false,
			showSnackbar: false,
			successMessage: "",
			id: "",
			currDayId: "",
			schedules: [],
			confirmDelete: false,
			day1: [],
			day2: [],
			day3: [],
			day4: [],
			day5: [],
			day6: [],
			day7: []
		};
	}

	fetchMinutesOptions = () => {
		// api.fetch(`/options`, "get").then(res => {
		//   this.setState({
		//     minutesOptions: res.data[7].preSchedMinutes
		//   });
		// });
		this.setState({
			minutesOptions: mockData.options[7].preSchedMinutes
		});
	};

	fetchDays = () => {
		let daysArr: any = [];

		mockData.days.forEach((day: any) => {
			currWeek.day.forEach((week: any) => {
				if (day.name === week.day) {
					daysArr.push({ day: day, date: week.date });
				}
			});
		});
		this.setState({ days: daysArr });

		// api
		// .fetch(`/days`, "get")
		//   .then(res => {
		//     res.data.forEach(day => {
		//       currWeek.day.forEach(week => {
		//         if (day.name === week.day) {
		//           daysArr.push({ day: day, date: week.date });
		//         }
		//       });
		//     });
		//     this.setState({ days: daysArr });
		//   });
	};

	fetchSched = () => {
		this.setState({ schedules: mockData.days });
		// api
		//   .fetch(`/schedules`, "get")
		//   .then(res => this.setState({ schedules: res.data }));
	};

	componentDidMount() {
		this.fetchMinutesOptions();
		this.fetchDays();
		this.fetchSched();
		for (var i = 1; i <= 7; i++) {
			this.fetchEventDetails(i);
		}
	}

	toggleAddEventDialog = (val: any) => {
		this.setState({
			openAddEvent: !this.state.openAddEvent,
			minutes: "",
			message: "",
			addDialog: true,
			currDayId: val
		});
	};

	handleEditEventDialog = (id: any) => {
		this.setState({
			openAddEvent: !this.state.openAddEvent,
			id: id,
			addDialog: false
		});
		var editID: any = id;
		var schedTemp: any = mockData.schedules;
		var schedIndex: any = schedTemp.indexOf(
			schedTemp.find(({ id }: any) => id === editID)
		);
		this.setState({
			minutes: schedTemp[schedIndex].minutes,
			message: schedTemp[schedIndex].message
		});
		// api
		//   .fetch(`/schedules/${id}`, "get")
		//   .then(res => {
		//     this.setState({
		//       minutes: res.data.minutes,
		//       message: res.data.message
		//     });
		//   });
	};

	handleTime = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleTextChange = (event: any) => {
		// let str = [];
		// str.push(event.target.value);
		// if (str[0].length <= this.state.textLimit) {
		//   this.setState(
		//     {
		//       [event.target.name]: event.target.value
		//     },
		//     () => {
		//       let rem = this.state.textLimit - this.state.message.length;
		//       this.setState({ remStr: rem });
		//     }
		//   );arr
		// }
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	addSchedule = () => {
		this.setState({
			openAddEvent: !this.state.openAddEvent,
			showLoader: true
		});

		let sched: any = this.state.schedules;
		let id: any = 0;
		if (sched.length) {
			id = sched[sched.length - 1].id;
		}
		let data: any = JSON.stringify({
			id: parseInt(id) + 1,
			day: this.state.currDayId,
			campaignId: this.props.id,
			message: this.state.message,
			minutes: this.state.minutes,
			timestamp: new Date().toISOString()
		});

		var addTemp: any = mockData.schedules;
		addTemp.push(data);
		// var index = addTemp.indexOf(addTemp.find(({ id }) => id === id1));

		setTimeout(() => {
			this.setState({
				showLoader: false,
				schedules: addTemp
			});
			this.handleSnackbar("add");
		}, 1500);
		console.log(addTemp);
		// api
		//   .fetch(`/schedules`, "post", data, "application/json")
		//   .then(res => {
		//     this.setState({
		//       showLoader: !this.state.showLoader
		//     });
		//     this.handleSnackbar("add");
		//     this.fetchSched();
		//   });
	};

	editSchedule = () => {
		this.setState({
			openAddEvent: !this.state.openAddEvent,
			showLoader: !this.state.showLoader
		});

		this.updateEvent();
	};

	updateEvent = () => {
		let data: any = JSON.stringify({
			minutes: this.state.minutes,
			message: this.state.message
		});
		var updateTemp: any = mockData.schedules;
		updateTemp.push(data);
		this.setState({
			showLoader: !this.state.showLoader,
			schedules: updateTemp
		});
		this.handleSnackbar("edit");
		// api
		//   .fetch(`/schedules/${this.state.id}`, "patch", data, "application/json")
		//   .then(res => {
		//     console.log(res);
		//     this.setState({
		//       showLoader: !this.state.showLoader
		//     });
		//     this.handleSnackbar("edit");
		//   });
	};

	handleSnackbar = (type: any) => {
		this.setState({
			showSnackbar: true
		});

		if (type === "add") {
			this.setState({
				successMessage: "New event added"
			});
		} else if (type === "delete") {
			this.setState({
				successMessage: "Successfully deleted schedule"
			});
		} else {
			this.setState({
				successMessage: "Event updated!"
			});
		}
	};

	confirmDelete = (type: any) => {
		if (type === "open") {
			this.setState({
				openAddEvent: !this.state.openAddEvent,
				confirmDelete: !this.state.confirmDelete
			});
		} else if (type === "cancel") {
			this.setState({
				confirmDelete: !this.state.confirmDelete
			});
		}
	};

	deleteMessage = () => {
		this.setState({
			confirmDelete: !this.state.confirmDelete,
			showLoader: !this.state.showLoader
		});
		var deleteTemp: any = mockData.schedules;
		var deleteIndex: any = deleteTemp.indexOf(
			deleteTemp.find(({ id }: any) => id === this.state.id)
		);
		deleteTemp.splice(deleteIndex, 1);
		this.setState({
			showLoader: !this.state.showLoader
		});
		this.handleSnackbar("delete");
		// api
		//   .fetch(`/schedules/${this.state.id}`, "delete", null, "application/json")
		//   .then(res => {
		//     this.setState({
		//       showLoader: !this.state.showLoader
		//     });
		//     this.handleSnackbar("delete");
		//   });
	};

	fetchEventDetails = (day_id: any) => {
		let arr: any = [];
		let result: any = [];

		var eventTemp = this.state.schedules;
		eventTemp.forEach((data: any) => {
			if (data.day === day_id && data.campaignId === this.props.id) {
				result.push(data);
			}
		});

		result.forEach((ress: any) => {
			let a = new Date(ress.timestamp)
				.toLocaleDateString("en-us", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit"
				})
				.split("/");
			var y = a.splice(-1)[0];
			a.splice(0, 0, y);
			var date = a.join("-");
			currWeek.week.forEach((w: any) => {
				if (w === date) {
					arr.push(ress);
				}
			});
		});

		this.setState({
			[`day${day_id}`]: arr
		});

		// api
		//   .fetch(
		//     `http://localhost:4000/schedules?day=${day_id}&campaignId=${this.props.id}`,
		//     "get"
		//   )
		//   .then(res => {
		//     res.data.forEach(ress => {
		//       let a = new Date(ress.timestamp)
		//         .toLocaleDateString("en-us", {
		//           year: "numeric",
		//           month: "2-digit",
		//           day: "2-digit"
		//         })
		//         .split("/");
		//       var y = a.splice(-1)[0];
		//       a.splice(0, 0, y);
		//       var date = a.join("-");
		//       currWeek.week.forEach(w => {
		//         if (w === date) {
		//           arr.push(ress);
		//         }
		//       });
		//     });

		//     this.setState({
		//       [`day${day_id}`]: arr
		//     });
		//   });
	};

	handleCloseSnackbar = () => this.setState({ showSnackbar: false });

	refreshMount = () => {
		this.componentDidMount();
	};

	render() {
		return (
			<React.Fragment>
				<Grid container spacing={4}>
					{this.state.days.map((list: any, id: any) => {
						return (
							<Grid item xs={12} sm={6} md={4} lg={4} key={id}>
								<EventCard
									add={this.toggleAddEventDialog}
									day={list.day.name}
									id={list.day.id}
									date={list.date}
									handleEditDialog={this.handleEditEventDialog}
									currentId={this.state.id}
									campaignId={this.props.id}
									fetchEventDetails={this.fetchEventDetails}
									schedules={(this.state as any)[`day${list.day.id}`]}
								/>
							</Grid>
						);
					})}
				</Grid>
				<SmsSettings
					open={this.state.openAddEvent}
					toggleDialog={this.toggleAddEventDialog}
					minutes={this.state.minutes}
					minutesOptions={this.state.minutesOptions}
					handleTime={this.handleTime}
					message={this.state.message}
					handleTextChange={this.handleTextChange}
					addDialog={this.state.addDialog}
					addSchedule={this.addSchedule}
					deleteMessage={this.confirmDelete}
					editSchedule={this.editSchedule}
					refresh={this.refreshMount}
				/>
				<Loader open={this.state.showLoader} />
				<ConfirmDelete
					open={this.state.confirmDelete}
					deleteMessage={this.deleteMessage}
					confirmDelete={this.confirmDelete}
					refresh={this.refreshMount}
				/>
				<SnackBar
					open={this.state.showSnackbar}
					onClose={this.handleCloseSnackbar}
					message={this.state.successMessage}
				/>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Days);
