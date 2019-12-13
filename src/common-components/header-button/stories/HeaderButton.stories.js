import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderButton } from 'common-components'
import notes from './notes.md'
const stories = storiesOf('Header Button', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      return (
        <HeaderButton
          openFunction={() => alert('test')}
          buttonText="New button"
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'w/o add icon',
  () =>
    createElement(() => {
      return (
        <HeaderButton
          openFunction={() => alert('test')}
          buttonText="New button"
          noIcon
        />
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'with styles',
  () =>
    createElement(() => {
      return (
        <HeaderButton
          openFunction={() => alert('test')}
          buttonText="New button"
          style={{ width: 200 }}
        />
      )
    }),
  { notes: { markdown: notes } }
)
