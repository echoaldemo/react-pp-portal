import React, { useState } from "react";
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
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

import { useStyles, CallMenuPaper } from "./styles";

interface Props {
  agentName?: string;
  agentImage?: any;
  classes?: any;
  callInfo?: any;
  ToggleCallButton?: any;
  OpenMonitorFunc?: any;
  children?: React.ReactNode;
}

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
