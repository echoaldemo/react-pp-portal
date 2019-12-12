# ** Modal **

## Sample Code

```
import React, { createElement, useState } from 'react'
import Modal from '../Modal'
//common-components

const ModalTest = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <Modal open={open} title="Modal Test" onClose={() => setOpen(false)}>
        Modal Test
      </Modal>
    </>
  )
}

export default ModalTest
```

### Props

| Name    | Type     | Default  | Description   |
| ------- | -------- | -------- | ------------- |
| open    | bool     | required | open modal    |
| title   | string   | required | modal header  |
| onClose | function | required | close modal   |
| width   | int      | -------- | with of modal |
