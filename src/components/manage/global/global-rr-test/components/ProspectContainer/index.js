import React, { useState } from 'react'
import styled from 'styled-components'
import { Typography, Divider, CircularProgress, Zoom } from '@material-ui/core'
import { CustomButton } from 'common-components'

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
  height: 420px;
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
        <TitleText>{props.title}</TitleText>
        {/* <IconButton>
          <Search size={16} />
        </IconButton> */}
      </VoiceTitle>
    )
  }

  function renderSearch() {
    return (
      <VoiceTitle>
        <TitleText>I am the search component</TitleText>
      </VoiceTitle>
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

  function renderOptionToSave(voice) {
    return (
      <Zoom in={props.onEdit}>
        <OptionToSave>
          <CustomButton
            onClick={() => props.cancelEdit()}
            style={{ marginRight: '30px' }}
          >
            CANCEL
          </CustomButton>

          <CustomButton
            onClick={() => props.saveChangeItem()}
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
      {props.loading && renderLoadingIcon()}
      {(!is_search || !filterSearchVisibility(props.type)) && renderTitle()}
      {is_search && filterSearchVisibility(props.type) && renderSearch()}
      <Divider />
      <VoiceListContainer>{props.children}</VoiceListContainer>
      {props.title.match(/Active/) && renderOptionToSave()}
    </VoiceContainer>
  )
}
