import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	MenuItem,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	Switch,
	FormHelperText,
	Select,
	createMuiTheme,
	Grid,
	CircularProgress
} from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { get, remove, patch, cancel } from 'utils/api'
import DeleteModal from './components/DeleteModal'
import { LoadingModal as DeletingModal, SuccessModal } from 'common-components'
import SnackNotif from 'auth/component/snackbar/snackbar'

const useStyles = makeStyles(() => ({
	container: {
		width: 420
	},
	content: {
		boxSizing: 'border-box',
		margin: '0 auto',
		width: '100%'
	},
	title: {
		backgroundColor: '#5f7d98',
		color: '#ffffff',
		maxWidth: '100%'
	},
	p: {
		margin: '0 0 16px 0',
		fontSize: 18,
		fontWeight: 600,
		color: '#444851'
	},
	focused: {
		color: '#1194f6 !important'
	},
	underline: {
		'&:before': {
			borderBottom: '2px solid rgba(0,0,0,0.12)'
		},
		'&::after': {
			borderBottom: '2px solid #1194f6'
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid rgba(0,0,0,0.12)'
		}
	},
	note: {
		fontSize: 14,
		color: '#bbbbbb',
		marginTop: 10
	},
	err: {
		color: '#f44336 !important'
	},
	textField: {
		'&:before': {
			borderBottom: '2px solid rgba(0,0,0,0.12)'
		},
		'&::after': {
			borderBottom: '2px solid rgba(0,0,0,0.12)'
		},
		'&:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid rgba(0,0,0,0.12)'
		}
	},
	inputLabel: {
		color: '#bbbbbb'
	},
	saveBtn: {
		fontSize: 14,
		width: 165,
		minHeight: 40,
		fontWeight: 600,
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textAlign: 'center',
		borderRadius: 3,
		backgroundColor: '#b6d36b',
		outline: 'none',
		border: 'none',
		color: '#ffffff',
		textTransform: 'uppercase',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#a6c556'
		}
	},
	delBtn: {
		fontSize: 14,
		width: 165,
		minHeight: 40,
		fontWeight: 600,
		fontStretch: 'normal',
		fontStyle: 'normal',
		lineHeight: 'normal',
		letterSpacing: 'normal',
		textAlign: 'center',
		borderRadius: 3,
		backgroundColor: '#ff504d',
		outline: 'none',
		border: 'none',
		color: '#ffffff',
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#f5423f'
		},
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	span: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		minHeight: 64
	},
	loading: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '50px 0',
		minWidth: 350,
		fontSize: 18,
		color: 'rgba(0,0,0,0.6)',
		fontWeight: 'bold'
	},
	svgColor: {
		color: 'rgba(0,0,0,0.6)'
	},
	grayText: {
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 18,
		margin: '20px 0',
		color: 'rgba(0,0,0,0.6)'
	},
	buttonClose: {
		minWidth: 88,
		minHeight: 36,
		borderRadius: 2,
		width: 165,
		color: 'rgba(255,255,255,0.87)',
		fontSize: 14,
		fontWeight: 500,
		backgroundColor: 'rgb(182,211,107)',
		'&:hover': {
			backgroundColor: 'rgba(182,211,107,0.7)'
		}
	}
}))

const materialTheme = createMuiTheme({
	overrides: {
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: 'solid 2px rgba(238, 238, 238, 0.99)'
				},
				'&::after': {
					borderBottom: 'solid 2px rgba(238, 238, 238, 0.99)'
				},
				'&:hover:not(.Mui-disabled):before': {
					borderBottom: 'solid 2px rgba(238, 238, 238, 0.99)'
				}
			}
		},
		MuiSelect: {
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
		MuiSwitch: {
			colorPrimary: {
				color: '#bbbbbb',
				'&$checked': {
					color: '#1194f6',
					'&.MuiSwitch-track': {
						backgroundColor: '#eeeeee'
					}
				}
			},
			track: {
				backgroundColor: '#bbbbbb !important'
			}
		},
		MuiCircularProgress: {
			colorPrimary: {
				color: '#1194f6'
			}
		}
	}
})

