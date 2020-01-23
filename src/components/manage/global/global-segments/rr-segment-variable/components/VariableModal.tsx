import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { HeaderButton } from "common-components";
import {
	useStyles,
	Box,
	Center,
	CenterText,
	CloseIcon,
	Content,
	Header
} from "../styles/style";

const VariableModal = ({
	header,
	msg,
	name,
	closeFn,
	delFn,
	data,
	UpdateSegment
}: any) => {
	// const [val, setVal] = useState("");
	// const [ok, setOk] = useState(false);
	const [keyVal, setKeyVal] = useState("");
	const [valVal, setValVal] = useState("");
	const classes = useStyles(0);
	// const handleChange = e => {
	//   setVal(e.target.value);
	//   if (e.target.value === name) {
	//     setOk(true);
	//   } else {
	//     setOk(false);
	//   }
	// };

	const handleSubmit = (label: any) => {
		var Obj = { name: keyVal, values: valVal };
		UpdateSegment(Obj, label);
	};

	const handlChange = (e: any, type: any) => {
		if (type === "keyVal") {
			setKeyVal(e.target.value);
		} else {
			setValVal(e.target.value);
		}
	};

	return (
		<Center>
			{keyVal.length === 0 && data.length !== 0 ? (
				<>
					{setKeyVal(data.name)}
					{setValVal(data.values)}
				</>
			) : null}
			<Box>
				<Header>
					<CenterText>Edit Variable</CenterText>
					<CloseIcon onClick={closeFn} />
				</Header>
				<Content>
					<TextField
						onChange={e => handlChange(e, "keyVal")}
						value={keyVal}
						id="standard-full-width"
						label="Key"
						fullWidth
						margin="normal"
						autoComplete="off"
						style={{
							fontSize: 50,
							width: "100%"
						}}
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							}
						}}
					/>

					<TextField
						onChange={e => handlChange(e, "valVal")}
						value={valVal}
						id="standard-full-width"
						label="Value"
						fullWidth
						margin="normal"
						autoComplete="off"
						style={{
							fontSize: 50,
							width: "100%"
						}}
						InputProps={{
							classes: {
								underline: classes.inputField,
								root: classes.inputField
							}
						}}
					/>

					<HeaderButton
						style={{ width: "20%", margin: "auto", marginTop: 20 }}
						openFunction={() =>
							handleSubmit(data.length !== 0 ? "edit" : "create")
						}
						buttonText={`${
							data.length !== 0 ? "Update Variable" : "Add Variable"
							}`}
					/>
				</Content>
			</Box>
		</Center>
	);
};

export default VariableModal;
