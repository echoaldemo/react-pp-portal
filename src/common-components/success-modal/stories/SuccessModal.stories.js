import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { SuccessModal } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('Success Modal', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleClose = () => {
        setOpen(false)
      }
      const handleBtn = () => {
        console.log('Testing')
      }

      return (
        <SuccessModal
          open={open}
          text={'You have removed “HOPE Closers” from PP23'}
          btnText={'ADD CAMPAIGN'}
          closeFn={handleClose}
          btnFn={handleBtn}
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'without add button',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleClose = () => {
        setOpen(false)
      }

      return (
        <SuccessModal
          open={open}
          text={'You have removed “HOPE Closers” from PP23'}
          closeFn={handleClose}
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'warning',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleClose = () => {
        setOpen(false)
      }
      const handleBtn = () => {
        console.log('Testing')
      }

      return (
        <SuccessModal
          open={open}
          text={'Are you sure you want to remove “HOPE Closers” from PP23?'}
          btnText={'YES, REMOVE'}
          closeFn={handleClose}
          btnFn={handleBtn}
          warning
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'new user modal',
  () =>
    createElement(() => {
      const [open, setOpen] = useState(true)

      const handleClose = () => {
        setOpen(false)
      }
      const handleBtn = () => {
        console.log('Testing')
      }

      return (
        <SuccessModal
          user
          open={open}
          text={'You have created Cherry Zuniga'}
          closeFn={handleClose}
          btnFn={handleBtn}
        />
      )
    }),
  { notes: { markdown: notes } }
)
