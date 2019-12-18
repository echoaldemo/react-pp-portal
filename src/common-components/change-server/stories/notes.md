# ** Change Server **

## Sample Code

```
import React , { useState } from 'react'
import { ChangeServer } from "common-components";
//common-components

const ChangeServerSelect = () => {
  const [selected, setSelected] = useState("1");
    const options = [
      {
        name: "PP23",
        uuid: "1"
      },
      {
        name: "PP33",
        uuid: "2"
      }
    ];
    return (
      <>
        <ChangeServer
          selected={selected}
          options={options}
          onChangeFn={setSelected}
        />
      </>
    );
}

export default ChangeServerSelect
```

### Props

| Name       | Type     | Default  | Description          |
| ---------- | -------- | -------- | -------------------- |
| onChangeFn | function | required | on change action     |
| selected   | string   | required | Selected value       |
| options    | array    | required | select option values |
