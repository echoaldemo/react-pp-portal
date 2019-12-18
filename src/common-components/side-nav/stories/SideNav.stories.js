import React, { createElement } from "react";
// import notes from "./notes.md";
import { storiesOf } from "@storybook/react";
import { SideNav } from "..";
import StoryRouter from "storybook-react-router";

const stories = storiesOf("Side Nav", module);
stories.addDecorator(StoryRouter()).add("default", () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  return <SideNav handleDrawerClose={handleDrawerClose} open={open} />;
});
