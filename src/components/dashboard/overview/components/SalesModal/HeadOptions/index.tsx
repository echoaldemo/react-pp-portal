import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { IoIosSettings } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { ButtonWithIcon, CampaignMenuSelect } from "common-components";
import {
  theme,
  LegendContainer,
  LegendText,
  Box,
  HOContainer
} from "../../../styles/HeadOptions.style";

interface Obj {
  [index: string]: any;
}

const HeadOption = () => {
  const renderLegend = (legend: Obj[]) => {
    return (
      <>
        {legend.map((leg: Obj) => (
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
  };

  return (
    <MuiThemeProvider theme={theme}>
      <HOContainer>
        <div style={{ display: "flex" }}>
          {renderLegend([
            { title: "Sales", color: "#6698c7" },
            { title: "Other indicator", color: "#44bd94" }
          ])}
          <ButtonWithIcon
            icon={<IoIosSettings />}
            handleClick={() => console.log("")}
          >
            Edit metrics
          </ButtonWithIcon>
          <span style={{ marginRight: "25px" }} />
          <ButtonWithIcon
            icon={<MdFileDownload />}
            handleClick={() => console.log("")}
          >
            Download CSV
          </ButtonWithIcon>
        </div>
        <div>
          <CampaignMenuSelect
            title="Chart menu"
            options={[
              {
                name: "Options here",
                id: "opt",
                sublinks: null,
                url: "#"
              }
            ]}
          />
        </div>
      </HOContainer>
    </MuiThemeProvider>
  );
};

export default HeadOption;
