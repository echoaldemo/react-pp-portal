import React from 'react'
import { SDContainer } from '../../../components'

interface Props {
	title: string
	search: any
	type?: string
	dropId: string
	searchHolder: string
	onEdit: boolean
	cancelEdit: () => void
	saveChangeItem: () => void
	loading: boolean
	children: React.ReactNode
}

export default (props: Props) => {
	return (
		<SDContainer
			loading={props.loading}
			saveChangeItem={props.saveChangeItem}
			type="segments"
			search={props.search}
			searchHolder={props.searchHolder}
			title={props.title}
			dropId={props.dropId}
			onEdit={props.onEdit}
			cancelEdit={props.cancelEdit}
		>
			{props.children}
		</SDContainer>
	)
}
