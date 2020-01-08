import React, { useState } from 'react'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import { AsyncTable } from 'common-components'
import { TableRow, TableCell } from '@material-ui/core'
import Check from '@material-ui/icons/Check'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1194f6'
    }
  }
})

const useStyles = makeStyles(theme => ({
  unCheckedText: {
    fontFamily: 'Roboto',
    fontSize: '0.875rem',
    color: '#777777',
    cursor: 'pointer',
    margin: '10px',
    width: '100% !important',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  },
  CheckedText: {
    fontFamily: 'Roboto',
    fontSize: '0.875rem',
    color: '#444851',
    cursor: 'pointer',
    margin: '10px',
    width: '100% !important',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  }
}))

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 100%;
  min-height: 420px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`
const CloseIcon = styled(Close)`
  cursor: pointer;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 34px 27px 34px;
`

const Title = styled.p`
  width: 173px;
  height: 21px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: #444851;
  margin: 27px 0 0 0;
`

const Subtitle = styled.p`
  width: 506px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  height: 19px;
  font-size: 16px;
  font-weight: normal;
  color: #777777;
`

const SelectAll = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 15px;
  color: #1194f6;
  cursor: pointer;
  margin-top: 18px;
`

const NewUserBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  cursor: pointer;
  cursor: pointer;
  border: none;
  outline: none;
`
const NewUserText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 86px 0fr;
  align-items: center;
  margin-bottom: 20px;
`

const DisBtn = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  outline: none;
  border: none;
`

const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DidPurchase = ({ header, closeFn, placeOrder }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const handleSelect = name => {
    var temp = [...selected]
    if (selected.indexOf(name) === -1) {
      temp.push(name)
      setSelected(temp)
    } else {
      temp.splice(selected.indexOf(name), 1)
      setSelected(temp)
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false)
      setSelected([])
    } else {
      setSelectAll(true)
      setSelected([
        'checked1',
        'checked2',
        'checked3',
        'checked4',
        'checked5',
        'checked6'
      ])
    }
  }

  const headers = [
    { title: 'Phone', check: true, state: selectAll, clickFn: handleSelectAll },
    'Network',
    'ThingQ Tier'
  ]
  const CheckBoxLabel = props => {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '0fr 1fr'
            }}
          >
            <Checkbox
              onClick={() => handleSelect(props.name)}
              color="primary"
              checked={selected.indexOf(props.name) === -1 ? false : true}
            />
            <p
              onClick={() => handleSelect(props.name)}
              className={
                selected.indexOf(props.name) === -1
                  ? classes.unCheckedText
                  : classes.CheckedText
              }
            >
              {props.label}
            </p>
          </div>
        </MuiThemeProvider>
      </>
    )
  }
  const tableData = [
    {
      name: 'checked1',
      phone: '(406) 262-8717',
      network: 'Inteliquent',
      tier: '1'
    },
    {
      name: 'checked2',
      phone: '(406) 262-8718',
      network: 'Inteliquent',
      tier: '1'
    },
    {
      name: 'checked3',
      phone: '(406) 262-8719',
      network: 'Inteliquent',
      tier: '1'
    },
    {
      name: 'checked4',
      phone: '(406) 262-8720',
      network: 'Inteliquent',
      tier: '1'
    },
    {
      name: 'checked5',
      phone: '(406) 262-8721',
      network: 'Inteliquent',
      tier: '1'
    }
  ]
  return (
    <Center>
      <Box>
        <Header>
          <CenterText>{header}</CenterText>
          <CloseIcon onClick={closeFn} />
        </Header>
        <Content>
          <Title>DID's results</Title>
          <GridDiv>
            <Subtitle>
              Please select each DID or click "Select All" before clicking on
              “Order”.
            </Subtitle>
            <SelectAll onClick={handleSelectAll}>Select All</SelectAll>
            {selected.length === 0 ? (
              <DisBtn>
                <DisText>
                  <Check style={{ width: 18, marginRight: 4 }} /> place order
                </DisText>
              </DisBtn>
            ) : (
              <NewUserBtn onClick={() => placeOrder(selected.length)}>
                <NewUserText>
                  <Check style={{ width: 18, marginRight: 4 }} /> place order
                </NewUserText>
              </NewUserBtn>
            )}
          </GridDiv>
          <AsyncTable
            withBorder={true}
            headers={headers}
            tableData={tableData}
            render={(results, { row, cell, icon }) => {
              return results.map((result, i) => (
                <TableRow key={i} className={row}>
                  <TableCell className={cell}>
                    {' '}
                    <CheckBoxLabel name={result.name} label={result.phone} />
                  </TableCell>
                  <TableCell className={cell}>{result.network}</TableCell>
                  <TableCell className={cell}>{result.tier}</TableCell>
                </TableRow>
              ))
            }}
          />
        </Content>
      </Box>
    </Center>
  )
}

export default DidPurchase
