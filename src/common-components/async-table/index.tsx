import React from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1194f6"
    }
  }
});

const styles = (theme: Theme) =>
  createStyles({
    root: {
      overflowX: "auto",
      overflowY: "hidden",
      minHeight: 500,
      width: "100%",
      position: "relative"
    },
    table: {
      backgroundColor: "#FFF"
    },
    header: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#444851",
      backgroundColor: "rgba(124, 138, 151, 0.05)",
      padding: "14px 0 14px 14px"
    },
    headerRow: {
      height: 50,
      fontWeight: 900,
      borderTop: "solid 1px #eee"
    },
    row: {
      minHeight: 55,
      "&:nth-of-type(even)": {
        backgroundColor: "#f8f9fa"
      }
    },
    userCell: {
      borderBottom: "none",
      color: "#777777",
      "& a": {
        color: "inherit"
      },
      margin: 0,
      width: "14%"
    },
    cell: {
      borderBottom: "none",
      padding: "14px 0 14px 14px",
      color: "#777777",
      "& a": {
        color: "inherit"
      },
      margin: 0,
      "& p": {
        "@media (max-width: 1700px)": {
          width: 100,
          overflowWrap: "break-word"
        },
        "@media (max-width: 1630px)": {
          width: 70,
          overflowWrap: "break-word"
        },
        "@media (max-width: 1440px)": {
          width: "70px",
          overflowWrap: "break-word"
        }
      },
      "&:last-child": {
        paddingRight: "16px !important"
      }
    },
    emailCell: {
      borderBottom: "none",
      padding: "14px 0 14px 14px",
      color: "#777777",
      "& a": {
        color: "inherit"
      },
      margin: 0,
      "& p": {
        "@media (max-width: 1700px)": {
          width: "100%",
          overflowWrap: "break-word"
        },
        "@media (max-width: 1630px)": {
          width: "120px",
          overflowWrap: "break-word"
        },
        "@media (max-width: 1440px)": {
          width: "120px",
          overflowWrap: "break-word"
        }
      }
    },
    fixedCell: {
      borderBottom: "none",
      padding: "14px 0 14px 14px",
      color: "#777777",
      "& a": {
        color: "inherit"
      },
      margin: 0,
      "& p": {
        "@media (max-width: 1700px)": {
          width: "100%",
          overflowWrap: "break-word"
        },
        "@media (max-width: 1630px)": {
          width: "120px",
          overflowWrap: "break-word"
        },
        "@media (max-width: 1440px)": {
          width: "100%",
          overflowWrap: "break-word"
        }
      }
    },
    uuid: {
      color: "#777777",
      height: "100%",
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderBottom: "none",
      "& p": {
        width: 220,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        padding: 0,
        "@media (max-width: 1840px)": {
          width: 100
        }
      }
    },
    icon: {
      width: "14px !important",
      height: "16px !important",
      cursor: "pointer"
    },
    overflow: {
      lineHeight: "1em",
      maxHeight: "2em",
      display: "box",
      boxOrient: "vertical",
      lineClamp: 2,
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  });

interface Props {
  headers: any;
  tableData: any;
  render: Function;
  classes: any;
  customHeight: number;
  withBorder: boolean;
}
interface CheckProps {
  clickFn: Function;
  state: boolean;
  label: string;
}
interface HeaderProps {
  clickFn: Function;
  state: boolean;
  title: string;
  check: boolean;
}

const MainContainer: React.FC<Props> = ({
  headers,
  tableData,
  render,
  classes,
  customHeight,
  withBorder
}) => {
  const CheckBoxLabel = (props: CheckProps) => {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0fr 1fr"
            }}
          >
            <Checkbox
              onClick={() => props.clickFn()}
              color="primary"
              checked={props.state}
              style={{
                padding: "0 20px 0 7px"
              }}
            />
            <p
              onClick={() => props.clickFn()}
              className={classes.overflowClass}
            >
              {props.label}
            </p>
          </div>
        </MuiThemeProvider>
      </>
    );
  };

  return (
    <div
      className={classes.rootClass}
      style={customHeight ? { minHeight: customHeight } : { width: "100%" }}
    >
      <Table
        className={classes.table}
        style={
          withBorder ? { border: ".5px solid #eeeeee" } : { border: "none" }
        }
      >
        <colgroup>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(e => (
            <col key={e} style={{ width: "7.69230769231%" }} />
          ))}
        </colgroup>
        {headers ? (
          <TableHead>
            <TableRow className={classes.headerRow}>
              {headers.map((header: HeaderProps, idx: number) =>
                header.check ? (
                  <TableCell className={classes.header} key={idx}>
                    <CheckBoxLabel
                      key={idx}
                      label={header.title}
                      state={header.state}
                      clickFn={header.clickFn}
                    />
                  </TableCell>
                ) : (
                  <TableCell className={classes.header} key={idx}>
                    <span className={classes.overflowClass}>{header}</span>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
        ) : null}

        <TableBody>
          {render(tableData, {
            row: classes.row,
            cell: classes.cell,
            userCell: classes.userCell,
            emailCell: classes.emailCell,
            uuid: classes.uuid,
            icon: classes.icon,
            fixedCell: classes.fixedCell,
            overflow: classes.overflowClass
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const AsyncTable = withStyles(styles)(MainContainer);

export { AsyncTable };
