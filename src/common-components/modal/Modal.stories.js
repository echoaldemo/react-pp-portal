import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import Modal from 'common-components/modal'
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
            Modal Test
          </Modal>
        </>
      )
    }),
  { notes: { markdown: notes } }
)
