import { makeStyles } from "@material-ui/core/styles";
import { SaveButton } from "common-components";
import styled from "styled-components";
const NewBtn = styled(SaveButton)`
  min-width: 120px;
`;
const AddBtn = styled(SaveButton)`
  min-width: 120px;
  background: #7c8a97;
  color: #ffffff;
  margin-right: 20px;
  text-transform: none;
`;
const BtnCont = styled.div`
  display: flex;
  align-items: center;
`;
const useStyles = makeStyles(theme => ({
  con: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 20px",
    padding: "0 20px",
    backgroundColor: "#fafafa",
    height: 62
  },
  btnAdd: {
    height: 40,
    width: 120,
    backgroundColor: "#7c8a97",
    border: "none",
    outline: "none",
    borderRadius: 3,
    fontSize: 16,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#6d7a86"
    }
  }
}));

const exportStyle = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1rem",
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  },
  table: {
    backgroundColor: "#FFF"
  },
  row: {
    height: 50,
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa"
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFF"
    }
  },
  cell: {
    borderBottom: "none"
  }
}));

const cdrStyle = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inputField: {
    fontSize: "1rem",
    "&&&&:hover:not($disabled):before": {
      borderBottom: "1px solid #1194f6"
    },
    "&:before": {
      borderBottom: "1px solid rgba(0,0,0,0.1)"
    },
    "&:after": {
      borderBottom: "2px solid #1394f6"
    }
  },
  table: {
    backgroundColor: "#FFF"
  },
  row: {
    height: 50,
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa"
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFF"
    }
  },
  cell: {
    borderBottom: "none"
  },
  formlabel: {
    fontSize: "15px"
  },
  formlabel1: {
    fontSize: "15px",
    color: "#777777"
  },
  formControl: {}
}));

export { useStyles, BtnCont, AddBtn, NewBtn, exportStyle, cdrStyle };
