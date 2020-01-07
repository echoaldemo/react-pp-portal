import React from 'react'
import { StateProvider } from './store'
import List from './List'

export default () => {
  return (
    <StateProvider>
      <List />
    </StateProvider>
  )
}
