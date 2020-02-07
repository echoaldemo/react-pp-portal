import React, { useState, useEffect, useContext } from "react";
import { Modal, LoadingModal, SuccessModal } from "common-components";
import { Step } from "./steps";
import { store } from "contexts/ManageComponent";
import { post, cancel } from "utils/api";

type Props = {
  open: boolean;
  setOpen: any;
  onClose: any;
};
const NewUser = ({ open, setOpen, onClose }: Props) => {
  const { state } = useContext(store);

  const { roles, companies, campaigns, teams } = state;
  const [step, setStep] = useState(1);
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

  const cancelUser = () => {
    cancel();
  };

  const finishFn = () => {
    const data = {
      groups: info.role,
      company: info.company,
      campaigns: info.campaign,
      team: info.team,
      password: info.password.original,
      username: info.username,
      first_name: info.first_name,
      last_name: info.last_name,
      email: info.email,
      hire_date: info.date.toISOString().slice(0, 10)
    };

    setLoading(true);
    post("/identity/user/manage/create/", data).then((res: any) => {
      console.log(res);
      setLoading(false);
      setSuccess(true);
    });
    // setTimeout(() => {

    // }, 1500);
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
