import React from 'react';
import Slide from '@material-ui/core/Slide';
import Snackbar from "@material-ui/core/Snackbar";

function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
}

export default function SnackNotif(props) {

    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={props.snackbar}
            onClose={props.handleClose}
            message={<span>{props.message}</span>}
        />
    )
}