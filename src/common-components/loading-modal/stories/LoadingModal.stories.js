import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { LoadingModal } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('Loading Modal', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleCancel = () => {
        console.log('cancel')
        setOpen(false)
      }

      return (
        <LoadingModal
          open={open}
          text={'One moment. We’re removing the campaign…'}
          cancelFn={handleCancel}
        />
      )
    }),
  {
    notes: { markdown: notes }
  }
)
