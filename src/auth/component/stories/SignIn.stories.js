import React from "react";
import { storiesOf } from "@storybook/react";
import SignIn from "../index";
import SignInLoader from "../SignIn.loader";

const story = storiesOf("Signin", module);
story.add("default", () => <SignIn />);

story.add("loading", () => <SignInLoader />);
