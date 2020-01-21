/* eslint-disable */
import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import { styles } from "./css-styles";
const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose }: any = props;
	return (
		<MuiDialogTitle disableTypography className={classes.header}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});
interface Props {
	open: any;
	handleClose: any;
	name: any;
	deleteSnackbar: any;
	openDelete: any;
	events: any;
	submit: any;
	snackbar: any;
	dataid: any;
}
interface State {
	minutesBefore: any;
	delay: any;
	contentError: any;
	content: any;
	id: any;
	[x: number]: any;
	open?: boolean;
	message?: any;
}
class SMSSetting extends React.Component<Props, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			id: this.props.events.id,
			content: this.props.events.content,
			delay: this.props.events.delay,
			minutesBefore: this.props.events.minutesBefore,
			contentError: false
		};
	}
	handleTextChange = (event: any) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	checkContent = (event: any) => {
		if (event.target.value.length === 0) {
			this.setState({
				contentError: true
			});
		} else {
			this.setState({
				contentError: false,
				open: false,
				message: ""
			});
		}
	};
	save = () => {
		if (this.state.content.length !== 0) {
			let data = {
				id: this.state.id,
				content: this.state.content,
				delay: this.state.delay,
				minutesBefore: this.state.minutesBefore
			};
			this.props.submit(this.props.dataid, data, "sms");
			this.props.snackbar();
		}
	};
	delete = () => {
		let data = {
			id: this.state.id
		};
		this.props.submit(this.props.dataid, data, "delete");
	};
	handleNumberChange = (event: any) => {
		if (event.target.value >= 0) {
			this.setState({
				[event.target.name]: event.target.value
			});
		}
	};
	render() {
		const { classes, open, handleClose, name }: any = this.props;
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
				aria-labelledby="form-dialog-title"
				scroll="body"
			>
				<MuiDialogTitle disableTypography className={classes.header}>
					<Typography variant="h6"> {name}</Typography>

					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</MuiDialogTitle>
				<DialogContent className={classes.Content}>
					<Typography className={classes.title}>Message</Typography>
					<DialogContentText className={classes.text}>
						Enter the message to be sent to the lead
          </DialogContentText>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								label="Message"
								name="content"
								required
								className={classes.select}
								value={this.state.content}
								onKeyUp={this.checkContent}
								onChange={this.handleTextChange}
								error={this.state.contentError}
								margin="normal"
								helperText={`Remaining characters: ${160 -
									this.state.content.length}`}
							></TextField>
						</Grid>
					</Grid>
					<Divider light style={{ margin: "20px 0" }} />
					<Typography className={classes.title}>Parameters</Typography>
					<DialogContentText className={classes.text}>
						Enter the parameters
          </DialogContentText>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} lg={6} md={6}>
							<TextField
								label="Delay"
								name="delay"
								className={classes.select}
								type="number"
								value={this.state.delay}
								onChange={this.handleNumberChange}
								margin="normal"
							></TextField>
						</Grid>
						<Grid item xs={12} sm={6} lg={6} md={6}>
							<TextField
								label="Minutes before"
								name="minutesBefore"
								className={classes.select}
								type="number"
								value={this.state.minutesBefore}
								onChange={this.handleNumberChange}
								margin="normal"
							></TextField>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions className={classes.footer}>
					<Grid container spacing={2} justify="center">
						{/* <Grid item xs={12} sm={6} lg={6} md={6}>
              <Button
                onClick={() => this.props.openDelete("sms")}
                color="secondary"
                variant="contained"
                component="span"
                className={classes.deleteBtn}
              >
                Delete
              </Button>
            </Grid> */}
						<Grid item xs={12} sm={6} lg={6} md={6}>
							<div className={classes.rightButtons}>
								<Button
									onClick={handleClose}
									color="default"
									variant="contained"
									component="span"
									className={classes.cancelBtn}
								>
									Cancel
                </Button>
								<Button
									name="UpdateSMSCALLSave"
									onClick={this.save}
									variant="contained"
									className={classes.saveBtn}
								>
									Save
                </Button>
							</div>
						</Grid>
					</Grid>
				</DialogActions>
			</Dialog>
		);
	}
}
export default withStyles(styles)(SMSSetting);
