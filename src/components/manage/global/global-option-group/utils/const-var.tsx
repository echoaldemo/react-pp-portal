/* eslint-disable */
import { TextField } from '@material-ui/core'
import styled from 'styled-components'

const menu = [
	{
		title: 'Phrase Books',
		path: '/manage/global-pitch-phrasebooks'
	},
	{
		title: 'Segments',
		path: '/manage/global-pitch-segments/'
	},
	{
		title: 'Rapid Response',
		path: '/manage/global-rapid-response/tests'
	}
]

const InputField = styled(TextField)`
  .MuiInputLabel-shrink {
    color: #1194f6 !important;
  }
  .Mui-error {
    color: #f44336 !important;
  }
  .MuiInput-underline {
    &::before {
      border-bottom: solid 1px rgba(238, 238, 238, 0.99);
    }
    &::after {
      border-bottom: 2px solid #1194f6;
    }
	}
	.Mui-focused span {
		color: #1194f6 !important;
	}
	.MuiInputLabel-shrink {
		transform:translate(0,1.5px) scale(1);
	}
`;

const editReset = {
	open: false,
	load: false,
	edit: false,
	done: false,
	done3: false,
	delete: false,
	delete2: false,
	description: "",
	value: "",
	snackErr: "",
	error: {
		description: "",
		value: ""
	},
	editData: {}
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

export { menu, InputField, editReset, uuidv4 }