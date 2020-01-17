import React from "react";

import { Typography } from "@material-ui/core";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { IoIosSettings } from "react-icons/io";

import { MdFileDownload } from "react-icons/md";

import { makeStyles } from "@material-ui/styles";

import styled from "styled-components";

import { ButtonWithIcon } from "../../../../../common-components/buttons";
import MenuMore from "../../../../../common-components/campaign-menu-select/CampaignMenuSelect";

const HOContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 27px;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 34px;
`;

const Box = styled.div`
  width: 14px;
  height: 14px;
`;

const LegendText = styled(Typography)`
  font-size: 12px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #50555a;
  padding-right: 11px;
`;

const theme = createMuiTheme({});

const useStyles = makeStyles({});

const HeadOption = (props) => {
  let classes = useStyles();

  function renderLegend(legend) {
    return (
      <>
        {legend.map((leg) => (
          <LegendContainer
            style={{
              backgroundColor: "#fafafa",
              marginRight: "20px"
            }}
          >
            <Box
              style={{
                marginRight: "9px",
                marginLeft: "10px",
                backgroundColor: `${leg.color}`
              }}
            />
            <LegendText>{leg.title}</LegendText>
          </LegendContainer>
        ))}
      </>
    );
  }

  return (
    <MuiThemeProvider theme={theme}>
      <HOContainer>
        <div style={{ display: "flex" }}>
          {renderLegend([
            { title: "Sales", color: "#6698c7" },
            { title: "Other indicator", color: "#44bd94" }
          ])}
          <ButtonWithIcon icon={<IoIosSettings />}>Edit metrics</ButtonWithIcon>
          <span style={{ marginRight: "25px" }} />
          <ButtonWithIcon icon={<MdFileDownload />}>
            Download CSV
          </ButtonWithIcon>
        </div>
        <div>
          <MenuMore
            title="Chart menu"
            options={[
              {
                name: "Options here",
                id: "opt",
                sublinks: null,
                url: "#"
              }
            ]}
            otherOptions={null}
          />
        </div>
      </HOContainer>
    </MuiThemeProvider>
  );
};

export default HeadOption;
