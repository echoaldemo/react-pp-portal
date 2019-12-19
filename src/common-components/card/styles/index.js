import { makeStyles } from "@material-ui/styles";
import styled from "styled-components";

const cardBody = makeStyles(() => ({
  cardBody: {
    height: 500,
    backgroundColor: "#fafafa",

    borderTop: 0,
    maxHeight: 500,
    overflow: "auto"
  }
}));

const cardHeader = {
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
    fontWeight: 600,
    color: "#666"
  },
  searchWrapper: {
    display: "flex",
    border: "solid 1px #eee",
    justifyContent: "space-between"
  },
  searchContainer: {
    width: "98%"
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

const customCard = {
  cardWrapper: { border: "solid 1px #F1F1F1" }
};

const NoResult = styled.div`
  display: flex;
  justify-content: center;
  height: 500px;
  align-items: center;
  background-color: #fafafa;
`;

const StyledSpan = styled.span`
  color: #888;
  font-size: 17px;
`;

export { cardBody, cardHeader, customCard, NoResult, StyledSpan };
