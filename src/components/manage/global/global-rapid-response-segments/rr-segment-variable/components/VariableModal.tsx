import React, { useState } from "react";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import { TextField, makeStyles } from "@material-ui/core";
import { HeaderButton } from "common-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  width: 100%;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`;
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
const CloseIcon = styled(Close)`
  cursor: pointer;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
`;
const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1.2rem",
    "&&&&:hover:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  }
}));

interface Props {
  closeFn: () => void;
  data: any;
  UpdateSegment: Function;
}

const VariableModal = ({ closeFn, data, UpdateSegment }: Props) => {
  const [keyVal, setKeyVal] = useState("");
  const [valVal, setValVal] = useState("");
  const classes = useStyles();
  // const handleChange = e => {
  //   setVal(e.target.value);
  //   if (e.target.value === name) {
  //     setOk(true);
  //   } else {
  //     setOk(false);
  //   }
  // };

  const handleSubmit = (label: any) => {
    var Obj = { name: keyVal, values: valVal };
    UpdateSegment(Obj, label);
  };

  const handlChange = (e: any, type: string) => {
    if (type === "keyVal") {
      setKeyVal(e.target.value);
    } else {
      setValVal(e.target.value);
    }
  };

  return (
    <Center>
      {keyVal.length === 0 && data.length !== 0 ? (
        <>
          {setKeyVal(data.name)}
          {setValVal(data.values)}
        </>
      ) : null}
      <Box>
        <Header>
          <CenterText>Edit Variable</CenterText>
          <CloseIcon onClick={closeFn} />
        </Header>
        <Content>
          <TextField
            onChange={e => handlChange(e, "keyVal")}
            value={keyVal}
            id="standard-full-width"
            label="Key"
            fullWidth
            margin="normal"
            autoComplete="off"
            style={{
              fontSize: 50,
              width: "100%"
            }}
            InputProps={{
              classes: {
                underline: classes.inputField,
                root: classes.inputField
              }
            }}
          />

          <TextField
            onChange={e => handlChange(e, "valVal")}
            value={valVal}
            id="standard-full-width"
            label="Value"
            fullWidth
            margin="normal"
            autoComplete="off"
            style={{
              fontSize: 50,
              width: "100%"
            }}
            InputProps={{
              classes: {
                underline: classes.inputField,
                root: classes.inputField
              }
            }}
          />

          <HeaderButton
            style={{ width: "20%", margin: "auto", marginTop: 20 }}
            openFunction={() =>
              handleSubmit(data.length !== 0 ? "edit" : "create")
            }
            buttonText={`${
              data.length !== 0 ? "Update Variable" : "Add Variable"
            }`}
          />
        </Content>
      </Box>
    </Center>
  );
};

export default VariableModal;
