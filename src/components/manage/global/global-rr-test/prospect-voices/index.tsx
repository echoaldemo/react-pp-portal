/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Snackbar } from '@material-ui/core'

import { CContainer } from '../components'

import { PHeader, PColumn, NewVoice } from './components'

import { getVoices, updateVoices, getRRTest } from '../utils/ProspectVoices'

import { cancel } from 'utils/api'

// mock data

let availableData: any = []

// end mock data

interface Props {
	router: any
}

const ProspectVoices = (props: any) => {
	const [open, setOpen] = useState(false)
	const [pure_act_data, setPureActData] = useState([])
	const [pure_avl_data, setPureAvlData] = useState(availableData)
	const [act_data, setActData] = useState([])
	const [avl_data, setAvlData] = useState(availableData)
	const [is_edit, setIsEdit] = useState(false)
	const [updateError, setUpdateError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [voicesData, setVoicesData] = useState([])

	useEffect(() => {
		console.log('PROPS', props)
		async function fetchDatas() {
			setLoading(true)
			let active_voices: any = await getRRTest(props.router.match.params.test_uuid)
			let voices: any = await getVoices()
			setVoicesData(voices.data)
			fetchVoices(voices.data, active_voices.data.voices)
			parseVoices(voices.data, active_voices.data.voices)
		}

		fetchDatas()
	}, [props.testId])

	async function parseVoices(voices_data = [], active_voices = []) {
		setLoading(true)
		let avl = active_voices || []

		let avl_data = avl.map(key => {
			return voices_data.filter((voice: any) => voice.uuid === key)[0]
		})

		setPureActData(avl_data)
		setActData(avl_data)
		setLoading(false)
	}

	async function fetchVoices(voices_data = [], active_voices = []) {
		setLoading(true)
		let pvl_data = voices_data
		// let prospect_voices = await getProspectVoices();
		// let pvl = prospect_voices.data || [];

		// console.log("Fetch Voices: ", prospect_voices);

		// let pvl_data = pvl.map(key => {
		//   return {
		//     ...key,
		//     ...voices_data.filter(voice => voice.uuid === key.user)[0]
		//   };
		// });

		let filtered = pvl_data.filter(
			(key: any) => active_voices.filter(id => key.uuid === id).length <= 0
		)

		setPureAvlData(filtered)
		setAvlData(filtered)
		setLoading(false)
	}

	function removeItem(voice: any) {
		setIsEdit(true)
		setAvlData([...avl_data, voice])
		let newAvailableData = act_data.filter(key => key !== voice)
		setActData(newAvailableData)
	}

	function renderActiveData(data: any) {
		return data
			? data.map((key: any) => {
				return (
					<PColumn
						// notifyEdit={(value: any) => setIsEdit(value)}
						voiceFn={removeItem}
						data={key}
						add={false}

					/>
				)
			})
			: null
	}

	function renderAvailableData(data: any) {
		return data.map((key: any) => {
			return (
				<>
					{key.username && (
						<PColumn voiceFn={addVoice} data={key} add={true} />
					)}
				</>
			)
		})
	}

	function renderNotifyOnError() {
		return (
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={Boolean(updateError || errorMessage)}
				message={<span id="message-id">{errorMessage}</span>}
			/>
		)
	}

	function addVoice(voice: any) {
		if (voice) {
			setIsEdit(true)
			let old_act = act_data
			let new_act: any = [...old_act, voice]
			setActData(new_act)
			let newAvailableData = avl_data.filter((key: any) => key !== voice)
			setAvlData(newAvailableData)
			setErrorMessage('')
		} else {
			setErrorMessage('Invalid Data!')
			renderNotifyOnError()
		}
	}

	function openCreateVoice(value: any) {
		setOpen(value)
	}

	function renderCreateModal() {
		return (
			<NewVoice
				routeToProspect={routeToProspect}
				parseVoices={parseVoices}
				fetchVoices={fetchVoices}
				open={open}
				onClose={() => openCreateVoice(false)}
			/>
		)
	}

	function cancelEdit() {
		cancel()
		setIsEdit(false)
		setActData(pure_act_data)
		setAvlData(pure_avl_data)
		setUpdateError(false)
	}

	async function saveChangeItem() {
		let voices = act_data.map((key: any) => key.uuid)
		let test = props.router.match.params.test_uuid
		let response = await updateVoices(test, voices)

		if (response.status < 300) {
			setUpdateError(false)
			setPureActData(act_data)
			setPureAvlData(avl_data)
			setIsEdit(false)
		} else {
			setUpdateError(true)
			setErrorMessage('Cannot update voices.')
		}
	}

	function routeToProspect(data: any) {
		//props.history.push("/manage/audio/prospect");
		let parseData = voicesData.filter((key: any) => key.uuid === data.user)[0]

		props.history.push({
			pathname: '/manage/audio/prospect',
			state: parseData
		})
	}

	return (
		<>
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					marginTop: '19px'
				}}
			>
				<PHeader openCreateVoice={openCreateVoice} />
				<div
					style={{
						marginTop: '20px',
						width: '95.4%',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}
				>
					<CContainer
						onEdit={is_edit}
						cancelEdit={cancelEdit}
						saveChangeItem={saveChangeItem}
						loading={loading}
						title="Active rep voices"
					>
						{renderActiveData(act_data)}
					</CContainer>
					<CContainer loading={loading} title="Available rep voices">
						{renderAvailableData(avl_data)}
					</CContainer>
				</div>
			</div>
			{renderCreateModal()}
			{errorMessage && renderNotifyOnError()}
		</>
	)
}

export default ProspectVoices
