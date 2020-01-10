import React, { Component } from 'react';
import { AsyncTable } from 'common-components';
import { TableRow, TableCell } from '@material-ui/core';
import { Link } from 'react-router-dom';

const classes = {
	linkStyle: {
		color: '#333'
	}
};
const NoResult = () => {
	return (
		<div
			style={{
				borderTop: 'solid 1px #eee',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: 500
			}}
		>
			<div>
				<b style={{ fontSize: 16, color: '#777' }}>No changes</b>
			</div>
		</div>
	);
};
export default class ChangeLogTable extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<div>
				{this.props.tableData.length > 0 ? (
					<AsyncTable
						headers={[ 'Users', 'Created', 'Time', 'Changes in', '' ]}
						tableData={this.props.tableData}
						render={(changes, { row, cell, icon }) => {
							return changes.map((change, i) => (
								<TableRow key={i} className={row}>
									<TableCell className={cell}>{change.user}</TableCell>
									<TableCell className={cell}>{change.created}</TableCell>
									<TableCell className={cell}>{change.time}</TableCell>
									<TableCell className={cell}>
										{Object.keys(change.changed_fields).join(', ')}
									</TableCell>
									<TableCell className={cell}>
										<Link
											onClick={() => {
												this.props.setActiveData(change);
											}}
											to="#"
											style={classes.linkStyle}
										>
											Details
										</Link>
									</TableCell>
								</TableRow>
							));
						}}
					/>
				) : (
					<NoResult />
				)}
			</div>
		);
	}
}