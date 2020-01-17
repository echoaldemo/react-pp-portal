import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	TextField,
	MenuItem,
	Typography,
	Grid,
	Button,
	Divider,
	CircularProgress,
	Paper
} from "@material-ui/core";

import ErrorIcon from "@material-ui/icons/Error";

const font = [
	{ label: "12px", value: 12 },
	{ label: "13px", value: 13 },
	{ label: "14px", value: 14 },
	{ label: "15px", value: 15 },
	{ label: "16px", value: 16 },
	{ label: "17px", value: 17 },
	{ label: "18px", value: 18 },
	{ label: "19px", value: 19 },
	{ label: "20px", value: 20 },
	{ label: "21px", value: 21 },
	{ label: "22px", value: 22 },
	{ label: "23px", value: 23 },
	{ label: "24px", value: 24 }
];
const type = [
	{
		value: "response-tests",
		label: "Response Test"
	},
	{
		value: "failures",
		label: "Failures"
	},
	{
		value: "intros",
		label: "Intro"
	},
	{
		value: "no-responses",
		label: "No Response"
	},
	{
		value: "endings",
		label: "Ending"
	}
];
const status = [
	{
		value: true,
		label: "Active"
	},
	{
		value: false,
		label: "Inactive"
	}
];

const theme = [
	{
		value: "chrome",
		label: "Chrome"
	},
	{
		value: "monokai",
		label: "Monokai"
	}
];

const useStyles = makeStyles(theme => ({
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "fit-content"
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120
	},
	formControlLabel: {
		marginTop: theme.spacing(1)
	},
	inputField: {
		fontSize: "1rem",
		"&&&&:hover:before": {
			borderBottom: "1px solid rgba(0,0,0,0.1)"
		},
		"&:before": {
			borderBottom: "1px solid rgba(0,0,0,0.1)"
		},
		"&:after": {
			borderBottom: "2px solid #1394f6"
		}
	}
}));

interface Props {
	data: any
	theme: any
	font: any
	handleTheming: Function
	handleFont: Function
	handleSubmitForm: Function
	error: boolean
	stopLoading: any
	closeError: () => void
}

