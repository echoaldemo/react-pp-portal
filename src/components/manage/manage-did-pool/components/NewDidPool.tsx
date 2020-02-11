import React from "react";
import {
  Modal,
  SaveButton,
  LoadingModal,
  SuccessModal
} from "common-components";
import styled from "styled-components";
import { MenuItem, CircularProgress, TextField } from "@material-ui/core";
import { NewDidProps } from "../utils/types";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  div {
    margin-top: 4px;
  }
`;
const Loading = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
`;
const NewDidPool: React.FC<NewDidProps> = ({
  state,
  setState,
  companies,
  campaigns,
  setCampaigns,
  voice,
  data,
  setData,
  handleNewDidPool,
  handleClose
}) => {
  return (
    <>
      <LoadingModal
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
      />
      <Modal open={state.open} title="Create Did Pool" onClose={handleClose}>
        <Container>
          <InputField
            fullWidth
            label="Name"
            required
            value={data.name}
            onChange={e => {
              setData({ ...data, name: e.target.value });
              if (!e.target.value) {
                setState({ ...state, nameErr: "A name is required" });
              } else {
                setState({ ...state, nameErr: "" });
              }
            }}
            onBlur={e => {
              if (!e.target.value) {
                setState({ ...state, nameErr: "A name is required" });
              } else {
                setState({ ...state, nameErr: "" });
              }
            }}
            error={state.nameErr ? true : false}
            helperText={state.nameErr ? state.nameErr : " "}
          />
          {voice.length === 0 ? (
            <InputField
              fullWidth
              label="Voice Provider"
              required
              select
              value=""
              error={state.voiceErr ? true : false}
              helperText={state.voiceErr ? state.voiceErr : " "}
              onBlur={e => {
                if (!e.target.value) {
                  setState({
                    ...state,
                    voiceErr: "A voice provider is required"
                  });
                } else {
                  setState({ ...state, voiceErr: "" });
                }
              }}
            >
              <Loading>
                <CircularProgress size={20} />
              </Loading>
            </InputField>
          ) : (
            <InputField
              fullWidth
              label="Voice Provider"
              required
              select
              value={data.voice_provider}
              onChange={e =>
                setData({ ...data, voice_provider: e.target.value })
              }
              onBlur={e => {
                if (!e.target.value) {
                  setState({
                    ...state,
                    voiceErr: "A voice provider is required"
                  });
                } else {
                  setState({ ...state, voiceErr: "" });
                }
              }}
              error={state.voiceErr ? true : false}
              helperText={state.voiceErr ? state.voiceErr : " "}
            >
              {voice.map((v: any) => (
                <MenuItem key={v.uuid} value={v.uuid}>
                  {v.name}
                </MenuItem>
              ))}
            </InputField>
          )}
          {companies.length === 0 || campaigns.og.length === 0 ? (
            <InputField
              fullWidth
              label="Company"
              required
              select
              value=""
              onBlur={e => {
                if (!e.target.value) {
                  setState({ ...state, companyErr: "A Company is required" });
                } else {
                  setState({ ...state, companyErr: "" });
                }
              }}
              error={state.companyErr ? true : false}
              helperText={state.companyErr ? state.companyErr : " "}
            >
              <Loading>
                <CircularProgress size={20} />
              </Loading>
            </InputField>
          ) : (
            <InputField
              fullWidth
              label="Company"
              required
              select
              value={data.company}
              onChange={e => {
                setData({ ...data, company: e.target.value, campaign: "" });
                setCampaigns({
                  ...campaigns,
                  fil: campaigns.og.filter(
                    (camp: any) => camp.company === e.target.value
                  )
                });
              }}
              onBlur={e => {
                if (!e.target.value) {
                  setState({ ...state, companyErr: "A Company is required" });
                } else {
                  setState({ ...state, companyErr: "" });
                }
              }}
              error={state.companyErr ? true : false}
              helperText={state.companyErr ? state.companyErr : " "}
            >
              {companies.map((company: any) => (
                <MenuItem key={company.uuid} value={company.uuid}>
                  {company.name}
                </MenuItem>
              ))}
            </InputField>
          )}
          {campaigns.og.length === 0 ? (
            <InputField
              fullWidth
              label="Campaign"
              required
              select
              disabled={data.company ? false : true}
              value=""
              onBlur={e => {
                if (!e.target.value) {
                  setState({ ...state, campaignErr: "A Campaign is required" });
                } else {
                  setState({ ...state, campaignErr: "" });
                }
              }}
              error={state.campaignErr ? true : false}
              helperText={state.campaignErr ? state.campaignErr : " "}
            >
              <Loading>
                <CircularProgress size={20} />
              </Loading>
            </InputField>
          ) : campaigns.fil.length === 0 ? (
            <InputField
              fullWidth
              label="Campaign"
              required
              select
              disabled={data.company ? false : true}
              value=""
              onBlur={e => {
                if (!e.target.value) {
                  setState({ ...state, campaignErr: "A Campaign is required" });
                } else {
                  setState({ ...state, campaignErr: "" });
                }
              }}
              error={state.campaignErr ? true : false}
              helperText={state.campaignErr ? state.campaignErr : " "}
            >
              <Loading>No campaign in this company</Loading>
            </InputField>
          ) : (
            <InputField
              fullWidth
              label="Campaign"
              required
              select
              value={data.campaign}
              onChange={e => {
                setData({ ...data, campaign: e.target.value });
                if (!e.target.value) {
                  setState({ ...state, campaignErr: "A Campaign is required" });
                } else {
                  setState({ ...state, campaignErr: "" });
                }
              }}
              disabled={data.company ? false : true}
              onBlur={e => {
                if (!e.target.value) {
                  setState({ ...state, campaignErr: "A Campaign is required" });
                } else {
                  setState({ ...state, campaignErr: "" });
                }
              }}
              error={state.campaignErr ? true : false}
              helperText={state.campaignErr ? state.campaignErr : " "}
            >
              {campaigns.fil.map((campaign: any) => (
                <MenuItem key={campaign.uuid} value={campaign.uuid}>
                  {campaign.name}
                </MenuItem>
              ))}
            </InputField>
          )}
          <SaveButton
            style={{ margin: "16px 0" }}
            disabled={
              state.nameErr ||
              state.voiceErr ||
              state.companyErr ||
              state.campaignErr ||
              !data.name ||
              !data.voice_provider ||
              !data.company ||
              !data.campaign
            }
            onClick={handleNewDidPool}
          >
            Create Did Pool
          </SaveButton>
        </Container>
      </Modal>
    </>
  );
};

export default NewDidPool;
