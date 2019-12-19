import React, { Component } from "react";
import { withStyles, IconButton } from "@material-ui/core";
import { Search as SearchIcon, Add as AddIcon } from "@material-ui/icons";
import { SearchBar } from "common-components";
import { cardHeader as styles } from "../styles";
interface Props {
  searchHeaders: any;
  searchData: any;
  classes: any;
  addButton: any;
  title: any;
  addFunction: any;
}

interface State {
  searchData: any;
  showSearch: boolean;
}
class CardHeaderComp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      searchData: [],
      showSearch: false
    };
  }

  componentDidMount() {
    const { searchData } = this.props;
    this.setState({
      searchData: searchData ? searchData : []
    });
  }
  handleShowSearch: Function = () => {
    this.setState({ showSearch: true });
  };
  handleCloseSearch: Function = () => {
    this.setState({ showSearch: false });
  };

  renderSearchBar: Function = (
    classes: any,
    searchHeaders: any,
    searchData: any
  ) => (
    <div className={classes.searchWrapper}>
      <div className={classes.searchContainer}>
        <SearchBar
          title="Phrasebooks"
          userData={searchData}
          headers={searchHeaders}
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
  );

  renderIcons: Function = (
    classes: any,
    searchHeaders: any,
    searchData: any,
    addFunction: any,
    title: any,
    addButton: any
  ) => {
    console.log("Search Data Length: ", searchData.length);
    return (
      <div className={classes.cardHeader}>
        <div>
          <span className={classes.cardTitle}> {title} </span>
          {addButton && (
            <IconButton
              style={{
                padding: 0,
                marginTop: -5,
                marginLeft: 10
              }}
              onClick={() => {
                addFunction();
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
        <div>
          {searchData && (
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
    );
  };

  render() {
    const {
      classes,
      searchHeaders,
      addButton,
      title,
      addFunction
    } = this.props;
    const { showSearch, searchData } = this.state;
    return (
      <>
        {showSearch
          ? this.renderSearchBar(classes, searchHeaders, searchData)
          : this.renderIcons(
              classes,
              searchHeaders,
              searchData,
              addFunction,
              title,
              addButton
            )}
      </>
    );
  }
}
const CardHeader = withStyles(styles)(CardHeaderComp);

export { CardHeader };
