import React, { useState, useEffect } from 'react'
import {
  Button,
  Popover,
  MenuList,
  MenuItem,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const HeaderLink = ({ menu, pathSensitive, style, title }) => {

  const [popper, setPopper] = useState(false)
  const [anchorRef, setAnchorRef] = useState(null)

  useEffect(() => {
    if (pathSensitive) {
      checkLinks()
    }
  }, [])


  const checkLinks = () => {
    if (typeof window != 'undefined') {
      menu.map(item => {
        if (window.location.pathname == item.path) {
        }
      })
    }

  }

  const handlePopper = (event) => {
    setPopper(true)
    setAnchorRef(event)
  }
  const handlePopperClose = () => {
    setPopper(false)
  }

  return (
    <div
      style={{
        ...style
      }}
    >
      <Button
        style={{
          fontSize: '24px',
          textTransform: 'none',
          textDecoration: 'underline',
          color: '#444851'
        }}
        onClick={event => {
          handlePopper(event.currentTarget)
        }}
      >
        {title}

        <ExpandMoreIcon style={{ marginLeft: '3px' }}></ExpandMoreIcon>
      </Button>

      <Popover
        open={popper}
        anchorEl={anchorRef}
        onClose={() => {
          handlePopperClose()
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        PaperProps={{
          square: true,
          style: {
            borderRadius: 1,
            marginTop: -3
          }
        }}
      >
        <MenuList style={{ width: '240px', color: ' #777777' }}>
          {menu.map((item, i) => (
            <div key={i}>
              <Link
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: ' #777777'
                }}
              >
                <MenuItem
                  style={{
                    fontSize: 15
                    // paddingLeft: 15,
                    // paddingTop: 10,
                    // paddingBotton: 10
                  }}
                >
                  {item.title}{' '}
                </MenuItem>
              </Link>
            </div>
          ))}
        </MenuList>
      </Popover>
    </div>
  )
}

export { HeaderLink }