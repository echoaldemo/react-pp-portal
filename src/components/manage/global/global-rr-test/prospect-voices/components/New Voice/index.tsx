import React, { useState, useEffect } from 'react'

import { Grid, Dialog, TextField } from '@material-ui/core'

import { Autocomplete } from '@material-ui/lab'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import {
	CustomButton,
	SaveButton,
	SuccessModal,
	LoadingModal,
	Modal
} from 'common-components'

import { getVoices, createProspectVoices } from '../../../utils/ProspectVoices'
import { cancel } from 'utils/api'
import styled from 'styled-components'

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
  }
  .Mui-focused span {
    color: #1194f6 !important;
  }
  .MuiInputLabel-shrink {
    transform: translate(0, 1.5px) scale(1);
  }
`

const theme = createMuiTheme({
	shape: {
		borderRadius: 0
	},
	palette: {
		primary: { main: '#1194f6' }
	},
	overrides: {
		// MuiFormLabel: {
		// 	shrink: {
		// 		color: '#1194f6'
		// 	}
		// },

		MuiInputLabel: {
			shrink: {
				color: '#1194f6'
			}
		},
		// MuiAutocomplete: {
		//   popup: {
		//     zIndex: 9999
		//   }
		// },
		MuiInput: {
			underline: {
				'&:before': {
					borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
				},
				'&:hover:not($disabled):before': {
					borderBottom: '2px solid #1194f6'
				},
				'&:after': {
					borderBottom: '2px solid #1194f6'
				}
			}
		},
		// MuiInput: {
		//   underline: {
		//     '&:before': {
		//       borderBottom: `2px solid rgba(238, 238, 238, 0.99)`
		//     },
		//     '&:hover:not($disabled):before': {
		//       borderBottom: '2px solid #1194f6'
		//     },
		//     '&:after': {
		//       borderBottom: '2px solid #1194f6'
		//     }
		//   }
		// }
	}
})

const NewVoice = (props: any) => {
	const [name, setName] = useState('')
	const [username, setUsername] = useState()
	const [nameError, setNameError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const [voices, setVoices] = useState([])
	const [original_voices, setOriginalVoices] = useState([])
	const [userTyped, setUserTyped] = useState('')
	const [is_auto, setIsAuto] = useState(false)
	const [responseUser, setResponseUser] = useState([])

	useEffect(() => {
		fetchVoices()
	}, [])

	async function fetchVoices() {
		let voices = await getVoices()
		let voiceData = voices.data || []
		let parseVoices: any = voiceData.map((key: any) => {
			return {
				uuid: key.uuid,
				fname: key.first_name,
				lname: key.last_name,
				username: key.username
			}
		})
		setOriginalVoices(parseVoices)
		setVoices(parseVoices)
	}

	function handleInput(e: any) {
		if (e.target.name === 'name') {
			verifyName(e.target.value)
			setName(e.target.value)
		} else {
			e.target.value.length > 0 ? setIsAuto(true) : setIsAuto(false)
			setUserTyped(e.target.value)
			searchVoices(e.target.value)
		}
	}

	function searchVoices(searchText: string) {
		let searchRegex = RegExp(searchText, 'gi')
		let count = 0
		let searchVoiced = original_voices.filter((key: any) => {
			if (
				key.fname.match(searchRegex) ||
				key.lname.match(searchRegex) ||
				key.username.match(searchRegex)
			) {
				if (count < 5) {
					count++
					return true
				}
				return false
			}
			return false
		})

		setVoices(searchVoiced)
	}

	function verifyName(value: any) {
		if (value.length <= 0) {
			setNameError(true)
		} else {
			setNameError(false)
		}
	}

	async function createVoice() {
		if (!nameError) {
			let { uuid } = username
			let user = uuid
			setLoading(true)
			let response = await createProspectVoices({ user, name })
			if (response.status < 300) {
				setLoading(false)
				setSuccess(true)
				setResponseUser(response.data)
				props.fetchVoices()
				props.parseVoices()
			} else {
				setLoading(false)
			}
		}
	}

	function modalClose() {
		setName('')
		setUsername('')
		setNameError(false)
		setLoading(false)
		setSuccess(false)
		props.onClose()
	}

	function cancelSave() {
		setLoading(false)
		cancel()
	}

	function renderLoading() {
		return (
			<LoadingModal
				open={loading}
				text="One moment. We're creating the new voice..."
				cancelFn={cancelSave}
			/>
		)
	}

	function renderSuccess() {
		return (
			<>
				<SuccessModal
					open={success}
					text={`You have created the ${name} prospect voice`}
					btnText={'RECORD AUDIO'}
					closeFn={closeSuccess}
					btnFn={recordAudio}
				/>
			</>
		)
	}

	function closeSuccess() {
		modalClose()
	}

	function recordAudio() {
		props.routeToProspect(responseUser)
	}

	function renderUI() {
		return (
			<>
				<Modal
					open={props.open}
					title="Create new prospect voice"
					onClose={modalClose}
				>
					<Grid>
						<Grid
							item
							style={{
								marginTop: '20px',
								marginBottom: '16px'
							}}
						>
							<InputField
								autoComplete="off"
								onBlur={handleInput}
								onInput={handleInput}
								inputProps={{ name: 'name' }}
								label="Name"
								value={name}
								fullWidth
								error={nameError}
								helperText={nameError ? 'A name is required' : ' '}
								required
							/>
						</Grid>
						<Grid item style={{ marginBottom: '47px' }}>
							<Autocomplete
								open={is_auto}
								value={username}
								onChange={(value: any) => {
									setIsAuto(false)
									setUsername(value)
								}}
								options={voices}
								getOptionLabel={option =>
									option.uuid
										? `${option.fname} ${option.lname} | ${option.username}`
										: ''
								}
								renderOption={opt => {
									return (
										<>
											{opt.fname} {opt.lname} | {opt.username}
										</>
									)
								}}
								renderInput={(params: any) => (
									<>
										<TextField
											onInput={handleInput}
											{...params}
											inputProps={{
												...params.inputProps,
												autocomplete: 'off'
											}}
											id="user"
											label="User"
											name="user"
											margin="normal"
											fullWidth
											value={params.inputProps.value ? userTyped : ''}
										/>
									</>
								)}
							/>
						</Grid>

						<Grid
							container
							direction="row"
							alignItems="center"
							justify="center"
						>
							<Grid item style={{ marginRight: '30px' }}>
								<CustomButton handleClick={() => modalClose()} style={{ background: '#eee' }}>
									<strong style={{ color: '#444851' }}>CANCEL</strong>
								</CustomButton>
							</Grid>

							<Grid item>
								<SaveButton
									onClick={() => createVoice()}
									disabled={name.length <= 0 || nameError}
								>
									CREATE VOICE
                </SaveButton>
							</Grid>
						</Grid>
					</Grid>
				</Modal>
			</>
		)
	}

	return (
		<MuiThemeProvider theme={theme}>
			{!loading && !success && renderUI()}
			{loading && renderLoading()}
			{success && renderSuccess()}
		</MuiThemeProvider>
	)
}

export default NewVoice
