import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Modal } from "common-components";
import NodeChart from "../../../components/node-component";
import HeadOption from "./HeadOptions";

const theme = createMuiTheme({});

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
}

const SalesModal = ({ open, onClose, title }: Props) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={onClose}
        title={title || "Sales"}
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
