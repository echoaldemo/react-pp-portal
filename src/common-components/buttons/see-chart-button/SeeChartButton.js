import React from 'react'
import styled from 'styled-components'
import { FaChartBar } from 'react-icons/fa'

const Sale = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`
const SaleText = styled.span`
  font-size: 16px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
`
const Bill = styled.button`
  min-width: 165px;
  min-height: 40px;
  border-radius: 3px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`
const BillText = styled.span`
  font-size: 16px;
  color: #50555a;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  text-decoration: underline;
`
const Chart1 = styled(FaChartBar)`
  color: #f89523;
  margin-right: 8px;
`
const Chart2 = styled(FaChartBar)`
  color: white;
  margin-right: 8px;
`

const SeeChartButton = props => {
  return props.mode === 'sales' ? (
    <Sale {...props}>
      <SaleText>
        <Chart2 />
        See chart
      </SaleText>
    </Sale>
  ) : props.mode === 'bills' ? (
    <Bill {...props}>
      <BillText>
        <Chart1 />
        See chart
      </BillText>
    </Bill>
  ) : null
}

export default SeeChartButton
