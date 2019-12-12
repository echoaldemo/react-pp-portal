# ** Loading Modal **

## Sample Code

```
import React, { useState } from 'react'
import { Dialog } from '@material-ui/core'
import { LoadingModal } from 'common-components'

const Loading = () => {
  const [open, setOpen] = useState(true)

  const handleCancel = () => {
    console.log('cancel')
    setOpen(false)
  }

  return (
    <Dialog open={open}>
      <LoadingModal
        text={'One moment. We’re removing the campaign…'}
        cancelFn={handleCancel}
      />
    </Dialog>
  )
}

export default Loading
```

### Props

| Name     | Type     | Default  | Description     |
| -------- | -------- | -------- | --------------- |
| text     | string   | required | loading message |
| cancelFn | function | required | cancel function |
