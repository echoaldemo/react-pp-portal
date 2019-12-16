import React from "react";
import { Typography } from "@material-ui/core";
import { createMemoryHistory } from "history";
import { StatusLabel, BackButton } from "common-components";
import { useStyles } from "./styles/NavTabs.style";

interface Props {
  tabnames: Array<Obj>;
  data: Obj;
  history: Obj;
  back: Obj;
  loadingState: Boolean;
}
interface Obj {
  [index: string]: any;
}

const history = createMemoryHistory();

const NavTabs: React.FC<Props> = ({
  tabnames,
  data,
  history,
  back,
  loadingState
}) => {
  const classes = useStyles();

  const handleClick = (tab: Obj) => {
    if (history) {
      history.push({
        pathname: `${tab.path}/${data.slug}/${data.uuid}${tab.url}`,
        state: {
          company: data
        }
      });
    }
  };

  return (
    <>
      <Typography style={{ cursor: "pointer" }}>
        <BackButton
          text={back.name}
          to={back.url}
          backFn={() => console.log("")}
        />
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "25px 0",
          fontFamily: "Arial"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "30%",
            padding: "0 3px 0 0"
          }}
        >
          {loadingState ? (
            <>
              <Typography
                style={{ color: "#444851", fontSize: "20px", marginRight: 25 }}
              >
                Loading..
              </Typography>
            </>
          ) : (
            <>
              <Typography
                style={{ color: "#444851", fontSize: "24px", marginRight: 25 }}
              >
                {data.name}
              </Typography>
              <StatusLabel status={data.status} />
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: "70%",
            justifyContent: "flex-end"
          }}
        >
          {tabnames.map((tab: Obj) => (
            <div
              key={tab.name}
              className={
                history.location.pathname ===
                `${tab.path}/${data.slug}/${data.uuid}${tab.url}`
                  ? classes.activeMenu
                  : classes.inactiveMenu
              }
              onClick={e => handleClick(tab)}
            >
              {tab.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

NavTabs.defaultProps = {
  tabnames: [],
  data: {
    name: "<data name>",
    active: true,
    slug: "one",
    uuid: "1"
  },
  history: history,
  back: {
    name: "Back to dashboard",
    url: "#"
  },
  loadingState: false
} as Partial<Props>;

export { NavTabs };
