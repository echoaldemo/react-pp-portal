import { configure, addDecorator } from "@storybook/react";
import StoryRouter from "storybook-react-router";
addDecorator(StoryRouter());
configure(require.context("../src", true, /\.stories\.(js|mdx)$/), module);
