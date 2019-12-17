import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { HeaderLink } from 'common-components'
import notes from './notes.md'

const stories = storiesOf('HeaderLink', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      return (
        <>
          <HeaderLink
            menu={[
              {
                title: 'Users',
                path: '/manage/users'
              },
              {
                title: 'Companies',
                path: '/manage/companies'
              },
              {
                title: 'Locations',
                path: '/manage/locations'
              },
              {
                title: 'Realms',
                path: '/manage/realms'
              },
              {
                title: 'DID Pools',
                path: '/manage/did-pool'
              },
              {
                title: 'Dids',
                path: '/manage/dids'
              }
            ]}
            title="Campaigns"
          />
        </>
      )
    }),
  { notes: { markdown: notes } }
)



