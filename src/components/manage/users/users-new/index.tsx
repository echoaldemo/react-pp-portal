import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "common-components";
import { Step } from "./steps";

type Props = {
  open: boolean;
  onClose: any;
};
const NewUser = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [disabled, setDisabled] = useState(0);

  /*
     variables that gets input info of the new user
  */

  const [info, setInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    date: new Date(),
    role: []
  });

  const [previous, setPrevious] = useState(info);

  /*
    sets the error for the input fields
  */

  const [error, setError] = useState({
    first_name_error: false,
    last_name_error: false,
    username_error: false,
    email_error: false
  });

  const Info = {
    add: (info: any) => addInfo(info)
  };

  const Error = {
    add: (error: any) => addError(error)
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
          {
            if (info.role.length > 0) {
              setDisabled(2);
            } else {
              setDisabled(0);
            }
          }
          break;

        default:
          setDisabled(step);
      }
    }
  };

  /*
    fetches the mock data and sets the needed payload data (roles,campaigns etc.)
  */

  useEffect(() => {
    fetch("http://5e00169a1fb99500141403ae.mockapi.io/api/v1/roles")
      .then((roles: any) => roles.json())
      .then((role: any) => {
        setRoles(role);
      })
      .then(() => getCompanies());
  }, []);

  const getCompanies = () => {
    fetch("http://5e0015181fb99500141403a4.mockapi.io/mock/v1/companies")
      .then((company: any) => company.json())
      .then((company: any) => {
        setCompanies(company);
      });
  };

  useEffect(() => {
    Steps._init();
  }, [info, step]);

  let payload = { roles, companies };

  /*
     config that will be pass down to <Step> child
  */

  const config = {
    disabled: disabled,
    setDisabled: setDisabled,
    number: step,
    setCurrentStep: setStep,
    inputValues: info,
    inputErrors: error,
    payload: payload
  };

  function hasContent(value: any) {
    return value.length > 0;
  }

  const handleSelect = (type: any) => ({ target: { value } }: any) => {
    Info.add({ role: value });
  };

  const handleDatePick = (value: any) => {
    Info.add({ date: value });
  };

  const handleEmail = ({ target: { value } }: any) => {
    Info.add({ email: value });
    if (
      !value.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      hasContent(value)
    ) {
      Error.add({ email_error: true });
    } else {
      Error.add({ email_error: false });
    }
  };

  /*
    handles the input values
  */

  const handleInputChange = (type: any) => (value: any) => {
    let object = { [`${type}`]: value.target.value };
    Info.add(object);
  };

  const addInfo = (object: any) => {
    setPrevious(info);
    setInfo({ ...info, ...object });
  };

  const addError = (error_object: any) => {
    setError({ ...error, ...error_object });
  };

  const check_step1 = () => {
    let { first_name, last_name, username } = info;
    let first_name_error = false,
      last_name_error = false,
      username_error = false;

    if (previous !== info) {
      if (!hasContent(first_name) && hasContent(previous.first_name))
        first_name_error = true;
      if (!hasContent(last_name) && hasContent(previous.last_name))
        last_name_error = true;
      if (!hasContent(username) && hasContent(previous.username))
        username_error = true;
      Error.add({ first_name_error, last_name_error, username_error });
    }

    return (
      hasContent(first_name) &&
      hasContent(last_name) &&
      hasContent(username) &&
      !error.email_error
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
      />
    );
  };

  return (
    <Modal open={open} onClose={onClose} title="New User" height={560}>
      {renderSteps()}
    </Modal>
  );
};

export { NewUser };
