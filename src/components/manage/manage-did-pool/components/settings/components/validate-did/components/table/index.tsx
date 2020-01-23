import React, { useState, useEffect } from 'react'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { Paper, TableRow, TableCell } from '@material-ui/core'

import { AsyncTable, TruthCell, TableLoader } from 'common-components'

import Header from '../header'
import { NoResult } from '..'
import { cancel } from 'utils/api.js'
import {
	getSpecificDid,
	getAllInvalidDidByPool,
	getDidComplaints
} from '../../../../../../utils/did'

const theme = createMuiTheme({})

const Table = (props: any) => {
	const [loading, setLoading] = useState(false)
	const [invData, setInvData] = useState([])
	const [count, setCount] = useState(0)
	const [fetchError, setFetchError] = useState(false)
	const { companySlug, campaignSlug, poolId } = props.props

	useEffect(() => {
		fetchInvalid()
	}, [props]) // eslint-disable-line

	async function fetchFullData(inv: any) {
		let resp = await getSpecificDid(companySlug, campaignSlug, poolId, inv.uuid)

		let complaints = await getDidComplaints(
			companySlug,
			campaignSlug,
			poolId,
			inv.uuid
		)

		fetchError && cancel()

		if (resp.status > 300 || complaints.status > 300) {
			setFetchError(true)
			setLoading(false)
			return false
		}

		resp.data.complaints = complaints.data.data.length

		return Object.assign(resp.data, inv)
	}

	async function fetchInvalid() {
		setLoading(true)
		setFetchError(false)
		let response = await getAllInvalidDidByPool(
			companySlug,
			campaignSlug,
			poolId
		)
		if (response.status < 300) {
			setFetchError(false)

			let data = await response.data.map(async (inv: any) => {
				return fetchFullData(inv)
			})

			let result: any = await Promise.all(data)

			setCount(result.length)

			setInvData(result)
			setLoading(false)
		} else {
			setFetchError(true)
			setLoading(false)
		}
	}

	function renderTable(data: Array<Object>, row: any, userCell: any) {
		let tblData = data.map((key: any) => {
			return {
				number: key.number,
				pool: key.did_pool_name,
				expected_cname: key.cname_valid,
				actual_cname: key.cname_string,
				complaints: key.complaints
			}
		})

		return (
			<>
				{Object.values(tblData).map((key: any) => (
					<TableRow className={row}>
						{Object.values(key).map((val: any) => {
							if (typeof val === 'boolean') {
								return <TruthCell className={userCell}>{val}</TruthCell>
							} else {
								return <TableCell className={userCell}>{val}</TableCell>
							}
						})}
					</TableRow>
				))}
			</>
		)
	}

	function renderLoading() {
		return (
			<div
				style={{
					height: 'inherit',
					position: 'absolute',

					width: '100%',

					top: 51
				}}
			>
				<TableLoader />
			</div>
		)
	}

	function renderNoResult() {
		return <NoResult />
	}

	function renderAsync() {
		return (
			<AsyncTable
				headers={[
					'Number',
					'Pool',
					'Expected CNam',
					'Actual CNam',
					'# Complaints'
				]}
				tableData={invData}
				render={(data: Array<Object>, { row, userCell }: any) => {
					return !loading ? renderTable(data, row, userCell) : renderLoading()
				}}
			/>
		)
	}

	return (
		<>
			<Header
				loading={loading}
				data={invData}
				canDownload={invData.length > 0}
				invalidCount={
					invData.length > 0
						? `${count} invalid CNams...`
						: `${count} results...`
				}
				validate={fetchInvalid}
				props={props.props}
			/>
			<MuiThemeProvider theme={theme}>
				<Paper
					style={{
						marginTop: '22px',
						position: 'relative',
						minHeight: '600px',
						backgroundColor: '#fafafa'
					}}
				>
					{!fetchError ? renderAsync() : renderNoResult()}
				</Paper>
			</MuiThemeProvider>
		</>
	)
}

export default Table
