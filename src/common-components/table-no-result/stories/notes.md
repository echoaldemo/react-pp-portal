# ** Table no result **

## Sample Code

```
import React from 'react'
import TableNoResult from '../table-no-result'
import { SaveButton } from '../buttons'
//common-components
import { IoIosGlobe } from 'react-icons/io'
import { Add } from '@material-ui/icons'
import styled from 'styled-components'

const Globe = styled(IoIosGlobe)`font-size: 48px;`

const Table = () => {

  const handleClick = () => {
    console.log('creating')
  }

  return (
    <TableNoResult
      icon={<Globe />}
      headerText="Global option groups"
      mainMessage="No global option groups have been created"
      subMessage="Would you like to creat one? Just hit the “New option group” button."
      renderButton={
        <SaveButton onClick={handleClick}>
          <Add />
          New option group
        </SaveButton>
      }
    />
  )
}

export default Table

```

### Props

| Name         | Type      |          | Description         |
| ------------ | --------- | -------- | ------------------- |
| icon         | component | -------- | Icon for the table  |
| headerText   | string    | -------- | Header Text         |
| mainMessage  | string    | -------- | Main Message        |
| subMessage   | string    | -------- | Sub Message         |
| renderButton | component | -------- | Button for creating |
| noHeader     | bool      | -------- | remove the header   |
