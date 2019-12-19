import React from "react";
import { cardBody as styles } from "../styles";

interface Props {
  classes: any;
  children: React.ReactNode;
}

const CardBody: React.FC<Props> = ({ children }) => {
  const classes = styles();
  return <div className={classes.cardBody}>{children}</div>;
};

export { CardBody };
