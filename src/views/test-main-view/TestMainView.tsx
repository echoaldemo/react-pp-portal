import React from 'react'
import { Modal, BackButton } from 'common-components'

const MainView = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>open</button>
      <BackButton text="Back" backFn={() => alert('back')} to="/" />
      <Modal open={open} title="Modal Test" onClose={() => setOpen(false)}>
        Modal Test
      </Modal>
    </>
  )
}

export default MainView
