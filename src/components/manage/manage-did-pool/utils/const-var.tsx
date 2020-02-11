/* eslint-disable */
import styled from "styled-components";
import { TextField } from "@material-ui/core";

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
    title: "Realms",
    path: "/manage/realms"
  },
  {
    title: "Dids",
    path: "/manage/dids"
  }
];
const headers = ["Name", "UUID", "Status", "Inbound", "DID Count", ""];

const new_did_const = {
  active: true,
  allow_inbound: true,
  campaign: "",
  company: "",
  did_count: 0,
  locale_name: "US",
  matching_preference: "",
  name: "",
  priority: 0,
  sip_uri: "",
  skip_inbound_ivr: false,
  start_node: null,
  vars_prospect_channel: "",
  voice_provider: ""
};

const mockDid = {
  id: "1",
  name: "name 1",
  company: "company 1",
  campaign: "campaign 1",
  locale_name: "locale_name 1",
  voice_provider: "voice_provider 1",
  active: false,
  allow_inbound: false,
  skip_inbound_ivr: false,
  sip_uri: "sip_uri 1",
  start_node: "start_node 1",
  priority: 76,
  vars_prospect_channel: "vars_prospect_channel 1",
  did_count: 66,
  ignore_caller_id: false,
  desired_cname: "desired_cname 1",
  matching_preference: "matching_preference 1",
  uuid: "b4f87b18-d7c8-43e6-a443-249fe9bfa947"
};

const mockDidPool = [
  {
    uuid: uuidv4(),
    name: "test",
    company: "133f0be0-f92d-11e9-bd51-0242ac110014",
    campaign: "156b375c-fa1f-11e9-b25d-0242ac110014",
    locale_name: "US",
    voice_provider: "5885f3e4-e6ba-11e7-88dd-0242ac11000f",
    active: true,
    allow_inbound: true,
    skip_inbound_ivr: false,
    sip_uri: "",
    start_node: null,
    priority: 0,
    vars_prospect_channel: "",
    did_count: 0,
    ignore_caller_id: false,
    desired_cname: null,
    matching_preference: "Closest"
  },
  {
    uuid: uuidv4(),
    name: "test1",
    company: "133f0be0-f92d-11e9-bd51-0242ac110014",
    campaign: "156b375c-fa1f-11e9-b25d-0242ac110014",
    locale_name: "US",
    voice_provider: "5885f3e4-e6ba-11e7-88dd-0242ac11000f",
    active: false,
    allow_inbound: true,
    skip_inbound_ivr: false,
    sip_uri: "",
    start_node: null,
    priority: 0,
    vars_prospect_channel: "",
    did_count: 0,
    ignore_caller_id: false,
    desired_cname: null,
    matching_preference: "Closest"
  },
  {
    uuid: uuidv4(),
    name: "test2",
    company: "133f0be0-f92d-11e9-bd51-0242ac110014",
    campaign: "156b375c-fa1f-11e9-b25d-0242ac110014",
    locale_name: "US",
    voice_provider: "5885f3e4-e6ba-11e7-88dd-0242ac11000f",
    active: true,
    allow_inbound: false,
    skip_inbound_ivr: false,
    sip_uri: "",
    start_node: null,
    priority: 0,
    vars_prospect_channel: "",
    did_count: 0,
    ignore_caller_id: false,
    desired_cname: null,
    matching_preference: "Closest"
  }
];

const mockCompany = [
  {
    uuid: "133f0be0-f92d-11e9-bd51-0242ac110014",
    slug: "test-company",
    datetime_created: "2019-10-28T02:46:00.958731Z",
    datetime_modified: "2020-01-02T04:35:20.505890Z",
    name: "test company",
    active: false,
    email: "",
    website: "",
    aws_bucket_name: "zarchives-adsfasdfsadf"
  }
];

const mockCampaign = [
  {
    uuid: "c1d84a5a-38c9-11ea-9ea4-0242ac110014",
    realms: ["60df039e-a6a5-11e9-8a5e-0242ac110012"],
    company: "133f0be0-f92d-11e9-bd51-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "test-campaign",
    name: "test campaign",
    active: true,
    archived: false
  }
];

const mockVoice = [
  {
    uuid: "5885f3e4-e6ba-11e7-88dd-0242ac11000f",
    name: "test voice",
    slug: "test-voice"
  }
];

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
  .Mui-focused span {
    color: #1194f6 !important;
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(1);
  }
`;

export {
  menus,
  headers,
  new_did_const,
  mockDid,
  InputField,
  mockDidPool,
  mockCompany,
  mockCampaign,
  mockVoice,
  uuidv4
};
