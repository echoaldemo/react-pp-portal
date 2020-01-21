import React, { useState, useEffect } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { IoIosSettings } from "react-icons/io";
import styled from "styled-components";
import Pop from "./popmenu";
import {
	SearchBar,
	Pagination,
	AsyncTable,
	PausedCell
} from "common-components";
const theme = createMuiTheme({});


const Name = styled.div`
	display: flex;
	direction: row;
	align-items: center;
`;

const SMSTable = (props: any) => {
	const [arrow, setArrow] = useState("down");
	const [openPop, setOpenPop] = useState(false);
	const [popRef, setPopRef] = useState(null);
	const [tbdata, setTbData] = useState([]); // eslint-disable-line
	const [colorControl, setColorControl] = useState("");
	const [paginateList, setPaginateList] = useState([]);
	const [activeCell, setActiveCell] = useState([]);

	function paginate(from: number, to: number) {
		setTbData(paginateList.slice(from, to));
	}
	useEffect(() => {
		setTbData(props.data);
		setPaginateList(props.data);
	}, [props.data]);

	function name() {
		return (
			<Name>
				Leads{" "}
				{arrow === "down" ? (
					<KeyboardArrowDown
						style={{
							fontSize: "20px",
							color: "#444851"
						}}
						onClick={e => {
							setArrow("up");
						}}
					/>
				) : (
						<KeyboardArrowUp
							style={{
								fontSize: "20px",
								color: "#444851"
							}}
							onClick={e => {
								setArrow("down");
							}}
						/>
					)}
			</Name>
		);
	}

	return (
		<MuiThemeProvider theme={theme}>
			<SearchBar
				title="campaigns"
				userData={paginateList}
				headers={["id", "name", "leads"]}
				link={true}
				pathnameData={{
					firstLink: `/manage/sms/edit/`,
					fetchData: ["id"],
					lastLink: `/settings/`
				}}
			/>
			<AsyncTable
				headers={[
					"ID",
					"Name",
					name(),
					"CPS",
					"Progress",
					"Numbers",
					"Delivery",
					"Status",
					"On Transfer",
					" "
				]}
				tableData={paginateList}
				render={(data: any, { row, userCell, cell }: any) => {
					const tmp = data.map((d: any) => {
						return {
							id: d.id,
							name: d.name,
							leads: d.leads,
							cps: d.cps,
							progress: d.progress,
							numbers: d.numbers,
							delivery: d.delivery,
							status: d.status,
							onTransfer: d.onTransfer
						};
					});
					return tmp.map((cmp: any, i: any) => {
						return (
							<TableRow className={row} key={`row-${i}`}>
								{Object.values(cmp).map((val: any, i: any) => {
									return (
										<>
											{Object.values(cmp).indexOf(val) !== 7 ? (
												<TableCell
													key={`cell-${i}`}
													className={
														Object.values(cmp).indexOf(val) < 1
															? cell
															: userCell
													}
												>
													{val}
												</TableCell>
											) : (
													<>
														<PausedCell key={`cell-${i}`} className={userCell}>
															{val === "Start" ? true : false}
														</PausedCell>
													</>
												)}
										</>
									);
								})}
								<TableCell key={`cell-gear`} className={userCell}>
									<IoIosSettings
										onClick={(e: any) => {
											setActiveCell(cmp);
											setColorControl(cmp.id);
											setPopRef(e.currentTarget);
											setOpenPop(true);
										}}
										style={{
											color: openPop && colorControl === cmp.id ? "#1194f6" : ""
										}}
										size={20}
									/>
								</TableCell>
							</TableRow>
						);
					});
				}}
			/>
			{paginateList.length !== 0 && (
				<Pagination
					paginateFn={paginate}
					totalItems={paginateList.length}
					itemsPerPage={7}
				/>
			)}
			<Pop
				cloneCampaign={props.cloneCampaign}
				deleteHandle={props.handleDelete}
				router={props.router}
				open={openPop}
				data={activeCell}
				anchorEl={popRef}
				onClose={() => setOpenPop(false)}
				changeStatus={props.changeStatus}
			/>
		</MuiThemeProvider>
	);
};

export default SMSTable;
