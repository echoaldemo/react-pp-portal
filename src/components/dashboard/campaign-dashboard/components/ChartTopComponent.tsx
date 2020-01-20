import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		height: 34
	},
	box: {
		width: 14,
		height: 14
	},
	text: {
		fontSize: 12,
		color: '#50555a'
	}
}))

const legends = [
	{ title: 'Work day', color: '#6698c7', width: 'auto' },
	{ title: 'Lunch/Break', color: '#f9aa4f', width: 'auto' },
	{ title: 'Billable session', color: '#44bd94', width: 'auto' }
]

export default function ChartTopComponent() {
	const classes = useStyles()

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				backgroundColor: '#eeeeee',
				alignItems: 'center',
				height: 50,
				paddingLeft: 18,
				color: '#444851'
			}}
		>
			<Typography>Date: Wed, Jan 16, 2019</Typography>
			<div style={{ display: 'flex' }}>
				{legends.map((legend, i) => (
					<div
						key={i}
						className={classes.container}
						style={{
							backgroundColor: '#fafafa',
							marginRight: '20px',
							padding: '0 10px',
							width: `${legend.width}`
						}}
					>
						<div
							className={classes.box}
							style={{
								marginRight: '9px',
								backgroundColor: `${legend.color}`
							}}
						></div>
						<Typography className={classes.text}>{legend.title}</Typography>
					</div>
				))}
			</div>
		</div>
	)
}
