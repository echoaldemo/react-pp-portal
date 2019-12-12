import React, { Fragment } from "react";
import TestTextComponent from "components/TestTextComponent/index.js";
var camelCaseVarible = "team";
var MainView = function () {
    return (React.createElement(Fragment, null,
        React.createElement(TestTextComponent, null,
            React.createElement("b", null,
                "Hi, ",
                camelCaseVarible,
                " this is a simple example"))));
};
export default MainView;
//# sourceMappingURL=TestMainView.js.map