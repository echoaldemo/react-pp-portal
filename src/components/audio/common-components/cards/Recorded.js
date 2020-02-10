import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Grid,
	LinearProgress,
	Typography,
	IconButton,
	TextField,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core';
import RecordIcon from '@material-ui/icons/RadioButtonChecked';
import PlayAudioIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../common-styles/cardStyles';
import RerecordAudio from '../rerecord-audio';

class Record extends Component {
	constructor() {
		super();

		this.state = {
			showSearch: false,
			searchValue: null,
			id: '',
			data: '',
			key: '',
			rerecordAudioModal: false
		};
	}
	openRerecord = (val, data) => {
		this.setState({
			rerecordAudioModal: true,
			id: val,
			data: data
		});
	};
	closeRerecord = () => {
		this.setState({
			rerecordAudioModal: false
		});
	};
	render() {
		const { classes } = this.props;
		let dialog;
		return (
			<Card id="recorded-card" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					classes={{ title: classes.cardTitle }}
					style={{ borderTop: '5px solid #a5c556' }}
					title={`Recorded (${this.props.recorded.length})`}
					action={
						this.props.recorded.length > 0 ? (
							<IconButton
								aria-label="settings"
								onClick={() => this.setState({ showSearch: !this.state.showSearch })}
							>
								<SearchIcon />
							</IconButton>
						) : null
					}
				/>
				<CardContent style={{ padding: 0 }}>
					{/* WITH DATA START */}
					{this.props.recorded.length > 0 ? (
						<div className={this.state.showSearch ? classes.showSearchDiv : classes.showSearchDivHidden}>
							<TextField
								id="standard-bare"
								margin="normal"
								placeholder="Search dialog"
								className={classes.textField}
								onChange={(e) => this.setState({ searchValue: e.target.value })}
								value={this.state.searchValue}
							/>
							<div style={{ marginTop: '21px' }}>
								<Link className={classes.cancel} onClick={() => this.setState({ searchValue: '' })}>
									Cancel
								</Link>
							</div>
						</div>
					) : null}
					{this.props.recorded.length > 0 ? (
						<div className={classes.scroll}>
							<Table stickyHeader={true}>
								<TableBody stripedRows>
									{this.props.recorded.map((row, i) => {
										if (this.state.searchValue) {
											if (row.text) {
												dialog = row.text;
											}
											else {
												dialog = row.phrase;
											}
											if (
												dialog.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
												row.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
											) {
												return (
													<TableRow
														key={i}
														style={
															i % 2 ? { background: '#fbfbfb' } : { background: 'white' }
														}
													>
														<TableCell align="left">
															<Grid
																container
																direction="column"
																style={{ position: 'relative' }}
															>
																<Grid item>
																	<span className={classes.recordName}>
																		{row.name}
																	</span>
																	<span
																		id={`rerecordBtn-${i}`}
																		onClick={() => this.openRerecord(row.name, row)}
																		className={classes.rerecord}
																	>
																		<RecordIcon className={classes.recordIcon} />
																		{'Rerecord'}
																	</span>
																</Grid>
																<Grid
																	item
																	style={{ marginTop: '5%', paddingLeft: '5%' }}
																>
																	{(() => {
																		if (
																			row.uuid === this.state.key ||
																			row.key === this.state.key
																		) {
																			if (this.props.isLoading) {
																				return (
																					<div className={classes.hideLoader}>
																						<LinearProgress
																							className={
																								classes.linearLoader
																							}
																						/>
																					</div>
																				);
																			}
																		}
																		if (this.props.audio.length !== 0) {
																			if (
																				this.props.audio.audio.uuid === row.uuid
																			) {
																				if (row.key) {
																					if (
																						this.props.audio.audio.key ===
																						row.key
																					) {
																						return (
																							<audio
																								controls
																								preload="false"
																								className={
																									classes.resPlayer
																								}
																							>
																								<source
																									src={
																										this.props.audio
																											.original_url
																									}
																								/>
																							</audio>
																						);
																					}
																					else {
																						return (
																							<div
																								style={{
																									display: 'grid',
																									gridTemplateColumns:
																										'1fr 9fr'
																								}}
																							>
																								<PlayAudioIcon
																									className={
																										classes.playIcon
																									}
																									onClick={() => {
																										this.props.showLoader(
																											'recorded'
																										);
																										this.props.playAudio(
																											this.props
																												.version,
																											this.props
																												.voice,
																											row.key,
																											row.uuid
																												? row.uuid
																												: row.key
																										);
																										this.setState({
																											key: row.uuid
																												? row.uuid
																												: row.key
																										});
																										this.props.removeAudio();
																									}}
																								/>
																								<Typography
																									variant="caption"
																									style={{
																										fontSize: 14
																									}}
																								>
																									Click to play audio
																								</Typography>
																							</div>
																						);
																					}
																				}
																				else {
																					return (
																						<audio
																							controls
																							preload="false"
																							className={
																								classes.resPlayer
																							}
																						>
																							<source
																								src={
																									this.props.audio
																										.original_url
																								}
																							/>
																						</audio>
																					);
																				}
																			}
																			else {
																				return (
																					<div
																						style={{
																							display: 'grid',
																							gridTemplateColumns:
																								'1fr 9fr'
																						}}
																					>
																						<PlayAudioIcon
																							className={classes.playIcon}
																							onClick={() => {
																								this.props.showLoader(
																									'recorded'
																								);
																								this.props.playAudio(
																									this.props.version,
																									this.props.voice,
																									row.key,
																									row.uuid
																										? row.uuid
																										: row.key
																								);
																								this.setState({
																									key: row.uuid
																										? row.uuid
																										: row.key
																								});
																								this.props.removeAudio();
																							}}
																						/>
																						<Typography
																							variant="caption"
																							style={{ fontSize: 14 }}
																						>
																							Click to play audio
																						</Typography>
																					</div>
																				);
																			}
																		}
																		else {
																			return (
																				<div
																					style={{
																						display: 'grid',
																						gridTemplateColumns: '1fr 9fr'
																					}}
																				>
																					<PlayAudioIcon
																						className={classes.playIcon}
																						onClick={() => {
																							this.props.showLoader(
																								'recorded'
																							);
																							this.props.playAudio(
																								this.props.version,
																								this.props.voice,
																								row.key,
																								row.uuid
																									? row.uuid
																									: row.key
																							);
																							this.setState({
																								key: row.uuid
																									? row.uuid
																									: row.key
																							});
																							this.props.removeAudio();
																						}}
																					/>
																					<Typography
																						variant="caption"
																						style={{
																							fontSize: 14,
																							marginTop: 1
																						}}
																					>
																						Click to play audio
																					</Typography>
																				</div>
																			);
																		}
																	})()}
																</Grid>
															</Grid>
														</TableCell>
													</TableRow>
												);
											}
										}
										else {
											return (
												<TableRow
													key={i}
													style={i % 2 ? { background: '#fbfbfb' } : { background: 'white' }}
												>
													<TableCell align="left">
														<Grid
															container
															direction="column"
															style={{ position: 'relative' }}
														>
															<Grid item>
																<span className={classes.recordName}>{row.name}</span>
																<span
																	id={`rerecordBtn-${i}`}
																	onClick={() => this.openRerecord(row.name, row)}
																	className={classes.rerecord}
																>
																	<RecordIcon className={classes.recordIcon} />
																	{'Rerecord'}
																</span>
															</Grid>
															<Grid item style={{ marginTop: '5%', paddingLeft: '5%' }}>
																{(() => {
																	if (
																		row.uuid === this.state.key ||
																		row.key === this.state.key
																	) {
																		if (this.props.isLoading) {
																			return (
																				<div className={classes.hideLoader}>
																					<LinearProgress className={classes.linearLoader} />{' '}
																				</div>
																			);
																		}
																	}
																	if (this.props.audio.length !== 0) {
																		if (this.props.audio.audio.uuid === row.uuid) {
																			if (row.key) {
																				if (
																					this.props.audio.audio.key ===
																					row.key
																				) {
																					return (
																						<audio
																							controls
																							preload="false"
																							className={
																								classes.resPlayer
																							}
																						>
																							<source
																								src={
																									this.props.audio
																										.original_url
																								}
																							/>
																						</audio>
																					);
																				}
																				else {
																					return (
																						<div
																							style={{
																								display: 'grid',
																								gridTemplateColumns:
																									'1fr 9fr'
																							}}
																						>
																							<PlayAudioIcon
																								className={
																									classes.playIcon
																								}
																								onClick={() => {
																									this.props.showLoader(
																										'recorded'
																									);
																									this.props.playAudio(
																										this.props
																											.version,
																										this.props
																											.voice,
																										row.key,
																										row.uuid
																											? row.uuid
																											: row.key
																									);
																									this.setState({
																										key: row.uuid
																											? row.uuid
																											: row.key
																									});
																									this.props.removeAudio();
																								}}
																							/>
																							<Typography
																								variant="caption"
																								style={{ fontSize: 14 }}
																							>
																								Click to play audio
																							</Typography>
																						</div>
																					);
																				}
																			}
																			else {
																				return (
																					<audio
																						controls
																						preload="false"
																						className={classes.resPlayer}
																					>
																						<source
																							src={
																								this.props.audio
																									.original_url
																							}
																						/>
																					</audio>
																				);
																			}
																		}
																		else {
																			return (
																				<div
																					style={{
																						display: 'grid',
																						gridTemplateColumns: '1fr 9fr'
																					}}
																				>
																					<PlayAudioIcon
																						className={classes.playIcon}
																						onClick={() => {
																							this.props.showLoader(
																								'recorded'
																							);
																							this.props.playAudio(
																								this.props.version,
																								this.props.voice,
																								row.key,
																								row.uuid
																									? row.uuid
																									: row.key
																							);
																							this.setState({
																								key: row.uuid
																									? row.uuid
																									: row.key
																							});
																							this.props.removeAudio();
																						}}
																					/>
																					<Typography
																						variant="caption"
																						style={{ fontSize: 14 }}
																					>
																						Click to play audio
																					</Typography>
																				</div>
																			);
																		}
																	}
																	else {
																		return (
																			<div
																				style={{
																					display: 'grid',
																					gridTemplateColumns: '1fr 9fr'
																				}}
																			>
																				<PlayAudioIcon
																					className={classes.playIcon}
																					onClick={() => {
																						this.props.showLoader(
																							'recorded'
																						);
																						this.props.playAudio(
																							this.props.version,
																							this.props.voice,
																							row.key,
																							row.uuid
																								? row.uuid
																								: row.key
																						);
																						this.setState({
																							key: row.uuid
																								? row.uuid
																								: row.key
																						});
																						this.props.removeAudio();
																					}}
																				/>
																				<Typography
																					variant="caption"
																					style={{
																						fontSize: 14,
																						marginTop: 1
																					}}
																				>
																					Click to play audio
																				</Typography>
																			</div>
																		);
																	}
																})()}
															</Grid>
														</Grid>
													</TableCell>
												</TableRow>
											);
										}
										return null;
									})}
								</TableBody>
							</Table>
						</div>
					) : (
						<Grid container>
							<Grid item sm={12} xs={12} className={classes.noAudioCon}>
								<Typography className={classes.noAudioText} gutterBottom>
									No recorded audio
								</Typography>
							</Grid>
						</Grid>
					)}
				</CardContent>
				<RerecordAudio
					rerecordAudioModal={this.state.rerecordAudioModal}
					rerecordAudioClose={this.closeRerecord}
					rerecordAudio={this.props.rerecordAudio}
					data={this.state.data}
					id={this.state.id}
					version={this.props.version}
					voice={this.props.voice}
				/>
			</Card>
		);
	}
}

export default withStyles(styles)(Record);