// const data = {
//   uuid: '0657d85a-66c4-11e8-a21d-0242ac130002',
//   number: '+14352287646',
//   timezone: '',
//   latitude: null,
//   longitude: null,
//   pool: {
//     uuid: 'e027f3e0-66c3-11e8-b9ae-0242ac130002',
//     name: 'string',
//     company: 'dc805f1a-b9bd-11e7-b9b7-0242ac110003',
//     campaign: '78c463a8-b9be-11e7-b2bf-0242ac110003',
//     locale_name: 'US',
//     voice_provider: {
//       uuid: '5885f3e4-e6ba-11e7-88dd-0242ac11000f',
//       name: 'SipRoutes',
//       slug: 'siproutes'
//     },
//     active: true,
//     allow_inbound: true,
//     skip_inbound_ivr: true,
//     sip_uri: '',
//     start_node: '',
//     priority: 0,
//     vars_prospect_channel: '',
//     ignore_caller_id: true,
//     matching_preference: 'Closest'
//   },
//   active: true,
//   owned: true,
//   cname_valid: false,
//   cname_string: null,
//   cname_last_validated: null,
//   provider: '',
//   rotated: false,
//   datetime_last_rotated: null,
//   datetime_last_activated: null
// }
export default function EditDIDModal(props: any) {
	const classes = useStyles()
	const [did, setDID] = React.useState<any>(null)
	const [loading, setLoading] = React.useState(true) // eslint-disable-line
	const [didPools, setPools] = React.useState<any>(null)
	const [campaign, setCampaign] = React.useState<any>(null)
	const [company, setCompany] = React.useState<any>(null)
	const [selectedDIDPools, setSelectedPools] = React.useState('')
	const [didPoolsLoading, setPoolsLoading] = React.useState(true)
	const [openDeleteModal, setOpenDeleteModal] = React.useState(false)
	const [openDeletingModal, setOpenDeletingModal] = React.useState(false)
	const [openDeletedModal, setOpenDeletedModal] = React.useState(false)
	const [openUpdatingModal, setOpenUpdatingModal] = React.useState(false)
	const [openUpdatedModal, setOpenUpdatedModal] = React.useState(false)
	const [snackbar, setSnackbar] = React.useState({
		open: false,
		message: ''
	})

	function getDIDPools() {
		if (didPoolsLoading) {
			get('/did/company/all/campaign/all/pool/').then((res: any) => {
				setPools(res.data)
				setPoolsLoading(false)
			})
		}
	}
	React.useEffect(() => {
		getDIDPools()
		if (props.editData !== null) {
			setDID(props.editData)
			if (props.editData.pool !== null) {
				setSelectedPools(props.editData.pool.uuid)
				get(`/identity/campaign/${props.editData.pool.campaign}/`).then((res: any) =>
					setCampaign(res.data)
				)
				get(`/identity/company/${props.editData.pool.company}/`).then((res: any) =>
					setCompany(res.data)
				)
			}
		}
	}, [props]) // eslint-disable-line
	// React.useEffect(prevProps => {
	//   if (prevProps !== props) {
	//     if (props.editData !== null) {
	//       if (did === null) {
	//         setDID(props.editData)
	//         if (props.editData.pool !== null) {
	//           setSelectedPools(props.editData.pool.uuid)
	//         }
	//       }
	//     }
	//   }
	//   if (did !== null) {
	//     setLoading(false)
	//   }
	// })
	function handleChange(val: any, label: any) {
		if (label === 'pool') {
			setSelectedPools(val)
			return
		}
		setDID({
			...did,
			[label]: val
		})
	}
	function handleOpenDelete() {
		setOpenDeleteModal(true)
		props.handleCloseEdit()
	}
	function handleCloseDeletingModal() {
		setOpenDeletingModal(false)
		cancel()
	}
	function handleCloseUpdatingModal() {
		setOpenUpdatingModal(false)
		cancel()
	}
	function handleUpdate() {
		setOpenUpdatingModal(true)
		props.handleCloseEdit()
		const data = {
			number: did.number,
			active: did.active,
			owned: did.owned,
			pool: selectedDIDPools
		}
		if (campaign !== null && company !== null) {
			patch(
				`/did/company/${company.slug}/campaign/${
				campaign.slug
				}/pool/${did.pool && did.pool.uuid}/did/${did.uuid}/`,
				data
			).then((res: any) => {
				setOpenUpdatingModal(false)
				setOpenUpdatedModal(true)
				setCompany(null)
				setCampaign(null)
			})
		} else {
			setCompany(null)
			setCampaign(null)
			setTimeout(() => {
				setSnackbar({
					open: true,
					message: 'Error updating DID.'
				})
				setOpenDeletingModal(false)
				setOpenUpdatingModal(false)
			}, 1000)
		}
	}
	function handleDelete() {
		setOpenDeletingModal(true)
		if (campaign !== null && company !== null) {
			remove(
				`/did/company/${company.slug}/campaign/${
				campaign.slug
				}/pool/${did.pool && did.pool.uuid}/did/${did.uuid}/`
			).then(() => {
				setCompany(null)
				setCampaign(null)
				setOpenDeleteModal(false)
				setOpenDeletedModal(true)
				setOpenDeletingModal(false)
				props.handleCloseEdit()
			})
		} else {
			setCompany(null)
			setCampaign(null)
			setTimeout(() => {
				setSnackbar({
					open: true,
					message: 'Error deleting DID.'
				})
				setOpenDeletingModal(false)
			}, 1000)
		}
	}

	return (
		<div>
			<ThemeProvider theme={materialTheme}>
				<Dialog
					open={props.open}
					maxWidth="sm"
					classes={{ paperWidthSm: classes.container }}
				>
					<DialogTitle className={classes.title}>
						<Typography
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								textAlign: 'center'
							}}
						>
							<span style={{ fontWeight: 600, fontSize: 20 }}></span>
							<span style={{ fontWeight: 600, fontSize: 20 }}>Edit DID</span>
							<Close
								style={{ cursor: 'pointer' }}
								onClick={() => props.handleCloseEdit()}
							/>
						</Typography>
					</DialogTitle>
					<DialogContent className={classes.content}>
						{loading ? (
							<Typography className={classes.loading}>
								<span>Loading DID...</span>
								<CircularProgress classes={{ svg: classes.svgColor }} />
							</Typography>
						) : (
								<form style={{ margin: '15px 0', overflow: 'hidden' }}>
									<FormControl fullWidth>
										<InputLabel
											htmlFor="status"
											classes={{
												root: classes.inputLabel,
												focused: classes.focused
											}}
										>
											DID pool
                  </InputLabel>
										<Select
											data-cy="did-pools"
											style={{ margin: '14px 0 26px 0', width: '360px' }}
											inputProps={{
												IconComponent: () => <KeyboardArrowDown />
											}}
											value={selectedDIDPools || ''}
											onChange={e => handleChange(e.target.value, 'pool')}
										>
											{!didPoolsLoading ? (
												didPools.map((p: any) => (
													<MenuItem key={p.uuid} value={p.uuid}>
														{p.name}
													</MenuItem>
												))
											) : (
													<span className={classes.span}>
														<CircularProgress size={20} />
													</span>
												)}
										</Select>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel
											htmlFor="status"
											classes={{
												root: classes.inputLabel,
												focused: classes.focused
											}}
										>
											DID status
                  </InputLabel>
										<Input
											id="status"
											value={did.active ? 'Active' : 'Inactive'}
											readOnly
											endAdornment={
												<InputAdornment position="end">
													<Switch
														checked={did.active}
														onChange={e =>
															handleChange(e.target.checked, 'active')
														}
														color="primary"
													/>
												</InputAdornment>
											}
										/>
										<FormHelperText id="status"></FormHelperText>
									</FormControl>
									<FormControl fullWidth>
										<InputLabel
											htmlFor="status"
											classes={{
												root: classes.inputLabel,
												focused: classes.focused
											}}
										>
											Owned
                  </InputLabel>
										<Input
											id="status"
											readOnly
											value={did.owned ? 'Yes' : 'No'}
											endAdornment={
												<InputAdornment position="end">
													<Switch
														checked={did.owned}
														color="primary"
														onChange={e =>
															handleChange(e.target.checked, 'owned')
														}
													/>
												</InputAdornment>
											}
										/>
										<FormHelperText id="status"></FormHelperText>
									</FormControl>
									<FormControl fullWidth disabled>
										<InputLabel
											classes={{
												root: classes.inputLabel,
												focused: classes.focused
											}}
											htmlFor="number"
											required
										>
											Number
                  </InputLabel>
										<Input
											autoComplete="off"
											classes={{
												underline: classes.textField
											}}
											id="number"
											value={did.number || ''}
											required
										/>
										<FormHelperText></FormHelperText>
									</FormControl>
									<FormControl fullWidth disabled>
										<InputLabel
											classes={{
												root: classes.inputLabel,
												focused: classes.focused
											}}
											htmlFor="timezone"
											required
										>
											Timezone
                  </InputLabel>
										<Input
											autoComplete="off"
											classes={{
												underline: classes.textField
											}}
											id="timezone"
											value={did.timezone || 'Field Not Set'}
											required
										/>
										<FormHelperText></FormHelperText>
									</FormControl>
									<Grid
										container
										justify="space-between"
										spacing={3}
										style={{ marginTop: 5 }}
									>
										<Grid item>
											<button
												type="button"
												className={classes.delBtn}
												onClick={() => handleOpenDelete()}
											>
												Delete
                    </button>
										</Grid>
										<Grid item>
											<button
												type="button"
												className={classes.saveBtn}
												onClick={() => handleUpdate()}
											>
												SAVE CHANGES
                    </button>
										</Grid>
									</Grid>
								</form>
							)}
					</DialogContent>
				</Dialog>
				{did !== null && (
					<>
						<DeleteModal
							did={did}
							open={openDeleteModal}
							closeFn={() => setOpenDeleteModal(false)}
							delFn={() => handleDelete()}
						/>
						<DeletingModal
							open={openDeletingModal}
							text={'Deleting DID...'}
							cancelFn={() => handleCloseDeletingModal()}
						/>
						<DeletingModal
							open={openUpdatingModal}
							text={'Updating DID...'}
							cancelFn={() => handleCloseUpdatingModal()}
						/>
						<SuccessModal
							open={openDeletedModal}
							text={`${did.number} was deleted`}
							closeFn={() => {
								props.handleAfterDelete()
								props.handleCloseEdit()
								setOpenDeletedModal(false)
							}}
						/>
						<SuccessModal
							open={openUpdatedModal}
							text={'DID was updated'}
							closeFn={() => {
								props.handleAfterUpdate()
								setOpenUpdatedModal(false)
							}}
						/>
					</>
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
			</ThemeProvider>
		</div>
	)
}
