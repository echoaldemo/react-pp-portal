import React from "react";

// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";


import styled from "styled-components";

import { DialerHeader, DialerTable } from "./components";

const LDContainer = styled.div``;

// const theme = createMuiTheme({});


const LiveDialer = (props: any) => {
	return (
		//<MuiThemeProvider theme={theme}>
		<LDContainer>
			<DialerHeader {...props} />
			<DialerTable />
		</LDContainer>
		//</MuiThemeProvider>
	);
};

export default LiveDialer;
