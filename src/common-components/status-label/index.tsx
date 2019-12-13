import React from "react";
import { useStyles } from "./styles/StatusLabel.style";

interface Props {
  status: Boolean;
  style?: Object;
}
const StatusLabel: React.FC<Props> = ({ status, style }) => {
  const classes = useStyles(style);
  return (
    <>
      {status ? (
        <div
          className={classes.containerStyle}
          style={{ background: "#6698c7" }}
        >
          <span className={classes.labelStyle}>Active</span>
        </div>
      ) : (
        <div
          className={classes.containerStyle}
          style={{ background: "#ff504d" }}
        >
          <span className={classes.labelStyle}>Inactive</span>
        </div>
      )}
    </>
  );
};

StatusLabel.defaultProps = {
  status: true
} as Partial<Props>;

export { StatusLabel };
