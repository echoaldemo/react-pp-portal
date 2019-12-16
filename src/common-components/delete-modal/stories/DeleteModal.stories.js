import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { DeleteModal } from 'common-components'
import { Dialog } from '@material-ui/core'
import notes from './notes.md'

const stories = storiesOf('Delete modal', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleClose = () => {
        setOpen(false)
      }
      const handleDelete = () => {
        console.log('deleting')
      }

      return (
        <Dialog open={open}>
          <DeleteModal
            header="Test delete modal"
            msg="group"
            name="Test group 101"
            closeFn={handleClose}
            delFn={handleDelete}
          />
        </Dialog>
      )
    }),
  { notes: { markdown: notes } }
)
