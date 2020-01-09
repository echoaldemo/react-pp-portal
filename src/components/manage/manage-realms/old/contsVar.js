import {
  Tooltip,
  MenuItem as MenuItem2,
  Switch as Switch2
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { SaveButton } from "common-components";

const CancelBtn = styled(SaveButton)`
  background: #eeeeee;
  strong {
    color: #444851;
  }
`;
const BtnCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 30px 0 20px 0;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  height: auto;
`;
const menus = [
  {
    title: "Users",
    path: "/manage/users"
  },
  {
    title: "Campaigns",
    path: "/manage/campaigns"
  },
  {
    title: "Companies",
    path: "/manage/companies"
  },
  {
    title: "Locations",
    path: "/manage/locations"
  },
  {
    title: "Did Pools",
    path: "/manage/did-pool"
  },

  {
    title: "Dids",
    path: "/manage/dids"
  }
];
const headers = ["Name", "UUID", "Status", ""];
const constCreate = {
  open: false,
  active: true,
  name: "",
  nameErr: "",
  load: false,
  done: false
};
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const Switch = styled(Switch2)`
  .MuiSwitch-track {
    background: #eeeeee !important;
  }
  color: #ffffff;
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #1194f6;
  }
`;

const MenuItem = styled(MenuItem2)`
  min-width: 200px;
  padding-top: 0;
  padding-bottom: 0;
`;

export {
  menus,
  headers,
  LightTooltip,
  Container,
  MenuItem,
  BtnCont,
  Switch,
  SaveButton,
  CancelBtn,
  constCreate
};
