import React, { useState } from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { style } from "./style";
import ReactDOM from "react-dom";
const Alert: React.FC<{
  open: boolean;
  setOpen: any;
  type: string;
  message: string;
  timeout?: number;
}> = ({ open, setOpen, type, message, timeout }) => {
  const classes = style(0);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="container"
      open={open}
      autoHideDuration={timeout || 2000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        className={(classes as any)[type]}
        message={<span>{message}</span>}
      />
    </Snackbar>
  );
};

export default Alert;
