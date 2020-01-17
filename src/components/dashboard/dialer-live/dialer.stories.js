import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "./";
import { DialerHeader, DialerTable, DialerFilter } from "./components";

storiesOf("Live Dialer", module).add("Header", () => {
  return <DialerHeader />;
});

storiesOf("Live Dialer", module).add("Table", () => {
  return <DialerTable />;
});

storiesOf("Live Dialer", module).add("Filter", () => {
  let data = "Skills";
  function resultFn(result) {
    console.log("Result :", result);
    data = result;
  }

  return (
    <DialerFilter
      tag="Sort by"
      filterData={[
        {
          name: "Performance"
        },
        {
          name: "Skills"
        }
      ]}
      result={resultFn}
    />
  );
});

storiesOf("Live Dialer", module).add("Main View", () => {
  return <Component />;
});
