import React, { useState, useEffect } from 'react'
import { SCard, SColumn } from './components'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import { Snackbar } from '@material-ui/core'
// import { CustomButton } from 'common-components'
import {
	getGlobalSegments,
	updateSegments,
	getRRTest
} from '../utils/ProspectVoices'

const SegmentContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 29px;
  display: flex;
  padding: 0 25px 0 25px;
  flex-direction: row;
  justify-content: space-between;
`

// const OptionToSave = styled.div`
//   position: absolute;
//   bottom: 0;
//   width: 100%;
//   height: 70px;
//   border-radius: 3px;
//   box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.06);
//   background-color: #ffffff;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
// `

const mockSegments: any = []

const mockSegments2: any = []

interface Props {
	testId: string
	router: any
}

const Segments: React.FC<Props> = (props) => {
	const [acs, setAcs] = useState(mockSegments2)
	const [original_acs, SetOrAcs] = useState(mockSegments2)
	const [original_avs, setOrAvs] = useState(mockSegments)
	const [avs, setAvs] = useState(mockSegments)
	const [is_edit, setIsEdit] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [updated, setUpdated] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetchDatas()
	}, [props.testId]) // eslint-disable-line

	async function fetchDatas() {
		if (props.router.match.params.test_uuid) {
			setLoading(true)
			let segments = await getGlobalSegments()
			let segments_data = await getRRTest(props.router.match.params.test_uuid)
			!updated && parseSegments(segments.data, segments_data)
			fetchSegments(segments.data, segments_data)
		}
	}

	async function parseSegments(segments = [], segments_data: any = []) {
		if (props.router.match.params.test_uuid) {
			setLoading(true)
			segments_data = segments_data.data ? segments_data.data.segments : []
			let sgmtdata =
				segments_data.map((key: any) => {
					return {
						...segments
							.filter((key2: any) => key2.uuid === key)
							.map((key3: any) => {
								return {
									uuid: key3.uuid,
									name: key3.name,
									type: key3.type
								}
							})[0]
					}
				}) || []

			setAcs(sgmtdata)
			SetOrAcs(sgmtdata)
			setLoading(false)
		}

		// let avsData = original_avs.filter((key) => {
		//   return !sgmtdata.includes(key);
		// });

		// console.log("AvsData: ", avsData);
	}

	async function fetchSegments(segments = [], segments_data: any = []) {
		segments_data = segments_data.data ? segments_data.data.segments : []
		setLoading(true)
		let data = segments.map((key: any) => {
			return {
				uuid: key.uuid,
				name: key.name,
				type: key.type
			}
		})

		let filter = segments_data
			? data.filter(key => !segments_data.includes(key.uuid))
			: data

		setOrAvs(filter)
		setAvs(filter)
		setLoading(false)
	}

	function searchData(e: any, type: any) {
		let regex = new RegExp(e.target.value, 'gi')
		if (type === 'asegments') {
			setAcs(original_acs.filter((key: any) => key.name.match(regex)))
		} else {
			setAvs(original_avs.filter((key: any) => key.name.match(regex)))
		}
	}

	function renderActiveSegments() {
		return acs.map((ac: any, i: number) => {
			return (
				<SColumn
					key={i}
					type="active"
					data={ac}
					removeItem={removeItem}
					draggableId={ac.uuid || 0}
					index={acs.indexOf(ac)}
				/>
			)
		})
	}

	function renderAvailableSegments() {
		return avs.map((av: any, i: number) => {
			return (
				<SColumn key={i} data={av} draggableId={av.uuid || 1} index={avs.indexOf(av)} />
			)
		})
	}

	function removeItem(voice: any) {
		setIsEdit(true)
		setAcs(acs.filter((ac: any) => ac !== voice))
		setAvs([...avs, voice])
	}

	async function saveChangeItem() {
		let active = acs.map((key: any) => key.uuid)
		let id = props.router.match.params.test_uuid
		if (id) {
			let response = await updateSegments(id, active)
			if (response.status < 300) {
				setUpdated(true)
				setErrorMessage('')
				setIsEdit(false)
				setOrAvs(avs)
				SetOrAcs(acs)
				await fetchDatas()
			} else {
				setErrorMessage('Cannot update segments')
			}
		}
	}

	function cancelEdit() {
		//cancel();
		setIsEdit(false)
		setAvs(original_avs)
		setAcs(original_acs)
	}

	// function renderOptionToSave(voice) {
	//   return (
	//     <>
	//       <Zoom in={is_edit}>
	//         <OptionToSave>
	//           <CustomButton
	//             onClick={e => cancelEdit()}
	//             style={{ marginRight: '30px' }}
	//           >
	//             CANCEL
	//           </CustomButton>

	//           <CustomButton
	//             onClick={e => saveChangeItem(voice)}
	//             style={{
	//               backgroundColor: '#b6d36b'
	//             }}
	//           >
	//             SAVE CHANGES
	//           </CustomButton>
	//         </OptionToSave>
	//       </Zoom>
	//     </>
	//   )
	// }

	function onDragEnd(result: any) {
		let { destination, source } = result
		if (
			destination.droppableId === 'asegments' &&
			source.droppableId === 'avsegments'
		) {
			let item = avs[source.index]
			let data = [...acs]
			data.splice(destination.index, 0, item)
			setAcs(data)
			setAvs(avs.filter((key: any) => key !== item))
			setIsEdit(true)
		} else if (
			destination.droppableId === 'avsegments' &&
			source.droppableId === 'asegments'
		) {
			let item = avs[source.index]
			let data = [...acs]
			data.splice(destination.index, 0, item)
			setAvs(data)
			setAcs(acs.filter((key: any) => key !== item))
			setIsEdit(true)
		}
	}

	function renderErrorMessage() {
		return (
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={errorMessage ? true : false}
				message={<span id="message-id">{errorMessage}</span>}
			/>
		)
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<SegmentContainer>
				<SCard
					onEdit={is_edit}
					saveChangeItem={saveChangeItem}
					loading={loading}
					search={searchData}
					dropId="asegments"
					cancelEdit={cancelEdit}
					title="Active Segments"
					searchHolder="Search for active segments..."
				>
					{renderActiveSegments()}
				</SCard>
				<SCard
					loading={loading}
					search={searchData}
					cancelEdit={cancelEdit}
					onEdit={is_edit}
					saveChangeItem={saveChangeItem}
					dropId="avsegments"
					title="Available Segments"
					searchHolder="Search for available segments..."
				>
					{renderAvailableSegments()}
					{renderErrorMessage()}
				</SCard>
			</SegmentContainer>
		</DragDropContext>
	)
}

export default Segments
