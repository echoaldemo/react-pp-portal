import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Modal, InputField, SaveButton } from "common-components";
import { useStyles } from "./styles";
type CreateType = {
  open: boolean;
  title: string;
  onClose: any;
  value: any;
  mode?: any;
  handleClick: any;
  handleChange: any;
};

const Create: React.FC<CreateType> = ({
  open,
  title,
  value,
  onClose,
  handleClick,
  handleChange,
  mode
}) => {
  const [error, setError] = useState(false);
  const classes = useStyles();
  let cancelStyle = {
    backgroundColor: "#eeeeee"
  };

  const onChange: Function = (e: any) => {
    if (e.target.value.length <= 0) {
      setError(true);
    } else {
      setError(false);
    }
    handleChange(e);
  };

  return (
    <>
      <Modal open={open} title={title} onClose={onClose} height={270}>
        <Grid container>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <InputField
              onBlur={onChange}
              onChange={onChange}
              label="Audio Name"
              value={value}
              fullWidth
              error={error}
              helperText={error ? "Audio name is required." : " "}
              required
            />
          </Grid>

          <Grid container>
            {mode && (
              <Grid item xs style={{ marginTop: 43 }}>
                <SaveButton onClick={() => onClose()} style={cancelStyle}>
                  <Typography className={classes.cancelText}>CANCEL</Typography>
                </SaveButton>
              </Grid>
            )}

            <Grid
              item
              xs
              style={{
                marginTop: 43,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <SaveButton
                disabled={value.length <= 0}
                onClick={() => handleClick()}
              >
                {!mode ? "SAVE AUDIO" : "UPDATE AUDIO"}
              </SaveButton>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Create;
