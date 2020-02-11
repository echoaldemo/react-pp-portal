import React from "react";
import Header from "./components/Header";
import MenuTabs from "./components/Tabs";
import { get, patch } from "utils/api"; // eslint-disable-line
import { Paper } from "@material-ui/core";

interface Props {
  history: any;
  match: any;
  location: any;
}

const mock = {
  uuid: "7443baa2-1b40-11e8-93ab-0242ac110002",
  slug: "test",
  name: "test",
  active: true,
  company: null,
  live: true,
  test_type: 0,
  final_disposition_regex: "1",
  final_revenue: 1,
  segments: [
    "26e9c358-7993-11e8-81e9-0242ac110016",
    "fee3637a-3957-11e9-ae74-0242ac110005"
  ],
  variables: {},
  voices: [
    "79041608-5c29-11e7-9756-02420aff000e",
    "c4d8bac6-fab4-11e9-981d-0242ac110014",
    "5544d13e-f949-11e9-ac72-0242ac110014",
    "346516de-5aa6-11e7-88db-02420aff0012",
    "5cfc5e92-6c92-11e7-94dc-02420aff0015",
    "e301d554-e3fe-11e9-97bb-0242ac11000e",
    "f55f5ace-a93f-11e7-8740-0242ac110008"
  ],
  tts_voice: null
};

function EditTestsSettings(props: Props) {
  const [test, setTest] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // if (!props.location.state) {
    // 	get(
    // 		`/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
    // 	).then((res: any) => {
    // 		setLoading(false)
    // 		setTest(res.data)
    // 	})
    // } else {
    // 	if (props.location.state.rrtest) {
    // 		setTest(props.location.state.rrtest)
    // 		setLoading(false)
    // 	} else {
    // 		get(
    // 			`/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
    // 		).then((res: any) => {
    // 			setLoading(false)
    // 			setTest(res.data)
    // 		})
    // 	}
    // }
    setTimeout(() => {
      setLoading(false);
      setTest(mock);
    }, 1000);
  }, []);
  function handleUpdate(data: any) {
    setLoading(true);
    patch(
      `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`,
      data
    ).then((res: any) => {
      setLoading(false);
      setTest(res.data);
      console.log(res.data);
      props.history.push({
        pathname: `/manage/rapid-response-tests/global/edit/${props.match.params.test_uuid}/menu/`,
        state: {
          rrtest: res.data
        }
      });
    });
  }
  return (
    <div>
      <Header test={test} loading={loading} />
      <Paper
        style={{
          minHeight: 525
        }}
      >
        <MenuTabs
          test={test}
          loading={loading}
          props={props}
          handleUpdate={handleUpdate}
        />
      </Paper>
    </div>
  );
}
export default EditTestsSettings;
