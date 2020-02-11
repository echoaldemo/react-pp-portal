import React, { useState } from "react";
import { TextField, Grid, FormControlLabel, Checkbox } from "@material-ui/core";
import { CustomButton } from "common-components";
import TransferListCard from "../transfer-list-card/TransferListCard";
import { exportStyle as useStyles } from "./styles";

type PropType = {
  SaveExportList?: any;
  setOpenExportList?: any;
};

const TopInfo: Function = ({ classes }: any) => {
  const textFields = [
    {
      placeholder: "Filename"
    },
    {
      placeholder: "Hire Date"
    },
    {
      placeholder: "End Date"
    }
  ];
  return (
    <div>
      {textFields.map((fields, i) => {
        return (
          <TextField
            key={i}
            //   onChange={e => handleSearch(e)}
            id="standard-full-width"
            // value={textSearch}
            placeholder={`${fields.placeholder}`}
            fullWidth
            margin="normal"
            autoComplete="off"
            style={{
              padding: "5px 15px 5px 0px",
              width: "100%"
            }}
            InputProps={{
              classes: {
                underline: classes.inputField,
                root: classes.inputField
              }
            }}
          />
        );
      })}

      <FormControlLabel
        style={{
          padding: "5px 10px 5px 0px",
          width: "100%",
          color: "#777777"
        }}
        control={
          <Checkbox
            disabled
            checked={false}
            // onChange={handleChange("checkedB")}
            value="checkedB"
            color="primary"
          />
        }
        label="Quilified only"
      />
    </div>
  );
};
const mockData = [
  {
    name: "IVR Removal"
  },
  {
    name: "Wrong number"
  },
  {
    name: "Voice mail"
  },
  {
    name: "Do not call"
  }
];
const ExportList: React.FC<PropType> = props => {
  const { setOpenExportList, SaveExportList } = props;
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState([]);
  const SelectedDataFunc = (data: any, listname: any) => {
    setSelectedData({ [listname]: data } as any);
  };
  const SaveDataFunc = () => {
    SaveExportList(selectedData);
  };
  const CancelDataFunc = () => {
    setOpenExportList(false);
  };
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <TopInfo classes={classes} />
        </Grid>
        <Grid item xs={12}>
          <TransferListCard
            list={{
              title: "Dispositions"
            }}
            mockData={mockData}
            SelectedDataFunc={SelectedDataFunc}
          />
          <TransferListCard
            list={{
              title: "Locations"
            }}
            mockData={mockData}
            SelectedDataFunc={SelectedDataFunc}
          />
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item>
              <FormControlLabel
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "100%",
                  color: "#777777"
                }}
                control={
                  <Checkbox
                    disabled
                    checked={false}
                    // onChange={handleChange("checkedB")}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Include submits"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "100%",
                  color: "#777777"
                }}
                control={
                  <Checkbox
                    disabled
                    checked={false}
                    // onChange={handleChange("checkedB")}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Notes as columns"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "100%",
                  color: "#777777"
                }}
                control={
                  <Checkbox
                    disabled
                    checked={false}
                    // onChange={handleChange("checkedB")}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="For reimport"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                style={{
                  padding: "5px 10px 5px 0px",
                  width: "100%",
                  color: "#777777"
                }}
                control={
                  <Checkbox
                    disabled
                    checked={false}
                    // onChange={handleChange("checkedB")}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Include variables"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ paddingTop: 20 }} spacing={2}>
        <Grid item>
          <CustomButton handleClick={SaveDataFunc}>Save</CustomButton>
        </Grid>
        <Grid item>
          <CustomButton
            handleClick={CancelDataFunc}
            style={{ backgroundColor: "#eee" }}
          >
            <strong style={{ color: "#444851" }}>Cancel</strong>
          </CustomButton>
        </Grid>
      </Grid>
    </>
  );
};

export default ExportList;
