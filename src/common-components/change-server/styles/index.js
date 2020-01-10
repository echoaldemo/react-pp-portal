import { createMuiTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	text: {
		color: '#bbbbbb'
	},
	middle: {
		display: 'flex',
		alignItems: 'center'
	},
	border: {
		'&:before': {}
	}
}));
const materialTheme = createMuiTheme({
	overrides: {
		MuiSelect: {
			root: {
				color: '#444851'
			},
			select: {
				'&:focus': {
					backgroundColor: 'none'
				}
			}
		},
		MuiListItem: {
			button: {
				'&:hover': {
					backgroundColor: '#ffffff'
				}
			},
			root: {
				'&$selected': {
					color: 'rgb(95,125,152)',
					backgroundColor: '#ffffff',
					'&&:hover': {
						backgroundColor: '#ffffff'
					},
					'&&:active:after': {
						backgroundColor: '#ffffff'
					}
				}
			}
		},
		MuiInputBase: {
			root: {
				padding: '0 12px 0 15px',
				height: '40px',
				width: '168px',
				border: ' 1px solid #444851',
				borderRadius: 3
			}
		},
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: 'none'
				},
				'&::after': {
					borderBottom: 'none'
				},
				'&:hover:not(.Mui-disabled):before': {
					borderBottom: 'none'
				}
			}
		}
	}
});

export { useStyles, materialTheme };
