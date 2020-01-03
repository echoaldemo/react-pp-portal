import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import { materialTheme, theme, useStyles, StepContent } from "../styles";
import { Stepper, Step as _Step } from "common-components";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Setup } from "./SetupPassword";

type Props = {
  number?: any;
  setCurrentStep: any;
  payload: any;
  inputValues: any;
  handleInputChange: any;
  handleInputBlur: any;
  handleSelect: any;
  inputErrors: any;
  handleEmail: any;
  handleDatePick: any;
  disabled?: any;
  setDisabled?: any;
};

const Step = ({
  disabled,
  setDisabled,
  number,
  setCurrentStep,
  inputValues,
  inputErrors,
  handleDatePick,
  handleEmail,
  handleInputChange,
  handleInputBlur,
  handleSelect,
  payload
}: Props) => {
  const classes = useStyles();

  const renderStep = () => {
    let columnStyle = {
      display: "flex",
      flexDirection: "column"
    };
    switch (number) {
      case 2:
        return (
          <Step2
            disabled={disabled}
            setDisabled={setDisabled}
            selectFn={handleSelect}
            label="roles"
            roles={payload.roles}
            selected={inputValues.role}
          />
        );
        break;
      case 3:
        return (
          <Step3
            disabled={disabled}
            setDisabled={setDisabled}
            title="Company Info"
            label="company"
            selectTitle="User company"
            selected={"User Company"}
            resultSelection={() => console.log("Result")}
            values={payload.companies}
          />
        );
        break;
      case 4:
        return (
          <Step4
            disabled={disabled}
            setDisabled={setDisabled}
            selectTitle="User campaign"
            selectedCompany={""}
            selected={""}
            campaign={[]}
            label="campaign"
            selectFn={() => console.log("Result")}
          />
        );
        break;
      case 5:
        return (
          <Step3
            disabled={disabled}
            setDisabled={setDisabled}
            title="Team Info"
            label="team"
            selectTitle="User team"
            selected={"User Company"}
            resultSelection={() => console.log("Result")}
            values={[]}
          />
        );
        break;
      case 6:
        return <Setup disabled={disabled} setDisabled={setDisabled} />;
      default:
        return (
          <Step1
            disabled={disabled}
            setDisabled={setDisabled}
            inputValues={inputValues}
            inputErrors={inputErrors}
            handleDatePick={handleDatePick}
            handleEmail={handleEmail}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
          />
        );
    }
  };

  let cancelBtnStyle = {
    backgroundColor: "rgb(238, 238, 238)"
  };

  let stepConfig = {
    steps: 6,
    cancelFn: () => {
      console.log("Cancel Fn");
    },
    finishFn: () => console.log("Finish Fn"),
    setCurrentStep: setCurrentStep,
    currentStep: number
  };

  let isDisabled = disabled !== number;

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={1}>
        <Stepper {...stepConfig}>
          <_Step index={number} disabled={isDisabled}>
            <StepContent>{renderStep()}</StepContent>
          </_Step>
        </Stepper>
      </Grid>
    </ThemeProvider>
  );
};

export { Step };
