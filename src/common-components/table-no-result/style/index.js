import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		fontFamily: theme.typography.fontFamily,
		border: 'solid 1px #F1F1F1'
	},
	header: {
		color: theme.palette.primary.contrastText,
		height: 190,
		backgroundColor: '#7c8a97',
		'& h1': {
			fontSize: 48,
			fontWeight: theme.typography.fontWeightLight
		}
	},
	message: {
		fontColor: theme.palette.text.primary,
		'& p': {
			color: '#7c8a97',
			marginTop: 40
		},
		height: 560
	},
	icon: {
		color: theme.palette.primary.contrastText,
		width: 60,
		height: 60,
		padding: '0 23px'
	},
	mainMessage: {
		fontSize: 18,
		fontWeight: 550,
		color: '#7c8a97'
	},
	subMessage: {
		fontSize: 16,
		color: '#777',

		fontWeight: 540
	},
	subMessageContainer: {
		paddingTop: 15,
		width: 350,
		textAlign: 'center'
	},
	buttonContainer: {
		paddingTop: 25
	}
}));

export { useStyles };
