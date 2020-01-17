import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './style'
import { Call, Add } from '@material-ui/icons'
import { Button } from '@material-ui/core'

interface ChangeServerProps {
	noHeader?: boolean
	mainMessage: string
	subMessage?: string
	renderButton: React.ReactNode
	icon?: React.ReactNode
	headerText: string
	headerStyle? : any
	containerStyle? : any
}

const TableNoResult: React.FC<ChangeServerProps> = ({
	noHeader,
	mainMessage,
	subMessage,
	renderButton,
	icon,
	headerText,
	headerStyle,
	containerStyle,
}) => {
	const classes = useStyles()
	return (
		<>
			<Grid container direction="column" className={classes.root}>
				{!noHeader ? (
					<Grid
						alignItems="center"
						className={classes.header}
						container
						justify="center"
						style={{
							...headerStyle
						}}
					>
						<Grid
							item
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'row'
							}}
						>
							{icon}
							<h1 style={{ marginLeft: '22px' }}>{headerText} </h1>
						</Grid>
					</Grid>
				) : null}
				<Grid
					alignItems="center"
					className={classes.message}
					container
					direction="column"
					justify="center"
					style={{
						...containerStyle
					}}	
				>
					<Grid item>
						<span className={classes.mainMessage}>{mainMessage}</span>
					</Grid>

					<Grid item className={classes.subMessageContainer}>
						<span className={classes.subMessage}>{subMessage}</span>
					</Grid>
					<Grid item className={classes.buttonContainer}>
						{renderButton}
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

TableNoResult.defaultProps = {
	noHeader: false,
	mainMessage: 'Main Empty Message',
	subMessage: 'Sub Empty Message',
	headerText: 'Sample Header',
	renderButton: (
		<Button>
			<Add /> Sample Button
    </Button>
	)
} as Partial<ChangeServerProps>

export { TableNoResult }
