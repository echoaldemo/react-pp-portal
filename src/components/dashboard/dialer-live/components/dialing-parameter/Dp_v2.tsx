/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import {
	TextField,
	InputAdornment,
	Grid,
	createMuiTheme,
	Checkbox
} from "@material-ui/core";
import { MuiThemeProvider, makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#1194f6"
		}
	}
});
const useStyles = makeStyles({
	navBar: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
		margin: "10px"
	},
	Tabs: {
		color: "#919ca7",
		backgroundColor: "#eeeeee",
		borderRadius: "3px",
		width: "58.5%",
		"@media (max-width: 599px)": {
			width: "100%"
		},
		"@media (max-width: 1024px  )": {
			width: "100%"
		}
	},
	indicator: {
		backgroundColor: "transparent"
	},
	activeTab: {
		backgroundColor: "#f4a429",
		color: "#fff",
		fontFamily: "Roboto",
		fontSize: 14,
		fontWeight: 500,
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		textAlign: "center",
		"@media (max-width: 336px)": {
			fontSize: "11px !important"
		},
		"@media (max-width: 425px)": {
			fontSize: 11
		},
		"@media (max-width: 499px)": {
			fontSize: 12
		},
		"@media (max-width: 714px)": {
			fontSize: "12px !important"
		},
		"@media (max-width: 866px)": {
			fontSize: 13
		}
	},
	notActive: {
		fontFamily: "Roboto",
		fontSize: 14,
		fontWeight: 500,
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		textAlign: "center",
		"@media (max-width: 336px)": {
			fontSize: "11px !important"
		},
		"@media (max-width: 425px)": {
			fontSize: 11
		},
		"@media (max-width: 499px)": {
			fontSize: 12
		},
		"@media (max-width: 714px)": {
			fontSize: "12px !important"
		},
		"@media (max-width: 866px)": {
			fontSize: 13
		}
	},
	SelectText: {
		fontFamily: "Roboto",
		fontSize: 16,
		fontHeight: "normal",
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		color: "#1194f6",
		cursor: "pointer"
	},
	checkboxCustom: {
		width: "22px",
		height: "22px",
		borderRadius: "1px"
	},
	unCheckedText: {
		fontFamily: "Roboto",
		fontSize: "16px",
		fontWeight: "normal",
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		color: "#777777",
		cursor: "pointer",
		margin: "10px"
	},
	CheckedText: {
		fontFamily: "Roboto",
		fontSize: "16px",
		fontWeight: "normal",
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		color: "#444851",
		cursor: "pointer",
		margin: "10px"
	},
	copyText: {
		fontFamily: "Roboto",
		fontSize: "18px",
		fontWeight: "normal",
		fontStretch: "normal",
		fontStyle: "normal",
		lineHeight: "normal",
		letterSpacing: "normal",
		color: "#444851"
	}
});

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 420px;
  min-height: 420px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`;
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;
const CloseIcon = styled(Close)`
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 34px 27px 34px;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 27px;
`;

const CloseBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const CloseText = styled.span`
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;
const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`;
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectField = styled(TextField)`
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 17px !important;
    color: #999999 !important;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #1194f6 !important;
    font-size: 17px !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;

const LabelText = styled.label`
  font-weight: bold !important;
  margin-top: 10px !important;
  font-size: 0.8rem !important;
  color: #999999 !important;
`;

const DialingParameter = ({ header, closeFn }: any) => {
	const classes = useStyles();
	const [dialModule, setDialModule] = useState("");
	const [dialInterval, setDialInterval] = useState("");
	const [originTimeout, setOriginTimeout] = useState("");
	const [conference, setConference] = useState("");
	const [softAudio, setSoftAudio] = useState(false);
	const [damper, setDamper] = useState(false);
	const CheckBoxLabel = (props: any) => {
		return (
			<>
				<MuiThemeProvider theme={theme}>
					<Grid
						item
						xs={1}
						style={{
							display: "flex",
							alignItems: "center"
						}}
					>
						<Checkbox
							onClick={() => setSoftAudio(!softAudio)}
							color="primary"
							checked={softAudio}
							style={{ paddingLeft: 0 }}
						/>
					</Grid>
					<Grid
						item
						xs={11}
						style={{
							display: "flex",
							alignItems: "center"
						}}
					>
						<p
							onClick={() => setSoftAudio(!softAudio)}
							className={
								softAudio ? classes.unCheckedText : classes.CheckedText
							}
						>
							{props.label}
						</p>
					</Grid>
				</MuiThemeProvider>
			</>
		);
	};
	return (
		<Center>
			<Box>
				<Header>
					<CenterText>{header}</CenterText>
					<CloseIcon onClick={closeFn} />
				</Header>
				<Content>
					{[
						{
							title: "Dialer Module",
							value: "Basic",
							helper: "Dialer module to load for this campaign.",
							adornment: true,
							setFn: setDialModule
						},
						{
							title: "Dialer Interval",
							value: "3 ",
							helper: "Number of seconds between calling the dialer algorithm.",
							adornment: true,
							setFn: setDialInterval
						},
						{
							title: "Originate timeout seconds",
							value: "25",
							helper: null,
							setFn: setOriginTimeout,
							adornment: true
						},
						{
							title: "Conference rooms",
							value: "On transfer",
							helper: "When to transfer rep and prospect to a conference room.",
							setFn: setConference,
							adornment: true
						},
						{
							title: "Soft Audio",
							value: "0.40",
							helper:
								"Decrease the volume 'perfect pitch' voice for reps (only)."
						},
						{
							title: "Damper",
							value: "Waiting stations",
							helper:
								"Damper the dialer when a threshold is passed.\nDampers to dial ratio 1.",
							adornment: true,
							setFn: setDamper
						}
					].map((item: any) =>
						item.title !== "Soft Audio" ? (
							<SelectField
								onChange={e => item.setFn(e.target.value)}
								label={item.title}
								margin="normal"
								defaultValue={item.value}
								helperText={item.helper}
								InputProps={
									item.adornment
										? {
											endAdornment: (
												<InputAdornment position="end">
													<KeyboardArrowDown
														style={{ fontSize: 27, cursor: "pointer" }}
													/>
												</InputAdornment>
											)
										}
										: undefined
								}
							/>
						) : (
								<Grid container spacing={0} style={{ marginTop: 10 }}>
									<Grid item xs={12}>
										<LabelText>{item.title}</LabelText>
									</Grid>
									<CheckBoxLabel label={item.helper} />
								</Grid>
							)
					)}

					<BtnCont>
						<CloseBtn onClick={closeFn}>
							<CloseText>cancel</CloseText>
						</CloseBtn>
						<NewUserBtn onClick={closeFn}>
							<NewUserText>save</NewUserText>
						</NewUserBtn>
					</BtnCont>
				</Content>
			</Box>
		</Center>
	);
};

export default DialingParameter;
