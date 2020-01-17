import React, { useState } from "react";
import MetricsCard from "../../../../common-components/metrics-card";
import { Grid } from "@material-ui/core";
// import Modal from "../../../../common-components/Modal";
import styled from "styled-components";
import SalesModal from "../SalesModal";

const NoData = styled.div`
  border-radius: 3px;
  border: dashed 2px #cccccc;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #9b9b9b;
  width: 100%;
  top: 0;
  bottom: 0;
  position: absolute;
`;

const MetricCards = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [metric, setMetric] = useState("");

  const handleChart = test => {
    setMetric(test);
    setOpen(true);
  };

  return (
    <>
      {data.length === 0 ? (
        <NoData>Metrics content</NoData>
      ) : (
        <>
          <SalesModal
            title={metric.title}
            open={open}
            onClose={e => setOpen(false)}
          />
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justify="flex-start"
          >
            {data.map((test, i) => (
              <Grid item xs={12} md={6} key={i}>
                <MetricsCard
                  title={test.title}
                  percentage={test.percentage}
                  mode={test.mode}
                  status={test.status}
                  openChartFn={() => handleChart(test)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default MetricCards;
