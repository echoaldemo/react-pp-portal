import React from 'react'
import { SDContainer } from '../../../components'
export default props => {
  return (
    <SDContainer
      loading={props.loading}
      saveChangeItem={props.saveChangeItem}
      type="segments"
      search={props.search}
      searchHolder={props.searchHolder}
      title={props.title}
      dropId={props.dropId}
      onEdit={props.onEdit}
      cancelEdit={props.cancelEdit}
    >
      {props.children}
    </SDContainer>
  )
}
