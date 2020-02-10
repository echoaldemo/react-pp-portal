import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'
import { Notifications } from '@material-ui/icons'
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: 1500
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    position: 'fixed',
    marginTop: `${localStorage.getItem('is_impersonate') ? '36px' : 0}`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: '#444851',
    boxShadow: 'none'
  },
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '26px',
    letterSpacing: '0.1px',
    opacity: '0.85'
  }
}))

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.6);
`
const Img = styled.img`
  height: 34px;
  margin: 0 22px 0 6px;
`
const NotifIcon = styled(Notifications)`
  margin: 0 12px 0 auto;
`
const WelcomeName = styled.span`
  font-size: 18px;
  color: #ffffff;
`

export { useStyles, StyledLink, Img, NotifIcon, WelcomeName }