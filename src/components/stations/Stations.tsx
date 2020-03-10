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
import { post, get, patch } from "utils/api";
import slugify from "slugify";
import SnackNotif from "auth/component/snackbar/snackbar";
import EditStation from "./components/EditStation";

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
    errorMessage: "",
    editModal: false,
    activeData: {},
    label: ""
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
          addNewModal: false,
          label: "added"
        });
      } else {
        setState({
          ...states,
          loadingModal: false,
          addNewModal: true,
          errorMessage: "Username Already Exists"
        });
      }
    });
  };

  const handleSubmitEdit = (usr: any, pass: any, active: any, uuid: any) => {
    setState({ ...states, loadingModal: true, editModal: false });
    patch(`/identity/station/${uuid}/`, {
      slug: slugify(usr),
      active: active,
      username: usr,
      password: pass
    })
      .then((res: any) => {
        if (res.status === 200) {
          setState({
            ...states,
            loadingModal: false,
            successModal: true,
            username: usr,
            editModal: false,
            label: "editted"
          });
        } else {
          setState({
            ...states,
            loadingModal: false,
            editModal: true,
            errorMessage: "Username Already Exists"
          });
        }
      })
      .catch(() => {
        setState({
          ...states,
          loadingModal: false,
          editModal: true,
          errorMessage: "Username Already Exists"
        });
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
  const openModalEdit = (uuid: any) => {
    get(`/identity/station/${uuid}/`).then((res: any) => {
      setState({
        ...states,
        editModal: true,
        activeData: res.data,
        selectedRealms: res.realm !== undefined ? res.realm : []
      });
    });
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
                  openEdit={openModalEdit}
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
      {states.editModal ? (
        <EditStation
          openEdit={states.editModal}
          closeEdit={() => setState({ ...states, editModal: false })}
          createFnEdit={handleSubmitEdit}
          selectFnEdit={handleSelect}
          selectedEdit={states.selectedRealms}
          data={states.activeData}
        />
      ) : null}

      <LoadingModal
        open={states.loadingModal}
        text={`One moment. ${
          states.label === "added" ? "Adding" : "Updating"
        } Station`}
        cancelFn={() => null}
      />
      <SuccessModal
        open={states.successModal}
        text={`Successfully ${states.label} “${states.username}”`}
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
