import React, { useEffect, useState, useContext } from "react";
import {
  IconButton,
  InputBase,
  Tooltip,
  CircularProgress,
  Collapse
} from "@material-ui/core";
import {
  Clear,
  ExitToApp,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
  Settings
} from "@material-ui/icons";
import SEO from "utils/seo";
import Content from "./components/Content";
import { Card, Container, Header } from "./style";
import { Campaign } from "./types";
import { logout } from "auth/controllers/controller";
import { loginChecker } from "auth/services/authService";
import { store } from "contexts/ManageComponent";
import { get } from "utils/api";

const Gateway: React.FC<{ history: any }> = ({ history }) => {
  const { state, dispatch } = useContext(store);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!loginChecker()) {
      history.push("/");
    }

    get("/identity/campaign/list/").then((res: any) => {
      setLoading(false);

      dispatch({
        type: "manage-campaigns",
        payload: {
          campaignList: res.data
        }
      });
      setLoading(false);
    });
  }, [history, dispatch]);

  return (
    <Container>
      <SEO title="Gateway" />
      <span>
        <Tooltip title="Manage Settings" placement="right">
          <IconButton onClick={() => history.push("/manage/users")}>
            <Settings />
          </IconButton>
        </Tooltip>
        <h1>Welcome to the Perfect Pitch Portal</h1>
        <Tooltip title="Logout" placement="right">
          <IconButton onClick={() => logout()}>
            <ExitToApp />
          </IconButton>
        </Tooltip>
      </span>
      <Header>
        {search ? (
          <span>
            <Search />
            <InputBase
              placeholder="Search for Campaigns..."
              inputProps={{ "aria-label": "naked" }}
              autoFocus
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </span>
        ) : (
          <h2>Campaigns</h2>
        )}
        <span>
          {hide ? (
            <KeyboardArrowUp onClick={() => setHide(false)} />
          ) : (
            <>
              {search ? (
                <Clear
                  onClick={() => {
                    setSearch(false);
                    setSearchText("");
                  }}
                />
              ) : (
                <>
                  <Search onClick={() => setSearch(true)} />
                  <KeyboardArrowDown onClick={() => setHide(true)} />
                </>
              )}
            </>
          )}
        </span>
      </Header>
      <Card>
        {loading ? (
          <span>
            <h6>Loading...</h6>
            <CircularProgress thickness={5} size={45} />
          </span>
        ) : (
          <Collapse in={!hide}>
            <Content
              campaigns={state.campaigns.length !== 0 ? state.campaigns : []}
              searchText={searchText}
              history={history}
            />
          </Collapse>
        )}
      </Card>
    </Container>
  );
};

export default Gateway;
