import React, { useState, useEffect } from "react";

import {
  Grid,
  makeStyles,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Slide,
  Button
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import CHeader from "./components/cards/CHeader";
import SaveButton from "../../../../../../components/common-components/buttons/save-button/SaveButton";
import CustomButton from "../../../../../../components/common-components/buttons/CustomButton";
import Modal from "../../../../../../components/common-components/Modal";
import CustomCard from "../../../../../../components/common-components/card";
import CardHeader from "../../../../../../components/common-components/card/cardheader";
import CardBody from "../../../../../../components/common-components/card/cardbody";
import { get } from "../../../../../../utils/api.js";

const useStyles = makeStyles(theme => ({
  table: {
    backgroundColor: "#FFF"
  },
  row: {
    height: 50,
    "&:nth-of-type(even)": {
      backgroundColor: "#f8f9fa"
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#FFF"
    }
  },
  cell: {
    borderBottom: "none"
  }
}));
const DataMock = [
  { id: 1, name: "Academic Advisor" },
  { id: 2, name: "Boom Recruiting" },
  { id: 2, name: "BKA" }
];
function AddCampaignModal(props) {
  const [open, setOpen] = useState(false);
  const [selectC, setSelectC] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [campaignDataSearchOrig, setCampaignDataOrig] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    //api fetch here
    if (props.data.length !== 0) {
      get("/identity/campaign/list/").then(res => {
        setCampaignData(
          res.data.filter(
            dataCamp =>
              props.data.filter(campData => campData.name === dataCamp.name)
                .length === 0
          )
        );
        setCampaignDataOrig(
          res.data.filter(
            dataCamp =>
              props.data.filter(campData => campData.name === dataCamp.name)
                .length === 0
          )
        );
      });
    } else {
      get("/identity/campaign/list/").then(res => {
        setCampaignDataOrig(res.data);
        setCampaignData(res.data);
      });
    }
  }, [props]);

  const classicSearch = result => {
    if (result) {
      if (result.length !== 0) {
        setCampaignData(result);
      } else {
        setCampaignData(campaignDataSearchOrig);
      }
    } else {
      setCampaignData(campaignDataSearchOrig);
    }
  };

  const AddCampaignFunc = () => {
    props.addCampaign(selectC);
    setCampaignData(campaignDataSearchOrig);
    setSelectC([]);
    props.openFunc();
  };

  const CancelCampaignFunc = () => {
    setCampaignData(campaignDataSearchOrig);
    setSelectC([]);
    props.openFunc();
  };
  const selectAllFunc = () => {
    setSelectC(campaignData);
  };

  const SelectCampaign = data => {
    let arrCamp = [...selectC];
    if (selectC.length === 0) {
      arrCamp.push(data);
    } else {
      if (selectC.filter(select => select.uuid === data.uuid).length === 0) {
        arrCamp.push(data);
      }
    }

    setSelectC(arrCamp);
  };

  const RemoveSelected = data => {
    let arrCamp = [];
    arrCamp = selectC.filter(arr => arr !== data);

    setSelectC(arrCamp);
  };

  return (
    <div>
      <Modal
        open={props.open}
        title="Add Campaign"
        onClose={() => {
          setSelectC([]);
          props.openFunc();
        }}
        width={750}
      >
        <div style={{ height: 575, overflow: "hidden" }}>
          Campaign
          <Grid container>
            <Grid item xs={6}>
              <CustomCard>
                <CHeader title={`${selectC.length} items selected`} />
                <CardBody>
                  <Table className={classes.table}>
                    <TableBody>
                      {selectC.length !== 0 &&
                        selectC.map((campaign, i) => (
                          <Slide
                            key={i}
                            direction="left"
                            in={true}
                            mountOnEnter
                            unmountOnExit
                          >
                            <TableRow key={i} className={classes.row}>
                              <TableCell className={classes.cell}>
                                {campaign.name}
                              </TableCell>
                              <TableCell className={classes.cell}>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "flex-end"
                                  }}
                                  onClick={() => RemoveSelected(campaign)}
                                >
                                  <CloseIcon
                                    style={{ width: 20, height: 20 }}
                                  />
                                  Remove
                                </div>
                              </TableCell>
                            </TableRow>
                          </Slide>
                        ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </CustomCard>
            </Grid>
            <Grid item xs={6}>
              <CustomCard>
                <CHeader
                  title="Campaign list"
                  searchData={campaignData}
                  searchFor={`campaign`}
                  selectAllFunc={selectAllFunc}
                  searchHeaders={["name"]}
                  classicSearch={classicSearch}
                />
                <CardBody>
                  <Table className={classes.table}>
                    <TableBody>
                      {campaignData.map((data, i) => (
                        <TableRow className={classes.row} key={i}>
                          <TableCell className={classes.cell}>
                            {data.name}
                          </TableCell>
                          <TableCell className={classes.cell}>
                            <div
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                              onClick={() => SelectCampaign(data)}
                            >
                              <AddIcon style={{ width: 20, height: 20 }} />
                              Add
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardBody>
              </CustomCard>
            </Grid>
          </Grid>
        </div>
        <Grid container justify="center" style={{ paddingTop: 20 }} spacing={2}>
          <Grid item>
            <CustomButton onClick={AddCampaignFunc}>Save</CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              onClick={CancelCampaignFunc}
              style={{ backgroundColor: "#eee" }}
            >
              <strong style={{ color: "#444851" }}>Cancel</strong>
            </CustomButton>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

export default AddCampaignModal;
