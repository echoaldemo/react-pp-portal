import {
  Tooltip,
  MenuItem as MenuItem2,
  Switch as Switch2
} from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { SaveButton } from "common-components";

const CancelBtn: any = styled(SaveButton)`
  background: #eeeeee;
  strong {
    color: #444851;
  }
`;
const BtnCont: any = styled.div`
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
const menus: any = [
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
const headers: Array<string> = ["Name", "UUID", "Status", ""];
const constCreate: any = {
  open: false,
  active: true,
  name: "",
  nameErr: "",
  load: false,
  done: false
};
const LightTooltip: any = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const Switch: any = styled(Switch2)`
  .MuiSwitch-track {
    background: #eeeeee !important;
  }
  color: #ffffff;
  .MuiSwitch-colorPrimary.Mui-checked {
    color: #1194f6;
  }
`;

const MenuItem: any = styled(MenuItem2)`
  min-width: 200px;
  padding-top: 0;
  padding-bottom: 0;
`;

const MockRealm: any = [
  {
    uuid: "994dceb8-5062-11e7-a132-02420a000304",
    leader: null,
    slug: "external_rec",
    datetime_created: "2017-06-13T18:03:26.715623Z",
    datetime_modified: "2019-11-05T09:18:19.641105Z",
    name: "arman locas",
    active: false
  },
  {
    uuid: "996d157a-5062-11e7-8332-02420a000304",
    leader: "9f795eaa-9807-11e7-9f36-0242ac11000b",
    slug: "ppus",
    datetime_created: "2017-06-13T18:03:26.922947Z",
    datetime_modified: "2019-11-05T06:02:38.943179Z",
    name: "echo-location",
    active: false
  },
  {
    uuid: "98584da8-5062-11e7-ac0c-02420a000304",
    leader: null,
    slug: "external-recorders",
    datetime_created: "2017-06-13T18:03:25.111481Z",
    datetime_modified: "2017-06-13T18:03:25.111568Z",
    name: "External Recorders",
    active: true
  },
  {
    uuid: "9918d51e-5062-11e7-a2b5-02420a000304",
    leader: null,
    slug: "gcs",
    datetime_created: "2017-06-13T18:03:26.368296Z",
    datetime_modified: "2017-06-13T18:03:26.368361Z",
    name: "gcs",
    active: true
  },
  {
    uuid: "9933f0f6-5062-11e7-b057-02420a000304",
    leader: "a8a1783e-9781-11e9-9501-0242ac110012",
    slug: "licensing",
    datetime_created: "2017-06-13T18:03:26.545622Z",
    datetime_modified: "2019-11-05T06:06:23.965248Z",
    name: "Licensin'",
    active: true
  },
  {
    uuid: "98df9b78-5062-11e7-9d64-02420a000304",
    leader: null,
    slug: "mx",
    datetime_created: "2017-06-13T18:03:25.992977Z",
    datetime_modified: "2017-06-13T18:03:25.993032Z",
    name: "mx",
    active: true
  },
  {
    uuid: "988f4984-5062-11e7-9ec2-02420a000304",
    leader: null,
    slug: "pp",
    datetime_created: "2017-06-13T18:03:25.466589Z",
    datetime_modified: "2017-06-13T18:03:25.466647Z",
    name: "pp",
    active: true
  },
  {
    uuid: "98fccaea-5062-11e7-ba6d-02420a000304",
    leader: "43350234-785e-11e7-ae55-02420aff0008",
    slug: "pp-office",
    datetime_created: "2017-06-13T18:03:26.185569Z",
    datetime_modified: "2017-08-03T18:28:46.755914Z",
    name: "PP Office",
    active: true
  },
  {
    uuid: "98c2efd2-5062-11e7-9c14-02420a000304",
    leader: null,
    slug: "rccc",
    datetime_created: "2017-06-13T18:03:25.804812Z",
    datetime_modified: "2017-06-13T18:03:25.804869Z",
    name: "RCCC",
    active: true
  }
];

const MockCampaigns: any = [
  {
    uuid: "15af2c2a-d9d4-11e9-bbb5-0242ac110006",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "32-camp",
    name: "32 Campxasdad",
    active: true,
    archived: true,
    company: "a53fc338-f930-11e9-8c54-0242ac110014"
  },
  {
    uuid: "d7821208-0036-11ea-bc6f-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "another-test-for-change-logs",
    name: "Another test for change logs ( has been changed)",
    active: true,
    archived: false,
    company: "5828bb70-f6fd-11e9-842d-0242ac110014"
  },
  {
    uuid: "273bdc54-ffa9-11e9-9bc8-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "222",
    name: "22200033 - none (changed)",
    active: true,
    archived: false,
    company: "c3773658-f92e-11e9-979e-0242ac110014"
  },
  {
    uuid: "973847ba-0f29-11ea-b675-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "gg",
    name: "gg",
    active: true,
    archived: true,
    company: "133f0be0-f92d-11e9-bd51-0242ac110014"
  },
  {
    uuid: "d813e446-da8c-11e9-a48f-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "fix",
    name: "fix",
    active: true,
    archived: true,
    company: "33b087ac-8bfb-11e6-8b9d-0242ac14000a"
  },
  {
    uuid: "9c598872-ea61-11e9-91e9-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "bwaha",
    name: "bwaha",
    active: true,
    archived: true,
    company: "5166600c-ee66-11e9-8b59-0242ac11000e"
  },
  {
    uuid: "9755b8ec-e8d0-11e9-811f-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "y-tytryfgjhghjjhjh",
    name: "Test Campaign Change Log",
    active: true,
    archived: true,
    company: "7964f140-f92e-11e9-b0a7-0242ac110014"
  },
  {
    uuid: "3bde1526-e4df-11e9-ad2a-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "boom-testing",
    name: "boom testing",
    active: true,
    archived: true,
    company: "33b087ac-8bfb-11e6-8b9d-0242ac14000a"
  }
];

const MockRealmData: any = {
  uuid: "847a624a-a6a4-11e9-ac77-0242ac110012",
  campaigns: MockCampaigns,
  slug: "test",
  name: "Test",
  active: true
};

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
  constCreate,
  MockRealm,
  MockCampaigns,
  MockRealmData
};
