import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { HeadMenu } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('HeadMenu', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      return (
        <>
          <HeadMenu
            location={{ pathname: "/manage/user" }}
            getData={() => {
              return { first_name: "StoryBook", last_name: "User" }
            }}
            logout={() => {
              alert("Logout")
            }}
          />
        </>
      )
    }),
  { notes: { markdown: notes } }
)
