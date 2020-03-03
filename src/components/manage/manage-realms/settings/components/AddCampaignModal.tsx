/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  makeStyles,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Slide
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import {
  CardHeader,
  CustomButton,
  Modal,
  CustomCard,
  CardBody
} from "common-components";
import { store } from "contexts/ManageComponent";

const useStyles: any = makeStyles(theme => ({
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

function AddCampaignModal(props: any) {
  const { state } = useContext(store);
  const [selectC, setSelectC] = useState<any>([]);
  const [campaignData, setCampaignData] = useState<any>([]);
  const [campaignDataSearchOrig, setCampaignDataOrig] = useState<any>([]);
  const classes = useStyles();

  useEffect(() => {
    let arrCamp = fetchCampaigns();
    setCampaignDataOrig(arrCamp);
    setCampaignData(arrCamp);
  }, []);

  const fetchCampaigns = () => {
    let tempArr = props.data.map((tem: any) => tem.uuid);
    let arrCamp = state.campaigns.filter(
      (camp: any) => !tempArr.includes(camp.uuid)
    );
    return arrCamp;
  };

  // eslint-disable-next-line
  const classicSearch = (result: any) => {
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

  const AddCampaignFunc: any = () => {
    let arrCamp = fetchCampaigns();
    setCampaignData(arrCamp);
    props.addCampaign(selectC);
    setSelectC([]);
    props.openFunc();
  };

  const CancelCampaignFunc: any = () => {
    let arrCamp = fetchCampaigns();
    setCampaignData(arrCamp);
    setSelectC([]);
    props.openFunc();
  };

  const SelectCampaign = (data: any) => {
    let arrCamp = [...selectC];
    if (selectC.length === 0) {
      arrCamp.push(data);
    } else {
      if (
        selectC.filter((select: any) => select.uuid === data.uuid).length === 0
      ) {
        arrCamp.push(data);
      }
    }

    setSelectC(arrCamp);
  };

  const RemoveSelected = (data: any) => {
    let arrCamp = [];
    arrCamp = selectC.filter((arr: any) => arr !== data);

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
                <CardHeader title={`${selectC.length} items selected`} />
                <CardBody>
                  <Table className={classes.table}>
                    <TableBody>
                      {selectC.length !== 0 &&
                        selectC.map((campaign: any, i: any) => (
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
                <CardHeader
                  title="Campaign list"
                  searchData={campaignData}
                  searchHeaders={["name"]}
                />
                <CardBody>
                  <Table className={classes.table}>
                    <TableBody>
                      {campaignData.map((data: any, i: any) => (
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
            <CustomButton handleClick={AddCampaignFunc}>Save</CustomButton>
          </Grid>
          <Grid item>
            <CustomButton
              handleClick={CancelCampaignFunc}
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
