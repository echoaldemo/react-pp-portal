import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { SaveButton } from "../../../../../../../common-components/buttons";
import styled from "styled-components";
import AddDNC from "./add-dnc/AddDNC";
import NewProspectList from "./new-prospect-list/NewProspectList";
import Modal from "../../../../../../../common-components/Modal";
import ExportList from "./ExportList";
import ExportCDR from "./ExportCDR";

const NewBtn = styled(SaveButton)`
  min-width: 120px;
`;
const AddBtn = styled(SaveButton)`
  min-width: 120px;
  background: #7c8a97;
  color: #ffffff;
  margin-right: 20px;
  text-transform: none;
`;
const BtnCont = styled.div`
  display: flex;
  align-items: center;
`;
const useStyles = makeStyles(theme => ({
  con: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 20px",
    padding: "0 20px",
    backgroundColor: "#fafafa",
    height: 62
  },
  btnAdd: {
    height: 40,
    width: 120,
    backgroundColor: "#7c8a97",
    border: "none",
    outline: "none",
    borderRadius: 3,
    fontSize: 16,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#6d7a86"
    }
  }
}));

export default function Top() {
  const [state, setState] = useState({
    dnc: false,
    list: false,
    phone: ""
  });
  const [openExportList, setOpenExportList] = useState(false);
  const [openExportCDR, setOpenExportCDR] = useState(false);
  const [exportListData, setExportListData] = useState(false);
  const [exportCDRData, setExportCDRData] = useState(false);
  const classes = useStyles();
  const SaveExportList = data => {
    setExportListData(data);
    setOpenExportList(false);
  };
  const SaveExportCDR = data => {
    setExportCDRData(data);
    setOpenExportCDR(false);
  };
  return (
    <>
      <AddDNC state={state} setState={setState} />
      <NewProspectList state={state} setState={setState} />
      <div className={classes.con}>
        <Typography>
          You can create a new list, add dnc, and export lists and CDRs.
        </Typography>
        <BtnCont>
          <span
            style={{ marginRight: 20, textDecoration: "underline" }}
            onClick={() => setOpenExportList(true)}
          >
            Export List
          </span>
          <span
            style={{ marginRight: 20, textDecoration: "underline" }}
            onClick={() => setOpenExportCDR(true)}
          >
            Export CDRs
          </span>
          <AddBtn onClick={() => setState({ ...state, dnc: true, phone: "" })}>
            Add DNC
          </AddBtn>
          <NewBtn onClick={() => setState({ ...state, list: true })}>
            <Add /> New list
          </NewBtn>
        </BtnCont>
      </div>

      <Modal
        open={openExportList}
        title="Export list"
        onClose={() => setOpenExportList(false)}
        width={750}
      >
        <ExportList
          SaveExportList={SaveExportList}
          setOpenExportList={setOpenExportList}
        />
      </Modal>
      <Modal
        open={openExportCDR}
        title="Export CDR"
        onClose={() => setOpenExportCDR(false)}
        width={750}
      >
        <ExportCDR
          SaveExportList={SaveExportCDR}
          setOpenExportList={setOpenExportCDR}
        />
      </Modal>
    </>
  );
}
