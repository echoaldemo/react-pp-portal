import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Events from "./Events";
import "./scrollbar.css";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
// import api from "../../../../services/fetchApi";

const styles = (theme: any) => ({
	card: {
		maxWidth: 445
	},
	media: {
		height: 0,
		paddingTop: "56.25%" // 16:9
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	},
	cardContent: {
		height: "200px",
		"@media(max-width:768px)": {
			maxHeight: "180px"
		},
		padding: "0px",
		backgroundColor: "#FAFAFA"
		// overflowY: "auto"
	},
	addEventText: {
		color: "#1194f6",
		fontSize: 16
	},
	noData: {
		display: "flex",
		// flexDirection: "column",
		alignItems: "center",
		justifyItems: "center"
	},
	days: {
		"& .MuiCardHeader-subheader": {
			color: "#777777",
			fontSize: 14,
			fontWeight: 500,
			marginTop: "-20px",
			marginLeft: "80px"
		},
		"& .MuiCardHeader-title": {
			color: "#444851",
			fontSize: "17px",
			fontWeight: 600
		}
	},
	wednesday: {
		"& .MuiCardHeader-subheader": {
			color: "#777777",
			fontSize: 14,
			fontWeight: 500,
			marginTop: "-20px",
			marginLeft: "113px"
		},
		"& .MuiCardHeader-title": {
			color: "#444851",
			fontSize: "17px",
			fontWeight: 600
		}
	},
	thursday: {
		"& .MuiCardHeader-subheader": {
			color: "#777777",
			fontSize: 14,
			fontWeight: 500,
			marginTop: "-20px",
			marginLeft: "93px"
		},
		"& .MuiCardHeader-title": {
			color: "#444851",
			fontSize: 17,
			fontWeight: 600
		}
	},
	friday: {
		"& .MuiCardHeader-subheader": {
			color: "#777777",
			fontSize: 14,
			fontWeight: 500,
			marginTop: "-20px",
			marginLeft: "65px"
		},
		"& .MuiCardHeader-title": {
			color: "#444851",
			fontSize: 17,
			fontWeight: 600
		}
	},
	xs: {
		"& .MuiCardHeader-subheader": {
			color: "#777777",
			fontSize: 14,
			fontWeight: 500
		},
		"& .MuiCardHeader-title": {
			color: "#444851",
			fontSize: 17,
			fontWeight: 600
		}
	},
	add: {
		fontFamily: "Roboto, Helvetica, sans-serif",
		fontSize: 16,
		fontWeight: 300,
		fontStyle: "normal",
		fontStretch: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		color: "#1194f6",
		padding: theme.spacing(0, 1),
		marginTop: "10px"
	}
});

interface Props {
	add: any;
	day: any;
	id: any;
	date: any;
	handleEditDialog: any;
	currentId: any;
	campaignId: any;
	fetchEventDetails: any;
	schedules: any;
}
interface State { }
class HeaderDays extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			schedules: []
		};
	}

	componentDidMount = () => {
		this.props.fetchEventDetails(this.props.id);
	};

	render() {
		const { classes, day, date, handleEditDialog }: any = this.props;
		return (
			<Card className={classes.card} id="data-cy-days">
				<Hidden smUp>
					<CardHeader
						action={
							<IconButton
								aria-label="settings"
								onClick={() => this.props.add(this.props.id)}
								style={{ marginTop: "10px" }}
								id="addEventBtn"
							>
								<AddIcon
									style={{
										color: "#1194f6",
										marginTop: "-5px",
										marginRight: "3px"
									}}
								/>
								<Typography
									variant="body1"
									color="textSecondary"
									component="p"
									className={classes.addEventText}
								>
									Add Event
                </Typography>
							</IconButton>
						}
						title={day}
						subheader={date}
						style={{ backgroundColor: "none" }}
						className={classes.xs}
					/>
				</Hidden>
				<Hidden only="xs">
					<CardHeader
						action={
							<Button
								className={classes.add}
								style={{ backgroundColor: "white" }}
								onClick={() => this.props.add(this.props.id)}
								id="addEventBtn"
							>
								<AddIcon />
								Add Event
              </Button>
							// <React.Fragment>

							//   <span>
							//     <AddIcon />
							//     Add Event
							//   </span>

							// </React.Fragment>
						}
						title={`${day},`}
						subheader={date}
						style={{ backgroundColor: "none" }}
						className={
							day === "Monday" || day === "Sunday"
								? classes.days
								: day.length === 9
									? classes.wednesday
									: day.length === 8
										? classes.thursday
										: day === "Friday"
											? classes.friday
											: classes.days
						}
					/>
				</Hidden>
				<Divider light />
				<CardContent className={classes.cardContent} id="style-1">
					{this.props.schedules.map((event: any, id: number) => {
						let colorbg = "";
						if (id % 2 === 0) {
							colorbg = "white";
						} else {
							colorbg = "#F8F9FA";
						}
						return (
							<Events
								key={id}
								editSchedule={handleEditDialog}
								color={colorbg}
								minutes={event.minutes}
								message={event.message}
								id={event.id}
							/>
						);
					})}

					{this.props.schedules.length === 0 ? (
						<div className={classes.noData}>
							{/* <img
                src={NoDataImage}
                style={{ marginTop: "15%", width: "50px" }}
                alt=""
              /> */}
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
								style={{ marginTop: "26%" }}
							>
								No event created yet
              </Typography>
						</div>
					) : (
							""
						)}
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(HeaderDays);
