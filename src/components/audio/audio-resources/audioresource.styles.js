const useStyles = theme => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    width: '100%'
  },
  container: {
    width: '100%',
    padding: 0,
    margin: 0
  },
  navwrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6
  },
  primaryBtn: {
    background: '#b6d36b',
    color: 'white',
    '&:hover': {
      background: '#a6c556'
    },
    width: '300px'
  },
  paper: {
    borderRadius: 3,
    boxShadow: '0 0 6px 1px rgba(155, 155, 155, 0.18)',
    backgroundColor: '#ffffff',
    height: '100%'
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '600',
    color: '#444851'
  },
  searchWrapper: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'relative',
    left: '-23px',
    top: '5px',
    color: '#bbbbbb'
  },
  linkText: {
    textDecoration: 'underline'
  },
  uploadBtn: {
    width: '165px',
    height: '40px',
    borderRadius: '3px',
    backgroundColor: '#7c8a97',
    color: 'white',
    margin: 'auto',
    '&:hover': {
      backgroundColor: '#7c8a97'
    }
  },
  settings: {
    cursor: 'pointer'
  },
  largeTitle: {
    backgroundColor: '#7c8a97',
    height: '20vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    // marginTop: 20,
    '@media (max-width: 425px)': {
      height: '14vh'
    }
  },
  emptyPitch: {
    backgroundColor: '#fafafa',
    height: '30vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#83909c',
    textAlign: 'center',
    fontSize: '15px'
  },
  headerTitle: {
    fontSize: 40,
    '@media (max-width: 528px)': {
      fontSize: 28
    },
    '@media (max-width: 425px)': {
      fontSize: 24
    },
    '@media (max-width: 320px)': {
      fontSize: 20
    }
  }
})

export default useStyles
