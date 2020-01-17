import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MetricCards from "./MetricCards";
import { FiMap } from "react-icons/fi";
import { PhoneInTalkRounded, Person } from "@material-ui/icons";
import { FaChartBar } from "react-icons/fa";
import { camapaign, dialer, agent } from "./mockData";
import EditMetrics from "./EditMetricsModal";
import { Modal, MetricContainer } from "common-components";

const Metrics = () => {
  const [open, setOpen] = useState(false);
  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MetricContainer
            icon={<FiMap style={{ height: 20, width: 20, color: "#f89523" }} />}
            header="Campaign Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={camapaign} />
          </MetricContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricContainer
            icon={
              <PhoneInTalkRounded
                style={{ height: 20, width: 20, color: "#f89523" }}
              />
            }
            header="Dialer Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={dialer} />
          </MetricContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricContainer
            icon={
              <Person style={{ height: 20, width: 20, color: "#f89523" }} />
            }
            header="Agent Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={agent} />
          </MetricContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricContainer
            icon={
              <FaChartBar style={{ height: 20, width: 20, color: "#f89523" }} />
            }
            header="Data Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={[]} />
          </MetricContainer>
        </Grid>
      </Grid>
      <Modal
        open={open}
        title="Campaign Metrics"
        onClose={() => setOpen(false)}
        width={595}
      >
        <EditMetrics />
      </Modal>
    </>
  );
};

export default Metrics;
