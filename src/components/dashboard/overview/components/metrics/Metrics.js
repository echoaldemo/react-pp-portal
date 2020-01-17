import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import MetricCont from "../../../../common-components/metric-container";
import MetricCards from "./MetricCards";
import { FiMap } from "react-icons/fi";
import { PhoneInTalkRounded, Person } from "@material-ui/icons";
import { FaChartBar } from "react-icons/fa";
import { camapaign, dialer, agent } from "./mockData";
import EditMetrics from "./EditMetricsModal";
import Modal from "../../../../common-components/Modal/index";

const Metrics = () => {
  const [open, setOpen] = useState(false);
  const handleEdit = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <MetricCont
            icon={<FiMap style={{ height: 20, width: 20, color: "#f89523" }} />}
            header="Campaign Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={camapaign} />
          </MetricCont>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCont
            icon={
              <PhoneInTalkRounded
                style={{ height: 20, width: 20, color: "#f89523" }}
              />
            }
            header="Dialer Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={dialer} />
          </MetricCont>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCont
            icon={
              <Person style={{ height: 20, width: 20, color: "#f89523" }} />
            }
            header="Agent Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={agent} />
          </MetricCont>
        </Grid>
        <Grid item xs={12} md={6}>
          <MetricCont
            icon={
              <FaChartBar style={{ height: 20, width: 20, color: "#f89523" }} />
            }
            header="Data Metrics"
            editFn={handleEdit}
          >
            <MetricCards data={[]} />
          </MetricCont>
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
