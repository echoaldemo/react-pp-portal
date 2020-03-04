import { makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styled from "styled-components";

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Box = styled.div`
  width: 100%;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`;
export const Header = styled.div`
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
export const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
export const CloseIcon = styled(Close)`
  cursor: pointer;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 36px;
`;
export const useStyles = makeStyles({
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
});
