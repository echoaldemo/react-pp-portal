import React from "react";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/styles";

import styled from "styled-components";

import Modal from "../../../../common-components/Modal";

import NodeChart from "../../../components/node-component";

import HeadOption from "./HeadOptions";

const theme = createMuiTheme({});

const useStyles = makeStyles({});

const SalesModal = (props) => {
  let classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>
      <Modal
        open={props.open}
        onClose={props.onClose}
        title={props.title || "Sales"}
        width={1245}
        height={660}
      >
        <HeadOption />
        <NodeChart />
      </Modal>
    </MuiThemeProvider>
  );
};

export default SalesModal;
