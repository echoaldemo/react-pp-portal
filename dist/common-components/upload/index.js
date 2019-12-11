var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Input, Divider, Typography } from "@material-ui/core";
import { mdiUpload } from "@mdi/js";
import Icon from "@mdi/react";
import styled from "styled-components";
import { CustomText } from "../custom-components";
var LabelText = styled(Typography)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: 14px !important;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #999999;\n"], ["\n  font-size: 14px !important;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #999999;\n"])));
var HelperText = styled(Typography)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  font-size: 12px !important;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #999999;\n  margin-top: 8px !important;\n"], ["\n  font-size: 12px !important;\n  font-weight: normal;\n  font-stretch: normal;\n  font-style: normal;\n  line-height: normal;\n  letter-spacing: normal;\n  color: #999999;\n  margin-top: 8px !important;\n"])));
var theme = createMuiTheme({
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
var useStyles = makeStyles({
    hidden: {
        display: "none !important"
    }
});
var Upload = function (props) {
    var _a = useState("No file chosen"), filename = _a[0], setFilename = _a[1];
    var upload = function (e) {
        try {
            var extracted = e.target.files[0].name;
            var limit = props.limit;
            var name_1 = extracted.length > limit ? extracted.substring(0, limit) : extracted;
            name_1 =
                extracted.length > limit
                    ? name_1 + "..." + extracted.split(".")[extracted.split(".").length - 1]
                    : extracted;
            setFilename(name_1);
            props.getAudio && props.getAudio(e.target.files[0]);
        }
        catch (e) {
            console.log(e);
        }
    };
    var renderUploadComponent = function () {
        return (React.createElement("div", { style: props.style },
            React.createElement(LabelText, null, props.labelText),
            React.createElement(Input, { id: "files", inputProps: {
                    accept: props.accept
                }, onChange: function (e) { return upload(e); }, type: "file", className: classes.hidden }),
            React.createElement("label", { style: {
                    margin: "5px 0 7px 0",
                    display: "flex",
                    flexDirection: "row",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textOverflow: "ellipsis"
                } },
                React.createElement(CustomText, { size: "16px", color: "tableDataColor" }, filename),
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end"
                    } },
                    React.createElement(Icon, { path: mdiUpload, title: "Copy", size: 0.8, rotate: 360, style: {
                            marginBottom: "3px"
                        }, color: "#1194f6" }),
                    React.createElement("div", { style: { width: "3px" } }),
                    React.createElement(CustomText, { size: "16px", color: "activeInput" }, "Choose file"))),
            React.createElement(Divider, null),
            React.createElement(HelperText, null, props.helperText)));
    };
    var classes = useStyles({});
    return (React.createElement(MuiThemeProvider, { theme: theme }, renderUploadComponent()));
};
export default Upload;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map