import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
	activeMenu: {
		width: '185px',
		height: '40px',
		background: '#f89523',
		color: '#ffffff',
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 500,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		textDecoration: 'none'
	},
	inactiveMenu: {
		width: '185px',
		height: '40px',
		background: '#EEEEEE',
		color: '#7C8A97',
		textAlign: 'center',
		fontSize: '14px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		margin: '0 0.5px',
		fontWeight: 500,
		textDecoration: 'none'
	},
	wrapper: {
		display: 'flex',
		borderRadius: 3,
		overflow: 'hidden',
		marginLeft: 20
	}
}))
export default function ({ tabs }: any) {
	const classes = useStyles()

	return (
		<div className={classes.wrapper}>
			{tabs.map((tab: any, i: number) =>
				!tab.active ? (
					<Link to={tab.path} key={i} className={classes.inactiveMenu}>
						{tab.name}
					</Link>
				) : (
						<div key={i} className={classes.activeMenu}>
							{tab.name}
						</div>
					)
			)}
		</div>
	)
}
