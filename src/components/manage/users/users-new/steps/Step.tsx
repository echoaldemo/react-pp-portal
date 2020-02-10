/* eslint-disable */
import React from "react";
import { Grid } from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";
import { theme, StepContent } from "../styles";
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
  setOpen: any;
  handleEmail: any;
  handleDatePick: any;
  handlePassword: any;
  resultSelection: any;
  campaignSelection: any;
  finishFn: any;
  disabled?: any;
  setDisabled?: any;
};

const Step = ({
  disabled,
  setDisabled,
  number,
  setCurrentStep,
  inputValues,
  handleDatePick,
  handleEmail,
  finishFn,
  setOpen,
  handleInputChange,
  handleInputBlur,
  handlePassword,
  handleSelect,
  resultSelection,
  campaignSelection,
  payload
}: Props) => {
  const renderStep = () => {
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
      case 3:
        return (
          <Step3
            disabled={disabled}
            setDisabled={setDisabled}
            title="Company info"
            label="company"
            selectTitle="User company"
            selected={inputValues.company}
            resultSelection={resultSelection}
            values={payload.companies}
          />
        );
      case 4:
        return (
          <Step4
            disabled={disabled}
            setDisabled={setDisabled}
            selectTitle="User campaign"
            selectedCompany={inputValues.company}
            selected={inputValues.campaign}
            campaign={payload.campaigns}
            label="campaign"
            selectFn={campaignSelection}
          />
        );
      case 5:
        return (
          <Step3
            disabled={disabled}
            setDisabled={setDisabled}
            title="Team Info"
            label="team"
            selectTitle="User team"
            selected={inputValues.team}
            resultSelection={resultSelection}
            values={payload.teams}
          />
        );
      case 6:
        return (
          <Setup
            password={inputValues.password}
            handlePassword={handlePassword}
          />
        );
      default:
        return (
          <Step1
            disabled={disabled}
            setDisabled={setDisabled}
            inputValues={inputValues}
            handleDatePick={handleDatePick}
            handleEmail={handleEmail}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
          />
        );
    }
  };

  let stepConfig = {
    steps: 6,
    cancelFn: () => setOpen(false),
    finishFn: () => finishFn(),
    setCurrentStep: setCurrentStep,
    currentStep: number
  };

  let isDisabled = disabled !== number;

  return (
    <ThemeProvider theme={theme}>
      <Grid container style={{ width: "inherit", marginTop: -7 }}>
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
