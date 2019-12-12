import React from "react";
import { storiesOf } from "@storybook/react";
import {Upload} from "common-components";

storiesOf("Upload Design", module).add("default", function() {
  return (
    <Upload
      limit={8}
      accept="audio/*"
      labelText="Data File"
      helperText="A file needed"
      getAudio={e => console.log("I am the file", e)}
    />
  );
});

// Value	Description
// file_extension	Specify the file extension(s) (e.g: .gif, .jpg, .png, .doc) the user can pick from
// audio/*	The user can pick all sound files
// video/*	The user can pick all video files
// image/*	The user can pick all image files
// media_type	A valid media type, with no parameters. Look at IANA Media Types for a complete list of standard media types
