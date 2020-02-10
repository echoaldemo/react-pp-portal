/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Modal } from "common-components";
import styled from "styled-components";
import {
  Typography,
  Switch,
  makeStyles,
  Table,
  TableBody,
  TableRow,
  Tooltip
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Default from "../../assets/images/default.png";
import { ActiveCell } from "common-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles } from "@material-ui/core/styles";
import { FileCopyOutlined as Icon } from "@material-ui/icons";
import { mdiContentCopy } from "@mdi/js";

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const CustomSwitch = styled(Switch)`
  .MuiSwitch-thumb {
    color: #1194f6 !important;
  }
`;

const HeroContainer = styled.div`
  width: inherit;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: 30px;
`;

const ImageContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 35.7px;
  height: 35.7px;
  border-radius: 50%;
`;

const ImpersonateButton = styled.button`
  border: none;
  outline: none;
  width: 128.8px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  margin-right: 16.2px;
  cursor: pointer;
  &:hover {
    opacity: 0.8 !important;
  }
`;

const UUIDContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Cancel = styled.span`
  margin-bottom: 31px;
  width: 54px;
  height: 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #444851;
  text-transform: uppercase;
`;

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  palette: {
    primary: { main: "#1194f6" }
  },
  overrides: {
    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: "#ffffff"
        }
      },
      root: {
        "&$selected": {
          backgroundColor: "#ffffff",
          "&&:hover": {
            backgroundColor: "#ffffff"
          },
          "&&:active:after": {
            backgroundColor: "#ffffff"
          }
        }
      }
    },
    MuiSwitch: {
      track: {
        backgroundColor: "#f1f1f1 !important"
      }
    }
  }
});

const styles = theme => ({
  text: {
    width: "43px",
    height: "16px",
    fontSize: "16px",
    fontWeight: "500",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal"
  },
  textWhite: {
    color: "#ffffff"
  },
  textDark: {
    color: "#444851"
  },
  textFade: {
    color: "#777777"
  },
  active: {
    borderBottom: "none !important",
    padding: "0 !important"
  },
  capitalize: {
    textTransform: "capitalize"
  }
});

const useStyles = makeStyles(styles);

const PersonalInfo = props => {
  const classes = useStyles();
  const [copy, setCopy] = useState(false);
  let { person, data } = props;

  let team = data.teams.filter(key => key.uuid === person.team)[0];
  let company = data.companies.filter(key => key.uuid === person.company)[0];
  let campaigns = data.campaigns.filter(key => {
    return key;
  });
  if (person.campaigns) {
    if (person.campaigns.length > 0) {
      campaigns = campaigns.map(key => {
        return key.name;
      });
    } else campaigns = [];
  }

  // let roles = data.roles.filter(key => {
  //   return person.groups.forEach(grp => {
  //     console.log("GRP INSIDE: ", grp);
  //     if (grp === key.pk) {
  //       return key;
  //     }
  //   });
  // });

  // console.log("Roles Unfiltered: ", roles);

  // let role = roles.filter(key => key[0] !== undefined);

  // let role = person.groups.map(rl => {
  //   return data.roles.map(key => {
  //     return key === rl;
  //   });
  // });

  // console.log("Role filted: ", role);

  let role = [];

  person.groups &&
    person.groups.forEach(key => {
      data.roles.map(data => {
        if (key === data.pk) {
          role.push(data.name);
        }
      });
    });

  console.log(campaigns, company, team, role);
  return (
    <MuiThemeProvider theme={theme}>
      <Modal
        open={props.open}
        title={`User information`}
        onClose={props.onClose}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0fr 4fr 62px",
            alignItems: "center",
            marginBottom: 25
          }}
        >
          <HeroContainer>
            <AvatarContainer>
              <ImageContainer>
                <Image src={Default} />
              </ImageContainer>
            </AvatarContainer>
          </HeroContainer>
          <Typography
            style={{
              fontSize: "16px",
              margin: "7px 0px 0px 16px",
              color: "#444851"
            }}
            className={(classes.text, classes.textDark, classes.capitalize)}
          >
            {`${person.first_name} ${person.last_name}`}
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <ActiveCell className={classes.active}>
                  {person.is_active}
                </ActiveCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {[
          {
            title: "Username",
            data: [person.username]
          },
          {
            title: "Email",
            data: person.email ? [person.email] : ["No email associated"]
          },
          {
            title: "UUID",
            data: [person.uuid]
          },
          {
            title: "Team",
            data: team ? [team.name] : ["No team associated"]
          },
          {
            title: "Company",
            data: company ? [company.name] : ["No company associated"]
          },
          {
            title: "Campaigns",
            data: campaigns.length ? campaigns : ["No campaign associated"]
          },
          {
            title: "Roles",
            data: role ? role : ["No Roles"]
          }
        ].map(title => {
          return (
            <>
              <legend>
                <UUIDContainer
                  style={{
                    marginTop: "15px",
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr 26px"
                  }}
                >
                  <Typography
                    style={{
                      width: 44,
                      height: 21,
                      fontSize: 16,
                      fontWeight: "normal",
                      color: "#444851"
                    }}
                    className={(classes.text, classes.textDark)}
                  >
                    {title.title}:
                  </Typography>
                  <Typography
                    style={
                      title.title === "UUID"
                        ? {
                            color: "#777777",
                            marginLeft: "20px",
                            fontSize: "16px",
                            fontWeight: "100",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }
                        : {
                            color: "#777777",
                            marginLeft: "20px",
                            fontSize: "16px",
                            fontWeight: "100",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis"
                          }
                    }
                    className={(classes.text, classes.textFade)}
                  >
                    {title.data.map((content, i) => {
                      if (
                        title.data.length > 0 &&
                        i !== title.data.length - 1
                      ) {
                        return `${content}, `;
                      } else {
                        return content;
                      }
                    })}
                  </Typography>
                  {title.title === "UUID" && (
                    <CopyToClipboard
                      text={title.data[0]}
                      onCopy={() => setCopy(true)}
                      onPointerLeave={() => setCopy(false)}
                    >
                      {copy ? (
                        <LightTooltip title="UUID Copied!" placement="top">
                          <Icon
                            style={{
                              marginLeft: 5,
                              width: 21,
                              height: 22,
                              cursor: "pointer",
                              color: "#44485"
                            }}
                            path={mdiContentCopy}
                            //className={icon}
                            size={1}
                            rotate={360}
                          />
                        </LightTooltip>
                      ) : (
                        <LightTooltip title="Copy UUID" placement="top">
                          <Icon
                            style={{
                              marginLeft: 5,
                              width: 21,
                              height: 22,
                              cursor: "pointer",
                              color: "#44485"
                            }}
                            path={mdiContentCopy}
                            //className={icon}
                            size={1}
                            rotate={360}
                          />
                        </LightTooltip>
                      )}
                    </CopyToClipboard>
                  )}
                </UUIDContainer>
              </legend>
            </>
          );
        })}
        <div style={{ textAlign: "center", padding: "36px 0px 12px 0px" }}>
          <Button onClick={props.onClose}>
            <Cancel>close</Cancel>
          </Button>
        </div>
      </Modal>
    </MuiThemeProvider>
  );
};

export default PersonalInfo;
