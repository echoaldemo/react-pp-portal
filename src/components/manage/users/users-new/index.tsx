import React, { useState, useEffect } from "react";
import { Modal, LoadingModal, SuccessModal } from "common-components";
import { Step } from "./steps";

type Props = {
	open: boolean;
	setOpen: any;
	onClose: any;
};
const NewUser = ({ open, setOpen, onClose }: Props) => {
	const [step, setStep] = useState(1);
	const [roles, setRoles] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [campaigns, setCampaigns] = useState([]);
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [disabled, setDisabled] = useState(0);

  /*
     variables that gets input info of the new user
  */
	const defaultData = {
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		date: new Date(),
		role: [],
		company: "",
		campaign: [],
		team: "",
		password: {
			original: "",
			confirm: ""
		}
	};

	const [info, setInfo] = useState(defaultData);

	const [previous, setPrevious] = useState(info); // eslint-disable-line

  /*
    sets the error for the input fields
  */

	const Info = {
		add: (info: any) => addInfo(info)
	};

	const Steps = {
		_init: () => {
			switch (step) {
				case 1:
					if (check_step1()) {
						setDisabled(1);
					} else {
						setDisabled(0);
					}
					break;
				case 2:

					if (info.role.length > 0) {
						setDisabled(2);
					} else {
						setDisabled(0);
					}

					break;

				case 6:
					if (
						hasContent(info.password.original) &&
						hasContent(info.password.confirm) &&
						info.password.original === info.password.confirm
					) {
						setDisabled(6);
					} else {
						setDisabled(0);
					}
					break;

				default:
					setDisabled(step);
			}
		}
	};

	// function passedGuidelines() {
	// 	return false;
	// }

  /*
    fetches the mock data and sets the needed payload data (roles,campaigns etc.)
  */

	useEffect(() => {
		fetch("http://5e00169a1fb99500141403ae.mockapi.io/api/v1/roles")
			.then((roles: any) => roles.json())
			.then((role: any) => {
				setRoles(role);
			})
			.then(() => getCompanies())
			.then(() => getCampaigns())
			.then(() => getTeams());
	}, []);

	const getCompanies = () => {
		fetch("http://5e0015181fb99500141403a4.mockapi.io/mock/v1/companies")
			.then((company: any) => company.json())
			.then((company: any) => {
				setCompanies(company);
			});
	};

	const getCampaigns = () => {
		fetch("http://5e0015181fb99500141403a4.mockapi.io/mock/v1/campaigns")
			.then((campaign: any) => campaign.json())
			.then((campaign: any) => {
				setCampaigns(campaign);
			});
	};

	const getTeams = () => {
		fetch("http://5e12b0ef6e229f0014678caa.mockapi.io/teams")
			.then((team: any) => team.json())
			.then((team: any) => {
				setTeams(team);
			});
	};

	useEffect(() => {
		Steps._init();
	}, [info, step]); // eslint-disable-line

	let payload = { roles, companies, campaigns, teams };

  /*
     config that will be pass down to <Step> child
  */

	const config = {
		disabled: disabled,
		setDisabled: setDisabled,
		number: step,
		setCurrentStep: setStep,
		inputValues: info,
		setOpen: setOpen,
		payload: payload
	};

	function hasContent(value: any) {
		return value.length > 0;
	}

	const handlePassword = (type: any, value: any) => {
		if (type === "original") {
			Info.add(Object.assign(info.password, { original: value }));
		} else {
			Info.add(Object.assign(info.password, { confirm: value }));
		}
	};

	const handleSelect = (type: any) => ({ target: { value } }: any) => {
		Info.add({ role: value });
	};

	const handleDatePick = (value: any) => {
		Info.add({ date: value });
	};

	const handleEmail = ({ target: { value } }: any) => {
		Info.add({ email: value });
		// if (
		//   !value.match(
		//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		//   ) &&
		//   hasContent(value)
		// ) {
		//   Error.add({ email_error: true });
		// } else {
		//   Error.add({ email_error: false });
		// }
	};

	const cancelUser = () => { };

	const finishFn = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setSuccess(true);
		}, 1500);
	};

  /*
    handles the input values
  */

	const campaignSelection = (value: any) => {
		Info.add({ campaign: value });
	};

	const resultSelection = (label: any) => (value: any) => {
		if (label === "company") {
			Info.add({ company: value });
		} else {
			Info.add({ team: value });
		}
	};

	const handleInputChange = (type: any) => (value: any) => {
		let object = { [`${type}`]: value.target.value };
		Info.add(object);
	};

	const addInfo = (object: any) => {
		setPrevious(info);
		setInfo({ ...info, ...object });
	};

	const check_step1 = () => {
		let { first_name, last_name, username } = info;
		// let first_name_error = false,
		//   last_name_error = false,
		//   username_error = false;

		// if (previous !== info) {
		//   if (!hasContent(first_name) && hasContent(previous.first_name))
		//     first_name_error = true;
		//   if (!hasContent(last_name) && hasContent(previous.last_name))
		//     last_name_error = true;
		//   if (!hasContent(username) && hasContent(previous.username))
		//     username_error = true;
		//   Error.add({ first_name_error, last_name_error, username_error });
		// }

		return (
			hasContent(first_name) && hasContent(last_name) && hasContent(username)
		);
	};

	const handleInputBlur = (type: string) => (value: any) => {
		check_step1();
	};

	const renderSteps: Function = () => {
		return (
			<Step
				{...config}
				handleSelect={handleSelect}
				handleDatePick={handleDatePick}
				handleEmail={handleEmail}
				handleInputBlur={handleInputBlur}
				handleInputChange={handleInputChange}
				handlePassword={handlePassword}
				resultSelection={resultSelection}
				campaignSelection={campaignSelection}
				finishFn={finishFn}
			/>
		);
	};

	const renderLoading = () => {
		return (
			<LoadingModal
				open={loading}
				text={"One moment. We’re creating the user..."}
				cancelFn={cancelUser}
			/>
		);
	};

	const renderSuccess = () => {
		return (
			<SuccessModal
				user
				open={success}
				text={`You have created ${info.first_name} ${info.last_name}`}
				closeFn={resetAndClose}
				btnFn={reset}
			></SuccessModal>
		);
	};

	const renderUserCreate = () => {
		return (
			<Modal
				contentStyle={{ paddingBottom: 0 }}
				open={open && !loading && !success}
				onClose={onClose}
				title="New User"
				height={560}
			>
				<div style={{ padding: "0 7px 0 2px" }}>{renderSteps()}</div>
			</Modal>
		);
	};

	const resetAndClose = () => {
		setStep(1);
		setInfo(defaultData);
		setLoading(false);
		setSuccess(false);
		setOpen(false);
	};

	const reset = () => {
		setLoading(false);
		setSuccess(false);
		setStep(1);
		setInfo(defaultData);
	};

	return (
		<>
			{renderLoading()}
			{renderSuccess()}
			{renderUserCreate()}
		</>
	);
};

export { NewUser };
