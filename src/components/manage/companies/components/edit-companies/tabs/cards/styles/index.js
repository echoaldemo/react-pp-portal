export const style = {
	table: {
		backgroundColor: '#FFF'
	},
	row: {
		height: 50,
		'&:nth-of-type(even)': {
			backgroundColor: '#f8f9fa'
		},
		'&:nth-of-type(odd)': {
			backgroundColor: '#FFF'
		}
	},
	cell: {
		borderBottom: 'none'
	},
	paper: {
		boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);'
	}
};