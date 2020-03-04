import React, { useContext, useState, useEffect } from 'react';
import './Details.css';
import { InputField, SaveButton, AlertModal } from 'common-components';
import { Grid, MenuItem } from '@material-ui/core';
import { IdentityContext } from 'contexts/IdentityProvider';
import { KeyboardArrowDown } from '@material-ui/icons';
import { get, post, patch } from 'utils/api'

const DropdownIcon = () => {
	return <KeyboardArrowDown style={{ color: '#444851' }} />;
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 300,
			width: 250
		}
	}
};

export default function Details() {
	return (
		<div className="p-normal container">
			<DetailsForm />
		</div>
	);
}

interface IFormState {
	name: string,
	panel: string,
	active_version: any
}

interface IAlert {
	open: boolean,
	severity: string,
	message: string,
	showBtn: boolean,
	handlerClickBtn: () => void
}

const DetailsForm: React.FC = () => {
	const { state } = useContext(IdentityContext);
	const {campaignCompany, campaignDetails } = state
	
	const [formState, setFormState] = useState<IFormState>({
		name: '',
		panel:'',
		active_version: null
	});

	const [data, setData] = useState<IFormState>({
		name: '',
		panel:'',
		active_version: null
	});

	const [alert, setAlert] = useState<IAlert>({
		open: false,
		severity: "loading",
		message: "Deleting campaign, please wait...",
		showBtn: false,
		handlerClickBtn: () => setAlert({ ...alert, open: false })
	})

	const getAlert = (open=true, severity='loading', message='', showBtn=true) => {
		setAlert({...alert, open, severity , message , showBtn})
	}

	const [isNew, setIsNew] = useState(false)

	useEffect(() => {
		if('uuid' in campaignCompany) getData()
	}, [])

	const getData = () => {
		get(`/pitch/company/${campaignCompany.slug}/campaign/${campaignDetails.slug}/`)
		.then((res:any) => {
			setFormState(res.data)
			setData(res.data)
		}).catch(() => setIsNew(true))
	}

	const handlerCreatePitch = () => {
		setAlert({...alert, open: true})
		post(`/pitch/company/${campaignCompany.slug}/campaign/${campaignDetails.slug}/`,
			{
				name: formState.name,
				segments: [],
				voices: []
			}
		).then(() => {
			getAlert(true, 'success', 'Pitch created Successfully!')
			getData()
			setIsNew(false)
		}).catch(() => getAlert(true, 'error', 'Oops! Something went wrong!'))
	}

	const handlerCommit = () => {
		getAlert(true, 'loading', 'Commiting Pitch!')
		let user_uuid = localStorage.getItem('uuid')
		post(`/pitch/company/${campaignCompany.slug}/campaign/${campaignDetails.slug}/${user_uuid}/commit/`)
			.then(() => getAlert(true, 'success', 'Commit Successfully!'))
			.catch(() => getAlert(true, 'error', 'Oops! Something went wrong!'))
	}

	const handlerSave = () => {
		getAlert(true, 'loading', 'Saving Pitch, Please wait...')
		patch(`/pitch/company/${campaignCompany.slug}/campaign/${campaignDetails.slug}/`,
			{
				name: formState.name,
				panel: formState.panel,
  				active_version: formState.active_version
			}
		).then((res:any) => {
			setFormState(res.data)
			setIsNew(false)
			getAlert(true, 'success', 'Commit Successfully!')
		})
		.catch(() => getAlert(true, 'error', 'Oops! Something went wrong!'))
	}

	const handlerCancel = () => {
		setFormState(data)
	}

	return (
			<Grid container spacing={3} direction="column" justify="space-evenly" alignItems="center" className="input-container">
				<InputField
					label="Pitch name"
					fullWidth
					margin="normal"
					value={formState.name}
					required
					className="input"
					onChange={(e: any) => {
						setFormState({ ...formState, name: e.target.value });
					}}
				/>
				{!isNew && 
					<InputField
						label="Panel"
						fullWidth
						select
						value={formState.panel}
						SelectProps={{
							IconComponent: () => <DropdownIcon />,
							...MenuProps
						}}
						onChange={(e: any) => {
							setFormState({ ...formState, panel: e.target.value });
						}}
					>
						{['Generic', 'Education'].map((item) => (
							<MenuItem key={item} value={item === 'Education'? item.slice(0,3).toLowerCase(): item.toLowerCase()}>
								{item}
							</MenuItem>
						))}
					</InputField>
				}
				{!isNew && 
					<InputField
					label="Active version"
					fullWidth
					select
					value={formState.active_version}
					SelectProps={{
						IconComponent: () => <DropdownIcon />,
						...MenuProps
					}}
					onChange={(e: any) => {
						setFormState({ ...formState, active_version: e.target.value });
					}}
					>
						{[1, 2, 3].map((item) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</InputField>
				}
				{
					isNew ? 
					<SaveButton onClick={handlerCreatePitch} style={{backgroundColor: '#5F7D98', marginTop: 15}}>CREATE PITCH</SaveButton>
					: <SaveButton onClick={handlerCommit} style={{marginTop: 15}}>COMMIT PITCH</SaveButton>
				}

				{
					(formState.name !== data.name ||
					formState.panel !== data.panel ||
					formState.active_version !== data.active_version ) && !isNew &&
					<Grid item>
						<SaveButton onClick={handlerSave} style={{marginRight: 15}}>SAVE</SaveButton> {' '}
						<SaveButton onClick={handlerCancel} style={{backgroundColor: '#eeeeee'}}>CANCEL</SaveButton>
					</Grid>		
				}
				<AlertModal {...alert} />
			</Grid>
	);
};
