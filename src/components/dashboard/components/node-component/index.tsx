import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation";

interface Obj {
  [index: string]: any;
}

const data: Obj = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "January"
  ],
  datasets: [
    {
      fill: false,
      lineTension: 0,
      backgroundColor: "#44bd94",
      borderColor: "#44bd94",
      borderCapStyle: "butt",
      borderDash: [],
      offsetGridLines: true,
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#44bd94",
      pointBackgroundColor: "#44bd94",
      pointBorderWidth: 1,
      pointStyle: "circle",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#44bd94",
      pointHoverBorderColor: "#44bd94",
      pointHoverBorderWidth: 2,
      pointRadius: 8.5,
      pointHitRadius: 1,
      label: "Sales",
      data: [0.23, 0.3, 0.5, 0.4, 0.6, 0.3, 0.4, 0.5]
    },
    {
      fill: false,
      lineTension: 0,
      backgroundColor: "#6698c7",
      borderColor: "#6698c7",
      borderCapStyle: "butt",
      borderDash: [],
      offsetGridLines: true,
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#6698c7",
      pointBackgroundColor: "#6698c7",
      pointBorderWidth: 1,
      pointStyle: "circle",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#6698c7",
      pointHoverBorderColor: "#6698c7",
      pointHoverBorderWidth: 2,
      pointRadius: 8.5,
      pointHitRadius: 1,
      label: "Other indicator",
      data: [0.6, 0.5, 0.3, 0.6, 0.4, 0.5, 0.82, 0.5]
    }
  ]
};

const Component = () => {
  return (
    <div>
      <Line
        height={120}
        data={data}
        options={{
          legend: {
            display: false
          },
          annotation: {
            annotations: [
              {
                type: "line",

                // optional drawTime to control layering, overrides global drawTime setting
                drawTime: "afterDatasetsDraw",

                // set to 'vertical' to draw a vertical line
                mode: "horizontal",

                // ID of the scale to bind onto
                scaleID: "y-axis-0",
                borderDash: [5, 5],

                value: 0.82,
                borderColor: "red",
                label: {
                  enabled: true,
                  position: "left",
                  backgroundColor: "transparent",
                  fontColor: "#444851",
                  fontStyle: "12px",
                  content: "Max 0.82",
                  yAdjust: -10
                }
              },
              {
                type: "line",

                // optional drawTime to control layering, overrides global drawTime setting
                drawTime: "afterDatasetsDraw",

                // set to 'vertical' to draw a vertical line
                mode: "horizontal",

                // ID of the scale to bind onto
                scaleID: "y-axis-0",
                lineWidth: 10,
                zeroLineWidth: 10,
                borderDash: [5, 5],

                value: 0.23,
                borderColor: " #7c8a97",
                label: {
                  enabled: true,
                  position: "left",
                  backgroundColor: "transparent",
                  fontColor: "#444851",
                  fontStyle: "12px",
                  content: "Min 0.23",
                  yAdjust: -10
                }
              }
            ]
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  drawBorder: false,
                  display: true,
                  color: "#eeeeee",
                  borderDash: [5, 5],
                  lineWidth: 1,
                  zeroLineWidth: 1,
                  zeroLineColor: "#eeeeee",
                  zeroLineBorderDash: [],
                  drawTicks: true,
                  tickMarkLength: 3
                },
                ticks: {
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: 12,
                  fotWeight: 300,
                  fontColor: "#444851",
                  min: 0,
                  padding: 20
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  padding: 5.5
                },
                offset: true
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default Component;
