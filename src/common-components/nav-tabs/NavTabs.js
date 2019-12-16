import React from "react";
import { Typography } from "@material-ui/core";
import { StatusLabel, BackButton } from "common-components";
import { useStyles } from "./styles/NavTabs.style";

export default function SettingsMenuBar(props) {
  const { tabnames, data, history, back } = props;
  const classes = useStyles();

  function handleClick(tab) {
    if (history) {
      history.push({
        pathname: `${tab.path}/${data.slug}/${data.uuid}${tab.url}`,
        state: {
          company: data
        }
      });
    }
  }

  return (
    <>
      <Typography style={{ cursor: "pointer" }}>
        <BackButton text={back.name} to={back.url} />
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "25px 0",
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "30%",
            padding: "0 3px 0 0"
          }}
        >
          {props.loadingState ? (
            <>
              <Typography
                style={{ color: "#444851", fontSize: "20px", marginRight: 25 }}
              >
                Loading..
              </Typography>
            </>
          ) : (
            <>
              <Typography
                style={{ color: "#444851", fontSize: "24px", marginRight: 25 }}
              >
                {data.name}
              </Typography>
              <StatusLabel status={data.status} />
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "70%",
            justifyContent: "flex-end"
          }}
        >
          {tabnames.map(tab => (
            <div
              key={tab.name}
              className={
                history.location.pathname ===
                `${tab.path}/${data.slug}/${data.uuid}${tab.url}`
                  ? classes.activeMenu
                  : classes.inactiveMenu
              }
              onClick={e => handleClick(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
