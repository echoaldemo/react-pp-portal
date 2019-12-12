import React, { useState } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Input, Divider, Typography } from "@material-ui/core";
import { mdiUpload } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";

import { CustomText } from "../custom-text";

const LabelText = styled(Typography)`
  font-size: 14px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
`;

const HelperText = styled(Typography)`
  font-size: 12px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
  margin-top: 8px !important;
`;

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    },
    MuiSwitch: {
      track: {
        backgroundColor: "#f1f1f1 !important"
      }
    }
  }
});

const useStyles = makeStyles({
  hidden: {
    display: "none !important"
  }
});

interface UploadProps {
  accept: string;
  getAudio: Function;
  helperText?: string;
  labelText?: string;
  limit?: number | any;
  style?: object;
}

const Upload: React.SFC<UploadProps> = ({
  accept,
  getAudio,
  helperText,
  labelText,
  limit,
  style
}) => {
  const [filename, setFilename] = React.useState("No file chosen");

  const upload: Function = (e: any) => {
    try {
      let extracted = e.target.files[0].name;
      let name =
        extracted.length > limit ? extracted.substring(0, limit) : extracted;
      name =
        extracted.length > limit
          ? `${name}...${extracted.split(".")[extracted.split(".").length - 1]}`
          : extracted;

      setFilename(name);
      getAudio && getAudio(e.target.files[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const renderUploadComponent: Function = () => {
    return (
      <div style={style}>
        <LabelText>{labelText}</LabelText>
        <Input
          id="files"
          inputProps={{
            accept: accept
          }}
          onChange={e => upload(e)}
          type="file"
          className={classes.hidden}
        />
        <label
          style={{
            margin: "5px 0 7px 0",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "space-between",
            textOverflow: "ellipsis"
          }}
        >
          <CustomText size="16px" color="tableDataColor">
            {filename}
          </CustomText>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end"
            }}
          >
            <Icon
              path={mdiUpload}
              title="Copy"
              size={0.8}
              rotate={360}
              style={{
                marginBottom: "3px"
              }}
              color="#1194f6"
            />
            <div style={{ width: "3px" }} />
            <CustomText size="16px" color="activeInput">
              Choose file
            </CustomText>
          </div>
        </label>
        <Divider />
        <HelperText>{helperText}</HelperText>
      </div>
    );
  };
  const classes: any = useStyles({});
  return (
    <MuiThemeProvider theme={theme}>{renderUploadComponent()}</MuiThemeProvider>
  );
};

export default Upload;
