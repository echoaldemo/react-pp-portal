import React, { useContext, useState, useRef } from "react";
import { InputAdornment } from "@material-ui/core";
import { mdiUpload } from "@mdi/js";
import Icon from "@mdi/react";
import { store } from "../../store";
import {
  Title,
  SelectField,
  Button,
  DisBtn,
  DisText,
  NewUserBtn,
  NewUserText,
  CancelBtn,
  CancelText,
  BtnCnt,
  InputCnt
} from "./styles";

const Upload: React.FC = () => {
  const [file, setFile] = useState<any>(null);
  const { dispatch }: any = useContext(store);
  const inputEl: any = useRef(null);
  const handleChange = (e: any) => {
    const ufile = e.target.files[0];
    setFile({
      file: ufile,
      name: ufile.name
    });
  };
  const handleCancel = () => {
    setFile(null);
    dispatch({ type: "LIST" });
  };
  return (
    <>
      <input
        hidden
        type="file"
        onChange={e => handleChange(e)}
        ref={inputEl}
        accept=".csv, text/csv"
      />
      <InputCnt>
        <Title>Batch Upload Prospects</Title>
        <SelectField
          label={`CSV File`}
          margin="normal"
          value={file ? file.name : "No file chosen"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Icon
                  path={mdiUpload}
                  title="Copy"
                  size={0.8}
                  rotate={360}
                  color="#1194f6"
                />
                <Button onClick={() => inputEl.current.click()}>
                  Choose file
                </Button>
              </InputAdornment>
            ),
            readOnly: true
          }}
        />
        <BtnCnt>
          <CancelBtn onClick={handleCancel}>
            <CancelText>cancel</CancelText>
          </CancelBtn>

          {!file ? (
            <DisBtn>
              <DisText>upload</DisText>
            </DisBtn>
          ) : (
            <NewUserBtn>
              <NewUserText>{"upload"}</NewUserText>
            </NewUserBtn>
          )}
        </BtnCnt>
      </InputCnt>
    </>
  );
};

export default Upload;
