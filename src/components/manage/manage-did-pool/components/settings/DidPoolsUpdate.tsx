import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'

import {
	Paper,
	Grid,
	Button,
	Typography,
	InputLabel,
	InputAdornment,
	Switch,
	Input,
	FormControl,
	InputBase,
	Select,
	MenuItem,
	Tooltip,
	Collapse
} from '@material-ui/core'
import {
	DeleteModal,
	LoadingModal,
	SuccessModal,
	TableLoader,
	StatusLabel,
	BackButton,
	SaveButton
} from 'common-components'
import { FileCopyOutlined, Delete as DeleteIcon } from '@material-ui/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { get, patch, remove, cancel } from 'utils/api'
import SnackNotif from 'auth/component/snackbar/snackbar'
import styles from './DidPoolsSettings.styles'

//mock data
import { mockDid } from '../../utils/const-var'

const LightTooltip = withStyles(theme => ({
	tooltip: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11
	}
}))(Tooltip)

interface Props {
	classes: any
	uuid: string
	history: any
}

const LocationTable: React.FC<Props> = ({ classes, uuid, history }) => {
	const [copy, setCopy] = useState(false)
	const [didData, setDidData] = useState<any>({})
	const [origDidData, setOrigDidData] = useState({})
	const [voiceProvider, setVoiceProvider] = useState([])
	const [company, setCompany] = useState([])
	const [campaign, setCampaign] = useState([])
	const [loadingSettings, setLoadingSettings] = useState(true)
	const [snackbar, setSnackbar] = useState({ open: false, message: '' })
	const [delConfirm, setDelConfirm] = useState(false)
	const [openDeletingModal, setOpenDeletingModal] = useState(false)
	const [openDeletedModal, setOpenDeletedModal] = useState(false)

	useEffect(() => {
		fetchDID()
		fetchVoiceProvider()
		fetchCompany()
		// eslint-disable-next-line
	}, [])

	const fetchDID = () => {
		//mock data
		setDidData(mockDid)
		setOrigDidData(mockDid)
		setTimeout(() => {
			setLoadingSettings(false)
		}, 1000)

		get(`/did/company/all/campaign/all/pool/${uuid}/`).then((res: any) => {
			setDidData(res.data)
			setOrigDidData(res.data)
			fetchCampaign(res.data.company)
			setLoadingSettings(false)
		})
	}
	const fetchVoiceProvider = () => {
		get(`/did/voice_provider/`).then((res: any) => {
			setVoiceProvider(res.data)
		})
	}
	const fetchCompany = () => {
		get(`/identity/company/list/?editable=true&order_by=name`).then((res: any) => {
			setCompany(res.data)
		})
	}
	//Get Capaign of the selected company
	const fetchCampaign = (uuid: string) => {
		get(`/identity/campaign/list/?assignable=true&company=${uuid}`).then(
			(res: any) => {
				setCampaign(res.data)
			}
		)
	}
	const handleSnackbar = (message: string) => {
		setSnackbar({
			open: true,
			message: message
		})
	}
	const handleUpdate = (campaignSlug: string, companySlug: string) => {
		// /did/company/adsfasdfsadf/campaign/earl/pool/e75e29b4-0b5d-11ea-b28f-0242ac110016/
		var postData = {
			name: didData.name,
			company: didData.company,
			campaign: didData.campaign,
			locale_name: didData.locale_name,
			voice_provider: didData.voice_provider,
			active: didData.active,
			allow_inbound: didData.allow_inbound,
			skip_inbound_ivr: didData.skip_inbound_ivr,
			sip_uri: didData.sip_uri,
			start_node: didData.start_node,
			priority: didData.priority,
			vars_prospect_channel: didData.vars_prospect_channel,
			ignore_caller_id: didData.ignore_caller_id,
			desired_cname: didData.desired_cname
		}
		patch(
			`/did/company/${campaignSlug}/campaign/${companySlug}/pool/${uuid}/`,
			postData
		)
			.then(() => {
				handleSnackbar('DID pool has been successfully updated.')
				fetchDID()
			})
			.catch(() => {
				handleSnackbar('Error updating did pool.')
			})
	}

	//check if has changes in original data. if true then button will be visible
	let edit
	if (didData.name) {
		edit =
			JSON.stringify(origDidData) === JSON.stringify(didData)
				? false
				: didData.name.length === 0
					? false
					: true
	}

	// company & campaign slug fetch
	let companyID = didData.company
	let companySlug = ''
	if (companyID) {
		const findCompanySlug: any = company.filter((data: any) => {
			return data.uuid.toLowerCase().indexOf(companyID.toLowerCase()) !== -1
		})
		companySlug = findCompanySlug.length > 0 ? findCompanySlug[0].slug : ''
	}
	let campaignID = didData.campaign
	let campaignSlug = ''
	if (companyID) {
		const findCampaignSlug: any = campaign.filter((data: any) => {
			return data.uuid.toLowerCase().indexOf(campaignID.toLowerCase()) !== -1
		})
		campaignSlug = findCampaignSlug.length > 0 ? findCampaignSlug[0].slug : ''
	}
	// end company & campaign slug fetch-------------

	const handleDelete = () => {
		setOpenDeletingModal(true)
		setTimeout(() => {
			remove(
				`/did/company/${companySlug}/campaign/${campaignSlug}/pool/${uuid}/`
			)
				.then(() => {
					setOpenDeletingModal(false)
					setDelConfirm(false)
					setOpenDeletedModal(true)
				})
				.catch(() => {
					setOpenDeletingModal(false)
					setDelConfirm(false)
					handleSnackbar('Error deleting did pool.')
				})
		}, 1000)
	}

	// https://dev-api.perfectpitchtech.com/did/company/demo/campaign/32-campsss/pool/9f995a54-5d35-11e8-abfc-0242ac110016/
	return (
		<>
			<BackButton text="Back to DID pool" to="/manage/did-pool/" />
			<div style={{ display: 'flex', alignItems: 'center', margin: '25px 0' }}>
				<p
					style={{
						fontFamily: 'Roboto',
						fontSize: '24px',
						color: '#444851',
						margin: '0 25px 0 0'
					}}
				>
					{'test'}
				</p>
				<StatusLabel status={true} />
			</div>
			{loadingSettings ? (
				<TableLoader />
			) : (
					<Paper square={true} className={classes.paper}>
						<Grid container>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
								lg={12}
								className={classes.inputContainer}
							>
								<Typography
									style={{
										width: 173,
										height: 21,
										fontSize: 18,
										fontWeight: 500,
										color: '#444851'
									}}
								>
									DID pool settings
              </Typography>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
										required
									>
										Pool name
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={`${didData.name}`}
										value={`${didData.name}`}
										onChange={e => {
											setDidData({ ...didData, name: e.target.value })
										}}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										UUID
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={`${didData.uuid}`}
										value={`${didData.uuid}`}
										onChange={() => { }}
										disabled
										endAdornment={
											<InputAdornment position='end'>

												<CopyToClipboard
													text={`${didData.uuid}`}
													onCopy={() => setCopy(false)}
													onPointerLeave={() => setCopy(false)}
												>
													{copy ? (
														<LightTooltip title="UUID Copied!" placement="top">
															<FileCopyOutlined
																style={{
																	width: '14px !important',
																	height: '16px !important',
																	cursor: 'pointer'
																}}
																rotate={360}
															/>
														</LightTooltip>
													) : (
															<LightTooltip title="Copy UUID" placement="top">
																<FileCopyOutlined
																	style={{
																		width: '14px !important',
																		height: '16px !important',
																		cursor: 'pointer'
																	}}
																	rotate={360}
																/>
															</LightTooltip>
														)}
												</CopyToClipboard>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
										required
									>
										Company
                </InputLabel>
									<Select
										defaultValue={`${didData.company}`}
										value={`${didData.company}`}
										onChange={(e: any) => {
											// setDidData([...didData, (company: e.target.value)]);
											fetchCampaign(e.target.value)
											setDidData({ ...didData, company: e.target.value })
										}}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
									>
										{company.map((data: any) => (
											<MenuItem value={data.uuid} key={data.uuid}>
												{data.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
										required
									>
										Campaign
                </InputLabel>
									<Select
										defaultValue={`${didData.campaign}`}
										value={`${didData.campaign}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
										onChange={e => {
											setDidData({ ...didData, campaign: e.target.value })
										}}
									>
										{campaign.map((data: any) => (
											<MenuItem value={data.uuid} key={data.uuid}>
												{data.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Voice Provider
                </InputLabel>
									<Select
										value={`${didData.voice_provider}`}
										defaultValue={`${didData.voice_provider}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
									>
										{voiceProvider.map((data: any) => (
											<MenuItem value={data.uuid} key={data.uuid}>
												{data.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="status"
									>
										Pool status
                </InputLabel>
									<Input
										className={classes.textField}
										id="input"
										value={didData.active ? 'Active' : 'Inactive'}
										endAdornment={
											<InputAdornment position="end">
												<Switch
													classes={{
														colorPrimary: classes.switchButton,
														track: classes.switchTrack
													}}
													id="active"
													color="primary"
													onChange={e => {
														setDidData({ ...didData, active: !didData.active })
													}}
													checked={didData.active ? true : false}
												/>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Allow Inbound
                </InputLabel>
									<Select
										defaultValue={`${didData.allow_inbound}`}
										value={`${didData.allow_inbound}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
										onChange={e => {
											setDidData({
												...didData,
												allow_inbound: e.target.value === 'true'
											})
										}}
									>
										<MenuItem value={`true`}>Yes</MenuItem>
										<MenuItem value={`false`}>No</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }} disabled>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										DID Count
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={`${didData.did_count}`}
										value={`${didData.did_count}`}
										type="number"
										onChange={e => {
											setDidData({ ...didData, did_count: e.target.value })
										}}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Skip inbound IVR
                </InputLabel>
									<Select
										value={`${didData.skip_inbound_ivr}`}
										defaultValue={`${didData.skip_inbound_ivr}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
										onChange={e => {
											setDidData({
												...didData,
												skip_inbound_ivr: e.target.value === 'true'
											})
										}}
									>
										<MenuItem value={`true`}>Yes</MenuItem>
										<MenuItem value={`false`}>No</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Priority
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={`${didData.priority}`}
										value={`${didData.priority}`}
										type="number"
										onChange={e => {
											setDidData({ ...didData, priority: e.target.value })
										}}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Locale
                </InputLabel>
									<Select
										defaultValue={`${didData.locale_name}`}
										value={`${didData.locale_name}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
										onChange={e => {
											setDidData({ ...didData, locale_name: e.target.value })
										}}
									>
										<MenuItem value={'US'}>United States / Canada</MenuItem>
										<MenuItem value={'GB'}>Great Britain</MenuItem>
										<MenuItem value={'AU'}>Australia</MenuItem>
										<MenuItem value={'SG'}>Singapore</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Ignore caller ID
                </InputLabel>
									<Select
										value={`${didData.ignore_caller_id}`}
										input={
											<Input
												classes={{
													root: classes.input,
													underline: classes.textField
												}}
												name="name"
												id="age-helper"
											/>
										}
										onChange={e => {
											setDidData({
												...didData,
												ignore_caller_id: e.target.value === 'true'
											})
										}}
									>
										<MenuItem value={'true'}>Yes</MenuItem>
										<MenuItem value={'false'}>No</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Start node
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={didData.start_node}
										value={didData.start_node}
										onChange={e => {
											setDidData({ ...didData, start_node: e.target.value })
										}}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										SPI URI
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										value={`${didData.sip_uri}`}
										defaultValue={`${didData.sip_uri}`}
										onChange={e => {
											setDidData({ ...didData, sip_uri: e.target.value })
										}}
									/>
								</FormControl>
							</Grid>

							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.removeLeader,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="delete"
									>
										Delete router
                </InputLabel>
									<InputBase
										style={{
											margin: 8
										}}
										value={' '}
										id="delete"
										disabled
										endAdornment={
											<InputAdornment position="end">
												<Button
													onClick={() => {
														setDelConfirm(true)
													}}
													variant="contained"
													classes={{ root: classes.delBtn }}
												>
													<DeleteIcon className={classes.delIcon} /> Delete
                      </Button>
											</InputAdornment>
										}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<FormControl style={{ width: '95%' }}>
									<InputLabel
										classes={{
											root: classes.inputLabel,
											shrink: classes.shrink,
											focused: classes.focused
										}}
										htmlFor="name"
									>
										Prospect channel variables
                </InputLabel>
									<Input
										classes={{
											root: classes.input,
											underline: classes.textField
										}}
										id="name"
										defaultValue={`${didData.vars_prospect_channel}`}
										value={`${didData.vars_prospect_channel}`}
										onChange={e => {
											setDidData({
												...didData,
												vars_prospect_channel: e.target.value
											})
										}}
									/>
								</FormControl>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<p
									style={{
										fontFamily: 'Roboto',
										fontSize: '14px',
										fontWeight: 'normal',
										fontStretch: 'normal',
										fontStyle: 'normal',
										lineHeight: 'normal',
										letterSpacing: 'normal',
										color: '#bbbbbb'
									}}
								>
									* Required Fields
              </p>
							</Grid>
							<Grid
								item
								xs={6}
								sm={6}
								md={6}
								lg={6}
								className={classes.inputContainer}
							>
								<Collapse
									in={edit}
									classes={{ wrapper: classes.collapseWrapper }}
									style={{
										display: 'flex',
										justifyContent: 'center',
										width: '100%',
										transition: 'all 1s ease'
									}}
								>
									<span
										style={{
											width: '50%',
											margin: '0 auto',
											display: 'flex',
											justifyContent: 'space-between'
										}}
									>
										<SaveButton
											// disabled={errors.name || errors.email || errors.website}
											disabled={false}
											type="submit"
											onClick={() => {
												handleUpdate(companySlug, campaignSlug)
											}}
										>
											SAVE
                  </SaveButton>
										<button
											className={`${classes.button} ${classes.cancel}`}
											onClick={() => {
												setDidData(origDidData)
											}}
										>
											CANCEL
                  </button>
									</span>
								</Collapse>
							</Grid>
						</Grid>
					</Paper>
				)}
			<SnackNotif
				snackbar={snackbar.open}
				handleClose={() => {
					setSnackbar({
						open: false,
						message: ''
					})
				}}
				message={snackbar.message}
			/>
			<DeleteModal
				open={delConfirm}
				header="Delete DID"
				msg="DID"
				name={didData ? didData.name : ''}
				closeFn={() => setDelConfirm(false)}
				delFn={handleDelete}
			/>
			<LoadingModal
				open={openDeletingModal}
				text={'Deleting DID pool...'}
				cancelFn={() => {
					setOpenDeletingModal(false)
					cancel()
				}}
			/>
			{/* To DO success deleting modal */}
			<SuccessModal
				open={openDeletedModal}
				text={`${didData.name} was deleted`}
				closeFn={() => {
					history.push('/manage/did-pool')
				}}
			/>
		</>
	)
}
export default withStyles(styles)(LocationTable)
