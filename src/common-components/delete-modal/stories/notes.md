# ** Delete Modal **

## Sample Code

```
import React, { useState } from 'react'
import { DeleteModal } from 'common-components'

const Delete = () => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }
  const handleDelete = () => {
    console.log('deleting')
  }

  return (
    <DeleteModal
      open={open}
      header="Test delete modal"
      msg="group"
      name="Test group 101"
      closeFn={handleClose}
      delFn={handleDelete}
    />
  )
}

export default Delete
```

### Props

| Name    | Type     |          | Description       |
| ------- | -------- | -------- | ----------------- |
| open    | boolean  | required | to open the modal |
| header  | string   | -------- | header name       |
| msg     | string   | -------- | what type data    |
| name    | string   | required | name of data      |
| closeFn | function | required | close the modal   |
| delFn   | function | required | delete function   |
