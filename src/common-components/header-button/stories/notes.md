# ** Header Button **

## Sample Code

```
import React from 'react'
import { HeaderButton } from 'common-components'

const Header = () => {

  return (
    <HeaderButton
      openFunction={() => alert('test')}
      buttonText="New button"
    />
  )
}

export default Header
```

### Props

| Name         | Type     | Default  | Description         |
| ------------ | -------- | -------- | ------------------- |
| openFunction | function | required | on click action     |
| buttonText   | string   | -------- | text on button      |
| noIcon       | boolean  | false    | display add icon    |
| style        | object   | -------- | add style on button |
