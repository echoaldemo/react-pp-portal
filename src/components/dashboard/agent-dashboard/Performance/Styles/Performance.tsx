const styles: any = {
	paper: {
		width: '100%',
		height: 'auto',
		borderRadius: 3,
		boxShadow: '0 0 6px 1px rgba(155, 155, 155, 0.18)',
		backgroundColor: '#ffffff',
		padding: '16px 0',
		margin: '25px auto',
		'@media(max-width:768px)': {
			width: '100%',
			display: 'flex',
			flexDirection: 'column'
		}
	},
	fieldsContainer: {
		width: 1480,
		'@media(max-width:1440px)': {
			width: 1150
		},
		'@media(max-width:768px)': {
			width: 'auto'
		}
	},
	headerWrap: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	performanceMargin: {
		marginLeft: 24,
		marginBottom: 24
	},
	agentTypo: {
		fontFamily: 'Roboto',
		fontSize: '22pt',
		color: '#444851',
		verticalAlign: 'top'
	},
	performanceHeader: {
		width: 225,
		height: 21,
		fontFamily: 'Roboto, Helvetica, sans-serif',
		fontSize: 18,
		color: '#bbbbbb',
		marginBottom: 14
	},
	withBorderLeft: {
		borderLeft: 'solid 1px #eeeeee',
		display: 'inline-block',
		paddingLeft: 24
	},
	noBorderLeft: {
		display: 'inline-block',
		paddingLeft: 24
	},
	header: {
		height: 16,
		fontFamily: 'Roboto, Helvetica, sans-serif',
		fontSize: 14,
		fontWeight: 500,
		color: '#bbbbbb',
		padding: 0,
		marginTop: 0
	},
	icon: {
		marginRight: 15,
		marginBottom: -5,
		width: 40,
		height: 40,
		fontSize: 40,
		fontWeight: 600,
		color: '#f89523'
	},
	value: {
		width: 87,
		height: 40,
		fontFamily: 'Roboto, Helvetica, sans-serif',
		fontSize: 32,
		fontWeight: 600,
		color: '#7c8a97',
		marginRight: 15,
		verticalAlign: 'bottom'
	}
}

export default styles