export default function SubForm(props: Props) {
	const classes = useStyles();
	const [values, setValues] = React.useState({
		SegmentType: props.data.type !== undefined ? props.data.type : "",
		theme: props.theme,
		font: props.font,
		status: props.data.active !== undefined ? props.data.active : "",
		segment_name: props.data.name !== undefined ? props.data.name : "",
		loader: false
	});

	const handleChange = (name: any) => (event: any) => {
		setValues({ ...values, [name]: event.target.value });
		if (name === "theme") {
			props.handleTheming(event.target.value);
		}
		if (name === "font") {
			props.handleFont(event.target.value);
		}
	};

	const handleSubmitForm = (label: any) => {
		setValues({ ...values, loader: true });
		const data = {
			uuid: props.data.uuid,
			company: props.data.company,
			slug: props.data.slug,
			name: values.segment_name,
			active: values.status,
			type: values.SegmentType,
			variables: props.data.variables
		};
		props.handleSubmitForm(data, label);
	};

	return (
		<React.Fragment>
			{values.loader === true && props.error != null
				? setValues({ ...values, loader: false })
				: values.loader === true && Boolean(props.stopLoading) === true
					? setValues({ ...values, loader: false })
					: null}

			<Grid container>
				<Grid item xs={12}>
					<Typography
						variant="caption"
						style={{
							color: "rgba(0,0,0,0.6)",
							fontWeight: "bold",
							fontSize: 18
						}}
					>
						{props.data.name !== undefined ? "Edit Segment" : "Create  Segment"}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						autoComplete="off"
						onChange={handleChange("segment_name")}
						id="standard-full-width"
						fullWidth
						margin="normal"
						style={{
							fontSize: 50
						}}
						value={values.segment_name}
						required={true}
						label="Segment Name"
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							}
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						style={{ width: "100%" }}
						id="standard-select-currency"
						select
						label="Segment Type"
						value={values.SegmentType}
						onChange={handleChange("SegmentType")}
						//   helperText="Please select your currency"
						margin="normal"
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							},
							style: {
								color: "rgb(95,125,152)"
							}
						}}
					>
						{type.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						style={{ width: "100%" }}
						id="standard-select-currency"
						select
						label="Segment Status"
						value={values.status}
						onChange={handleChange("status")}
						//   helperText="Please select your currency"
						margin="normal"
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							},
							style: {
								color: "rgb(95,125,152)"
							}
						}}
					>
						{status.map((option: any) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ padding: 20, justifyContent: "center", display: "flex" }}
				>
					{props.data.name !== undefined ? (
						<Button
							disabled={
								values.segment_name.length !== 0 &&
									values.SegmentType.length !== 0 &&
									values.status.length !== 0
									? false
									: true
							}
							onClick={() => handleSubmitForm("edit")}
							variant="contained"
							style={{ backgroundColor: "rgb(182,211,107)", color: "white" }}
						>
							Update Segment
            </Button>
					) : (
							<Button
								disabled={
									values.segment_name.length !== 0 &&
										values.SegmentType.length !== 0 &&
										values.status.length !== 0
										? false
										: true
								}
								onClick={() => handleSubmitForm("create")}
								variant="contained"
								style={{ backgroundColor: "rgb(182,211,107)", color: "white" }}
							>
								Create Segment
            </Button>
						)}
				</Grid>

				{values.loader === true && props.error === null ? (
					<Grid
						item
						xs={12}
						style={{ padding: 20, justifyContent: "center", display: "flex" }}
					>
						<CircularProgress />
					</Grid>
				) : null}

				{props.error !== null ? (
					<Grid
						item
						xs={12}
						style={{ padding: 20, justifyContent: "center", display: "flex" }}
					>
						<Grid container>
							<Grid
								item
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center"
								}}
							>
								<ErrorIcon
									style={{
										marginTop: 5,
										marginRight: 20,
										color: "#dc3e3e"
									}}
								/>
								<Typography
									align="center"
									variant="caption"
									style={{ fontSize: 20, fontWeight: "bold" }}
								>
									Error Updating Segment
                </Typography>
							</Grid>
							<Grid
								item
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
									margin: 10
								}}
							>
								<Button
									style={{ backgroundColor: "transparent" }}
									onClick={props.closeError}
								>
									Dismiss
                </Button>
							</Grid>
							<Grid item style={{ width: "100%" }}>
								<Paper
									style={{
										backgroundColor: "#dc3e3e",
										color: "white",
										padding: 20
									}}
								>
									{props.error}
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				) : null}
			</Grid>
			<Divider style={{ margin: 0, padding: 0 }} />
			<Grid container style={{ marginTop: 15 }}>
				<Grid item xs={12}>
					<Typography
						variant="caption"
						style={{
							color: "rgba(0,0,0,0.6)",
							fontWeight: "bold",
							fontSize: 18
						}}
					>
						Editor
          </Typography>
				</Grid>
				<Grid item xs={12}>
					<TextField
						style={{ width: "100%" }}
						id="standard-select-currency"
						select
						label="Theme"
						value={values.theme}
						onChange={handleChange("theme")}
						//   helperText="Please select your currency"
						margin="normal"
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							},
							style: {
								color: "rgb(95,125,152)"
							}
						}}
					>
						{theme.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						style={{ width: "100%" }}
						id="standard-select-currency"
						select
						label="Font Size"
						value={values.font}
						onChange={handleChange("font")}
						//   helperText="Please select your currency"
						margin="normal"
						SelectProps={{
							MenuProps: {
								style: { height: "300px", marginTop: 45 }
							}
						}}
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							},
							style: {
								color: "rgb(95,125,152)"
							}
						}}
					>
						{font.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
