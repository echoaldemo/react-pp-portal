import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Modal } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('Modal', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(false)

      return (
        <>
          <button onClick={() => setOpen(true)}>open</button>
          <Modal open={open} title="Modal Test" onClose={() => setOpen(false)}>
            Awesome!
          </Modal>
        </>
      )
    }),
  { notes: { markdown: notes } }
)
