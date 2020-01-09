import React from 'react'
import { DeleteModal as DelModal } from 'common-components'

export default function DeleteModal(props: any) {
	return (
		<div>
			<DelModal
				open={props.open}
				header="Delete DID"
				msg="DID"
				name={props.did ? props.did.number : ''}
				closeFn={() => props.closeFn()}
				delFn={() => props.delFn()}
			/>
		</div>
	)
}
