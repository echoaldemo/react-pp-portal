import React, { useState } from 'react'
import { MenuItem, Typography } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import styled from 'styled-components'
import { InputField } from 'common-components'
import { Player } from '../index'
import { PlayArrow } from '@material-ui/icons'
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1194f6' }
  },
  overrides: {
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
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: '#ffffff'
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
          backgroundColor: '#ffffff',
          '&&:hover': {
            backgroundColor: '#ffffff'
          },
          '&&:active:after': {
            backgroundColor: '#ffffff'
          }
        }
      }
    }
  }
})

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250
    }
  }
}

const CustomTag = styled(Typography)`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #999999;
`

const Text = styled(Typography)`
  font-size: 16px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`

const PrePlay = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`

const Link = styled(Text)`
  text-decoration: underline;
  font-size: 14px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`

const Select = props => {
  const [openPlay, setOpenPlay] = useState(false)
  const [activeItem, setActiveItem] = useState(props.data.selection[0].src)
  const [selected, setSelected] = useState(props.data.selection[0].uuid)
  function setSelectedItem(value) {
    setSelected(value)
    setActiveItem(props.data.selection.filter(key => key.uuid === value)[0].src)
  }

  function openPlayer(value) {
    setOpenPlay(value)
  }

  function renderPrePlay() {
    return (
      <div>
        {!openPlay && (
          <PrePlay onClick={e => openPlayer(true)}>
            <PlayArrow style={{ marginRight: '14px' }} />
            <Link>Click to play audio</Link>
          </PrePlay>
        )}

        {openPlay && <Player src={activeItem} player={openPlayer} />}
      </div>
    )
  }

  return (
    <MuiThemeProvider theme={theme}>
      <div
        style={{
          maxWidth: '100%',
          margin: 0
        }}
      >
        <CustomTag
          style={{
            marginBottom: '-20px'
          }}
        >
          {props.data.label}
        </CustomTag>

        <InputField
          data-cy="select-3-5"
          fullWidth
          select
          SelectProps={{
            MenuProps,
            IconComponent: () => <KeyboardArrowDown />,
            onChange: e => setSelectedItem(e.target.value)
          }}
          margin="normal"
          value={selected}
        >
          {props.data.selection.map(key => {
            return (
              <MenuItem key={key.uuid} value={key.uuid} data-cy="select-list">
                <CustomTag style={{ fontSize: '18px', color: '#444851' }}>
                  {key.name}
                </CustomTag>
              </MenuItem>
            )
          })}
          );
        </InputField>
        {renderPrePlay()}
      </div>
    </MuiThemeProvider>
  )
}
export default Select
