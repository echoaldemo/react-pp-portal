# ** Panel Tabs **

## Sample Code

```
import React, { useState } from 'react'
import { PanelTabs, Panel } from 'common-components'
//common-components

const TabPanel = () => {
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
}

export default TabPanel
```

### PanelTabs Props

| Name   | Type     | Default  | Description          |
| ------ | -------- | -------- | -------------------- |
| labels | array    | required | array of string name |
| tab    | int      | required | current selected tab |
| setTab | function | required | change tab           |

### Panel Props

| Name  | Type | Default  | Description          |
| ----- | ---- | -------- | -------------------- |
| value | int  | required | current selected tab |
| index | int  | required | position of tab      |
