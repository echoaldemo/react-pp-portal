import React from "react";
import EditHeader from "../EditHeader";
import { Paper } from "@material-ui/core";

export default function Dashboard({ match, history }) {
  return (
    <div>
      <EditHeader match={match} history={history} />
      <Paper square={true} className="mh-normal">
        <div className="p-normal c-default">
          <h1>Dashboard</h1>
          <p>
            <b>Modify the code of this file here:</b>
          </p>
          <code>
            File Path::
            /manage/manage-campaigns/components/edit-campaigns/dashboard
          </code>
        </div>
      </Paper>
    </div>
  );
}
