import React from 'react'
import { storiesOf } from '@storybook/react'
import { TableLoader } from 'common-components'

const stories = storiesOf('Table Loader', module)

stories.add('default', () => <TableLoader />)
