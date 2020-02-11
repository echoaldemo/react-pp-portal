import React from "react";
import { Settings } from "@material-ui/icons/";

const EditText = ({ text, onClick, open }: any) => {
  return (
    <span className="panel-edit-text" onClick={onClick}>
      <Settings style={{ fontSize: 14, marginRight: 5 }} />
      <u>{open ? "Close" : `Edit ${text}`}</u>
    </span>
  );
};

export { EditText };
