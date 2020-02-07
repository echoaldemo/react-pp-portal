/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  Switch,
  Typography,
  MenuItem,
  Checkbox,
  Divider
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  Modal,
  InputField,
  SaveButton as CustomButton,
  LoadingModal,
  SuccessModal,
  DeleteModal
} from "common-components";
import { Avatar } from "./components";
import { DatePicker } from "../users-new/styles";
import { TextField } from "../components";
import defaultAvatar from "./avatar.svg";
import styled from "styled-components";
import { SetupPassword } from "./SetupPassword";
import { useStyles, theme, CustomText } from "./styles";

//API UTIL
import { post, patch, remove } from "utils/api";
import { logout } from "auth/controllers/controller";
import { store } from "contexts/ManageComponent";

const SelectField = styled(InputField)`
  .MuiInputLabel-shrink {
    color: #bbb !important;
  }
`;

type EditProps = {
  open: boolean;
  setOpen: any;
  data: any;
  update: Function;
};

type Indexable = { [key: string]: any };


function Edit({ open, setOpen, data, update }: EditProps) {
	const classes = useStyles();
	const { state } = useContext(store);
	const [ setup, setSetup ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ message, setMessage ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const initialState = {
		uuid: '',
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		team: '',
		company: '',
		campaigns: [],
		groups: [],
		is_active: true,
		password: {
			original: '',
			confirm: ''
		},
		hire_date: ''
	};

	const initialErrorState = {
		first_name_error: '',
		last_name_error: '',
		username_error: '',
		email_error: ''
	};
	const [ team, setTeam ] = useState([]);
	const [ company, setCompany ] = useState([]);
	const [ campaign, setCampaign ] = useState([]);
	const [ groups, setGroup ] = useState([]);
	const [ info, setInfo ] = useState(initialState);
	const [ error, setError ] = useState(initialErrorState);
	const [ openDelete, setOpenDelete ] = useState(false);
	const [ companyDisabled, setCompanyDisabled ] = useState(false);

	useEffect(
		() => {
			const {
				uuid,
				first_name,
				last_name,
				username,
				email,
				team,
				company,
				campaigns,
				hire_date,
				groups,
				is_active
			} = data;

			let userInfo = {
				uuid,
				first_name,
				last_name,
				username,
				email,
				team,
				company,
				campaigns,
				groups: groups,
				is_active,
				hire_date
			} as any;
			Info.add(userInfo);
		},
		[ data, open ]
	);

	useEffect(
		() => {
			Info.add({ campaigns: [] });
		},
		[ info.company ]
	);

	useEffect(
		() => {
			// get('/identity/group/list')
			// 	.then((groups: any) => {
			// 		setGroup(groups.data);
			// 	})
			// 	.then(() => getCompanies())
			// 	.then(() => getCampaigns())
			// 	.then(() => getTeams());
			setGroup(state.roles);
setCompany(state.companies);
setCampaign(state.campaigns);
setTeam(state.teams);
		},
		[ data, open ]
	);

	// const getCompanies = () => {
	// 	get('/identity/company/list').then((company: any) => {
	// 		setCompany(company.data);
	// 	});
	// };

	// const getCampaigns = () => {
	// 	get('/identity/campaign/list').then((campaign: any) => {
	// 		setCampaign(campaign.data);
	// 	});
	// };

	// const getTeams = () => {
	// 	get('/identity/team/list').then((team: any) => {
	// 		setTeam(team.data);
	// 	});
	// };

	let classProp = {
		classes: {
			underline: classes.underline
		}
	};

	let selectedCompany = info.company;

	const Info = {
		add: (data: any) => setInfo({ ...info, ...data })
	};

	function sendSelection({ target: { value } }: any, type: any) {
		Info.add({ [type]: value });
	}

	const handleCampaignSelection = ({ target: { value } }: any) => {
		Info.add({ campaigns: value });
	};

	const handleRoleSelection = ({ target: { value } }: any) => {
		setCompanyDisabled(false);
		value.map((role:any) => {
			if(role === 1 || role === 2 || role === 3) {
				setCompanyDisabled(true);
			}
		})
		Info.add({ groups: value, team: '', company: '', campaign: [] });
	};

	const hasContent = (str: any) => {
		return str.match(/(?=.{1,}$)/);
	};

	const verifyInput = (type: any) => {
		if (type === 'update') {
			return (
				hasContent(info.first_name) &&
				hasContent(info.last_name) &&
				hasContent(info.username) &&
				!hasContent(error.first_name_error) &&
				!hasContent(error.last_name_error) &&
				!hasContent(error.username_error) &&
				!hasContent(error.email_error) &&
				info.groups.length > 0
			);
		}
	};

	const handleInput = (type: any) => (label: any) => ({ target: { value } }: any) => {
		if (!hasContent(value) && type !== 'email') {
			if (hasContent((info as Indexable)[`${type}`])) {
				setError(Object.assign(error, { [`${type}_error`]: `${label} is required.` }));
			}
		}
		else if (type === 'email') {
			if (hasContent(value)) {
				if (
					value.match(
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					)
				) {
					setError(Object.assign(error, { [`${type}_error`]: '' }));
				}
				else {
					setError(Object.assign(error, { [`${type}_error`]: `Invalid Email` }));
				}
			}
			if (!hasContent(value)) {
				setError(Object.assign(error, { [`${type}_error`]: '' }));
			}
		}
		else {
			setError(Object.assign(error, { [`${type}_error`]: '' }));
		}

		Info.add({ [type]: value });
	};

	const renderInput = () => (
		<React.Fragment>
			<Grid item xs>
				<TextField
					error={error.first_name_error}
					htmlFor="first_name"
					label="Firstname"
					name="First Name"
					value={info.first_name}
					onBlur={handleInput('first_name')('Firstname')}
					onChange={handleInput('first_name')('Firstname')}
					required={true}
				/>
			</Grid>

			<Grid item xs>
				<TextField
					error={error.last_name_error}
					htmlFor="last_name"
					label="Lastname"
					name="Last Name"
					value={info.last_name}
					onBlur={handleInput('last_name')('Lastname')}
					onChange={handleInput('last_name')('Lastname')}
					required={true}
				/>
			</Grid>

			<Grid item xs={12} style={{ marginTop: -11 }}>
				<TextField
					error={error.username_error}
					htmlFor="username"
					label="Username"
					name="Username"
					value={info.username}
					onBlur={handleInput('username')('Username')}
					onChange={handleInput('username')('Username')}
					required={true}
				/>
			</Grid>

			<Grid item xs={12} style={{ marginTop: -11 }}>
				<TextField
					error={error.email_error}
					htmlFor="email"
					label="Email"
					name="Email"
					value={info.email}
					onBlur={handleInput('email')('Email')}
					onChange={handleInput('email')('Email')}
				/>
			</Grid>
		</React.Fragment>
	);

	const renderTeamSelector = () => (
		<Grid item xs={12}>
			<SelectField
				data-cy="select-3-5"
				style={{ marginTop: -12, width: 360 }}
				label="Team"
				select
				SelectProps={{ id: 'team-select' }}
				{...teamSelectProps}
				margin="normal"
				value={info.team}
			>
				<MenuItem style={{ minHeight: '36px' }} key="none" value="">
					<CustomText>None</CustomText>
				</MenuItem>
				{team.map((key: any) => {
					return (
						<MenuItem style={{ minHeight: '36px' }} key={key.id} value={key.uuid} data-cy="select-list">
							<CustomText>{key.name}</CustomText>
						</MenuItem>
					);
				})}
			</SelectField>
		</Grid>
	);

	const renderCompanySelector = () => (
		<Grid item xs={12}>
			<SelectField
				id="company-select"
				data-cy="select-3-5"
				style={{ marginTop: 1, width: 360 }}
				label="Company"
				select
				{...companySelectProps}
				margin="normal"
				value={info.company}
				disabled={companyDisabled}
			>
				<MenuItem style={{ minHeight: '36px' }} key="none" value="">
					<CustomText>None</CustomText>
				</MenuItem>
				{company.map((key: any) => {
					return (
						<MenuItem style={{ minHeight: '36px' }} key={key.uuid} value={key.uuid} data-cy="select-list">
							<CustomText>{key.name}</CustomText>
						</MenuItem>
					);
				})}
			</SelectField>
		</Grid>
	);

	const renderCampaignSelector = () => (
		<Grid item xs={12}>
			<SelectField
				id="campaign-select"
				data-cy="campaign"
				style={{ marginTop: 1, width: 360 }}
				label="Campaigns"
				select
				{...campaignSelectProps}
				margin="normal"
			>
				{selectedCompany ? (
					campaign.filter((c: any) => c.company === selectedCompany).map((key: any, i: number) => {
						return (
							<MenuItem key={i} value={key.uuid} data-cy="campaign-list">
								<Checkbox
									color="primary"
									checked={info.campaigns.findIndex((camp) => camp === key.uuid) > -1}
								/>
								<CustomText>{key.name}</CustomText>
							</MenuItem>
						);
					})
				) : (
					campaign.map((key: any, i: number) => {
						return (
							<MenuItem key={i} value={key.uuid} data-cy="campaign-list">
								<Checkbox
									color="primary"
									checked={info.campaigns.findIndex((camp) => camp === key.uuid) > -1}
								/>
								<CustomText>{key.name}</CustomText>
							</MenuItem>
						);
					})
				)}
				{selectedCompany ? (
					campaign.filter((c: any) => c.company === selectedCompany).length === 0 && (
						<p style={{ paddingLeft: 15 }}>No campaigns for the selected company</p>
					)
				) : null}
			</SelectField>
		</Grid>
	);

	const renderRoleSelector = () => (
		<Grid item xs={12}>
			<SelectField
				data-cy="roles"
				style={{ marginTop: 1, width: 360 }}
				label="Role"
				select={true}
				margin="normal"
				{...customProp}
				{...roleSelectProps}
			>
				{groups.map((key: any, i: number) => {
					return (
						<MenuItem key={i} value={key.pk} data-cy="roles-list">
							<Checkbox
								color="primary"
								checked={info.groups.findIndex((uuid: any) => uuid === key.pk) > -1}
							/>
							<CustomText>{key.name}</CustomText>
						</MenuItem>
					);
				})}
			</SelectField>
		</Grid>
	);

	const impersonate = async (groups: any) => {
		if (!localStorage.getItem('is_impersonate')) {
			localStorage.setItem('is_impersonate', 'true');
			window.location.href = '/gateway';
		}
	};

	const handleDateChange = (e: any) => {
		var date = new Date(e);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var day = ('0' + date.getDate()).slice(-2);
		var convertedDate = [ date.getFullYear(), month, day ].join('-');
		Info.add({ hire_date: convertedDate });
	};

	const renderDateSelector = () => (
		<Grid item xs={12} style={{ marginTop: 1 }}>
			<MuiPickersUtilsProvider utils={DateFnsUtils} {...classProp}>
				<DatePicker
					fullWidth
					label="Hired Date"
					format="yyyy-MM-dd"
					value={info.hire_date}
					onChange={(e) => handleDateChange(e)}
					InputProps={{
						classes: {
							underline: classes.inputField,
							root: classes.inputField
						}
					}}
				/>
			</MuiPickersUtilsProvider>
		</Grid>
	);

	const handleActiveToggle = () => {
		Info.add({ is_active: !info.is_active });
	};

	const handlePassword = (type: any, value: any) => {
		if (type === 'original') {
			Info.add(Object.assign(info.password, { original: value }));
		}
		else Info.add(Object.assign(info.password, { confirm: value }));
	};

	const renderLoading = () => {
		return <LoadingModal open={loading} text={message} cancelFn={() => setLoading(false)} />;
	};

	const handleDelete = () => {
		setMessage(`One moment. We're removing user ${info.username}`);
		setLoading(true);
		remove(`/identity/user/manage/${info.uuid}`).then((res: any) => {
			setMessage(`You have deleted user ${info.username}`);
			setLoading(false);
			setSuccess(true);
			setOpenDelete(false);
		});
	};

	const renderDelete = () => (
		<DeleteModal
			open={openDelete}
			header="Delete user"
			msg="user"
			name={info.username}
			closeFn={() => setOpenDelete(false)}
			delFn={() => handleDelete()}
		/>
	);

	const renderSuccess = () => {
		return <SuccessModal open={success} text={message} closeFn={() => updateData()} />;
	};

	const updateData = () => {
		setOpen(false);
		setSuccess(false);
		update(info);
	};

	const saveEdit = () => {
		if (verifyInput('update')) {
			setMessage('One moment. We’re updating the user...');
			setLoading(true);
			patch(`/identity/user/manage/${info.uuid}/`, info).then((res: any) => {
				setMessage(`You have updated user ${info.username}`);
				setLoading(false);
				setSuccess(true);
			});
		}
	};

	const setupPassword = () => {
		const changePassword = {
			new_password: info.password.original,
			re_new_password: info.password.confirm
		};
		setMessage('One moment. We’re updating the user...');
		setLoading(true);
		post(`/identity/user/manage/set_password/${info.uuid}/`, changePassword).then((res: any) => {
			if (info.uuid === localStorage.getItem('uuid')) {
				return logout();
			}
			setMessage(`You have updated user ${info.username}'s password.`);
			setLoading(false);
			setSuccess(true);
			setSetup(false);
		});
	};

	const customProp = {
		error: info.groups.length <= 0,
		helperText: info.groups.length <= 0 ? 'A role is required.' : ''
	};

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 300,
				width: 250
			}
		}
	};

	const teamSelectProps = {
		SelectProps: {
			MenuProps,
			IconComponent: () => <KeyboardArrowDown />,
			onChange: (e: any) => sendSelection(e, 'team')
		}
	};

	const companySelectProps = {
		SelectProps: {
			MenuProps,
			IconComponent: () => <KeyboardArrowDown />,
			onChange: (e: any) => sendSelection(e, 'company')
		}
	};

	const campaignSelectProps = {
		SelectProps: {
			MenuProps,
			IconComponent: () => <KeyboardArrowDown />,
			multiple: true,
			onChange: handleCampaignSelection,
			value: info.campaigns,
			renderValue: (selected: any) => {
				let output = selected
					.map((select: any) => {
						return campaign
							.filter((rls: any) => {
								return rls.uuid === select;
							})
							.map((data: any) => data.name);
					})
					.join(', ');
				return output;
			}
		}
	};

	const roleSelectProps = {
		SelectProps: {
			MenuProps,
			IconComponent: () => <KeyboardArrowDown />,
			multiple: true,
			onChange: handleRoleSelection,
			value: info.groups,
			renderValue: (selected: any) =>
				selected
					.map((select: any) => {
						return groups.filter((rls: any) => rls.pk === select).map((data: any) => data.name);
					})
					.join(', ')
		}
	};

	const renderSetup = () => (
		<SetupPassword
			open={setup}
			setOpen={setSetup}
			password={info.password}
			handlePassword={handlePassword}
			handleSave={() => setupPassword()}
			setSave={
				info.password.original.length !== 0 && info.password.original === info.password.confirm ? false : true
			}
		/>
	);

	const renderEdit = () => (
		<ThemeProvider theme={theme}>
			<Grid
				container
				style={{
					marginTop: 7,
					marginLeft: 5
				}}
				spacing={1}
			>
				<Grid item xs={12}>
					<Grid container alignItems="center">
						<Grid item>
							<Avatar image={defaultAvatar} />
						</Grid>

						<Grid item xs>
							<div className={classes.toggleContainer}>
								<Typography className={classes.activeText}>Active:</Typography>
								<Switch
									color="primary"
									onChange={() => handleActiveToggle()}
									checked={info.is_active}
								/>
							</div>
						</Grid>

						<Grid item xs>
							<button className={classes.impersonateBtn} onClick={() => impersonate(groups)}>
								Impersonate
							</button>
						</Grid>
					</Grid>
				</Grid>

				<Grid>
					<Grid container style={{ marginTop: 13 }} direction="row">
						<Typography className={classes.activeText} style={{ marginRight: 9, fontWeight: 600 }}>
							UUID:
						</Typography>
						<Typography className={classes.uuidText}>{info.uuid}</Typography>
					</Grid>
				</Grid>

				<Grid container style={{ marginTop: 15, marginRight: 18 }} spacing={1}>
					{renderInput()}
					{renderTeamSelector()}
					{renderCompanySelector()}
					{renderCampaignSelector()}
					{renderRoleSelector()}
					{renderDateSelector()}

					<Grid container style={{ marginTop: 15 }} alignItems="center">
						<Grid item xs>
							<Typography className={classes.fadedLabel}>Password</Typography>
						</Grid>

						<Grid
							item
							xs
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'flex-end'
							}}
						>
							<button onClick={() => setSetup(true)} className={classes.changePasswordStyle}>
								<Typography className={classes.changePasswordTextStyle}>Change password</Typography>
							</button>
						</Grid>
					</Grid>

					<Divider className={classes.dividerStyle} />

					<Grid container style={{ marginTop: 19 }} alignItems="center">
						<Grid item xs>
							<Typography className={classes.fadedLabel}>Delete user</Typography>
						</Grid>

						<Grid
							item
							xs
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'flex-end'
							}}
						>
							<button className={classes.deleteUserStyle}>
								<Typography
									className={classes.changePasswordTextStyle}
									onClick={(e) => setOpenDelete(true)}
								>
									<strong>Delete</strong>
								</Typography>
							</button>
						</Grid>
					</Grid>

					<Divider className={classes.dividerStyle} />
				</Grid>

				<Grid container spacing={1} style={{ marginTop: 29 }}>
					<Grid item xs style={{ marginLeft: -8 }}>
						<CustomButton
							style={{
								width: 165,
								height: 40,
								borderRadius: 3,
								backgroundColor: '#eee'
							}}
							disabled={false}
							handleClick={() => setOpen(false)}
						>
							<Typography className={classes.cancelText}>CANCEL</Typography>
						</CustomButton>
					</Grid>
					<Grid item xs>
						<CustomButton style={{ marginLeft: 10 }} disabled={false} handleClick={() => saveEdit()}>
							SAVE
						</CustomButton>
					</Grid>
				</Grid>
			</Grid>
		</ThemeProvider>
	);

	if (loading) {
		return renderLoading();
	}
	else if (success) {
		return renderSuccess();
	}
	else if (openDelete) {
		return renderDelete();
	}
	else {
		return (
			<Modal open={open && !loading && !success} onClose={() => setOpen(false)} title="Edit user">
				{!setup ? renderEdit() : renderSetup()}
			</Modal>
		);
	}
}

export { Edit };
