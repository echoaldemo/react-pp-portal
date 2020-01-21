/* eslint-disable */
import React from "react";
import clsx from "clsx";
import {
	Drawer,
	List,
	Divider,
	IconButton,
	ListItem,
	ListItemIcon,
	ListItemText,
	Collapse,
	Tooltip
} from "@material-ui/core";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";

import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import LanguageOutlinedIcon from "@material-ui/icons/LanguageOutlined";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import SmsIcon from "@material-ui/icons/SmsOutlined";

import { useStyles } from "./styles";

interface Props extends RouteComponentProps<any> {
	location: any;
	handleDrawerClose: any;
	open: boolean;
}

/* function SideNav({ location, handleDrawerClose, open }) { */
const Component: React.FC<Props> = ({ location, handleDrawerClose, open }) => {
	const classes: any = useStyles({});
	const [openList, setOpenList] = React.useState(false);
	const [openAudio, setOpenAudio] = React.useState(false);
	const [openGlobal, setOpenGlobal] = React.useState(false);
	const { pathname } = location;
	const type = localStorage.getItem("type");

	const management = () => {
		if (
			pathname.includes("/manage/users") ||
			pathname.includes("/manage/campaign") ||
			pathname.includes("/manage/companies") ||
			pathname.includes("/manage/locations") ||
			pathname.includes("/manage/realms") ||
			pathname.includes("/manage/did-pool") ||
			pathname.includes("/manage/dids") ||
			pathname.includes("/manage/edit/router") ||
			pathname.includes("/manage/team/edit/")
		) {
			return true;
		} else {
			return false;
		}
	};

	const globalCheck = () => {
		if (
			pathname.includes("/manage/global-pitch-phrasebooks") ||
			pathname.includes("/manage/global-pitch-segments") ||
			pathname.includes("/manage/global-option-group") ||
			pathname.includes("/manage/global-rapid-response/tests") ||
			pathname.includes("/manage/global-rapid-response/segments") ||
			pathname.includes("/company/global") ||
			pathname.includes("/manage/rapid-response") ||
			pathname.includes("/manage/phrase-book/global")
		) {
			return true;
		} else {
			return false;
		}
	};

	const audioCheck = () => {
		if (
			pathname.includes("/manage/audio/audio-resources") ||
			pathname.includes("/manage/audio/pitch") ||
			pathname.includes("/manage/audio/phrase") ||
			pathname.includes("/manage/audio/prospect")
		) {
			return true;
		} else {
			return false;
		}
	};

	const settingsCheck = () => {
		if (pathname.includes("/manage/sms-dashboard")) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className={classes.root}>
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaperClose)
				}}
			>
				<Divider />
				<div style={{ marginTop: 62 }}>
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
							<Tooltip title="Management" placement="right">
								<div
									onClick={() => {
										handleDrawerClose();
										setTimeout(() => {
											setOpenList(true);
											setOpenAudio(false);
											setOpenGlobal(false);
										}, 200);
									}}
									className={management() ? classes.active : classes.navButton}
								>
									<GroupOutlinedIcon />
								</div>
							</Tooltip>

							<Tooltip title="Global Pitch" placement="right">
								<div
									onClick={() => {
										handleDrawerClose();
										setTimeout(() => {
											setOpenList(false);
											setOpenAudio(false);
											setOpenGlobal(true);
										}, 200);
									}}
									className={globalCheck() ? classes.active : classes.navButton}
								>
									<LanguageOutlinedIcon />
								</div>
							</Tooltip>
						</React.Fragment>
					) : null}

					<Tooltip title="Audio" placement="right">
						<div
							onClick={() => {
								handleDrawerClose();
								setTimeout(() => {
									setOpenList(false);
									setOpenAudio(true);
									setOpenGlobal(false);
								}, 200);
							}}
							className={audioCheck() ? classes.active : classes.navButton}
						>
							<LibraryMusicOutlinedIcon />
						</div>
					</Tooltip>

					{type === "1" ? (
						<Tooltip title="Sms" placement="right">
							<Link to="/manage/sms-dashboard">
								<div
									className={
										settingsCheck() ? classes.active : classes.navButton
									}
								>
									<SmsIcon />
								</div>
							</Link>
						</Tooltip>
					) : null}
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
				style={{ width: "250px" }}
			>
				<div
					className={classes.list}
					role="presentation"
					style={{ width: "250px" }}
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
								<ListItem
									button
									onClick={() => {
										setOpenList(!openList);
										setOpenAudio(false);
										setOpenGlobal(false);
									}}
									className={
										openList || management() ? classes.activeListItem : null
									}
								>
									<ListItemIcon>
										<GroupOutlinedIcon
											className={
												openList || management() ? classes.activeListIcon : null
											}
										/>
									</ListItemIcon>
									<ListItemText primary="Management" />
									{openList || management() ? <ExpandLess /> : <ExpandMore />}
								</ListItem>
								<Collapse
									in={
										(openList || management()) && !openAudio && !openGlobal
											? true
											: false
									}
									timeout="auto"
									unmountOnExit
								>
									<List component="div" disablePadding>
										<Link to="/manage/users" className={classes.customLink}>
											<ListItem
												selected={pathname.includes("/manage/users") && true}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Users" />
											</ListItem>
										</Link>
										<Link to="/manage/campaigns" className={classes.customLink}>
											<ListItem
												selected={pathname.includes("/manage/campaign") && true}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Campaigns" />
											</ListItem>
										</Link>
										<Link to="/manage/companies" className={classes.customLink}>
											<ListItem
												selected={
													pathname.includes("/manage/companies") && true
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Companies" />
											</ListItem>
										</Link>
										<Link to="/manage/locations" className={classes.customLink}>
											<ListItem
												selected={
													(pathname.includes("/manage/locations") ||
														pathname.includes("/manage/team/edit/")) &&
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Locations" />
											</ListItem>
										</Link>
										<Link to="/manage/realms" className={classes.customLink}>
											<ListItem
												selected={pathname.includes("/manage/realms") && true}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Realms" />
											</ListItem>
										</Link>
										<Link to="/manage/did-pool" className={classes.customLink}>
											<ListItem
												selected={pathname.includes("/manage/did-pool") && true}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="DID Pools" />
											</ListItem>
										</Link>
										<Link to="/manage/dids" className={classes.customLink}>
											<ListItem
												selected={pathname.includes("/manage/dids") && true}
												onClick={handleDrawerClose}
												button
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
													</>
												</ListItemIcon>
												<ListItemText primary="Dids" />
											</ListItem>
										</Link>
									</List>
								</Collapse>
								<Divider />

								{/* end management component */}

								{/* global starts */}

								<ListItem
									className={
										openGlobal || globalCheck() ? classes.activeListItem : null
									}
									button
									onClick={() => {
										setOpenGlobal(!openGlobal);
										setOpenList(false);
										setOpenAudio(false);
									}}
								>
									<ListItemIcon>
										<LanguageOutlinedIcon
											className={
												openGlobal || globalCheck()
													? classes.activeListIcon
													: null
											}
										/>
									</ListItemIcon>
									<ListItemText primary="Global Pitch" />
									{openGlobal || globalCheck() ? (
										<ExpandLess />
									) : (
											<ExpandMore />
										)}
								</ListItem>
								<Divider />
								{/* global side nav start */}
								<Collapse
									in={
										(openGlobal || globalCheck()) && !openAudio && !openList
											? true
											: false
									}
									timeout="auto"
									unmountOnExit
								>
									<List component="div" disablePadding>
										<Link
											to="/manage/global-pitch-phrasebooks"
											className={classes.customLink}
										>
											<ListItem
												className={
													pathname.includes("/manage/global-pitch-phrasebooks")
														? `${classes.collapseItemActive} ${classes.nested}`
														: classes.nested
												}
												onClick={handleDrawerClose}
												button
												selected={
													(pathname.includes(
														"/manage/global-pitch-phrasebooks"
													) ||
														pathname.includes("/manage/phrase-book/global")) &&
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Phrase Books" />
											</ListItem>
										</Link>
										<Link
											to="/manage/global-pitch-segments"
											className={classes.customLink}
										>
											<ListItem
												className={
													pathname.includes("/manage/global-pitch-segments") ||
														pathname.includes("/company/global")
														? `${classes.collapseItemActive} ${classes.nested}`
														: classes.nested
												}
												button
												onClick={handleDrawerClose}
												selected={
													(pathname.includes("/manage/global-pitch-segments") ||
														pathname.includes("/company/global")) &&
													true
												}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Segments" />
											</ListItem>
										</Link>

										<Link
											to="/manage/global-option-group"
											className={classes.customLink}
										>
											<ListItem
												className={
													pathname.includes("/manage/global-option-group")
														? `${classes.collapseItemActive} ${classes.nested}`
														: classes.nested
												}
												button
												onClick={handleDrawerClose}
												selected={
													pathname.includes("/manage/global-option-group") &&
													true
												}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
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
												<ListItemText primary="Option Groups" />
											</ListItem>
										</Link>

										<Link
											to="/manage/global-rapid-response/tests"
											className={classes.customLink}
										>
											<ListItem
												className={
													pathname.includes(
														"/manage/global-rapid-response/tests"
													) ||
														pathname.includes(
															"/manage/global-rapid-response/segments"
														)
														? `${classes.collapseItemActive} ${classes.nested}`
														: classes.nested
												}
												button
												onClick={handleDrawerClose}
												selected={
													(pathname.includes(
														"/manage/global-rapid-response/tests"
													) ||
														pathname ===
														"/manage/global-rapid-response/segments") &&
													true
												}
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
														<RadioButtonUncheckedIcon
															style={{ fontSize: 13 }}
														/>
													</>
												</ListItemIcon>
												<ListItemText primary="Rapid Response" />
											</ListItem>
										</Link>
									</List>
								</Collapse>
							</React.Fragment>
						) : null}
						{/* global side nav end */}

						{/* global ends */}

						{/*  */}
						<Divider />
						{/* <ListItem button>
              <ListItemIcon>
                <SmsIcon />
              </ListItemIcon>
              <ListItemText primary="SMS Dashboard" />
            </ListItem> 
            <Divider />*/}
						<ListItem
							className={
								openAudio || audioCheck() ? classes.activeListItem : null
							}
							button
							onClick={() => {
								setOpenAudio(!openAudio);
								setOpenList(false);
								setOpenGlobal(false);
							}}
						>
							<ListItemIcon>
								<LibraryMusicOutlinedIcon
									className={
										openAudio || audioCheck() ? classes.activeListIcon : null
									}
								/>
							</ListItemIcon>
							<ListItemText primary="Audio" />
							{openAudio || audioCheck() ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Divider />
						{/* audio side nav start */}
						<Collapse
							in={
								(openAudio || audioCheck()) && !openList && !openGlobal
									? true
									: false
							}
							timeout="auto"
							unmountOnExit
						>
							<List component="div" disablePadding>
								{type !== "10" ? (
									<Link
										to="/manage/audio/audio-resources"
										className={classes.customLink}
									>
										<ListItem
											className={
												pathname.includes("/manage/audio/audio-resources")
													? `${classes.collapseItemActive} ${classes.nested}`
													: classes.nested
											}
											onClick={handleDrawerClose}
											button
											selected={
												pathname.includes("/manage/audio/audio-resources") &&
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
											<ListItemText primary="Resources" />
										</ListItem>
									</Link>
								) : null}
								<Link to="/manage/audio/pitch" className={classes.customLink}>
									<ListItem
										className={
											pathname.includes("/manage/audio/pitch") ||
												pathname.includes("/manage/audio/phrase") ||
												pathname.includes("/manage/audio/prospect")
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										button
										onClick={handleDrawerClose}
										selected={pathname.includes("/manage/audio/pitch") && true}
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
											</>
										</ListItemIcon>
										<ListItemText primary="Voice" />
									</ListItem>
								</Link>
							</List>
						</Collapse>
						{/* audio side nav end */}
						<Divider />
						{type === "1" ? (
							<>
								<Link
									to={`/manage/sms-dashboard`}
									className={classes.customLink}
								>
									<ListItem
										onClick={handleDrawerClose}
										button
										className={
											pathname.includes(`/manage/sms-dashboard`)
												? `${classes.collapseItemActive} ${classes.nested}`
												: classes.nested
										}
										selected={
											pathname.includes(`/manage/sms-dashboard`) && true
										}
									>
										<ListItemIcon>
											<SmsIcon
												style={{ marginRight: "auto" }}
											// className={
											//   openList || management() ? classes.activeListIcon : null
											// }
											/>
										</ListItemIcon>
										<ListItemText primary="Sms" />
									</ListItem>
								</Link>
								<Divider />{" "}
							</>
						) : null}
					</List>
				</div>
			</Drawer>
		</div>
	);
};

const SideNav = withRouter(Component);

export { SideNav };
