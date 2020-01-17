import React from "react";
import { Paper, Divider, Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";
import TimeCard from "../billable-hours/TimeCard/";
import TimeLine from "../billable-hours/TimeCard/TimeLine.js";
import LabelCard from "../billable-hours/TimeCard/LabelCard.js";

const Center = styled.div`
	width: 728px;
	height: 772px;
	border-left: 2px dashed #eee;
	border-right: 2px dashed #eee;
	padding: 0 62px;
	position: relative;
	zindex: 2;
`;

const Content = styled.div`
	padding-top: 30px;
	width: 604px;
	height: inherit;
	// border-left: 2px dashed rgba(255, 80, 77, 0.5);
	// border-right: 2px dashed rgba(255, 80, 77, 0.5);
`;

const theme = createMuiTheme({});

const useStyles = makeStyles({
	container: {
		width: "inherit",
		height: "772px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		border: "1px solid #eee",
		boxShadow: "1px 1px #fff"
	}
});

const mock = [
	{
		data: [
			{
				title: ["Login Session", "StationX"],
				data: ["Station X", "Rep Info", "Start/Stop"],
				startHours: 3,
				breakHours: 3,
				lateStart: 0,
				endHours: 3
			}
		]
	},
	{
		data: [
			{
				title: [""],
				startHours: 3,
				breakHours: 1,
				endHours: 3,
				lateStart: 0,
				data: [
					"Rep session",
					"Session Info",
					"Start/Stop",
					"Number of calls"
				]
			},
			{
				title: [""],
				data: [],
				uuid: 0,
				lateStart: 0,
				startHours: 3,
				breakHours: 3,
				endHours: 3
			}
		]
	},
	{
		data: [
			{
				title: ["Login Session", "StationX"],
				data: ["Station X", "Rep Info", "Start/Stop"],
				lateStart: 30,
				startHours: 3,
				breakHours: 3,
				endHours: 3
			}
		]
	},
	{
		data: [
			{
				title: [""],
				lateStart: 30,
				startHours: 3,
				breakHours: 3,
				endHours: 3,
				data: []
			},
			{
				title: [""],
				data: [],
				uuid: 0,

				startHours: 3,
				breakHours: 3,
				endHours: 3
			}
		]
	}
];

const Data = props => {
	let classes = useStyles();

	function renderLines() {
		return (
			<>
				<div
					style={{
						width: "266px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<LabelCard
						lineStyle={[
							{
								top: "-575px",

								position: "absolute",
								left: 0,
								height: "610px",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							},
							{
								top: "-300px",
								position: "absolute",
								height: "330px",
								right: "0",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							}
						]}
						mode="large"
						bgColor="rgba(68, 189, 148, 0.85)"
						label="Billable hours"
					/>

					<LabelCard
						lineStyle={[
							{
								top: "-575px",

								position: "absolute",
								left: 0,
								height: "610px",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							},
							{
								top: "-300px",
								position: "absolute",
								height: "330px",
								right: "0",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							}
						]}
						customWidth="98px"
						mode="medium"
						bgColor="rgba(68, 189, 148, 0.85)"
						label=""
					/>
				</div>

				<div
					style={{
						width: "264px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<LabelCard
						lineStyle={[
							{
								top: "-575px",

								position: "absolute",
								left: 0,
								height: "610px",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							},
							{
								top: "-300px",
								position: "absolute",
								height: "330px",
								right: "0",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							}
						]}
						customWidth="122px"
						mode="medium"
						bgColor="rgba(68, 189, 148, 0.85)"
						label=""
					/>

					<LabelCard
						lineStyle={[
							{
								top: "-575px",

								position: "absolute",
								left: 0,
								height: "610px",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							},
							{
								top: "-300px",
								position: "absolute",
								height: "330px",
								right: "0",
								borderLeft: "1.5px dashed #ff504d",
								opacity: "0.5"
							}
						]}
						customWidth="118px"
						mode="medium"
						bgColor="rgba(68, 189, 148, 0.85)"
						label=""
					/>
				</div>
			</>
		);
	}

	return (
		<MuiThemeProvider theme={theme}>
			<Paper square={true} className={classes.container}>
				<Center>
					<Content>
						{mock.map(key => {
							return (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between"
									}}
								>
									{key.data.map(ret => {
										console.log("Ret: ", ret);
										return (
											<TimeCard
												mode={
													key.data.length > 1
														? "small"
														: "large"
												}
												bgColor={
													key.data.length > 1 &&
													"rgba(68, 189, 148, 0.85)"
												}
												lateStart={ret.lateStart}
												startHours={ret.startHours}
												breakHours={ret.breakHours}
												endHours={ret.endHours}
												title={ret.title}
												sub={ret.data}
											/>
										);
									})}
								</div>
							);
						})}
					</Content>

					<div
						style={{
							position: "absolute",
							// backgroundColor: "red",
							height: "inherit",
							width: "91%",
							top: "5%",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							zIndex: 1
						}}
					>
						<div />
						<div
							style={{
								height: "inherit",
								borderLeft: "2px dashed #eee",
								opacity: 0.5
							}}
						/>

						<div
							style={{
								height: "inherit",
								borderLeft: "2px dashed #eee",
								opacity: 0.5
							}}
						/>

						<div
							style={{
								height: "inherit",
								borderLeft: "2px dashed #eee",
								opacity: 0.5
							}}
						/>
						<div />
					</div>
				</Center>

				<div
					style={{
						width: "605px",
						marginBottom: "40px",
						marginLeft: "-4px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					{renderLines()}
				</div>
			</Paper>
			<TimeLine />
		</MuiThemeProvider>
	);
};

export default Data;
