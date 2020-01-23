import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, Grid } from "@material-ui/core";
import Editor from "./Editor";
import SubForm from "./SubForm";

import { Clear } from "@material-ui/icons";

export default function XMLDialog(props) {
  const [theme, setTheme] = React.useState("chrome");
  const [font, setFont] = React.useState(12);
  const [xmlData, setXML] = React.useState(props.dataXML);

  const handleTheming = data => {
    setTheme(`${data}`);
  };
  const handleFont = data => {
    setFont(data);
  };
  const handleSubmitForm = (data, label) => {
    const SubmitData = { ...data, xml: xmlData[0] };
    props.UpdateSegment(SubmitData, label);
  };
  const handleSubmitFormXMl = data => {
    setXML(data);
    props.handleChangeXML(data);
  };
  return (
    <React.Fragment>
      <Dialog
        style={{ margin: "-15px 50px auto 50px" }}
        fullWidth={true}
        maxWidth={"xl"}
        open={props.open}
        onClose={props.handlClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title"
          style={{ backgroundColor: "#5f7d98" }}
        >
          <Grid container>
            <Typography
              style={{
                flexGrow: 1,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "20px",
                letterSpacing: "0.1px",
                opacity: "0.85",
                color: "white"
              }}
            >
              Pitch Segment Editor
            </Typography>
            <Clear
              style={{ color: "white", marginLeft: "auto", cursor: "pointer" }}
              onClick={props.handlClose}
            />
          </Grid>
        </DialogTitle>
        <DialogContent style={{ height: 800, overflow: "hidden", padding: 0 }}>
          <Grid container>
            <Grid item style={{ width: "70%", height: "100%" }}>
              <DialogContent
                style={{
                  borderRight: "1px solid rgba(0,0,0,0.1)",
                  padding: 0
                }}
              >
                <Editor
                  handleSubmitFormXMl={handleSubmitFormXMl}
                  theme={theme}
                  font={font}
                  data={props.data}
                />
              </DialogContent>
            </Grid>
            <Grid
              item
              style={{
                width: "30%",
                height: "100%"
              }}
            >
              <DialogContent style={{ padding: 20 }}>
                <SubForm
                  stopLoading={props.stopLoading}
                  closeError={props.closeError}
                  error={props.error}
                  handleSubmitForm={handleSubmitForm}
                  data={props.data}
                  font={font}
                  theme={theme}
                  handleTheming={handleTheming}
                  handleFont={handleFont}
                />
              </DialogContent>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
