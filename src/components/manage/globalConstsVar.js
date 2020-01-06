import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const menus = [
  {
    title: "Users",
    path: "/manage/users"
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
  },
  {
    title: "Realms",
    path: "/manage/realms"
  }
];

const mockDataCampaigns = [
  {
    uuid: "273bdc54-ffa9-11e9-9bc8-0242ac110014",
    realms: [
      "13833e6e-eaa5-11e9-b3d2-0242ac11000e",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "c3773658-f92e-11e9-979e-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "222",
    name: "22200033 - none (changed)",
    active: true,
    archived: false
  },
  {
    uuid: "a75180ca-101a-11ea-a654-0242ac110014",
    realms: [
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "6c5a3edc-a6a5-11e9-95e1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012"
    ],
    company: "a53fc338-f930-11e9-8c54-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "23_1",
    name: "23_1",
    active: false,
    archived: true
  },
  {
    uuid: "59767aae-f567-11e9-ba83-0242ac110014",
    realms: [
      "6c5a3edc-a6a5-11e9-95e1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012"
    ],
    company: "a53fc338-f930-11e9-8c54-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "23",
    name: "234",
    active: false,
    archived: true
  },
  {
    uuid: "15af2c2a-d9d4-11e9-bbb5-0242ac110006",
    realms: [
      "13833e6e-eaa5-11e9-b3d2-0242ac11000e",
      "2d0cd85e-a6a8-11e9-b20d-0242ac110012",
      "2e7fd94c-fffa-11e9-929d-0242ac110014",
      "4a536dda-a9d0-11e9-80cb-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "a53fc338-f930-11e9-8c54-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "32-camp",
    name: "32 Campxasdad",
    active: true,
    archived: true
  },
  {
    uuid: "15c4b8a2-0034-11ea-b15a-0242ac110014",
    realms: [
      "13833e6e-eaa5-11e9-b3d2-0242ac11000e",
      "46df9846-a6a5-11e9-8735-0242ac110012",
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "6c5a3edc-a6a5-11e9-95e1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "480af3f6-eeed-11e9-9d8e-0242ac11000e",
    dialingparams: null,
    queue: {
      music_on_hold_pitch: "sadf",
      new_call_sound_pitch: null,
      call_ended_sound_pitch: null
    },
    warmtransfer: null,
    callback: {
      ivr_greet_long_pitch: "sadf",
      ivr_greet_short_pitch: null,
      ivr_invalid_sound_pitch: null,
      ivr_exit_sound_pitch: null
    },
    slug: "333",
    name: "33333",
    active: true,
    archived: false
  },
  {
    uuid: "8969d90c-0d06-11ea-a9f0-0242ac110014",
    realms: [
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "133f0be0-f92d-11e9-bd51-0242ac110014",
    dialingparams: {
      list_strategy: "priority-calls-lastcalled",
      use_list_priorities: true,
      default_list_age_priority_reduction: 0,
      list_sorting: "earliest_call",
      scheduler: "DirectScheduler",
      dialer_module: "Disabled",
      dialer_interval: 8,
      call_ratio: 1.0,
      damper: 1,
      damper_threshold: "1.00",
      min_requested_calls_per_agent: "1.00",
      min_calls_per_tick: 0,
      max_requested_calls_per_agent: "3.00",
      max_active_calls: 0,
      fill_minutes: 5,
      earliest_prospect_time: "09:00:00",
      latest_prospect_time: "21:00:00",
      originate_timeout_seconds: 25,
      conference_rooms: 1,
      hopper_expires_min: 30,
      max_number_calls: 10,
      min_time_between_calls: 30,
      geocode: false,
      wrap_up_time: 3,
      soft_audio: false,
      paused: false,
      hangup_cause_json: ""
    },
    queue: {
      music_on_hold_pitch: "test9",
      new_call_sound_pitch: "000",
      call_ended_sound_pitch: "001"
    },
    warmtransfer: {
      warm_xfer_menu: "generic",
      warm_xfer_greet_long_pitch: "001",
      warm_xfer_greet_short_pitch: null,
      warm_xfer_invalid_sound_pitch: "test-4",
      warm_xfer_exit_sound_pitch: "000",
      warm_xfer_press_pitch: "test-4",
      warm_xfer_explain_pitch: "001"
    },
    callback: {
      ivr_greet_long_pitch: "000",
      ivr_greet_short_pitch: "001",
      ivr_invalid_sound_pitch: null,
      ivr_exit_sound_pitch: "test9"
    },
    slug: "45",
    name: "45",
    active: true,
    archived: true
  },
  {
    uuid: "fbac2410-ea6b-11e9-982c-0242ac11000e",
    realms: [
      "13833e6e-eaa5-11e9-b3d2-0242ac11000e",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "8bdd361e-0c31-11ea-b589-0242ac110014",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "49b3bc9e-e9a5-11e9-ac73-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "555",
    name: "555 - Test Change Logs",
    active: true,
    archived: true
  },
  {
    uuid: "fa85bdd0-fa06-11e9-b917-0242ac110014",
    realms: [
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "e101c9bc-f92a-11e9-b5dc-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "aa",
    name: "aaxxx",
    active: true,
    archived: true
  },
  {
    uuid: "d7821208-0036-11ea-bc6f-0242ac110014",
    realms: [
      "23316efe-a6c0-11e9-9cc0-0242ac110012",
      "47dcd30e-a9ec-11e9-b2d0-0242ac110012",
      "5fac3ffa-ff42-11e9-926e-0242ac110014",
      "6fe28488-a6a5-11e9-b7c1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "9fd21474-f9fc-11e9-8971-0242ac110014",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "5828bb70-f6fd-11e9-842d-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "another-test-for-change-logs",
    name: "Another test for change logs ( has been changed)",
    active: true,
    archived: false
  },
  {
    uuid: "de0fe43c-eb38-11e9-ba59-0242ac11000e",
    realms: [
      "6fe28488-a6a5-11e9-b7c1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "b8f28a3e-ea33-11e9-a13f-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "another-test-title",
    name: "another test title1",
    active: false,
    archived: true
  },
  {
    uuid: "4106e24e-ea6b-11e9-9107-0242ac11000e",
    realms: [
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "6c5a3edc-a6a5-11e9-95e1-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "169287d6-f9f5-11e9-8919-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "asaa",
    name: "asaa - test change log 3",
    active: true,
    archived: true
  },
  {
    uuid: "6b58b184-f705-11e9-b80e-0242ac110014",
    realms: [
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "49b3bc9e-e9a5-11e9-ac73-0242ac11000e",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "asdasd",
    name: "asdas",
    active: true,
    archived: false
  },
  {
    uuid: "dd8c76cc-f927-11e9-a706-0242ac110014",
    realms: [
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "a349147a-f927-11e9-ba86-0242ac110014",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "asdf",
    name: "asdf",
    active: true,
    archived: false
  },
  {
    uuid: "996ee4de-e381-11e6-ac3a-02420aff000a",
    realms: [],
    company: "9899db54-e381-11e6-9070-02420aff0010",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "assurance",
    name: "Assurance",
    active: true,
    archived: false
  },
  {
    uuid: "3818b55a-df5c-11e9-8cb6-0242ac11000e",
    realms: [
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "a68d5384-431c-11e8-9860-0242ac110006",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "ax",
    name: "ax",
    active: true,
    archived: true
  },
  {
    uuid: "ac547e5a-e4d3-11e9-9e42-0242ac11000e",
    realms: [
      "3f2a326c-a6a2-11e9-b987-0242ac110012",
      "46df9846-a6a5-11e9-8735-0242ac110012",
      "47dcd30e-a9ec-11e9-b2d0-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "33b087ac-8bfb-11e6-8b9d-0242ac14000a",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "Banco-de-Reyna-Isabel",
    name: "Banco de Reyna Isabel",
    active: true,
    archived: true
  },
  {
    uuid: "a200193c-db4b-11e9-967c-0242ac11000e",
    realms: [
      "2e7fd94c-fffa-11e9-929d-0242ac110014",
      "60df039e-a6a5-11e9-8a5e-0242ac110012",
      "847a624a-a6a4-11e9-ac77-0242ac110012",
      "e77ffcc2-d628-11e7-b049-525400ceb6a1"
    ],
    company: "33b087ac-8bfb-11e6-8b9d-0242ac14000a",
    dialingparams: null,
    queue: null,
    warmtransfer: null,
    callback: null,
    slug: "bka",
    name: "BKA",
    active: true,
    archived: true
  }
];

export { menus, mockDataCampaigns, LightTooltip };
