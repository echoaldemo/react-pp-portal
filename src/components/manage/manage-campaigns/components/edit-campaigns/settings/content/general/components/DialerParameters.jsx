import React, { useState } from "react";
import DialerForm from "./DialerForm";
import { TableLoader } from "common-components";
export default function DialerParameters() {
  const [loading, setLoading] = useState(false); // eslint-disable-line

  return <div>{loading ? <TableLoader /> : <DialerForm />}</div>;
}
