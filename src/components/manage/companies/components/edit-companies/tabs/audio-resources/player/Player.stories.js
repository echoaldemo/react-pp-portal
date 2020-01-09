import React from "react";
import { storiesOf } from "@storybook/react";
import Player from "./index";
import notes from "./notes.md";
storiesOf("Audio Player", module).add(
  "default",
  () => {
    return <Player src="https://www.pachd.com/sfx/city-park-ambience-1.mp3" />;
  },
  { notes: { markdown: notes } }
);
