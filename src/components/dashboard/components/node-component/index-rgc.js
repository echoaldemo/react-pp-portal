import React from "react";
import Chart from "react-google-charts";
export default (props) => {
  return (
    <div>
      <Chart
        height={498}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "string", label: "Date" },
            { type: "number", label: "values" },
            { type: "number", label: "values" }
          ],
          ["10 Jul", 0.5, 0.2],
          ["17 Jul", 0.3, 0.5],
          ["24 Jul", 0.5, 0.3],
          ["31 Jul", 0.3, 0.1],
          ["7 Ago", 0.2, 0.4],
          ["14 Ago", 0.5, 0.3],
          ["21 Ago", 0.5, 0.2],
          ["28 Ago", 0.4, 0.3],
          ["4 Sep", 0.5, 0.4],
          ["11 Sep", 0.4, 0.2],
          ["18 Sep", 0.5, 0.3],
          ["25 Sep", 0.5, 0.5],
          ["2 Oct", 0.3, 0.5]
        ]}
        options={{
          lineStyle: [4, 4],
          intervals: { style: "none" },
          legend: "none",
          pointsVisible: true,
          vAxis: {
            maxValue: 0.83,
            minValue: 0.23,
            textStyle: {
              fontSize: 12,
              fontWeight: 300,
              color: "#444851"
            }
          },
          hAxis: {
            gridlines: {
              display: false
            },
            textStyle: {
              marginTop: "500rem !important",
              fontSize: 12,
              fontWeight: 300,
              color: "#444851"
            }
          },
          axes: {
            x: {
              0: { side: "top" }
            }
          },
          lineWidth: 3,
          series: {
            0: {
              color: "#44bd94"
            },
            1: {
              color: "#6698c7"
            }
          }
        }}
      />
    </div>
  );
};
