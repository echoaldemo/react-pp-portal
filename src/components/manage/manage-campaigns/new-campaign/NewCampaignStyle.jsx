import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Btn = styled.button`
	width: 165px;
	height: 40px;
	border-radius: 3px;
	background-color: #eeeeee;
	border: none;
	outline: none;
	cursor: pointer;
`;
const CreateBtn = styled.button`
	width: 165px;
	height: 40px;
	border-radius: 3px;
	background-color: #b6d36b;
	border: none;
	outline: none;
	cursor: pointer;
`;
const Cancel = styled.span`
	margin-bottom: 31px;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	color: #444851;
	text-transform: uppercase;
`;
const Disabled = styled.span`
	margin-bottom: 31px;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	color: #bbbbbb;
	text-transform: uppercase;
`;
const CreateText = styled.span`
	margin-bottom: 31px;
	font-size: 14px;
	font-weight: 600;
	text-align: center;
	color: #ffffff;
	text-transform: uppercase;
`;
const BtnCont = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 36px 0;
`;
const Content = styled.div`padding: 0 0;`;

export { Btn, CreateBtn, Cancel, Disabled, CreateText, BtnCont, Content };
