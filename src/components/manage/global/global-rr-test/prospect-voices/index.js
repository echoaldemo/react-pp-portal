import React, { useEffect, useState } from "react";
import {
  Dialog,
  Paper,
  Zoom,
  Snackbar,
  CircularProgress
} from "@material-ui/core";

import { CContainer } from "../components";

import { PHeader, PColumn, NewVoice } from "./components";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { makeStyles } from "@material-ui/styles";

import styled from "styled-components";

import {
  getVoices,
  updateVoices,
  getProspectVoices,
  getRRTest
} from "../../../../../actions/Globals/ProspectVoices";

import {
  CustomButton,
  CustomText
} from "../../../../common-components/custom-components";
import { cancel } from "../../../../../utils/api";

const OptionToSave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  border-radius: 3px;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  }
});

const useStyles = makeStyles({});

// mock data

let activeData = ["346516de-5aa6-11e7-88db-02420aff0012"];

let availableData = [];

// end mock data

const ProspectVoices = props => {
  let classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pure_act_data, setPureActData] = useState([]);
  const [pure_avl_data, setPureAvlData] = useState(availableData);
  const [act_data, setActData] = useState([]);
  const [avl_data, setAvlData] = useState(availableData);
  const [is_edit, setIsEdit] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updated, setUpdated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voicesData, setVoicesData] = useState([]);

  useEffect(() => {
    fetchDatas();
  }, [props.testId]);

  async function fetchDatas() {
    setLoading(true);
    let active_voices = await getRRTest(props.router.match.params.test_uuid);
    let voices = await getVoices();
    setVoicesData(voices.data);
    fetchVoices(voices.data, active_voices.data.voices);
    parseVoices(voices.data, active_voices.data.voices);
  }

  async function parseVoices(voices_data = [], active_voices = []) {
    setLoading(true);
    let avl = active_voices || [];

    let avl_data = avl.map(key => {
      return {
        ...voices_data.filter(voice => voice.uuid === key)[0]
      };
    });

    setPureActData(avl_data);
    setActData(avl_data);
    setLoading(false);
  }

  async function fetchVoices(voices_data = [], active_voices = []) {
    setLoading(true);
    let pvl_data = voices_data;
    // let prospect_voices = await getProspectVoices();
    // let pvl = prospect_voices.data || [];

    // console.log("Fetch Voices: ", prospect_voices);

    // let pvl_data = pvl.map(key => {
    //   return {
    //     ...key,
    //     ...voices_data.filter(voice => voice.uuid === key.user)[0]
    //   };
    // });

    let filtered = pvl_data.filter(
      key => active_voices.filter(id => key.uuid === id).length <= 0
    );

    setPureAvlData(filtered);
    setAvlData(filtered);
    setLoading(false);
  }

  function removeItem(voice) {
    setIsEdit(true);
    setAvlData([...avl_data, voice]);
    let newAvailableData = act_data.filter(key => key !== voice);
    setActData(newAvailableData);
  }

  function renderActiveData(data) {
    return data
      ? data.map(key => {
          return (
            <PColumn
              notifyEdit={value => setIsEdit(value)}
              removeItem={removeItem}
              data={key}
              add={false}
            />
          );
        })
      : null;
  }

  function renderAvailableData(data) {
    return data.map(key => {
      return (
        <>
          {key.username && (
            <PColumn addVoice={addVoice} data={key} add={true} />
          )}
        </>
      );
    });
  }

  function renderNotifyOnError() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={updateError || errorMessage}
        message={<span id="message-id">{errorMessage}</span>}
      />
    );
  }

  function addVoice(voice) {
    if (voice) {
      setIsEdit(true);
      let old_act = act_data;
      let new_act = [...old_act, voice];
      setActData(new_act);
      let newAvailableData = avl_data.filter(key => key !== voice);
      setAvlData(newAvailableData);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid Data!");
      renderNotifyOnError();
    }
  }

  function openCreateVoice(value) {
    setOpen(value);
  }

  function renderCreateModal() {
    return (
      <NewVoice
        routeToProspect={routeToProspect}
        parseVoices={parseVoices}
        fetchVoices={fetchVoices}
        open={open}
        onClose={e => openCreateVoice(false)}
      />
    );
  }

  function renderOptionToSave(voice) {
    return (
      <>
        <Zoom in={is_edit}>
          <OptionToSave>
            <CustomButton
              onClick={e => cancelEdit()}
              style={{ marginRight: "30px" }}
            >
              <CustomText size="14px" weight={500}>
                CANCEL
              </CustomText>
            </CustomButton>

            <CustomButton
              disabled={saving}
              onClick={e => saveChangeItem()}
              style={{
                backgroundColor: "#b6d36b",
                position: "relative"
              }}
            >
              <CustomText color="light" size="14px" weight={500}>
                SAVE CHANGES
              </CustomText>
              {saving && (
                <CircularProgress
                  size={20}
                  style={{
                    position: "absolute",
                    zIndex: 999,
                    color: "#777777",
                    top: "30%",
                    right: "45%"
                  }}
                />
              )}
            </CustomButton>
          </OptionToSave>
        </Zoom>
      </>
    );
  }

  function cancelEdit() {
    cancel();
    setSaving(false);
    setIsEdit(false);
    setActData(pure_act_data);
    setAvlData(pure_avl_data);
    setUpdateError(false);
  }

  async function saveChangeItem() {
    setSaving(true);
    let voices = act_data.map(key => key.uuid);
    let test = props.router.match.params.test_uuid;
    let response = await updateVoices(test, voices);

    if (response.status < 300) {
      setSaving(false);
      setUpdateError(false);
      setPureActData(act_data);
      setPureAvlData(avl_data);
      setIsEdit(false);
      setUpdated(true);
    } else {
      setSaving(false);
      setUpdateError(true);
      setErrorMessage("Cannot update voices.");
    }
  }

  function routeToProspect(data) {
    let new_data = voicesData.filter(key => key.uuid === data.user);

    //props.history.push("/manage/audio/prospect");
    let parseData = voicesData.filter(key => key.uuid === data.user)[0];

    props.history.push({
      pathname: "/manage/audio/prospect",
      state: parseData
    });
  }

  function renderOptionToSave(voice) {
    return (
      <>
        <Zoom in={is_edit}>
          <OptionToSave>
            <CustomButton
              onClick={e => cancelEdit()}
              style={{ marginRight: "30px" }}
            >
              <CustomText size="14px" weight={500}>
                CANCEL
              </CustomText>
            </CustomButton>

            <CustomButton
              onClick={e => saveChangeItem(voice)}
              style={{
                backgroundColor: "#b6d36b"
              }}
            >
              <CustomText color="light" size="14px" weight={500}>
                SAVE CHANGES
              </CustomText>
            </CustomButton>
          </OptionToSave>
        </Zoom>
      </>
    );
  }

  function cancelEdit() {
    setIsEdit(false);
    setActData(pure_act_data);
    setAvlData(pure_avl_data);
  }

  // function saveChangeItem() {
  //   setPureActData(act_data);
  //   setPureAvlData(avl_data);
  //   setIsEdit(false);
  // }

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "19px"
        }}
      >
        <PHeader openCreateVoice={openCreateVoice} open={open} />
        <div
          style={{
            marginTop: "20px",
            width: "95.4%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <CContainer
            onEdit={is_edit}
            cancelEdit={cancelEdit}
            saveChangeItem={saveChangeItem}
            loading={loading}
            title="Active rep voices"
          >
            {renderActiveData(act_data)}
          </CContainer>
          <CContainer loading={loading} title="Available rep voices">
            {renderAvailableData(avl_data)}
          </CContainer>
        </div>
      </div>
      {renderCreateModal()}
      {errorMessage && renderNotifyOnError()}
    </>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    if (this.state.error) {
      console.log("An error occured!", this.props);
    } else return <ProspectVoices />;
  }
}

export default ProspectVoices;
