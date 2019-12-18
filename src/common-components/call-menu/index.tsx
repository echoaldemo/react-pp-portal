import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { Grid, Avatar, Typography, Box, IconButton } from "@material-ui/core";
import {
  PhoneInTalk,
  VolumeOff,
  MicOff,
  Close,
  VolumeUp,
  Mic
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

interface Props {
  agentName?: string;
  agentImage?: any;
  classes?: any;
  callInfo?: any;
  ToggleCallButton?: any;
  OpenMonitorFunc?: any;
  children?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "transparent"
  },
  avatar: {
    width: 45,
    height: 45
  },
  paper: {
    boxShadow:
      "0px 11px 15px -7px rgba(0,0,0,0.05), 0px 24px 38px 3px rgba(0,0,0,0.03), 0px 9px 46px 8px rgba(0,0,0,0.03)"
  },
  active: {
    backgroundColor: "#7c8a97",
    padding: 7,
    "&:hover": {
      backgroundColor: "#7c8a97"
    }
  },
  inactive: {
    backgroundColor: "none",
    border: "1px solid #eeeeee",
    padding: 6,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  activeIcon: {
    color: "#ffffff"
  },
  inactiveIcon: {
    color: "#eeeeee"
  },
  phoneintalk: {
    width: 45,
    height: 45,
    marginTop: "5px",
    color: "#1194f6"
  },
  calltimer: {
    width: "102px",
    height: "45px",
    border: "1px solid #eeeeee",
    fontSize: "18px"
  }
}));

const CallMenuPaper = styled(Paper)`
  max-width: 605px;
  width: 605px;
  padding: 20px;
  position: fixed;
  bottom: 80px;
  max-height: 85px;
`;

const AgentName: Function = (props: Props) => {
  const { classes, agentName, agentImage } = props;
  return (
    <Grid container spacing={2} style={{ marginLeft: 5 }}>
      <Grid item>
        <Avatar
          alt={agentName}
          src={`${agentImage}`}
          className={classes.avatar}
        />
      </Grid>
      <Grid item>
        <Typography style={{ fontSize: "18px", color: "#444851" }}>
          {agentName}
        </Typography>
        <Typography style={{ fontSize: "14px", color: "#777777" }}>
          On Call…
        </Typography>
      </Grid>
    </Grid>
  );
};

const ButtonsAgent: Function = (props: Props) => {
  const { classes, callInfo, ToggleCallButton, OpenMonitorFunc } = props;
  const { listening, whisper } = callInfo;
  return (
    <Grid container spacing={2} style={{ marginLeft: 10 }}>
      <Grid item>
        <IconButton
          onClick={() => ToggleCallButton("listening")}
          size="small"
          className={listening ? classes.active : classes.inactive}
        >
          {listening ? (
            <VolumeUp className={classes.activeIcon} />
          ) : (
            <VolumeOff className={classes.inactiveIcon} />
          )}
        </IconButton>
        <Typography
          style={{ fontSize: "12px", color: "#777777" }}
          align="center"
        >
          Listen
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          onClick={() => ToggleCallButton("whisper")}
          size="small"
          className={whisper ? classes.active : classes.inactive}
        >
          {whisper ? (
            <Mic className={classes.activeIcon} />
          ) : (
            <MicOff className={classes.inactiveIcon} />
          )}
        </IconButton>
        <Typography
          style={{ fontSize: "12px", color: "#777777" }}
          align="center"
        >
          Whisper
        </Typography>
      </Grid>
      <Grid item>
        <IconButton onClick={() => OpenMonitorFunc("")}>
          <Close />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const CallTimer: Function = (props: Props) => {
  const { classes, children } = props;
  return (
    <Box
      className={classes.calltimer}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

const CallMenu: Function = (props: Props) => {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const { callInfo, ToggleCallButton, OpenMonitorFunc } = props;
  const { agentName, agentImage } = callInfo;

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Draggable>
        <CallMenuPaper className={classes.paper}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={1} md={1}>
              <PhoneInTalk className={classes.phoneintalk} />
            </Grid>
            <Grid item xs={5} md={5}>
              <AgentName
                classes={classes}
                agentName={agentName}
                agentImage={agentImage}
              />
            </Grid>

            <Grid item xs={2} md={2}>
              <CallTimer classes={classes}>
                <Timer active duration={null}>
                  <Timecode format="H:mm:ss" time={time} />
                </Timer>
              </CallTimer>
            </Grid>
            <Grid item xs={4} md={4}>
              <ButtonsAgent
                classes={classes}
                callInfo={callInfo}
                ToggleCallButton={ToggleCallButton}
                OpenMonitorFunc={OpenMonitorFunc}
              />
            </Grid>
          </Grid>
        </CallMenuPaper>
      </Draggable>
    </div>
  );
};

export { CallMenu };
