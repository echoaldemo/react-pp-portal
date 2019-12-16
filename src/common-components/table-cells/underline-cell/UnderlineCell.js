// @flow

import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'

const Cell = styled(TableCell)`
  text-decoration: underline;
  p {
    width: fit-content;
    cursor: pointer;
    margin: 0;
  }
`

function UnderlineCell(props) {
  return (
    <Cell {...props}>
      <p>{props.children}</p>
    </Cell>
  )
}

export default UnderlineCell
