import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Dialog } from '@material-ui/core'
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
        <Dialog open={open}>
          <LoadingModal
            text={'One moment. We’re removing the campaign…'}
            cancelFn={handleCancel}
          />
        </Dialog>
      )
    }),
  {
    notes: { markdown: notes }
  }
)
