import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { TableNoResult } from 'common-components'
// import { SaveButton } from 'common-components'
import { IoIosGlobe } from 'react-icons/io'
import { Add } from '@material-ui/icons'
import styled from 'styled-components'
import notes from './notes.md'

const Globe = styled(IoIosGlobe)`
  font-size: 48px;
`
const stories = storiesOf('Table no result', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const handleClick = () => {
        console.log('creating')
      }

      return (
        <TableNoResult
          icon={<Globe />}
          headerText="Global option groups"
          mainMessage="No global option groups have been created"
          subMessage="Would you like to creat one? Just hit the “New option group” button."

        // renderButton={
        //   <SaveButton onClick={handleClick}>
        //     <Add />
        //     New option group
        //   </SaveButton>
        // }
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'no header',
  () =>
    createElement(() => {
      const handleClick = () => {
        console.log('creating')
      }

      return (
        <TableNoResult
          noHeader
          mainMessage="No global option groups have been created"
          subMessage="Would you like to creat one? Just hit the “New option group” button."
        // renderButton={
        //   <SaveButton onClick={handleClick}>
        //     <Add />
        //     New option group
        //   </SaveButton>
        // }
        />
      )
    }),
  { notes: { markdown: notes } }
)
