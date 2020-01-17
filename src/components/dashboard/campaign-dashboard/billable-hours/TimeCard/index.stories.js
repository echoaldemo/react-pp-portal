import React from "react";
import { storiesOf } from "@storybook/react";
import TimeCard from "./index.js";
import LabelCard from "./LabelCard.js";

storiesOf("Time Card", module).add("empty", function() {
	return <TimeCard startHours={3} breakHours={3} endHours={3} />;
});

storiesOf("Time Card", module).add("with indention", function() {
	return (
		<TimeCard lateStart={30} startHours={3} breakHours={3} endHours={3} />
	);
});

storiesOf("Time Card", module).add("Sizes", function() {
	return (
		<TimeCard
			mode="small"
			bgColor="rgba(68, 189, 148, 0.85)"
			startHours={3}
			breakHours={3}
			endHours={3}
		/>
	);
});

storiesOf("Time Card", module).add("default", function() {
	return (
		<TimeCard
			startHours={3}
			breakHours={3}
			endHours={3}
			title={["Login session", "StationX"]}
			sub={["Station X", "Rep Info", "Start/Stop"]}
		/>
	);
});

storiesOf("Time Card", module).add("No title", function() {
	return (
		<TimeCard
			startHours={3}
			breakHours={3}
			endHours={3}
			sub={[
				"Rep session",
				"Session Info",
				"Start/Stop",
				"Number of calls"
			]}
		/>
	);
});

storiesOf("Time Card", module).add("Label Card", function() {
	return (
		<LabelCard
			mode="large"
			bgColor="rgba(68, 189, 148, 0.85)"
			label="Billable hours"
		/>
	);
});
