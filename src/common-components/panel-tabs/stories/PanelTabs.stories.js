import React, { createElement, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Panel, PanelTabs } from 'common-components'
import notes from './notes.md'
const stories = storiesOf('Panel Tabs', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      const [tab, setTab] = useState(0)

      return (
        <>
          <PanelTabs labels={['test', 'test1']} tab={tab} setTab={setTab} />
          <Panel value={tab} index={0}>
            test1
          </Panel>
          <Panel value={tab} index={1}>
            test2
          </Panel>
        </>
      )
    }),
  { notes: { markdown: notes } }
)
