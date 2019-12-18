# ** Loading Modal **

## Sample Code

```
import React, { useState } from 'react'
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
        open={open}
        text={'One moment. We’re removing the campaign…'}
        cancelFn={handleCancel}
      />
    </Dialog>
  )
}

export default Loading
```

### Props

| Name     | Type     | Default  | Description       |
| -------- | -------- | -------- | ----------------- |
| open     | boolean  | required | to open the modal |
| text     | string   | required | loading message   |
| cancelFn | function | required | cancel function   |
