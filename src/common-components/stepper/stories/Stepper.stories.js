import React, { createElement, useState } from "react";
import { storiesOf } from "@storybook/react";
import { Stepper, Step } from "..";
import notes from "./notes.md";
const stories = storiesOf("Stepper", module);

stories.add(
  "default",
  () =>
    createElement(() => {
      const [currentStep, setCurrentStep] = useState(1);
      const handleCancel = () => {
        console.log("cancel");
      };

      const handleFinish = () => {
        console.log("finish");
      };

      return (
        <div style={{ width: 400 }}>
          <Stepper
            steps={6}
            cancelFn={handleCancel}
            finishFn={handleFinish}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
          >
            <Step index={1} disabled={false}>
              1
            </Step>
            <Step index={2} disabled={false}>
              2
            </Step>
            <Step index={3} disabled={false}>
              3
            </Step>
          </Stepper>
        </div>
      );
    }),
  { notes: { markdown: notes } }
);
