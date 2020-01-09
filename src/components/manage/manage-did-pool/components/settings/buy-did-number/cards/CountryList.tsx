import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Grid } from '@material-ui/core'

//Tables
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import styles from './CardStyle'
import { Close } from '@material-ui/icons'

interface Props {
	classes: any
	queue: Array<string>
	handleRemove: Function
}

class CountryList extends Component<Props, {}> {
	render() {
		const { classes, queue, handleRemove } = this.props
		return (
			<Card className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					classes={{ title: classes.cardTitle }}
					title={
						queue.length === 1
							? `${queue.length} item selected`
							: `${queue.length} items selected`
					}
				/>
				<CardContent style={{ padding: 0 }}>
					{/* WITH DATA START */}
					{queue.length !== 0 ? (
						<div className={classes.scroll} style={{ height: 300 }}>
							<Table stickyHeader={true}>
								<TableBody>
									{queue.map((country: string, i: number) => {
										return (
											<TableRow key={i}>
												<TableCell align="left" className={classes.name}>
													{country}
												</TableCell>

												<TableCell
													align="right"
													className={classes.name}
													style={{ padding: '0px 21px' }}
												>
													<Close
														onClick={() => handleRemove(country)}
														style={{ fontSize: 18, cursor: 'pointer' }}
													/>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</div>
					) : (
							<Grid container>
								<Grid item sm={12} xs={12} className={classes.noAudioCon}></Grid>
							</Grid>
						)}
					{/* NO AUDIO END */}
				</CardContent>
			</Card>
		)
	}
}

export default withStyles(styles)(CountryList)
