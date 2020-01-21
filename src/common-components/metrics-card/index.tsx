import React from "react";
import { Typography, Divider } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { SeeChartButton } from "../buttons";
import styled from "styled-components";

/**
 * ==============================================================================
 * <MetricsCard />
 * ------------------------------------------------------------------------------
 * @param {string}   title           Card Title
 * @param {string}   status          Type of change (increase,decrease,none)
 * @param {number}   percentage      Amount value of change
 * @param {string}   mode            Type of mode (bills,sales)
 * @param {array}    content         Content Data values
 * @return {ReactElement}
 * ==============================================================================
 */

interface Content {
	tag: string;
	value: number;
}

interface Props {
	title: string;
	status: string;
	percentage: number;
	mode: string;
	content: Content[];
	handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const defaultProps = {
	title: "Text Title",
	status: "increase",
	percentage: 90.2,
	mode: "bills",
	content: [
		{
			tag: "Last 90 days",
			value: 0.2
		},
		{
			tag: "Minimum",
			value: 0.21
		},
		{
			tag: "Average",
			value: 0.34
		},
		{
			tag: "Maximum",
			value: 0.84
		}
	],
	handleClick: () => console.log("Opening Chart...")
};

const theme = createMuiTheme({
	shape: {
		borderRadius: 0
	}
});

const MetricsCard: React.FC<Props> = ({
	title,
	status,
	percentage,
	content,
	mode,
	handleClick
}) => {
	const renderPercentage: Function = () => {
		return (
			<>
				<PercentContainer>
					{renderStatusArrow()}
					{renderPercentValue()}
				</PercentContainer>
				<Divider
					style={{
						marginTop: "16px",
						height: "2px"
					}}
				/>
			</>
		);
	};

	const renderListing: Function = () => {
		return (
			<ListContainer>
				{content.map((list: Content, i: number) => {
					return (
						<List
							key={i}
							style={{
								marginTop: DynamicMargin(list)
							}}
						>
							<ListText
								style={{
									color: TagColor(list)
								}}
							>
								{list.tag}:
              </ListText>

							<ListText
								style={{
									color: "#7c8a97"
								}}
							>
								{TwoDecimal(list.value)}
							</ListText>
						</List>
					);
				})}
			</ListContainer>
		);
	};

	const renderPercentValue: Function = () => {
		return (
			<>
				<Percentage
					style={{
						color: StatusControlStyle("color-percent")
					}}
				>
					{TwoDecimal(percentage)}%
        </Percentage>
			</>
		);
	};

	const renderStatusArrow: Function = () => {
		return status === "increase" || status === "decrease" ? (
			<>
				<PlayArrow
					style={{
						fontSize: "34px",
						marginTop: StatusControlStyle("margin-top"),
						marginRight: "19px",
						color: StatusControlStyle("color"),
						transform: StatusControlStyle("transform")
					}}
				/>
			</>
		) : null;
	};

	const StatusControlStyle: Function = (type: String) => {
		switch (type) {
			case "margin-top":

				return status === "decrease"
					? "1px"
					: status === "increase"
						? "6px"
						: "0px";

			case "color":

				return status === "decrease" ? "#ff504d" : "#a6c556";

			case "color-percent":

				return status === "decrease"
					? "#ff504d"
					: status === "increase"
						? "#a6c556"
						: "#50555a";

			case "transform":

				return status === "decrease" ? "rotate(-270deg)" : "rotate(-90deg)";

			default:
				return "";
		}
	};

	const DynamicMargin: Function = (list: Content) => {
		let index = IndexOf(list);

		if (index === 0) {
			return "18px";
		} else if (index === 1) {
			return "6px";
		} else {
			return "4px";
		}
	};

	const TagColor: Function = (list: Content) => {
		if (IndexOf(list) === 0) {
			return "#bbbbbb";
		} else {
			return "#50555a";
		}
	};

	const IndexOf: Function = (list: Content) => {
		return content.indexOf(list);
	};

	const TwoDecimal: Function = (value: number) => {
		return value.toFixed(2);
	};

	const renderChartButton: Function = () => {
		return (
			<div
				style={{
					width: "inherit",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					marginTop: `${mode === "bills" ? "9px" : "17px"}`
				}}
			>
				<SeeChartButton mode={mode} handleClick={handleClick} />
			</div>
		);
	};

	return (
		<MuiThemeProvider theme={theme}>
			<MetricContainer
				style={{
					height: `${mode === "bills" ? "306px" : "238px"}`
				}}
			>
				<div
					style={{
						margin: "19px 21px"
					}}
				>
					<Title>{title}</Title>
					{mode === "bills" && renderPercentage()}
					{renderListing()}
					{renderChartButton()}
				</div>
			</MetricContainer>
		</MuiThemeProvider>
	);
};

MetricsCard.defaultProps = defaultProps as Partial<Props>;

const MetricContainer = styled.div`
  min-height: 240px;
  border-radius: 3px;
  border: solid 1px #eeeeee;
`;

const Title = styled(Typography)`
  font-size: 16px !important;
  font-weight: 500 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #50555a;
  margin-bottom: -7px;
`;

const Percentage = styled(Typography)`
  font-size: 34px !important;
  font-weight: 500 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const PercentContainer = styled.div`
  margin-top: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListText = styled(Typography)`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export { MetricsCard };
