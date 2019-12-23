import React from 'react';
import { createMuiTheme, makeStyles, MuiThemeProvider } from '@material-ui/core/styles';
import { HeadMenu } from 'common-components';

const theme = createMuiTheme({
	overrides: {
		MuiMenu: {
			paper: {
				maxHeight: 300
			}
		},
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: `1px solid rgba(238, 238, 238, 0.99)`
				},
				'&:hover:not($disabled):before': {
					borderBottom: '1px solid #1194f6'
				},
				'&:after': {
					borderBottom: '1px solid #1194f6'
				}
			}
		},

		MuiSelect: {
			select: {
				'&:focus': {
					backgroundColor: 'none'
				}
			}
		},
		MuiInputLabel: {
			root: {
				'&$focused': {
					color: '#1194f6'
				}
			}
		},
		MuiSwitch: {
			track: {
				'&:active': {
					backgroundColor: 'red'
				}
			}
			// " #1194f6"
		}
	}
});
const useStyles = makeStyles((theme) => ({
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: 'auto',
		background: '#fcfcfc'
	},
	container: {
		background: '#fcfcfc',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(2),
		margin: '0 auto',
		width: '80%'
	},
	headerLink: {
		paddingBottom: theme.spacing(4),
		width: '30%',
		display: 'inline-block'
	}
}));

export default function Manage(props: any) {
	return <div>{props.children}</div>;
}
