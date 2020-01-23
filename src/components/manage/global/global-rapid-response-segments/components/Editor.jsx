import React from "react";
import { split as SplitEditor } from "react-ace";

import "brace/mode/java";
import "brace/theme/chrome";
import "brace/theme/monokai";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xml: null
    };
  }

  componentDidMount() {
    this.setState({
      xml: this.props.data.xml === undefined ? "" : this.props.data.xml
    });
  }

  handleChangeXml = data => {
    this.setState({
      xml: data
    });
    this.props.handleSubmitFormXMl(data);
  };

  render() {
    return (
      // Render editor
      <React.Fragment>
        {this.state.xml !== null ? (
          <SplitEditor
            onChange={newValue => {
              this.handleChangeXml(newValue);
            }}
            fontSize={this.props.font}
            width="100%"
            height="800px"
            mode="xml"
            theme={`${this.props.theme}`}
            splits={1}
            value={[`${this.state.xml}`]}
            name="UNIQUE_ID_OF_DIV"
            setOptions={{ showInvisibles: true }}
            editorProps={{ $blockScrolling: true }}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Editor;
