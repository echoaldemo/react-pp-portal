/* eslint-disable */
import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/ClearAll";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import Tooltip from "@material-ui/core/Tooltip";
import TrendingUp from "@material-ui/icons/TrendingUp";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { useStyles } from "./style";

interface Props extends RouteComponentProps<any> {
	location: any;
	handleDrawerClose: any;
	open: boolean;
	match: any;
}

const Dashboard: React.FC<Props> = ({
	location,
	handleDrawerClose,
	open,
	match
}) => {
	const classes: any = useStyles();
	const [openList, setOpenList] = React.useState(false);
	const [openAudio, setOpenAudio] = React.useState(false);
	const [openGlobal, setOpenGlobal] = React.useState(false);
	const { pathname } = location;
	const type = localStorage.getItem("type");
	const paramSlug = match.params.slug;

	function agentCheck() {
		if (
			pathname.includes(`/dashboard/all/${paramSlug}/agent-rank`) ||
			pathname.includes(`/dashboard/all/${paramSlug}/agent-trend`) ||
			pathname.includes(`/dashboard/all/${paramSlug}/agents`)
		) {
			return true;
		} else {
			return false;
		}
	}

	function performanceCheck() {
		if (pathname.includes(`/dashboard/all/${paramSlug}/lists/`)) {
			return true;
		} else {
			return false;
		}
	}

	function optionsCheck() {
		if (pathname.includes(` /dashboard/all/${paramSlug}/goals`)) {
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaperClose)
				}}
			>
				<Divider />
				<div className={classes.iconSection}>
					{/* start remove from recorder */}
					{type !== "10" ? (
						<React.Fragment>
							<Tooltip title="Gateway" placement="right">
								<Link to="/gateway">
									<div className={classes.navButton}>
										<DashboardOutlinedIcon />
									</div>
								</Link>
							</Tooltip>

							<Tooltip title="Campaign Metrics" placement="right">
								<Link
									to={`/dashboard/all/${paramSlug}/overview`}
									className={classes.customLink}
								>
									<div
										className={
											pathname.includes(`/dashboard/all/${paramSlug}/overview`)
												? classes.active
												: classes.navButton
										}
									>
										<TrendingUp />
									</div>
								</Link>
							</Tooltip>

							<Tooltip title="Agents Dashboard" placement="right">
								<Link
									to={`/dashboard/all/${paramSlug}/agent-dashboard`}
									className={classes.customLink}
								>
									<div
										className={
											pathname.includes(
												`/dashboard/all/${paramSlug}/agent-dashboard`
											)
												? classes.active
												: classes.navButton
										}
									>
										<GroupOutlinedIcon />
									</div>
								</Link>
							</Tooltip>
						</React.Fragment>
					) : null}

					<Tooltip title="Dialer Queue" placement="right">
						<Link
							to={`/dashboard/all/${paramSlug}/dialer-queue`}
							className={classes.customLink}
						>
							<div
								className={
									pathname.includes(`/dashboard/all/${paramSlug}/dialer-queue`)
										? classes.active
										: classes.navButton
								}
							>
								<ClearIcon />
							</div>
						</Link>
					</Tooltip>
					{/* end remove from recorder */}
				</div>
			</Drawer>

			<Drawer
				open={open}
				onClose={() => {
					handleDrawerClose();
					setOpenList(false);
					setOpenAudio(false);
					setOpenGlobal(false);
				}}
				style={{ width: "255px" }}
			>
				<div
					className={classes.list}
					role="presentation"
					style={{ width: "255px" }}
				>
					<div className={classes.toolbarIcon}>
						<IconButton onClick={handleDrawerClose}>
							<CloseIcon />
						</IconButton>
						<img
							alt=" "
							src="https://portal.perfectpitchtech.com/97fab8d857abb09525af2d6c3a3d9855.png"
							style={{ width: "70%" }}
						></img>
					</div>
					<List style={{ marginTop: "-9px", color: "#4f535e" }}>
						{/* start management component */}
						{type !== "10" ? (
							<React.Fragment>
								<Link to="/gateway" className={classes.customLink}>
									<ListItem
										button
										style={{
											height: "59px",
											background: "#f89523",
											color: "white"
										}}
									>
										<ListItemIcon style={{ color: "white" }}>
											<DashboardOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary="Gateway" />
									</ListItem>
								</Link>
								<Divider />
								<Link
									to={`/dashboard/all/${paramSlug}/overview`}
									className={classes.customLink}
								>
									<ListItem
										onClick={handleDrawerClose}
										button
										className={
											pathname.includes(`/dashboard/all/${paramSlug}/overview`)
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										selected={
											pathname.includes(
												`/dashboard/all/${paramSlug}/overview`
											) && true
										}
									>
										<ListItemText primary="Campaign Metrics" />

										<ListItemIcon>
											<TrendingUp style={{ marginLeft: "auto" }} />
										</ListItemIcon>
									</ListItem>
								</Link>
								<Divider />
								<Link
									to={`/dashboard/all/${paramSlug}/agent-dashboard`}
									className={classes.customLink}
								>
									<ListItem
										onClick={handleDrawerClose}
										button
										className={
											pathname.includes(
												`/dashboard/all/${paramSlug}/agent-dashboard`
											)
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										selected={
											pathname.includes(
												`/dashboard/all/${paramSlug}/agent-dashboard`
											) && true
										}
									>
										<ListItemText primary="Agents Dashboard" />

										<ListItemIcon>
											<GroupOutlinedIcon style={{ marginLeft: "auto" }} />
										</ListItemIcon>
									</ListItem>
								</Link>

								<Divider />
							</React.Fragment>
						) : null}
						<Collapse
							in={
								(openList || agentCheck()) && !openAudio && !openGlobal
									? true
									: false
							}
							timeout={1000}
							unmountOnExit
						>
							<List component="div" disablePadding>
								<Link
									to={`/dashboard/all/${paramSlug}/agent-rank`}
									className={classes.customLink}
								>
									<ListItem
										selected={
											pathname.includes(
												`/dashboard/all/${paramSlug}/agent-rank`
											) && true
										}
										button
										onClick={handleDrawerClose}
										className={classes.nested}
									>
										<ListItemIcon>
											<>
												<span
													style={{
														height: "10px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "-11px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
												<RadioButtonUncheckedIcon style={{ fontSize: 13 }} />
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
											</>
										</ListItemIcon>
										<ListItemText primary="Rankings" />
									</ListItem>
								</Link>
								<Link
									to={`/dashboard/all/${paramSlug}/agent-trend`}
									className={classes.customLink}
								>
									<ListItem
										selected={
											pathname.includes(
												`/dashboard/all/${paramSlug}/agent-trend`
											) && true
										}
										button
										onClick={handleDrawerClose}
										className={classes.nested}
									>
										<ListItemIcon>
											<>
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "-13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
												<RadioButtonUncheckedIcon style={{ fontSize: 13 }} />
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
											</>
										</ListItemIcon>
										<ListItemText primary="Trends" />
									</ListItem>
								</Link>
								<Link
									to={`/dashboard/all/${paramSlug}/agents`}
									className={classes.customLink}
								>
									<ListItem
										selected={
											pathname.includes(`/dashboard/all/${paramSlug}/agents`) &&
											true
										}
										button
										onClick={handleDrawerClose}
										className={classes.nested}
									>
										<ListItemIcon>
											<>
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "-13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
												<RadioButtonUncheckedIcon style={{ fontSize: 13 }} />
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
											</>
										</ListItemIcon>
										<ListItemText primary="Live Agent Report" />
									</ListItem>
								</Link>
							</List>
						</Collapse>
						{/* end management component */}
						{/* global starts  */}
						<Divider />
						<Divider />
						{/* global side nav start */}
						<Collapse
							in={
								(openGlobal || performanceCheck()) && !openAudio && !openList
									? true
									: false
							}
							timeout={600}
							unmountOnExit
						>
							<List component="div" disablePadding>
								<Link
									to={`/dashboard/all/${paramSlug}/lists/`}
									className={classes.customLink}
								>
									<ListItem
										className={
											pathname.includes(`/dashboard/all/${paramSlug}/lists/`)
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										onClick={handleDrawerClose}
										button
										selected={
											pathname.includes(`/dashboard/all/${paramSlug}/lists/`) &&
											true
										}
									>
										<ListItemIcon>
											<>
												<span
													style={{
														height: "10px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "-11px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
												<RadioButtonUncheckedIcon style={{ fontSize: 13 }} />
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
											</>
										</ListItemIcon>
										<ListItemText primary="Lists" />
									</ListItem>
								</Link>
							</List>
						</Collapse>
						{/* global side nav end */}
						{/* global ends */}
						{/*  */}
						<Divider />
						{/* audio side nav start */}
						<Collapse
							in={
								(openAudio || optionsCheck()) && !openList && !openGlobal
									? true
									: false
							}
							timeout={600}
							unmountOnExit
						>
							<List component="div" disablePadding>
								<Link
									to={`/dashboard/all/${paramSlug}/goals`}
									className={classes.customLink}
								>
									<ListItem
										className={
											pathname.includes(`/dashboard/all/${paramSlug}/goals`)
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										onClick={handleDrawerClose}
										button
										selected={
											pathname.includes(`/dashboard/all/${paramSlug}/goals`) &&
											true
										}
									>
										<ListItemIcon>
											<>
												<span
													style={{
														height: "10px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "-11px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
												<RadioButtonUncheckedIcon style={{ fontSize: 13 }} />
												<span
													style={{
														height: "12px",
														borderRight: "1px solid #BBBBBB",
														marginTop: "13px",
														marginLeft: "6px",
														position: "absolute"
													}}
												></span>
											</>
										</ListItemIcon>
										<ListItemText primary="Goals" />
									</ListItem>
								</Link>
							</List>
						</Collapse>
						<Link
							to={`/dashboard/all/${paramSlug}/dialer-queue`}
							className={classes.customLink}
						>
							<ListItem
								onClick={handleDrawerClose}
								button
								className={
									pathname.includes(`/dashboard/all/${paramSlug}/dialer-queue`)
										? `${classes.collapseItemActive} ${classes.nested}`
										: classes.nested
								}
								selected={
									pathname.includes(
										`/dashboard/all/${paramSlug}/dialer-queue`
									) && true
								}
							>
								<ListItemText primary="Dialer Queue" />

								<ListItemIcon>
									<ClearIcon style={{ marginLeft: "auto" }} />
								</ListItemIcon>
							</ListItem>
						</Link>
						<Divider />
					</List>
				</div>
			</Drawer>
		</div>
	);
};
const DashboardSidenav = withRouter(Dashboard);
export { DashboardSidenav };
