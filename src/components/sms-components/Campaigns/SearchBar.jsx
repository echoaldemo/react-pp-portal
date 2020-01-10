import React from 'react';

import { TextField, InputAdornment, IconButton, Icon
    } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Styles/SearchBar.styles'

const useStyles = makeStyles(styles);

export default function SearchBar(props) {
    const classes = useStyles();
    return (<TextField fullWidth
        data-cy-search-bar
        name='search'
        margin="dense"
        label="Search campaigns"
        value={props.input}
        inputRef={props.inRef}
        onChange={props.search}
        className={classes.textField}
        InputProps={{
            endAdornment:
            <InputAdornment position="end">
                <IconButton className={classes.searchIcon}
                    onClick={props.sub} size="small">
                    <Icon>search</Icon>
                </IconButton>
            </InputAdornment>,
        }}
    />)
}
