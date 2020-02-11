import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Tooltip, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { AttachMoney } from "@material-ui/icons";
import styled from "styled-components";

const LCard = styled.div`
  min-width: 65px;
  min-height: 38px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const theme = createMuiTheme({});

interface Props {
  mode: string;
  bgColor: string;
  customWidth?: string;
  lineStyle: any;
  label: string;
}

const LabelCard = (props: Props) => {
  function getStyle() {
    let style = null;
    switch (props.mode) {
      case "small":
        style = {
          width: "65px",
          backgroundColor: props.bgColor
        };

        break;
      case "medium":
        style = {
          width: props.customWidth ? props.customWidth : "113px",
          backgroundColor: props.bgColor
        };

        break;
      case "large":
        style = {
          width: "147px",
          backgroundColor: props.bgColor
        };

        break;
      default:
        break;
    }
    return style;
  }

  let style1 = props.lineStyle[0];
  let style2 = props.lineStyle[1];

  return (
    <MuiThemeProvider theme={theme}>
      <LCard style={{ ...getStyle() }}>
        <div
          style={{
            ...style1,
            borderLeft: "2px dashed #ff504d",
            zIndex: 3
          }}
        />
        <AttachMoney style={{ fontSize: "16px" }} /> {props.label}
        <div
          style={{
            ...style2,
            borderLeft: "2px dashed #ff504d",
            zIndex: 3
          }}
        />
        <HtmlTooltip
          placement="right"
          title={
            <>
              <div>
                <Typography color="inherit">Random Station</Typography>

                <Typography color="inherit">
                  <strong>30,000 minutes / 300$</strong>
                </Typography>
              </div>
            </>
          }
        >
          <div
            style={{
              minWidth: "inherit",
              minHeight: "inherit",
              position: "absolute",
              zIndex: 99
            }}
          />
        </HtmlTooltip>
      </LCard>
    </MuiThemeProvider>
  );
};

export default LabelCard;
