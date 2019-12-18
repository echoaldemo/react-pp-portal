import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ChangeServer } from "common-components";
import notes from './notes.md'

storiesOf("Change Server", module).add("default", () => {
  const [selected, setSelected] = useState("1");
  const options = [
    {
      name: "PP23",
      uuid: "1"
    },
    {
      name: "PP33",
      uuid: "2"
    }
  ];
  return (
    <>
      <ChangeServer
        selected={selected}
        options={options}
        onChangeFn={setSelected}
      />
    </>
  );
},
  { notes: { markdown: notes } }
);
