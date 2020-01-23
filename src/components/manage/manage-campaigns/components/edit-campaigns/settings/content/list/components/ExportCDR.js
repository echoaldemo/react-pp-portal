import React, { useState } from 'react'
import {
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel
} from '@material-ui/core'
import TransferListCard from '../transfer-list-card/TransferListCard'
import { CustomButton } from 'common-components'
import { cdrStyle as useStyles } from './styles'

const TopInfo = ({ classes }) => {
  const textFields = [
    {
      placeholder: 'Start Date'
    },
    {
      placeholder: 'End Date'
    },
    {
      placeholder: 'Filename'
    }
  ]
  return (
    <div>
      {textFields.map((fields, i) => {
        return (
          <TextField
            key={i}
            //   onChange={e => handleSearch(e)}
            id="standard-full-width"
            // value={textSearch}
            placeholder={`${fields.placeholder}`}
            fullWidth
            margin="normal"
            autoComplete="off"
            style={{
              padding: '5px 15px 5px 0px',
              width: '100%'
            }}
            InputProps={{
              classes: {
                underline: classes.inputField,
                root: classes.inputField
              }
            }}
          />
        )
      })}
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <FormControlLabel
              style={{
                padding: '5px 10px 5px 0px',
                width: '100%',
                color: '#777777'
              }}
              control={
                <Checkbox
                  disabled
                  checked={false}
                  // onChange={handleChange("checkedB")}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Quilified only"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              style={{
                padding: '5px 10px 5px 0px',
                width: '100%',
                color: '#777777'
              }}
              control={
                <Checkbox
                  disabled
                  checked={false}
                  // onChange={handleChange("checkedB")}
                  value="checkedB"
                  color="primary"
                />
              }
              label="DNC only"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              style={{
                padding: '5px 10px 5px 0px',
                width: '100%',
                color: '#777777'
              }}
              control={
                <Checkbox
                  disabled
                  checked={false}
                  // onChange={handleChange("checkedB")}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Resolved only"
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
const mockData = [
  {
    name: 'IVR Removal'
  },
  {
    name: 'Wrong number'
  },
  {
    name: 'Voice mail'
  },
  {
    name: 'Do not call'
  }
]
const ExportCDR = props => {
  const { setOpenExportList, SaveExportList } = props
  const classes = useStyles()
  const [selectedData, setSelectedData] = useState([])
  const [value, setValue] = React.useState('female')
  const handleChange = event => {
    setValue(event.target.value)
  }
  const SelectedDataFunc = (data, listname) => {
    setSelectedData({ [listname]: data })
  }
  const SaveDataFunc = () => {
    SaveExportList(selectedData)
  }
  const CancelDataFunc = () => {
    setOpenExportList(false)
  }
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Picker</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <Grid container>
                <Grid item>
                  <FormControlLabel
                    classes={{ label: classes.formlabel }}
                    value="today"
                    control={<Radio />}
                    label="Today"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    classes={{ label: classes.formlabel1 }}
                    value="yesterday"
                    control={<Radio />}
                    label="Yesterday"
                  />
                </Grid>
                <Grid inputMode>
                  <FormControlLabel
                    classes={{ label: classes.formlabel1 }}
                    value="this week"
                    control={<Radio />}
                    label="This week"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    classes={{ label: classes.formlabel1 }}
                    value="last week"
                    control={<Radio />}
                    label="Last week"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    classes={{ label: classes.formlabel1 }}
                    value="this month"
                    control={<Radio />}
                    label="This month"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    classes={{ label: classes.formlabel1 }}
                    value="last month"
                    control={<Radio />}
                    label="Last month"
                  />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TopInfo classes={classes} />
        </Grid>
        <Grid item xs={12}>
          <TransferListCard
            list={{
              title: 'Dispositions'
            }}
            mockData={mockData}
            SelectedDataFunc={SelectedDataFunc}
          />
          <TransferListCard
            list={{
              title: 'Locations'
            }}
            mockData={mockData}
            SelectedDataFunc={SelectedDataFunc}
          />
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ paddingTop: 20 }} spacing={2}>
        <Grid item>
          <CustomButton onClick={SaveDataFunc}>Save</CustomButton>
        </Grid>
        <Grid item>
          <CustomButton
            onClick={CancelDataFunc}
            style={{ backgroundColor: '#eee' }}
          >
            <strong style={{ color: '#444851' }}>Cancel</strong>
          </CustomButton>
        </Grid>
      </Grid>
    </>
  )
}

export default ExportCDR
