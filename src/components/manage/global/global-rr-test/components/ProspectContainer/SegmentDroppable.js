import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Typography,
  Divider,
  IconButton,
  Input,
  CircularProgress,
  Zoom
} from '@material-ui/core'
import { Search, Close } from '@material-ui/icons'
import InputField from '../../../../../common-components/input-field/InputField'
import { Droppable } from 'react-beautiful-dnd'
import {
  CustomButton,
  CustomText
} from '../../../../../common-components/custom-components'
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

export default props => {
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
          <IconButton onClick={e => setIsSearch(true)}>
            <Search size={16} />
          </IconButton>
        ) : (
          <IconButton onClick={e => closeSearch()}>
            <Close />
          </IconButton>
        )}
      </>
    )
  }

  function handleSearch(e) {
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

  function filterSearchVisibility(value) {
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

  function renderOptionToSave(segments) {
    return (
      <Zoom in={props.onEdit}>
        <OptionToSave>
          <CustomButton
            onClick={e => props.cancelEdit()}
            style={{ marginRight: '30px' }}
          >
            <CustomText size="14px" weight={500}>
              CANCEL
            </CustomText>
          </CustomButton>

          <CustomButton
            onClick={e => props.saveChangeItem()}
            style={{
              backgroundColor: '#b6d36b'
            }}
          >
            <CustomText color="light" size="14px" weight={500}>
              SAVE CHANGES
            </CustomText>
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
        {(provided, snapshot) => (
          <>
            <VoiceListContainer
              {...provided.placeholder}
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
