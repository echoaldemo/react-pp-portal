# ** Success Modal **

## Sample Code default

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import { SuccessModal } from 'common-components'

const Success = () => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }
  const handleBtn = () => {
    console.log('Testing')
  }

  return (
    <SuccessModal
      open={open}
      text={'You have removed “HOPE Closers” from PP23'}
      btnText={'ADD CAMPAIGN'}
      closeFn={handleClose}
      btnFn={handleBtn}
    />
  )
}

export default Success
```

## Sample Code without add button

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import { SuccessModal } from 'common-components'

const Success = () => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SuccessModal
      open={open}
      text={'You have removed “HOPE Closers” from PP23'}
      closeFn={handleClose}
    />
  )
}

export default Success
```

## Sample Code new user modal

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import { SuccessModal } from 'common-components'

const Success = () => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }
  const handleBtn = () => {
    console.log('Testing')
  }

  return (
      <SuccessModal
        user
        open={open}
        text={'You have created Cherry Zuniga'}
        closeFn={handleClose}
        btnFn={handleBtn}
      />
  )
}

export default Success
```

### Props

| Name    | Type     |          | Description             |
| ------- | -------- | -------- | ----------------------- |
| open    | boolean  | required | to open the modal       |
| text    | string   | required | success message         |
| closeFn | function | required | close function          |
| btnText | string   | -------- | text on button function |
| btnFn   | function | -------- | function on button      |
| user    | bool     | -------- | custom user modal       |
| warning | bool     | -------- | icon for warning modal  |
