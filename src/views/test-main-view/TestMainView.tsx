import React, { Fragment } from "react";
import Upload from "common-components/upload/";

const MainView = () => {
  return (
    <Fragment>
      <Upload
        limit="8"
        accept="audio/*"
        labelText="Data File"
        helperText="A file needed"
        getAudio={() => console.log("I am the file")}
      />
    </Fragment>
  );
};

export default MainView;
