import React, { useState } from 'react'
import styled from 'styled-components'
import {
	Typography,
	Divider,
	IconButton,
	TextField,
	CircularProgress,
	Zoom
} from '@material-ui/core'
import { Search, Close } from '@material-ui/icons'
import { Droppable } from 'react-beautiful-dnd'
import { CustomButton } from 'common-components'

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

const VoiceContainer = styled.div`
  position: relative;
  display: block;
  width: 48%;
  border-radius: 3px;
  border: solid 1px #eeeeee;
`

const VoiceTitle = styled.div`
  width: 100%;
  height: 63px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const TitleText = styled(Typography)`
  width: 200px;
  height: 21px;
  font-size: 18px !important;
  font-weight: 500 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
  text-indent: 20px;
`

const VoiceListContainer = styled.div`
  position: relative;
  height: 510px;
  border-radius: 3px;
  border: solid 1px #eeeeee;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fafafa;
`

const OptionToSave = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  border-radius: 3px;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const has_search = ['segments']

interface Props {
	title: string
	search: any
	type: string
	dropId: string
	droppableId?: string
	searchHolder: string
	onEdit: boolean
	cancelEdit: () => void
	saveChangeItem: () => void
	loading: boolean
	children: React.ReactNode
}

export default (props: Props) => {
	const [is_search, setIsSearch] = useState(false)

	function renderTitle() {
		return (
			<VoiceTitle>
				{!is_search && <TitleText>{props.title}</TitleText>}
				{is_search && filterSearchVisibility(props.type) && renderSearch()}
				{renderIcon()}
			</VoiceTitle>
		)
	}

	function closeSearch() {
		setIsSearch(false)
		props.search({ target: { value: '' } }, props.dropId)
	}

	function renderIcon() {
		return (
			<>
				{filterSearchVisibility(props.type) && !is_search ? (
					<IconButton onClick={() => setIsSearch(true)}>
						<Search />
					</IconButton>
				) : (
						<IconButton onClick={closeSearch}>
							<Close />
						</IconButton>
					)}
			</>
		)
	}

	function handleSearch(e: any) {
		props.search(e, props.dropId)
	}

	function renderSearch() {
		return (
			<InputField
				fullWidth
				name={props.droppableId}
				onInput={handleSearch}
				placeholder={props.searchHolder}
				style={{
					marginLeft: '20px'
				}}
			/>
		)
	}

	function filterSearchVisibility(value: any) {
		return has_search.indexOf(value) > -1
	}

	function renderLoadingIcon() {
		return (
			<CircularProgress
				size={20}
				style={{
					position: 'absolute',
					top: '50%',
					right: '50%',
					zIndex: 1600,
					color: '#777777'
				}}
			/>
		)
	}

	function renderOptionToSave() {
		return (
			<Zoom in={props.onEdit}>
				<OptionToSave>
					<CustomButton
						handleClick={props.cancelEdit}
						style={{ marginRight: '30px', background: '#eee' }}
					>
						<strong style={{ color: '#444851' }}>CANCEL</strong>
					</CustomButton>

					<CustomButton
						handleClick={props.saveChangeItem}
						style={{
							backgroundColor: '#b6d36b'
						}}
					>
						SAVE CHANGES
          </CustomButton>
				</OptionToSave>
			</Zoom>
		)
	}

	return (
		<VoiceContainer>
			{renderTitle()}
			{props.loading && renderLoadingIcon()}
			<Divider />
			<Droppable droppableId={props.dropId}>
				{provided => (
					<>
						<VoiceListContainer
							// {...provided.placeholder}
							ref={provided.innerRef}
						>
							{props.children}
						</VoiceListContainer>
						{props.title.match(/Active/) && renderOptionToSave()}
					</>
				)}
			</Droppable>
		</VoiceContainer>
	)
}
