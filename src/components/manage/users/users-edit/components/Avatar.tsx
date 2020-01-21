import React from "react";
import { useStyles } from "../styles";
export default ({ image }: { image: any }) => {
	const classes = useStyles();
	return (
		<div className={classes.imageContainer}>
			<img className={classes.image} src={image} alt='avatar' />
		</div>
	);
};
