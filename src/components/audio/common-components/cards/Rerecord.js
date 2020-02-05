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
	Dialog,
	Table,
	TableBody,
	TableCell,
	TableRow
} from '@material-ui/core';
import RecordIcon from '@material-ui/icons/RadioButtonChecked';

import PlayAudioIcon from '@material-ui/icons/PlayArrow';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../common-styles/cardStyles';
import DesktopAddNewVoice from '../record-new-voice';
import Loader from '../loader';
import Toast from '../toast';
import UndoAudio from '../undo-audio';

class Rerecord extends Component {
	constructor() {
		super();

		this.state = {
			showSearch: false,
			searchValue: '',
			undoModal: false,
			page: 0,
			rowsPerPage: 10,
			addNewVoiceModal: false,
			deleteAudioModal: false,
			rerecordAudioModal: false,
			undoAudioModal: false,
			anchorEl: null,
			open: false,
			searchPhrase: '',
			unrecordedName: '',
			id: null,
			data: [],
			audioName: '',
			dialog: '',
			key: '',
			uuid: '',
			selectedIndex: null,
			backDisabled: false,
			hasMic: null
		};
	}
	openUndo = () => {
		this.setState({
			undoModal: true
		});
	};
	closeUndo = () => {
		this.setState({
			undoModal: false
		});
	};
	handleClickWithName = (value, uuid, index) => {
		this.setState({
			unrecordedName: value,
			uuid: uuid,
			selectedIndex: index
		});
	};
	handleClickRecord = (val, data) => {
		this.setState({
			id: val,
			data: data
		});
	};
	setAudioDetails = (name, dialog, uuid) => {
		this.setState({
			unrecordedName: name,
			audioName: name,
			dialog: dialog,
			uuid: uuid
		});
	};
	setAudioDetails = (name, dialog, uuid) => {
		this.setState({
			unrecordedName: name,
			audioName: name,
			dialog: dialog,
			uuid: uuid
		});
	};
	handleBackButton = (index, row) => {
		if (index === 0) {
			this.setState({ backDisabled: true });
		}
		else {
			this.setState({ backDisabled: false });
		}
	};
	detectMic = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				// Code for success
				this.setState({ hasMic: true });
			})
			.catch((err) => {
				this.setState({ hasMic: false });
			});
	};
	recordAudioDialog = () => {
		this.setState({
			recordAudio: true,
			anchorEl: null
		});
	};
	recordAudioClose = () => {
		this.setState({
			recordAudio: false
		});
	};
	nextIndex = () => {
		this.setState({ selectedIndex: this.state.selectedIndex + 1 });
	};
	prevIndex = () => {
		this.setState({ selectedIndex: this.state.selectedIndex - 1 });
	};
	setNewAudioDetails = (key, audioName, dialog) => {
		this.setState({ uuid: key, audioName, dialog });
	};
	handleBackButton = (index) => {
		if (index === 0) {
			this.setState({ backDisabled: true });
		}
		else {
			this.setState({ backDisabled: false });
		}
	};
	closeModal = () => {
		this.setState(
			(prevState) => ({
				addNewVoiceModal: !prevState.addNewVoiceModal
			}),
			() => this.successfulUpload()
		);
	};
	successfulUpload = () => {
		this.setState({
			openToast: true,
			toastType: 'check',
			message: `Successfully uploaded`,
			vertical: 'top',
			horizontal: 'right'
		});
	};
	handleCloseToast = () => {
		this.setState({
			openToast: false
		});
	};
	render() {
		const { classes } = this.props;
		let dialog;
		return (
			<Card id="rerecord-card" className={classes.card}>
				<CardHeader
					className={classes.cardHeader}
					classes={{ title: classes.cardTitle }}
					style={{ borderTop: '5px solid #f89423' }}
					title={`Rerecord (${this.props.rerecord.length})`}
					action={
						this.props.rerecord.length > 0 ? (
							<IconButton
								id="searchBtn"
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
					{this.props.rerecord.length > 0 ? (
						<div
							id="searchDiv"
							className={
								this.state.showSearch ? (
									`${classes.showSearchDiv} showSearch`
								) : (
									`${classes.showSearchDivHidden} hiddenSearch`
								)
							}
						>
							<TextField
								id="rerecord-search"
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
					{this.props.rerecord.length > 0 ? (
						<div className={classes.scroll}>
							<Table stickyHeader={true}>
								<TableBody stripedRows id="rerecord-table">
									{this.props.rerecord.map((row, i) => {
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
																	<span
																		id={`rerecord-name-${i}`}
																		onClick={() => {
																			this.handleClickRecord(row.name, row);
																			this.handleClickWithName(
																				row.name,
																				row.uuid ? row.uuid : row.key,
																				i
																			);
																			this.setAudioDetails(
																				row.name,
																				row.phrase ? row.phrase : row.text,
																				row.uuid ? row.uuid : row.key
																			);
																			this.handleBackButton(i, row);
																			this.detectMic();
																			this.props.openAddNewVoiceModal(
																				null,
																				'Rerecord'
																			);
																		}}
																		className={classes.recordName}
																	>
																		{row.name}
																	</span>
																	<span
																		id={`undoBtn-${i}`}
																		onClick={() => {
																			this.handleClickRecord(row.name, row);
																			this.handleClickWithName(
																				row.name,
																				row.uuid ? row.uuid : row.key,
																				i
																			);
																			this.setAudioDetails(
																				row.name,
																				row.phrase ? row.phrase : row.text,
																				row.uuid ? row.uuid : row.key
																			);
																			this.openUndo();
																		}}
																		className={classes.rerecord}
																	>
																		<RecordIcon className={classes.recordIcon} />
																		{'Undo'}
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
																						<LinearProgress className={classes.linearLoader} />{' '}
																					</div>
																				);
																			}
																		}
																		if (this.props.preview.length !== 0) {
																			if (
																				this.props.preview.audio.uuid ===
																				row.uuid
																			) {
																				if (row.key) {
																					if (
																						this.props.preview.audio.key ===
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
																								{' '}
																								<source
																									src={
																										this.props
																											.preview
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
																											'rerecord'
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
																							{' '}
																							<source
																								src={
																									this.props.preview
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
																									'rerecord'
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
																								'rerecord'
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
																<span
																	id={`rerecord-name-${i}`}
																	onClick={() => {
																		this.handleClickRecord(row.name, row);
																		this.handleClickWithName(
																			row.name,
																			row.uuid ? row.uuid : row.key,
																			i
																		);
																		this.setAudioDetails(
																			row.name,
																			row.phrase ? row.phrase : row.text,
																			row.uuid ? row.uuid : row.key
																		);
																		this.handleBackButton(i, row);
																		this.detectMic();
																		this.props.openAddNewVoiceModal(
																			null,
																			'Rerecord'
																		);
																	}}
																	className={classes.recordName}
																>
																	{row.name}
																</span>
																<span
																	id={`undoBtn-${i}`}
																	onClick={() => {
																		this.handleClickRecord(row.name, row);
																		this.handleClickWithName(
																			row.name,
																			row.uuid ? row.uuid : row.key,
																			i
																		);
																		this.setAudioDetails(
																			row.name,
																			row.phrase ? row.phrase : row.text,
																			row.uuid ? row.uuid : row.key
																		);
																		this.openUndo();
																	}}
																	className={classes.rerecord}
																>
																	<RecordIcon className={classes.recordIcon} />
																	{'Undo'}
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
																	if (this.props.preview.length !== 0) {
																		if (
																			this.props.preview.audio.uuid === row.uuid
																		) {
																			if (row.key) {
																				if (
																					this.props.preview.audio.key ===
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
																							{' '}
																							<source
																								src={
																									this.props.preview
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
																										'rerecord'
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
																						{' '}
																						<source
																							src={
																								this.props.preview
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
																								'rerecord'
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
																							'rerecord'
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
									No audio to rerecord
								</Typography>
							</Grid>
						</Grid>
					)}
				</CardContent>
				<UndoAudio
					undoAudioModal={this.state.undoModal}
					undoAudioClose={this.closeUndo}
					undoAudio={this.props.addToRecorded}
					data={this.state.data}
					id={this.state.id}
					key={this.state.uuid}
				/>
				{/* ANCHOR Add new voice modal */}
				{/* this.props.mode === "prospect" ? ( */
				/* <AddNewVoiceModal
            addNewVoiceModal={this.props.addNewVoiceModal}
            openAddNewVoiceModal={this.props.openAddNewVoiceModal}
            handleAudio={this.props.handleAudio}
            audio={this.props.audio}
            removeAudio={this.props.removeAudio}
            fileName={this.props.fileName}
            voice={this.props.voice}
            version={this.props.version}
            slug={this.props.slug}
            file={this.props.file}
            uploadLoading={this.props.uploadLoading}
            displayData={this.props.displayData}
            upload={this.props.uploadAudio}
            campaigns={this.props.rerecord}
            //state
            recordAudio={this.state.recordAudio}
            unrecordedName={this.state.unrecordedName}
            recordAudioDialog={this.recordAudioDialog}
            recordAudioClose={this.recordAudioClose}
            audioName={this.state.audioName}
            dialog={this.state.dialog}
            audioKey={this.state.uuid}
            index={this.state.selectedIndex}
            hasMic={this.state.hasMic}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
            backButtonState={this.state.backDisabled}
            //end state
            nextIndex={this.nextIndex}
            prevIndex={this.prevIndex}
            setNewAudioDetails={this.setNewAudioDetails}
            handleBackButton={this.handleBackButton}
            closeModal={this.closeModal}
            successfulUpload={this.successfulUpload}
          /> */}
				{/*  ) : ( */}
				<Dialog
					id="add-voice-modal"
					disableBackdropClick
					disableEscapeKeyDown
					open={this.props.addNewVoiceModal}
					onClose={() => this.props.openAddNewVoiceModal(false)}
					maxWidth="lg"
					fullWidth={true}
				>
					{this.props.uploadLoading ? (
						<Loader />
					) : (
						<DesktopAddNewVoice
							addNewVoiceModal={this.props.addNewVoiceModal}
							openAddNewVoiceModal={this.props.openAddNewVoiceModal}
							handleAudio={this.props.handleAudio}
							//audio={this.props.audio}
							removeAudio={this.props.removeAudio}
							fileName={this.props.fileName}
							voice={this.props.voice}
							version={this.props.version}
							slug={this.props.slug}
							file={this.props.file}
							uploadLoading={this.props.uploadLoading}
							displayData={this.props.displayData}
							upload={this.props.uploadAudio}
							audio={this.props.rerecord}
							//state
							recordAudio={this.state.recordAudio}
							unrecordedName={this.state.unrecordedName}
							recordAudioDialog={this.recordAudioDialog}
							recordAudioClose={this.recordAudioClose}
							audioName={this.state.audioName}
							dialog={this.state.dialog}
							audioKey={this.state.uuid}
							index={this.state.selectedIndex}
							hasMic={this.state.hasMic}
							page={this.state.page}
							rowsPerPage={this.state.rowsPerPage}
							backButtonState={this.state.backDisabled}
							//end state
							nextIndex={this.nextIndex}
							prevIndex={this.prevIndex}
							setNewAudioDetails={this.setNewAudioDetails}
							handleBackButton={this.handleBackButton}
							closeModal={this.closeModal}
							successfulUpload={this.successfulUpload}
							handleClose={() => {
								this.props.openAddNewVoiceModal(false);
								this.props.removeAudio();
							}}
							//showtoast
							showToast={this.props.showToast}
							//upload session
							uploadSession={this.props.uploadSession}
							//type
							typeOfAudio={this.props.typeOfAudio}
						/>
					)}
				</Dialog>
				{/* )} */}
				<Toast
					open={this.state.openToast}
					handleClose={this.handleCloseToast}
					toastType={this.state.toastType}
					message={this.state.message}
					vertical="top"
					horizontal="right"
				/>
			</Card>
		);
	}
}

export default withStyles(styles)(Rerecord);
