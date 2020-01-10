import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Modal } from "common-components";
import AddDNC from "./add-dnc/AddDNC";
import NewProspectList from "./new-prospect-list/NewProspectList";
import ExportList from "./ExportList";
import ExportCDR from "./ExportCDR";
import { useStyles, BtnCont, AddBtn, NewBtn } from "./styles";

const Top: React.FC = () => {
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
  const SaveExportList = (data: any) => {
    setExportListData(data);
    setOpenExportList(false);
  };
  const SaveExportCDR = (data: any) => {
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
};

export default Top;
