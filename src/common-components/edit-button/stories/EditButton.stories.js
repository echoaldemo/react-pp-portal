import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { EditButton } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('EditButton', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      return (
        <>
          <EditButton onClickFunc={() => { alert("Edit button") }} text={"Try Me!"} />
        </>
      )
    }),
  { notes: { markdown: notes } }
)

stories.add(
  'With Style',
  () =>
    createElement(() => {
      return (
        <>
          <EditButton
            onClickFunc={() => { alert("Edit button") }}
            text={"Customize"}
            style={{ backgroundColor: "#b6d36b", width: "120px", height: "50px" }} //button style
            iconStyle={{ color: "white" }}
            textStyle={{ fontStyle: "italic", color: "white" }}
          />
        </>
      )
    }),
  { notes: { markdown: notes } }
)
