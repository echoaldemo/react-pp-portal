export default theme => ({
  list: {
    backgroundColor: "#ffffff",
    '&:hover': {
      backgroundColor: "#F8F9FA",
    },
  },
  play: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#444851',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'underline'
    },
    textTransform: 'capitalize'
  },
  add: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#1194f6',
    textTransform: 'capitalize',
    padding: theme.spacing(0, 1),
  },
  title: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: '18px',
    fontWeight: '600',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#444851',
    height: 24
  },
  headerWithButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  callsms: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  callPlay: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
  text: {
    fontFamily: "Roboto, Helvetica, sans-serif",
    fontSize: '14px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#777777'
  },
  card: {
    height: 307,
  },
  noData: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center"
  }
});