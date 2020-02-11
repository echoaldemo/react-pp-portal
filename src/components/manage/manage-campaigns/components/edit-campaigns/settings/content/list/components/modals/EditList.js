import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { SaveButton } from "common-components";
import { RefreshOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    margin: "5px"
  },
  title: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851"
  },
  label: {
    fontFamily: "Roboto",
    fontSize: "15px",
    color: "#444851",
    marginBottom: "5px"
  },
  data: {
    fontFamily: "Roboto",
    fontSize: "15px",
    color: "#777777",
    marginBottom: "15px"
  },
  text: {
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: "#444851",
    marginBottom: "20px"
  },
  textWrap: {
    maxWidth: "493px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
}));

const EditList = () => {
  const classes = useStyles();

  function LabelText({ label, data }) {
    return (
      <>
        <Grid item xs={3} className={classes.label}>
          <span>{label}:</span>
        </Grid>
        <Grid item xs={9} className={classes.data}>
          <div className={classes.textWrap}>{data}</div>
        </Grid>
      </>
    );
  }

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <p className={classes.title}>List settings</p>
      </Grid>
      <LabelText label="Name" data="easttz1731_4" />
      <LabelText label="UUID" data="eb37d2a0-eaa8-11e8-a215-5254001397e0" />
      <LabelText label="Source" data="POSA" />
      <LabelText label="Vendor" data="POSA Pledged Assistence" />
      <LabelText label="Can post" data="No" />
      <LabelText label="Date Created" data="Nov. 10, 2018, 11:47 p.m." />
      <LabelText label="Date Modified" data="Nov. 14, 2018, 3:33 p.m." />
      <LabelText
        label="Post URL"
        data="https://pp9.perfectpitchtech.com/prospect-upload/f6e0aeda-e542-1122-1122"
      />
      <LabelText
        label="Post file URL"
        data="https://pp9.perfectpitchtech.com/prospect-upload/f6e0aeda-e542-1122-1122"
      />
      <LabelText
        label="Customer Help URL"
        data="https://pp9.perfectpitchtech.com/prospect-upload/f6e0aeda-e542-1122-1122"
      />
      <Grid item xs={12}>
        <p className={classes.title}>Dynamic posting instructions</p>
      </Grid>
      <Grid item xs={12}>
        <span className={classes.text}>
          This list is not set to be dynamic. Please contact customer support if
          you need to dynamically post to this prospect_list. You can still
          upload to this prospect_list.
        </span>
      </Grid>
      <Grid item xs={12}>
        <SaveButton style={{ backgroundColor: "#7c8a97", marginTop: "15px" }}>
          {" "}
          <RefreshOutlined />
          Update List
        </SaveButton>
      </Grid>
    </Grid>
  );
};

export default EditList;
