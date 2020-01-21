import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { MetricsCard } from "common-components";
import SalesModal from "../SalesModal";
import { NoData } from "../../styles/MetricCards.style";

interface Obj {
  [index: string]: any;
}

const MetricCards = ({ data }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [metric, setMetric] = useState<Obj>({});

  const handleChart = (test: Obj) => {
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
            onClose={(e: any) => setOpen(false)}
          />
          <Grid
            container
            spacing={4}
            alignItems="flex-start"
            justify="flex-start"
          >
            {data.map((test: Obj, i: number) => (
              <Grid item xs={12} md={6} key={i}>
                <MetricsCard
                  title={test.title}
                  percentage={test.percentage}
                  mode={test.mode}
                  status={test.status}
                  content={[
                    {
                      tag: "Last 90 days",
                      value: 0.2
                    },
                    {
                      tag: "Minimum",
                      value: 0.21
                    },
                    {
                      tag: "Average",
                      value: 0.34
                    },
                    {
                      tag: "Maximum",
                      value: 0.84
                    }
                  ]}
                  handleClick={() => handleChart(test)}
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
