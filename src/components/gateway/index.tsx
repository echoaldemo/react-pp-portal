import React, { useEffect, useState } from "react";
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

const Gateway: React.FC<{ history: any }> = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [hide, setHide] = useState(false);
  const [campaigns, setCampaigns] = useState<Array<Campaign>>([]);

  useEffect(() => {
    let mock: any = [];
    for (let i = 0; i < 20; i++) {
      mock.push({ name: `Demo ${i}`, uuid: `${i}`, slug: `slug-${i}` });
    }
    setCampaigns(mock);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Container>
      <SEO title="Gateway" />
      <span>
        <Tooltip title="Manage Settings" placement="right">
          <IconButton>
            <Settings onClick={() => history.push("/manage/users")} />
          </IconButton>
        </Tooltip>
        <h1>Welcome to the Perfect Pitch Portal</h1>
        <Tooltip title="Logout" placement="right">
          <IconButton>
            <ExitToApp onClick={() => alert("logout!")} />
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
              onChange={(e) => setSearchText(e.target.value)}
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
              campaigns={campaigns}
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
