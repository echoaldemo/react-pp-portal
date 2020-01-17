import React from "react";
import Legend from "../../../common-components/chart/Legend";
import { Typography } from "@material-ui/core";

const legends = [
  { title: "Work day", color: "#6698c7", width: "auto" },
  { title: "Lunch/Break", color: "#f9aa4f", width: "auto" },
  { title: "Billable session", color: "#44bd94", width: "auto" }
];

export default function ChartTopComponent(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#eeeeee",
        alignItems: "center",
        height: 50,
        paddingLeft: 18,
        color: "#444851"
      }}
    >
      <Typography>Date: Wed, Jan 16, 2019</Typography>
      <div style={{ display: "flex" }}>
        {legends.map((legend, i) => (
          <Legend key={i} legend={legend} />
        ))}
      </div>
    </div>
  );
}
