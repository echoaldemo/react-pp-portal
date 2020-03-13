import React, { useState, useEffect } from "react";
import {
  Modal,
  SaveButton, //eslint-disable-line
  LoadingModal, //eslint-disable-line
  SuccessModal, //eslint-disable-line
  Pagination,
  SearchBar
} from "common-components";
import styled from "styled-components";
import { Button, Tabs, Tab, Divider } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useStyles } from "../styles";
import HistoryTable from "./HistoryTable";

//eslint-disable-next-line
const Loading = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Cancel = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;

const CreateBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CreateText = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;

interface UploadProps {
  open: boolean;
  handleClose: () => void;
  state: any;
  openModalEditDncList: Function;
  openModalUpload: Function;
}

const Upload: React.FC<UploadProps> = ({
  open,
  handleClose,
  state,
  openModalEditDncList,
  openModalUpload
}) => {
  const classes = useStyles();
  const [file, handleFile] = useState<any>(null);
  const [tabValue, setTabValue] = useState<any>(0);
  const [tableData, setTableData] = useState<any>(state);
  const [paginateList, setPaginateList] = useState<any>(state); //eslint-disable-line

  useEffect(() => {
    setTabValue(0);
  }, [open]);

  function changeFile(e: any) {
    let files = e.target.files[0];
    var uploadFile = new FormData();
    uploadFile.append("file", files);

    handleFile(uploadFile);
  }

  const paginate = (from: number, to: number) => {
    setTableData(paginateList.slice(from, to));
  };

  return (
    <>
      {/* <LoadingModal
        open={state.load}
        text={"One moment. We’re adding the did pool…"}
        cancelFn={() => alert("asd")}
      />
      <SuccessModal
        open={state.done}
        text={`You have Created ${data.name}`}
        btnText={"ADD DID POOL"}
        closeFn={handleClose}
        btnFn={() => {
          setState({ ...state, open: true, done: false });
        }}
      /> */}
      <Modal
        open={open}
        title="Upload numbers"
        onClose={handleClose}
        width={tabValue === 1 ? "1000px" : ""}
      >
        <form className={classes.formWrapper}>
          <div className={classes.tabContainer}>
            <Tabs
              value={tabValue}
              variant="fullWidth"
              aria-label="full width tabs example"
              className={classes.tabs}
              classes={{
                indicator: classes.indicator
              }}
              id="tabs"
            >
              <Tab
                label="Upload"
                classes={{ wrapper: classes.wrapper }}
                className={
                  tabValue === 0 ? classes.activeTab : classes.notActive
                }
                onClick={() => {
                  setTabValue(0);
                }}
              />
              <Tab
                label="History"
                classes={{ wrapper: classes.wrapper }}
                className={
                  tabValue === 1 ? classes.activeTab : classes.notActive
                }
                onClick={() => {
                  setTabValue(1);
                }}
              />
            </Tabs>
          </div>
          <div className={classes.formContainer}>
            {tabValue === 0 ? (
              <React.Fragment>
                <label className={classes.labelCSVFile}>{"CSV File"}</label>
                <input
                  accept=".xlsx, .xls, .csv"
                  style={{ display: "none", padding: "30px 0" }}
                  id="raised-button-file"
                  type="file"
                  name="file"
                  onChange={e => changeFile(e)}
                />
                <label htmlFor="raised-button-file">
                  <Button component="span" className={classes.uploadFileBtn}>
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        marginLeft: "-9px"
                      }}
                    >
                      {file ? file.get("file").name : "No file chosen"}
                    </span>
                    <div className={classes.chooseFile}>
                      <GetAppIcon className={classes.uploadIcon} />
                      Choose File
                    </div>
                  </Button>
                </label>
                <Divider className={classes.divider} />
                <p className={classes.helperText}>
                  {"A plain text CSV file with a single column: number"}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div>
                  <SearchBar
                    title=""
                    userData={tableData}
                    headers={["name"]}
                    setActiveDataMethod={() => {}}
                  />
                  <HistoryTable
                    state={tableData}
                    openModalEditDncList={() => openModalEditDncList(true)}
                    openModalUpload={() => openModalUpload(true)}
                  />

                  <Divider />
                  {Boolean(paginateList.length) && (
                    <Pagination
                      paginateFn={paginate}
                      totalItems={paginateList.length}
                      itemsPerPage={9}
                    />
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
          <div className={classes.buttonContainer}>
            <Btn type="button" onClick={handleClose}>
              <Cancel>Cancel</Cancel>
            </Btn>
            <CreateBtn data-cy="create-button" type="submit">
              <CreateText>Save</CreateText>
            </CreateBtn>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Upload;
