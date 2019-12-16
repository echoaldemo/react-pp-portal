import React, { createElement } from "react";
import { storiesOf } from "@storybook/react";
import {
  SeeChartButton,
  SaveButton,
  ButtonWithIcon,
  ButtonTabs,
  BackButton
} from "../";
import bsNotes from "./bsnotes.md";
import saveNotes from "./saveNotes.md";
import btnIconNotes from "./btnIconNotes.md";
import tabNotes from "./tabNotes.md";
import StoryRouter from "storybook-react-router";
const stories = storiesOf("Buttons", module);

stories.add(
  "Bill Button",
  () =>
    createElement(() => {
      const handleClick = () => {
        alert("test");
      };
      return <SeeChartButton mode="bills" onClick={handleClick} />;
    }),
  { notes: { markdown: bsNotes } }
);

stories.add(
  "Sales Button",
  () =>
    createElement(() => {
      const handleClick = () => {
        alert("test");
      };
      return <SeeChartButton mode="sales" onClick={handleClick} />;
    }),
  { notes: { markdown: bsNotes } }
);

stories.add(
  "Save Button: Disabled",
  () =>
    createElement(() => {
      const handleClick = () => {
        alert("test");
      };
      return (
        <SaveButton disabled={true} onClick={handleClick}>
          Hola Button
        </SaveButton>
      );
    }),
  { notes: { markdown: saveNotes } }
);

stories.add(
  "Save Button: Enabled",
  () =>
    createElement(() => {
      const handleClick = () => {
        alert("test");
      };
      return <SaveButton onClick={handleClick}>Hola Button</SaveButton>;
    }),
  { notes: { markdown: saveNotes } }
);

stories.add(
  "Button With Icon",
  () =>
    createElement(() => {
      const handleClick = () => {
        alert("test");
      };
      return <ButtonWithIcon>With Icon ?</ButtonWithIcon>;
    }),
  { notes: { markdown: btnIconNotes } }
);

stories.addDecorator(StoryRouter()).add(
  "Tabs Button",
  function() {
    return (
      <ButtonTabs
        tabData={[
          {
            label: "DID POOLS",
            value: 1
          },
          { label: "SEARCH DIDS", value: 0 }
        ]}
      />
    );
  },
  { notes: { markdown: tabNotes } }
);

stories.add("Back Button", () =>
  createElement(() => {
    return (
      <>
        <BackButton />
      </>
    );
  })
);
