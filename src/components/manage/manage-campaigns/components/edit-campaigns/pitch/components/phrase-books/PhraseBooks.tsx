/* eslint-disable */

import React, { useState, useEffect, useContext } from "react";
import DNDCards from "../cards/DNDCards";
import { company, global } from "./Mock";
import { TableLoader } from "common-components";
import { phrase } from "./styles";
import CreatePhraseBook from "./add-company-phrase-book/CreatePhraseBook";
import { IdentityContext } from "contexts/IdentityProvider";
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

interface IProps {
  classes: any;
  company: any;
}

interface IState {
  loadingState: boolean;
  activePhraseBookData: Array<Object>;
  globalPhraseBooksData: Array<Object>;
  phraseBooksData: Array<Object>;
  loadingText: string;
  openModal: boolean;
  activeData: Array<Object>;
}

const PhraseBooks: React.FC<IProps> = props => {
  const [state1, setState1] = useState<IState>(defaultState);
  const classes = phrase();
  const { state } = useContext(IdentityContext);
  const getAllData = () => {
    try {
      setState1({ ...state1, loadingState: true });
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
      if (document.cookie !== "") {
        setTimeout(() => {
          setState1({
            ...state1,
            globalPhraseBooksData: global,
            phraseBooksData: [
              ...company,
              {
                company: "ce92941c-f92c-11e9-8ffa-0242ac110014",
                name: "new",
                phrases: [],
                slug: "new",
                uuid: "66d770d8-31ba-11ea-a4c3-0242ac110008"
              }
            ],
            loadingState: false
          });
        }, 1000);
      } else {
        setTimeout(() => {
          setState1({
            ...state1,
            globalPhraseBooksData: global,
            phraseBooksData: company,
            loadingState: false
          });
        }, 1000);
      }
      /* end mock */
    } catch (err) {}
  };

  useEffect(() => {
    getAllData();
  }, []);

  const openCreateModal = () => {
    setState1({ ...state1, openModal: true });
  };
  const closeCreateModal = () => {
    setState1({ ...state1, openModal: false });
  };
  const setActiveData = (data: any) => {
    setState1({ ...state1, activeData: data });
  };
  const saveActiveSegment = (data: any) => {
    //API request here for updating activeSegments
    setState1({ ...state1, activePhraseBookData: data });
  };

  //TEMPORARY METHOD FOR ADDING PHRASEBOOK
  const addNewPhraseBook = () => {
    //   document.cookie = "add=true";
  };
  return (
    <div className="p-normal c-default">
      <React.Fragment>
        {state1.loadingState ? (
          <TableLoader />
        ) : (
          <div className={classes.container}>
            <DNDCards
              card1Title="Active phrase books"
              card2Title="Global phrase books"
              card3Title="Company phrase books"
              card1Data={state1.activePhraseBookData}
              card2Data={state1.globalPhraseBooksData}
              card3Data={state1.phraseBooksData}
              setActiveData={setActiveData}
              addButton3={true}
              addFunction3={openCreateModal}
              saveActiveSegment={saveActiveSegment}
            />

            {props.company !== null && (
              <CreatePhraseBook
                open={state1.openModal}
                refresh={getAllData}
                companySlug={state.campaignDetails.company}
                onClose={closeCreateModal}
                openModal={openCreateModal}
                addFunction={addNewPhraseBook} //temporary for adding new phrase
              />
            )}
          </div>
        )}
      </React.Fragment>
    </div>
  );
};

export default PhraseBooks;
