import styled from "styled-components";
import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    formWrapper: {
      display: "flex",
      flexDirection: "column",
      padding: 5
    },
    formContainer: { paddingBottom: 20 },
    formControl: {
      marginLeft: 15,
      width: "80%"
    },
    textField: {},
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 15
    },
    loadingWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 300,
      flexDirection: "column"
    },
    errorMessageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      flexDirection: "column",
      marginTop: 15,
      color: "red"
    },
    errorMessageText: {
      width: "100%",
      padding: 15,
      marginTop: 15,
      backgroundColor: "#dc3e3e",
      color: "#FFF",
      fontWeight: 450,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    successMessageWrapper: {
      padding: 25,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }
  });

const Btn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`;
const CreateBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`;
const Cancel = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;
const Disabled = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #bbbbbb;
  text-transform: uppercase;
`;
const CreateText = styled.span`
  margin-bottom: 31px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;
export { styles, Btn, CreateBtn, Cancel, Disabled, CreateText };
