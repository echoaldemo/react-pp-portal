import { createMuiTheme, makeStyles } from '@material-ui/core'
import styled from 'styled-components'
import { FaChartBar } from 'react-icons/fa'

const backStyles = {
  goBack: {
    fontSize: 16,
    marginBottom: 22,
    maxWidth: '20%'
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    color: '#1194f6',
    textDecoration: 'none',
    minWidth: 300,
    marginLeft: -6,
    cursor: 'pointer'
  }
}

const theme = createMuiTheme({
  shape: {
    borderRadius: 0
  },
  overrides: {
    MuiTabs: {
      root: {
        minHeight: 'initial'
      }
    }
  }
})

const buttonTabStyle = makeStyles(theme => ({
  Tabs: {
    color: '#919ca7',
    backgroundColor: '#eeeeee',
    borderRadius: '3px',
    width: 'fit-content',
    '& span': {
      maxHeight: 40,
      marginBottom: 7,
      fontWeight: 600
    },
    '& div': {
      maxHeight: 40
    },
    '& button': {
      padding: 0,
      maxHeight: 40
    }
  },
  indicator: {
    backgroundColor: 'transparent'
  },
  activeTab: {
    backgroundColor: '#f4a429',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    '@media (max-width: 336px)': {
      fontSize: '11px !important'
    },
    '@media (max-width: 425px)': {
      fontSize: 11
    },
    '@media (max-width: 499px)': {
      fontSize: 12
    },
    '@media (max-width: 714px)': {
      fontSize: '12px !important'
    },
    '@media (max-width: 866px)': {
      fontSize: 13
    }
  },
  notActive: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 500,
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    textAlign: 'center',
    '@media (max-width: 336px)': {
      fontSize: '11px !important'
    },
    '@media (max-width: 425px)': {
      fontSize: 11
    },
    '@media (max-width: 499px)': {
      fontSize: 12
    },
    '@media (max-width: 714px)': {
      fontSize: '12px !important'
    },
    '@media (max-width: 866px)': {
      fontSize: 13
    }
  }
}))

const Span = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #444851;
  text-decoration: underline;
  cursor: pointer;
`
const Icon = styled.span`
  font-size: 19px;
  margin-right: 4px;
  display: flex;
  align-items: center;
`

const Save = styled.button`
  min-width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #b6d36b;
  border: none;
  outline: none;
  cursor: pointer;
`
const SaveText = styled.strong`
  font-size: 14px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`
const DisSave = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #eeeeee;
  border: none;
  outline: none;
`
const DisText = styled.strong`
  font-size: 14px;
  color: #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
`

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

export {
  backStyles,
  theme,
  buttonTabStyle,
  Span,
  Icon,
  Save,
  SaveText,
  DisSave,
  DisText,
  Sale,
  SaleText,
  Bill,
  BillText,
  Chart1,
  Chart2
}
