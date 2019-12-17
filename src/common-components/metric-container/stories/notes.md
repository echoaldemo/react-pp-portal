# ** Loading Modal **

## Sample Code

```
import React from 'react'
import { FiMap } from 'react-icons/fi'
import { MetricContainer } from 'common-components'

const Container = () => {
  return (
    <MetricContainer
      icon={<FiMap style={{ height: 20, width: 20, color: '#f89523' }} />}
      header="Campaign Metrics"
      editFn={() => alert('edit')}
    >
      test
    </MetricContainer>
  )
}

export default Container
```

### Props

| Name   | Type      | Default  | Description          |
| ------ | --------- | -------- | -------------------- |
| icon   | component | -------- | header icon          |
| header | string    | -------- | header               |
| editFn | function  | required | edit button function |
