import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const HOContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27px;
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 34px;
`;

export const Box = styled.div`
  width: 14px;
  height: 14px;
`;

export const LegendText = styled(Typography)`
  font-size: 12px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #50555a;
  padding-right: 11px;
`;

export const theme = createMuiTheme({});

export const useStyles = makeStyles({});
