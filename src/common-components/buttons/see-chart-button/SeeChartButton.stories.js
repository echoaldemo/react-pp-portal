import React, { createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { SeeChartButton } from '../../buttons'
const stories = storiesOf('See Chart Button', module)

stories.add('bill', () =>
  createElement(() => {
    const handleClick = () => {
      alert('test')
    }
    return <SeeChartButton mode="bills" onClick={handleClick} />
  })
)

stories.add('sale', () =>
  createElement(() => {
    const handleClick = () => {
      alert('test')
    }
    return <SeeChartButton mode="sales" onClick={handleClick} />
  })
)
