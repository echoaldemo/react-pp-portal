import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    root: {
        backgroundColor: '#d88931'
    }
});

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

export default function SnackNotif(props) {
	const classes = useStyles();
    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            ContentProps={{classes: {root: classes.root}}}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={props.snackbar}
            onClose={props.handleClose}
            message={<span>{props.message}</span>}
        />
    )
}