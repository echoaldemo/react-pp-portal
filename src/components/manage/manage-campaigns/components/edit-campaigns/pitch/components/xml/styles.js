import { Button, TextField, createMuiTheme } from "@material-ui/core";
import styled from "styled-components";

const Content = styled.div`
  padding: 35px 50px;
`;

const Container = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 100%;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 50%;
`;

const NewButton = styled(Button)`
  border-radius: 2px !important;
  width: 200px;
`;

const NewTextField = styled(TextField)`
  margin: 0 1rem 0 0 !important;
  width: 600px;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#7C8A97"
    }
  }
});

export { Content, Container, Right, NewButton, NewTextField, theme };
