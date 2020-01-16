import React from 'react'
import PropTypes from 'prop-types'
import {
	Tabs,
	Tab,
	Typography,
	Box,
	makeStyles,
	CircularProgress
} from '@material-ui/core'

//Panel Components
import styled from 'styled-components'
import Settings from './Settings'
import ProspectVoice from '../../../global-rr-test/prospect-voices'
import Segments from '../../../global-rr-test/segments'
import Campaigns from './Campaigns'
const CustomTabs = styled(Tabs)`
  background-color: '#FFF' !important;
`

interface Props {
	other?: any
	children: React.ReactNode
	style?: any
	value: any
	index: number
	className?: any
}

function TabPanel(props: Props) {
	const { children, style, value, index, ...other } = props

	return (
		<Typography
			style={style}
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Box>{children}</Box>
		</Typography>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	}
}

const useStyles = makeStyles(() => ({
	root: { minHeight: 600 },
	tab: {
		fontWeight: 600,
		fontSize: 14,
		color: '#444851',
		padding: 16
	},
	tabsContainer: {
		borderBottom: 'solid 2px #F1F1F1',
		width: '95%',
		margin: '0 auto'
	},
	panelContainer: {
		minHeight: 600,
		height: '100%'
	}
}))

export default function SimpleTabs(props: any) {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)

	const handleChange = (event: any, newValue: any) => {
		setValue(newValue)
	}

	return (
		<div className={classes.root}>
			<div className={classes.tabsContainer}>
				<CustomTabs
					value={value}
					onChange={handleChange}
					TabIndicatorProps={{
						style: {
							height: '5px',
							backgroundColor: 'rgb(248 , 149 , 35)'
						}
					}}
				>
					<Tab
						disableFocusRipple={true}
						label="SETTINGS"
						{...a11yProps(0)}
						className={classes.tab}
					/>
					<Tab
						disableFocusRipple={true}
						label="SEGMENTS"
						{...a11yProps(1)}
						className={classes.tab}
					/>
					<Tab
						disableFocusRipple={true}
						label="PROSPECT VOICES"
						{...a11yProps(2)}
						className={classes.tab}
					/>
					<Tab
						disableFocusRipple={true}
						label="CAMPAIGNS"
						{...a11yProps(3)}
						className={classes.tab}
					/>
				</CustomTabs>
			</div>
			<TabPanel value={value} index={0} className={classes.panelContainer}>
				{props.loading && (
					<span
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							minHeight: 400,
							zIndex: 2,
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							position: 'absolute',
							color: 'rgba(0,0,0,0.6)'
						}}
					>
						<Typography variant="h5" color="inherit">
							Loading test details...
            </Typography>
						<CircularProgress />
					</span>
				)}
				<Settings
					test={props.test}
					history={props.props.history}
					handleUpdate={props.handleUpdate}
				/>
			</TabPanel>
			<TabPanel value={value} index={2} className={classes.panelContainer}>
				<ProspectVoice
					router={{ ...props.props }}
					history={props.props.history}
					testId={props.test ? props.test.uuid : null}
					data={props.test ? props.test.voices : []}
				/>
			</TabPanel>

			<TabPanel value={value} index={1} className={classes.panelContainer}>
				<Segments
					router={{ ...props.props }}
					testId={props.test ? props.test.uuid : null}
				// data={props.test ? props.test.segments : []}
				/>
			</TabPanel>
			<TabPanel value={value} index={3} className={classes.panelContainer}>
				<Campaigns />
			</TabPanel>
		</div>
	)
}
