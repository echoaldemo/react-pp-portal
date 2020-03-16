/* eslint-disable */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { HeadMenu } from "common-components";

const useStyles = makeStyles(theme => ({
<<<<<<< HEAD
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "auto",
    background: "#fcfcfc"
  },
  container: {
    background: "#fcfcfc",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    margin: "0 auto",
    width: "80%"
  },
  headerLink: {
    paddingBottom: theme.spacing(4),
    width: "30%",
    display: "inline-block"
  }
}));

export default function Manage(props: any) {
  const classes = useStyles({});
  return (
    <React.Fragment>
      <HeadMenu {...props} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>{props.children}</div>
      </main>
    </React.Fragment>
  );
=======
	//appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "auto",
		background: "#fcfcfc"
	},
	container: {
		background: "#fcfcfc",
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(2),
		margin: "0 auto",
		width: "80%"
	},
	headerLink: {
		paddingBottom: theme.spacing(4),
		width: "30%",
		display: "inline-block"
	}
}));

export default function Manage(props: any) {
	const classes = useStyles({});
	return (
		<React.Fragment>
			<HeadMenu {...props} />
			<main className={classes.content}>
				<div style={{marginTop: 80}} />
				<div style={{marginBottom: 40}} className={classes.container}>{props.children}</div>
			</main>
		</React.Fragment>
	);
>>>>>>> 527b4f5ab2862cf524ec21341c6f6cf5a1359a38
}
