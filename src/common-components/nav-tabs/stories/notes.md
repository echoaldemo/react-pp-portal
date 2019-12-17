# ** Nav Tabs **

## Sample Code

```
//importing
import { NavTabs } from 'common-components'

//rendering
<NavTabs
  tabnames={[
    {
    name: "SETTINGS",
    active: true,
    onClickFn: () => console.log("settings")
    },
    {
    name: "PITCH",
    active: false,
    onClickFn: () => console.log("pitch")
    }
  ]}
/>

```

### Nav Tabs Props

| Name     | Type             |          | Description                 |
| -------- | ---------------- | -------- | --------------------------- |
| tabnames | array of objects | required | [{name, active, onClickFn}] |
