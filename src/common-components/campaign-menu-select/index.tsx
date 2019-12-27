import React from "react";
import {
  Grid,
  Typography,
  Popover,
  ListItem,
  Divider,
  Collapse
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useStyles } from "./styles/CampaignMenuSelect.style";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  options: Array<Object>;
}
interface Obj {
  [index: string]: any;
}

const CampaignMenuSelect: React.FC<Props> = ({ title, options }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [collapse, setCollapse] = React.useState<Obj>({});
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const tmp: Obj = {};
    options &&
      options.forEach((opt: Obj) => {
        if (opt["sublinks"]) {
          tmp[opt.id] = false;
        }
      });
    setCollapse(tmp);
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCollapse = (label: string) => {
    setCollapse({
      ...collapse,
      [label]: !collapse[label]
    });
  };

  return (
    <div>
      <Grid container>
        <Grid item className={classes.middle}>
          <Typography className={open ? classes.titleClicked : classes.title}>
            {title}
          </Typography>
        </Grid>
        <Grid item className={classes.middle}>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon htmlColor={open ? "#1194f6" : "#444851"} />
          </IconButton>
          <Popover
            id="long-menu"
            classes={{ paper: classes.popover }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div className={classes.paper}>
              {options && (
                <div
                  style={{
                    margin: "10px 0",
                    minHeight: `${40 * options.length}px`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly"
                  }}
                >
                  {options.map((opt: Obj, i: number) => {
                    if (!Object.keys(opt).length) {
                      return (
                        <Divider key={i} classes={{ root: classes.divider }} />
                      );
                    } else {
                      if (opt.sublinks) {
                        return (
                          <div key={i}>
                            <button
                              className={classes.button}
                              onClick={e => handleCollapse(opt.id)}
                            >
                              {opt.name}
                              {collapse[opt.id] ? (
                                <ExpandLessIcon />
                              ) : (
                                <ExpandMoreIcon />
                              )}
                            </button>
                            <Collapse
                              in={collapse[opt.id]}
                              style={{ marginLeft: "7.5%" }}
                            >
                              {opt.sublinks.map((sub: Obj, a: number) => (
                                <ListItem key={a}>
                                  <Link to={sub.url} className={classes.link}>
                                    <Typography className={classes.subtitle}>
                                      {sub.name}
                                    </Typography>
                                  </Link>
                                </ListItem>
                              ))}
                            </Collapse>
                          </div>
                        );
                      } else {
                        return (
                          <Link to={opt.url} className={classes.link} key={i}>
                            <button className={classes.button}>
                              {opt.name}
                            </button>
                          </Link>
                        );
                      }
                    }
                  })}
                </div>
              )}
            </div>
          </Popover>
        </Grid>
      </Grid>
    </div>
  );
};

CampaignMenuSelect.defaultProps = {
  title: "<Menu Name>",
  options: [
    {
      name: "<Options here>",
      id: "option",
      sublinks: null,
      url: "#"
    }
  ]
} as Partial<Props>;

export { CampaignMenuSelect };
