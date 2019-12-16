# ** Delete Modal **

## Sample Code

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
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
    <Dialog open={open}>
      <DeleteModal
        header="Test delete modal"
        msg="group"
        name="Test group 101"
        closeFn={handleClose}
        delFn={handleDelete}
      />
    </Dialog>
  )
}

export default Delete
```

### Props

| Name    | Type     |          | Description     |
| ------- | -------- | -------- | --------------- |
| header  | string   | required | header name     |
| msg     | string   | required | what type data  |
| name    | string   | required | name of data    |
| closeFn | function | required | close the modal |
| delFn   | function | required | delete function |
