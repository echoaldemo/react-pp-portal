import React, { Component } from "react";
import { withStyles, IconButton, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { SearchBar } from "common-components";
import { Link } from "react-router-dom";
const styles = {
  cardHeader: {
    borderBottom: "solid 1px #eee",
    padding: 15,
    background: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#666"
  },
  searchWrapper: {
    display: "flex",
    border: "solid 1px #eee"
  },
  searchContainer: {
    width: "88%"
  },
  cancelContainer: {
    marginTop: 30
  },
  cancelText: {
    fontWeight: 600,
    textDecoration: "underline",
    color: "#888",
    fontSize: 15,
    cursor: "pointer"
  }
};
class CardHeaderComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
      showSearch: false
    };
  }

  componentDidMount() {
    this.setState({
      searchData: this.props.searchData ? this.props.searchData : ""
    });
  }
  handleShowSearch = () => {
    this.setState({ showSearch: true });
  };
  handleCloseSearch = () => {
    this.setState({ showSearch: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        {this.state.showSearch ? (
          <div className={classes.searchWrapper}>
            <div className={classes.searchContainer}>
              <SearchBar
                title="Phrasebooks"
                userData={this.state.searchData}
                headers={this.props.searchHeaders}
              />
            </div>
            <div className={classes.cancelContainer}>
              <a
                onClick={() => {
                  this.handleCloseSearch();
                }}
              >
                <span className={classes.cancelText}>Cancel</span>
              </a>
            </div>
          </div>
        ) : (
          <div className={classes.cardHeader}>
            <div>
              <span className={classes.cardTitle}> {this.props.title} </span>
              {this.props.addButton ? (
                <IconButton
                  style={{
                    padding: 0,
                    marginTop: -5,
                    marginLeft: 10
                  }}
                  onClick={() => {
                    this.props.addFunction();
                  }}
                >
                  <AddIcon />
                </IconButton>
              ) : null}
            </div>
            <div>
              {!this.state.searchData.length > 0 ? null : (
                <IconButton
                  style={{ padding: 0 }}
                  onClick={() => {
                    this.handleShowSearch();
                  }}
                >
                  <SearchIcon style={{ color: "#666" }} />
                </IconButton>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
const CardHeader = withStyles(styles)(CardHeaderComp);

export { CardHeader };
