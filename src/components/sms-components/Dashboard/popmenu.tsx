import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

export default (props: any) => {
	function routeToPath(pathname: any, state: any) {
		let router = props.router;
		router.history.push({
			pathname,
			state
		});
	}
	function copy(id: string) {
		let clone = props.cloneCampaign;
		clone(id);
		props.onClose();
	}

	function deleteData(id: string) {
		let deleteHandle = props.deleteHandle;
		deleteHandle(id, id);
		props.onClose();
	}
	return (
		<Menu
			id="menu-appbar"
			anchorEl={props.anchorEl}
			getContentAnchorEl={null}
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			keepMounted
			onClose={e => props.onClose()}
			open={props.open}
		>
			<MenuItem
				style={{ width: "170px" }}
				onClick={() => {
					var status = "";
					status = props.data.status === "Start" ? "Pause" : "Start";
					props.onClose();
					props.changeStatus(props.data.id, status);
				}}
			>
				{props.data.status === "Start" ? "Pause" : "Start"}
			</MenuItem>
			<MenuItem
				onClick={e =>
					routeToPath(`/manage/sms/edit/${props.data.id}/settings/`, {})
				}
			>
				Edit settings
			</MenuItem>

			<MenuItem
				onClick={e =>
					routeToPath(`/manage/sms/edit/${props.data.id}/schedule/`, {})
				}
			>
				Edit schedule
			</MenuItem>

			<MenuItem onClick={e => copy(props.data.id)}>Copy</MenuItem>

			<MenuItem onClick={e => deleteData(props.data.id)}>Delete</MenuItem>
		</Menu>
	);
};
