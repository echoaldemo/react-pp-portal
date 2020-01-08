import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import DNDCards from "./DNDCards";
import { company, global } from "./Mock";
import { TableLoader } from "common-components";

/* import {
  getAllPhraseBook,
  getGlobalPhraseBook
} from '../../../../actions/PhraseBook' */

/* import CreatePhraseBook from './CreatePhraseBook' */

const styles = {
  container: {
    padding: 30
  },
  cardContainer: {
    width: 475
  }
};

const defaultState = {
  loadingState: false,
  activePhraseBookData: [
    { uuid: 1, name: "Programs" },
    { uuid: 2, name: "Portal" },
    { uuid: 3, name: "First-names-sentence" },
    { uuid: 4, name: "First-names-questions" }
  ],
  globalPhraseBooksData: [
    { uuid: 1, name: "State" },
    { uuid: 2, name: "Firstname" },
    { uuid: 3, name: "Sample" }
  ],
  phraseBooksData: [],
  loadingText: "Loading active phrase books",

  openModal: false,

  activeData: []
};

class PhraseBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState
    };
  }

  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    try {
      this.setState({
        loadingState: true
      });
      /* getGlobalPhraseBook()
        .then(data => {
          this.setState({
            globalPhraseBooksData: data,
            loadingText: 'Loading global phrase books..'
          })
        })
        .then(() => {
          this.setState({ loadingText: 'Loading companies phrase books  ' })
          getAllPhraseBook(this.props.company.slug).then(result => {
            this.setState({ phraseBooksData: result, loadingState: false })
          })
        }) */
      /* start mock */
      setTimeout(() => {
        this.setState({
          globalPhraseBooksData: global,
          phraseBooksData: company,
          loadingState: false
        });
      }, 1000);
      /* end mock */
    } catch (err) {}
  };
  openCreateModal = () => {
    this.setState({ openModal: true });
  };
  closeCreateModal = () => {
    this.setState({ openModal: false });
  };
  setActiveData = data => {
    this.setState({
      activeData: data
    });
  };
  saveActiveSegment = data => {
    //API request here for updating activeSegments
    this.setState({ activePhraseBookData: data });
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        {this.state.loadingState ? (
          <TableLoader />
        ) : (
          <div className={classes.container}>
            <DNDCards
              card1Title="Active phrase books"
              card2Title="Global phrase books"
              card3Title="Company phrase books"
              card1Data={this.state.activePhraseBookData}
              card2Data={this.state.globalPhraseBooksData}
              card3Data={this.state.phraseBooksData}
              setActiveData={this.setActiveData}
              addButton3={true}
              addFunction3={this.openCreateModal}
              saveActiveSegment={this.saveActiveSegment}
            />

            {/* {this.props.company !== null && (
              <CreatePhraseBook
                open={this.state.openModal}
                refresh={this.getAllData}
                companySlug={this.props.company.slug}
                onClose={this.closeCreateModal}
                openModal={this.openCreateModal}
              />
            )}
            */}
          </div>
        )}
      </>
    );
  }
}
export default withStyles(styles)(PhraseBooks);
