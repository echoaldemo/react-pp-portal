import React, { useState } from "react";
import DNDCards from "../cards/DNDCards";
import { TableLoader } from "common-components";

import { styles } from "./styles";

//MOCK DATA
import { global, company } from "./Mock";

const defaultState = {
  loadingState: false,
  activeTestData: [
    { uuid: 1, name: "Programs" },
    { uuid: 2, name: "Portal" },
    { uuid: 3, name: "First-names-sentence" },
    { uuid: 4, name: "First-names-questions" }
  ],
  globalTestData: global,
  companyTestData: company,
  activeData: []
};
export default function RapidResponseTests() {
  const [state, setState] = useState(defaultState);
  const classes = styles();
  const setActiveData = (data: any) => {
    setState({ ...state, activeData: data });
  };
  const saveActiveSegment = (data: any) => {
    //API request here for updating activeSegments
    setState({ ...state, activeTestData: data });
  };
  return (
    <div className="p-normal c-default">
      <div>
        {state.loadingState ? (
          <>
            <div style={{ height: 600 }}>
              <TableLoader />
            </div>
          </>
        ) : (
          <div className={classes.container}>
            <DNDCards
              card1Title="Active segments"
              card2Title="Global segments"
              card3Title="Company segments"
              card1Data={state.activeTestData}
              card2Data={state.globalTestData}
              card3Data={state.companyTestData}
              saveActiveSegment={saveActiveSegment}
              setActiveData={setActiveData}
            />
          </div>
        )}
      </div>
    </div>
  );
}
