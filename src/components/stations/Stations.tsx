import React, { useState, useContext } from "react";
import SEO from "utils/seo";
import "./style/style.css";
import {
  HeaderLink,
  HeaderButton,
  TableLoader,
  SearchBar,
  Pagination,
  LoadingModal,
  SuccessModal
} from "common-components";
import { Paper, Divider } from "@material-ui/core";
import StationsTable from "./StationsTable";
import { store } from "contexts/ManageComponent";
import NewStation from "./components/NewStation";
import { post } from "utils/api";
import slugify from "slugify";
import SnackNotif from "auth/component/snackbar/snackbar";

function Stations(props: any) {
  const { state } = useContext(store);
  const [states, setState] = useState<any>({
    stations: state.stations,
    paginateList: state.stations,
    selectedRealms: [],
    loadingModal: false,
    successModal: false,
    addNewModal: false,
    username: "",
    errorMessage: ""
  });
  const handleSubmit = (usr: any, pass: any, active: any) => {
    setState({ ...states, loadingModal: true, addNewModal: false });
    post("/identity/station/create/", {
      slug: slugify(usr),
      active: active,
      username: usr,
      password: pass
    }).then((res: any) => {
      if (res.status === 200) {
        setState({
          ...states,
          loadingModal: false,
          successModal: true,
          username: usr,
          addNewModal: false
        });
      } else {
        console.log(res);
        setState({
          ...states,
          loadingModal: false,
          addNewModal: true,
          errorMessage: "Username Already Exists"
        });
      }
    });
  };
  const handleSelect = (type: any) => ({ target: { value } }: any) => {
    setState({ ...states, selectedRealms: value });
  };
  const paginate = (from: any, to: any) => {
    setState({
      ...states,
      stations: states.paginateList.slice(from, to)
    });
  };
  const handleCloseSucess = () => {
    setState({ ...states, successModal: false });
  };
  return (
    <div>
      <SEO title="Stations" />
      <div className="header-container">
        <HeaderLink menu={[]} title="Stations" />
        <div style={{ display: "flex" }}>
          <HeaderButton
            openFunction={() => setState({ ...states, addNewModal: true })}
            buttonText="New Station"
          />
        </div>
      </div>
      <Paper style={{ height: "100%" }}>
        <div className="header-container">
          <div style={{ width: "100%" }}>
            <SearchBar
              title="Station"
              userData={state.stations.length === 0 ? [] : state.stations}
              headers={["username", "uuid"]}
              loading={state.stations.length === 0 ? true : false}
            />
            <Divider />
            {state.stations.length === 0 ? (
              <TableLoader />
            ) : (
              <div style={{ height: 600 }}>
                <StationsTable
                  headers={["UUID", "USERNAME", "STATUS", ""]}
                  history={props.history}
                  state={states}
                />
              </div>
            )}
            <div style={{ width: "100%", height: 50 }}>
              <Divider />
              {Boolean(states.paginateList.length) && (
                <Pagination
                  paginateFn={paginate}
                  totalItems={states.paginateList.length}
                  itemsPerPage={6}
                />
              )}
            </div>
          </div>
        </div>
      </Paper>
      <NewStation
        open={states.addNewModal}
        closeCreate={() => setState({ ...states, addNewModal: false })}
        createFn={handleSubmit}
        selectFn={handleSelect}
        selected={states.selectedRealms}
      />
      <LoadingModal
        open={states.loadingModal}
        text={`One moment. Adding Station`}
        cancelFn={() => null}
      />
      <SuccessModal
        open={states.successModal}
        text={`Successfully added “${states.username}”`}
        closeFn={handleCloseSucess}
      />
      <SnackNotif
        snackbar={states.errorMessage.length === 0 ? false : true}
        handleClose={() => setState({ ...states, errorMessage: "" })}
        message={states.errorMessage}
      />
    </div>
  );
}

export default Stations;
