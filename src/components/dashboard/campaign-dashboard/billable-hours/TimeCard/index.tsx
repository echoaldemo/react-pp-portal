import React, { useEffect } from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import styled from "styled-components";

const theme = createMuiTheme({});


const HtmlTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid #dadde9"
	}
}))(Tooltip);

const TimeContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 602px;
	height: 121px;
	margin-top: 20px;
`;

const Begin = styled.div`
	height: inherit;
	background: rgba(102, 152, 199, 0.85);
	max-width: 264px;
	border-radius: 6px 0 0 6px;
`;

const Break = styled.div`
	height: inherit;
	background: rgba(248, 149, 35, 0.85);
`;

const End = styled.div`
	height: inherit;
	max-width: 264px;
	background: #7da7ce;
	border-radius: 0px 6px 6px 0px;
`;

const Title = styled(Typography)`
	color: #fff;
	font-size: 16px !important;
	margin: 7px 9px !important;
`;

const Option = styled(Typography)`
	font-size: 14px !important;
	color: #2e2f30;
	margin: 0 0 0 9px !important;
`;

interface Props {
	mode: string
	lateStart: number
	startHours: number
	breakHours: number
	endHours: number
	bgColor: any
	title: any
	sub: any
}

const TimeCard = (props: Props) => {
	//const [dimension, setDimension] = useState(null);

	useEffect(() => {
		updateWindowsDimension();
		window.addEventListener("resize", updateWindowsDimension);
	}, []);

	function updateWindowsDimension() {
		//setDimension({ width: window.innerWidth, height: window.innerHeight });
	}

	function getLateStart() {
		return `0 0 0 ${(props.lateStart / 180) * 264}px`;
	}

	function calculatedStyle() {
		let fullWidth = 602;
		let startWidth = 264;
		let midWidth = 68;
		let endWidth = 264;

		let sWidth: any = `${
			props.mode === "small"
				? startWidth * (props.startHours / 6.5)
				: fullWidth * (props.startHours / 6.5)
			}`;

		let smWidth = `${
			props.mode === "small"
				? midWidth * (1 / props.breakHours)
				: midWidth
			}px`;

		let seWidth = `${
			props.mode === "small"
				? endWidth * (props.endHours / 6.5)
				: fullWidth * (props.endHours / 6.5)
			}`;

		console.log("Late Start: ", props.lateStart);

		return [
			{
				maxWidth: `${
					props.lateStart > 0 && props.mode !== "small"
						? sWidth - ((props.lateStart / 180) * 264 + 14)
						: sWidth
					}px`,
				width: `${sWidth}px`,
				backgroundColor: props.bgColor,
				margin: `${props.lateStart && getLateStart()}`
			},
			{
				width: smWidth,
				margin: "0 3px"
			},
			{
				maxWidth: `${
					props.lateStart > 0 && props.mode === "small"
						? sWidth + 3
						: sWidth
					}px`,
				width: `${seWidth}px`,
				backgroundColor: props.bgColor
			}
		];
	}

	return (
		<MuiThemeProvider theme={theme}>
			<HtmlTooltip
				placement="right"
				title={
					<>
						<div style={{ minHeight: "150px" }}>
							<Typography color="inherit">
								{props.title[0] || "Random Station"}
							</Typography>

							<Typography color="inherit">
								<strong>30,000 minutes of calls</strong>
							</Typography>

							<Typography color="inherit">
								<em>Session Delta: Active</em>
							</Typography>

							<Typography color="inherit">
								<em>Active Tango: 3</em>
							</Typography>

							<Typography color="inherit">
								<strong>Status: Online</strong>
							</Typography>
						</div>
					</>
				}
			>
				<TimeContainer
					style={{
						width: `${props.mode === "small" ? "264px" : "603px"}`,
						zIndex: 2
					}}
				>
					<Begin style={calculatedStyle()[0]}>
						<Title>{props.title && props.title[0]}</Title>

						{props.sub &&
							props.sub.map((option: any, i: number) => (
								<Option key={i}>{option}</Option>
							))}
					</Begin>
					<Break style={calculatedStyle()[1]} />
					<End style={calculatedStyle()[2]}>
						<Title style={{ float: "right" }}>
							{props.title && props.title[1]}
						</Title>
					</End>
				</TimeContainer>
			</HtmlTooltip>
		</MuiThemeProvider>
	);
};

export default TimeCard;
