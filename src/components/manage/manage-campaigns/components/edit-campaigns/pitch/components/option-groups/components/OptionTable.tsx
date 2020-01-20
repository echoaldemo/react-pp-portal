import React, { useContext } from 'react';
import { AsyncTable, EditButton, UnderlineCell, TableNoResult, SaveButton } from 'common-components';
import { TableRow, TableCell } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { IdentityContext } from 'contexts/IdentityProvider';
const OptionTable = ({ data }: any) => {
	const { setOpenModal } = useContext(IdentityContext);
	return (
		<div>
			{data ? (
				<AsyncTable
					headers={[ 'Description', 'Value', '' ]}
					tableData={data}
					render={(data: any, { row, cell, uuid, icon }: any) =>
						data.map((item: any, i: number) => (
							<TableRow className={row} key={i}>
								<UnderlineCell className={cell}>{item.description}</UnderlineCell>
								<TableCell className={cell}>{item.value}</TableCell>
								<TableCell className={cell} style={{ textAlign: 'right' }}>
									<EditButton
										onClickFunc={() => {
											alert('Edit button');
										}}
										text={'Edit'}
										style={{
											color: '#444851'
										}}
									/>
								</TableCell>
							</TableRow>
						))}
				/>
			) : (
				<TableNoResult
					noHeader
					headerText="Option Groups"
					mainMessage="No option have been created"
					subMessage="Would you like to create one? Just hit the “New Option” button."
					renderButton={
						<SaveButton
							onClick={() => {
								setOpenModal(true);
							}}
						>
							<Add />
							New option
						</SaveButton>
					}
				/>
			)}
		</div>
	);
};

export default OptionTable;
