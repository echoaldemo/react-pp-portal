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

export { menu, InputField }