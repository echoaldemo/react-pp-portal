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
            onClick={tab.onClickFn}
            className={tab.active ? classes.activeMenu : classes.inactiveMenu}
          >
            <span className={classes.text}>{tab.name}</span>
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
