//react-ace requirements
import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
//import { get } from '../../../../../utils/api'
import AceEditor from "react-ace";

import "brace/mode/xml";
import "brace/theme/chrome";
import "brace/theme/monokai";

import { Content, Container, Right, NewButton, theme } from "./styles";
import Select from "./Select";

import {
  currentData,
  pitch_details,
  company_slug_val,
  campaign_slug_val
} from "./mock";

interface Props {
  pitch_details: any;
  company_slug_val: any;
  campaign_slug_val: any;
}

interface State {
  versions: any;
  themes: string[];
  fontSizes: number[];
  currentVersion: string;
  latestVersion: string;
  currentData: string;
  currentTheme: string;
  currentFontSize: string;
}

class XML extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      versions: [],
      themes: ["monokai", "chrome"],
      fontSizes: [14, 16, 18, 20, 24, 28, 32, 40],
      currentVersion: "",
      latestVersion: "",
      currentData: "",
      currentTheme: "monokai",
      currentFontSize: "14"
    };
  }
  static defaultProps = {
    pitch_details,
    company_slug_val,
    campaign_slug_val
  };
  componentDidMount() {
    if (this.props.pitch_details.versions) {
      this.getLatestVersion();
      this.setState({ versions: this.props.pitch_details.versions });
    }
    this.getXML();
  }

  applyChange = async () => {
    this.setState({ currentData: "Loading..." });
    this.getXML();
  };

  onChange = (e: any) => {
    this.setState({ currentData: e });
  };

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  getLatestVersion = () => {
    let x = this.props.pitch_details.versions;
    let y = x[x.length - 1];
    if (typeof y !== "undefined") {
      this.setState({ currentVersion: y.uuid, latestVersion: y.uuid });
    }
  };

  getXML = () => {
    /* get(
      `/pitch/company/${this.props.company_slug_val}/campaign/${this.props.campaign_slug_val}/raw/${this.state.currentVersion}/`
    )
      .then(response => {
        this.setState({ currentData: response.data.xml });
      })
      .catch(error => {
        console.log(error);
      }); */
    this.setState({ currentData });
  };

  render() {
    return (
      <Content>
        <MuiThemeProvider theme={theme}>
          <Container>
            <Select
              data={{
                label: "Pitch Version",
                data: this.state.versions,
                latest: this.state.latestVersion,
                value: this.state.currentVersion,
                name: "currentVersion",
                onChange: this.handleChange
              }}
            />
            <Select
              data={{
                label: "Editor Theme",
                data: this.state.themes,
                value: this.state.currentTheme,
                name: "currentTheme",
                onChange: this.handleChange
              }}
            />
            <Select
              data={{
                label: "Font Size",
                data: this.state.fontSizes,
                value: this.state.currentFontSize,
                name: "currentFontSize",
                onChange: this.handleChange
              }}
            />
            <Right>
              <NewButton
                onClick={this.applyChange}
                type="submit"
                variant="contained"
                color="primary"
              >
                Apply
              </NewButton>
            </Right>
          </Container>

          <AceEditor
            width="100%"
            placeholder="No Data!"
            onChange={this.onChange}
            mode="xml"
            value={this.state.currentData}
            theme={this.state.currentTheme}
            fontSize={this.state.currentFontSize}
            name="currentData"
            editorProps={{ $blockScrolling: true }}
          />
        </MuiThemeProvider>
      </Content>
    );
  }
}

export default XML;
