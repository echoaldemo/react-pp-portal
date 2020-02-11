import { get, patch, post } from "utils/api";

const mock = [
  {
    uuid: "346516de-5aa6-11e7-88db-02420aff0012",
    last_login: "2019-11-14T02:50:49.913632Z",
    username: "ahayterVoice",
    first_name: "aodhan-voice",
    last_name: "hayter",
    is_active: true,
    date_joined: "2017-06-26T19:32:34.818980Z",
    email: null,
    password_update_required: false,
    password_last_update: "2019-09-26T03:02:51.152101Z",
    hire_date: null
  },
  {
    uuid: "5cfc5e92-6c92-11e7-94dc-02420aff0015",
    last_login: "2018-07-23T20:50:32.797472Z",
    username: "awhite",
    first_name: "a",
    last_name: "white",
    is_active: true,
    date_joined: "2017-07-19T14:55:53.913298Z",
    email: "testingforaudio@testing.com",
    password_update_required: false,
    password_last_update: "2018-07-23T20:48:53.780656Z",
    hire_date: null
  },
  {
    uuid: "79041608-5c29-11e7-9756-02420aff000e",
    last_login: "2017-07-20T17:19:26.063777Z",
    username: "compManager",
    first_name: "CompManager",
    last_name: "CompManager",
    is_active: true,
    date_joined: "2017-06-28T17:44:45.180722Z",
    email: null,
    password_update_required: false,
    password_last_update: "2017-06-28T17:45:11.216414Z",
    hire_date: null
  }
];

export const getVoices = async () => {
  // return await get('/identity/user/manage/list?groups=10')
  // 	.then((response: any) => {
  // 		return { status: response.status, data: response.data.results }
  // 	})
  // 	.catch((err: any) => {
  // 		try {
  // 			return { status: err.response.status, data: err.response.data }
  // 		} catch {
  // 			return 500
  // 		}
  // 	})
  return { status: 200, data: mock };
};

export const updateVoices = async (test: any, voices: any) => {
  return await patch(`/pitch/global/rapid-response/tests/${test}/`, { voices })
    .then((response: any) => {
      return { status: response.status, data: response.data };
    })
    .catch((err: any) => {
      try {
        return { status: err.response.status, data: err.response.data };
      } catch {
        return 500;
      }
    });
};

const mockRRtest = {
  uuid: "53509d6a-0c25-11ea-a589-0242ac110005",
  slug: "lab105",
  name: "lab105",
  active: true,
  company: null,
  live: true,
  test_type: 0,
  final_disposition_regex: "",
  final_revenue: 1,
  segments: [
    "26e9c358-7993-11e8-81e9-0242ac110016",
    "b10f0afc-6265-11e7-a4fe-02420a000908",
    "fee3637a-3957-11e9-ae74-0242ac110005"
  ],
  variables: {},
  voices: [
    "5cfc5e92-6c92-11e7-94dc-02420aff0015",
    "79041608-5c29-11e7-9756-02420aff000e",
    "346516de-5aa6-11e7-88db-02420aff0012",
    "5cfc5e92-6c92-11e7-94dc-02420aff0015"
  ],
  tts_voice: "Joanna"
};

export const getRRTest = async (test: any) => {
  // return await get(`/pitch/global/rapid-response/tests/${test}/`)
  // 	.then((response: any) => {
  // 		return { status: response.status, data: response.data };
  // 	})
  // 	.catch((err: any) => {
  // 		try {
  // 			return { status: err.response.status, data: err.response.data };
  // 		} catch {
  // 			return 500;
  // 		}
  // 	});
  return { status: 200, data: mockRRtest };
};

export const getProspectVoices = async () => {
  return await get(`/pitch/audio/prospect/voice/`)
    .then((response: any) => {
      return { status: response.status, data: response.data };
    })
    .catch((err: any) => {
      try {
        return { status: err.response.status, data: err.response.data };
      } catch {
        return 500;
      }
    });
};

export const createProspectVoices = async (voice: any) => {
  return await post(`/pitch/audio/prospect/voice/`, voice)
    .then((response: any) => {
      return { status: response.status, data: response.data };
    })
    .catch((err: any) => {
      try {
        return { status: err.response.status, data: err.response.data };
      } catch {
        return 500;
      }
    });
};

export const getGlobalSegments = async () => {
  return await get("/pitch/global/rapid-response/segments/")
    .then((response: any) => {
      return { status: response.status, data: response.data };
    })
    .catch((err: any) => {
      try {
        return { status: err.response.status, data: err.response.data };
      } catch {
        return 500;
      }
    });
};

export const updateSegments = async (test: string, segments: any) => {
  return await patch(`/pitch/global/rapid-response/tests/${test}/`, {
    segments
  })
    .then((response: any) => {
      return { status: response.status, data: response.data };
    })
    .catch((err: any) => {
      try {
        return { status: err.response.status, data: err.response.data };
      } catch {
        return 500;
      }
    });
};
