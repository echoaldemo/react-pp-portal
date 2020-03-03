/* eslint-disable */
import React from "react";
import Header from "./components/Header";
import MenuTabs from "./components/Tabs";
import { get, patch } from "utils/api"; // eslint-disable-line
import { Paper } from "@material-ui/core";
import SnackNotif from "auth/component/snackbar/snackbar";

interface Props {
  history: any;
  match: any;
  location: any;
}

function EditTestsSettings(props: Props) {
  const [test, setTest] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);

  React.useEffect(() => {
    if (!props.location.state) {
      get(
        `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
      ).then((res: any) => {
        setLoading(false);
        setTest(res.data);
      });
    } else {
      if (props.location.state.rrtest) {
        setTest(props.location.state.rrtest);
        setLoading(false);
      } else {
        get(
          `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
        ).then((res: any) => {
          setLoading(false);
          setTest(res.data);
        });
      }
    }
  }, []);

  function handleUpdate(data: any) {
    setLoading(true);
    patch(
      `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`,
      data
    )
      .then((res: any) => {
        setErrorMessage("Successfully Updated!");
        setOpenErrorMessage(true);
        setLoading(false);
        setTest(res.data);
      })
      .catch((err: any) => {
        setLoading(false);
        setErrorMessage(err.response.data.non_field_errors[0]);
        setOpenErrorMessage(true);
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
        <SnackNotif
          snackbar={openErrorMessage}
          handleClose={() => setOpenErrorMessage(false)}
          message={errorMessage}
        />
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
