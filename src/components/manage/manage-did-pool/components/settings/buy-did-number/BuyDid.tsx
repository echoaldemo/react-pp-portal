import React, { useState } from 'react'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import { TextField } from '@material-ui/core'

import CountryList from './cards/CountryList'
import Countries from './cards/Countries'
import Collapse from '@material-ui/core/Collapse'
import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons'
import MenuItem from '@material-ui/core/MenuItem'
import { states } from './states'

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  width: 740px;
  min-height: 420px;
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #5f7d98;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  padding: 0 20px;
  box-sizing: border-box;
`
const CenterText = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`
const CloseIcon = styled(Close)`
  cursor: pointer;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 34px 27px 34px;
`

const Subtitle = styled.p`
  width: 506px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  height: 19px;
  font-size: 16px;
  font-weight: normal;
  color: #444851;
  margin-top: 28px;
`

const SelectField = styled(TextField)`
  .MuiInputLabel-root {
    font-weight: bold;
    font-size: 17px !important;
    color: #999999 !important;
  }
  .MuiFormLabel-root.Mui-focused {
    color: #1194f6 !important;
    font-size: 17px !important;
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
`

const GridDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const ShowCont = styled.div`
  display: grid;
  grid-template-columns: 72px 25px;
  align-items: center;
  cursor: pointer;
  margin: 20px 0;
`

const ShowMore = styled.p`
  font-size: 14px;
  color: #444851;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  text-decoration: underline;
`

const SearchDid = styled.button`
  width: 165px;
  height: 40px;
  border-radius: 3px;
  background-color: #7c8a97;
  cursor: pointer;
  border: none;
  outline: none;
  margin: 0 auto;
`

const SearchText = styled.span`
  width: 88px;
  height: 16px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
`

interface Props {
	header: string
	closeFn: any
	searchFn: Function
}

const BuyDid: React.FC<Props> = ({ header, closeFn, searchFn }) => {
	const [selected, setSelected] = useState<any>([])
	const [selectAll, setSelectAll] = useState(false)
	const [show, setShow] = useState(false)
	const [carrier, setCarrier] = useState('Select')

	const handleCarrier = (name: string) => {
		setCarrier(name)
	}

	const handleSelect = (name: any) => {
		var temp = [...selected]
		if (selected.indexOf(name) === -1) {
			temp.unshift(name)
			setSelected(temp)
		}
	}

	const showLess = () => {
		setShow(!show)
		setTimeout(() => {
			setSelected([])
		}, 1000)
	}

	const handleRemove = (name: any) => {
		var temp = [...selected]
		temp.splice(selected.indexOf(name), 1)
		setSelected(temp)
	}

	const handleSelectAll = () => {
		if (selectAll) {
			setSelectAll(false)
			setSelected([])
		} else {
			setSelectAll(true)
			setSelected(states)
		}
	}
	return (
		<Center>
			<Box>
				<Header>
					<CenterText>{header}</CenterText>
					<CloseIcon onClick={closeFn} />
				</Header>
				<Content>
					<Subtitle>Let's find your DID's</Subtitle>
					<GridDiv style={{ gridGap: 20 }}>
						{[
							{
								title: 'Area Code (NPA)',
								value: '406'
							},
							{
								title: 'NXX',
								value: 'xxx'
							},
							{
								title: 'Carrier',
								value: carrier,
								items: ['Select', 'Smart', 'Globe', 'TNT', 'TM', 'Sun']
							},
							{
								title: 'How many DID’s do you need?',
								value: '5'
							}
						].map(item =>
							item.items ? (
								<SelectField
									select
									value={item.value}
									label={item.title}
									margin="normal"
									defaultValue={item.value}
									onChange={e => handleCarrier(e.target.value)}
								>
									{item.items.map(option => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</SelectField>
							) : (
									<SelectField
										label={item.title}
										margin="normal"
										defaultValue={item.value}
									/>
								)
						)}
					</GridDiv>
					<Collapse in={show} timeout="auto">
						<Subtitle>{'States & Countries'}</Subtitle>
						<GridDiv>
							<CountryList handleRemove={handleRemove} queue={selected} />
							<Countries
								handleSelect={handleSelect}
								countries={states}
								handleSelectAll={handleSelectAll}
							/>
						</GridDiv>
					</Collapse>
					<ShowCont onClick={showLess}>
						<ShowMore>
							Show
              {show ? ' less' : ' more'}
						</ShowMore>
						{show ? (
							<KeyboardArrowUp style={{ fontSize: 20, color: '#444851' }} />
						) : (
								<KeyboardArrowDown style={{ fontSize: 20, color: '#444851' }} />
							)}
					</ShowCont>
					<SearchDid onClick={() => searchFn()}>
						<SearchText>SEARCH DID's</SearchText>
					</SearchDid>
				</Content>
			</Box>
		</Center>
	)
}

export default BuyDid
