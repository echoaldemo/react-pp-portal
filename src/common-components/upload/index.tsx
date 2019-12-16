import React, { useState, useRef } from "react";
import { Input, Divider, MuiThemeProvider } from "@material-ui/core";
import { mdiUpload } from "@mdi/js";
import Icon from "@mdi/react";
import { CustomText } from "./custom-text";

import { LabelText, HelperText, theme, useStyles } from "./styles";
interface UploadProps {
  accept: string;
  getAudio: Function;
  helperText?: string;
  labelText?: string;
  limit: number;
  style?: object;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  getAudio,
  helperText,
  labelText,
  limit,
  style
}) => {
  const [filename, setFilename] = useState("No file chosen");
  const myInput: any = useRef();

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
          inputRef={myInput}
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
          onClick={() => myInput.current.click()}
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

Upload.defaultProps = {
  limit: 8,
  accept: "audio/*",
  labelText: "Data File",
  helperText: "",
  getAudio: () => null
} as Partial<UploadProps>;

export { Upload };
