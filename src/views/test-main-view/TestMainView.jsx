import React, { Fragment } from "react";

import TestTextComponent from "components/TestTextComponent/index.js";

const camelCaseVarible = "team";

const MainView = () => {
  return (
    <Fragment>
      <TestTextComponent>
        <b>Hi, {camelCaseVarible} this is a simple example</b>
      </TestTextComponent>
    </Fragment>
  );
};

export default MainView;
