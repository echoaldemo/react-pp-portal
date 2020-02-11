import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Box
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

export default function LoadingAddAudioResource(props) {
  const [open, setOpen] = React.useState(true); // eslint-disable-line

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const themes = createMuiTheme({
    palette: {
      primary: {
        main: "#1194f6"
      }
    }
  });
  return (
    <div>
      <ThemeProvider theme={themes}>
        <Dialog
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="xs"
          fullWidth
        >
          <br />
          <div>
            <DialogContent
              style={{
                marginBottom: 25,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center"
              }}
            >
              <Box
                fontSize={18}
                fontWeight="fontWeightMedium"
                m={1}
                style={{ color: "#7c8a97", fontSize: "18px" }}
              >
                {props.loadingType === "audioName" ? (
                  <React.Fragment>
                    One moment. We’re creating the <br /> new campaign...
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    One moment. We’re uploading the <br /> file audio{" "}
                    <strong>{props.currentResourceInfo.name}</strong>...
                  </React.Fragment>
                )}
              </Box>
              <DialogContentText style={{ margin: "30px 0 30px 0" }}>
                <CircularProgress color="primary" thickness={4} size={50} />
              </DialogContentText>
              {/* <br/> */}
              {props.loadingType === "audioName" ? (
                <div>
                  <Button
                    size="medium"
                    style={{ width: "165px", color: "#444851" }}
                    variant="contained"
                    onClick={() => props.handleCancelAddAudioResource()}
                  >
                    Cancel
                  </Button>
                </div>
              ) : null}
            </DialogContent>
          </div>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
