import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { MetricContainer } from 'common-components'
import { FiMap } from 'react-icons/fi'
import notes from './notes.md'
const stories = storiesOf('Metric Container', module)

stories.add(
  'default',
  () =>
    createElement(() => {
      return (
        <>
          <style>
            @import
            url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
          </style>
          <MetricContainer
            icon={<FiMap style={{ height: 20, width: 20, color: '#f89523' }} />}
            header="Campaign Metrics"
            editFn={() => alert('edit')}
          >
            test
          </MetricContainer>
        </>
      )
    }),
  {
    notes: { markdown: notes }
  }
)
