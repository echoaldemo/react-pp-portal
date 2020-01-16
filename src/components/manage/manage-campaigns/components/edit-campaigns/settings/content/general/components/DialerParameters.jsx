import React, { useState, useEffect } from "react";
import DialerForm from "./DialerForm";
import { TableLoader } from "common-components";
export default function DialerParameters() {
	const [loading, setLoading] = useState(false);

	return <div>{loading ? <TableLoader /> : <DialerForm />}</div>;
}
