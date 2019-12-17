import React from "react";
import { useStyles } from "./styles/NavTabs.style";

interface Props {
  tabnames: Array<Obj>;
}
interface Obj {
  [index: string]: any;
}

const NavTabs: React.FC<Props> = ({ tabnames }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.tabsContainer}>
        {tabnames.map((tab: Obj, i: number) => (
          <div
            key={i}
            className={tab.active ? classes.activeMenu : classes.inactiveMenu}
            onClick={tab.onClickFn}
          >
            <span style={{ padding: "0 20px" }}>{tab.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

NavTabs.defaultProps = {
  tabnames: []
} as Partial<Props>;

export { NavTabs };
