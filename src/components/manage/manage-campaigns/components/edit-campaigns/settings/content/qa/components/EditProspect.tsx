import React, { useEffect, useState } from "react";
import {
  Modal,
  InputField,
  ButtonWithIcon,
  SaveButton
} from "common-components";
import { IoIosSettings } from "react-icons/io";
import { Grid, Checkbox, MenuItem } from "@material-ui/core";
import { CancelBtn, BtnCont, Header, NewDivide } from "../styles";
import { Link } from "react-router-dom";

interface IProps {
  state: any;
  setState: any;
  current: any;
}

const EditProspect: React.FC<IProps> = ({ state, setState, current }) => {
  const [prospect, setProspect] = useState<any>({});

  useEffect(() => {
    setProspect(current);
  }, [current]);

  return (
    <Modal
      open={state.edit}
      title={`Edit prospect: ${prospect.first_name} ${prospect.last_name}`}
      onClose={() => setState({ ...state, edit: false })}
      width={680}
    >
      <Header>
        <strong>QA Scoring</strong>
        <Link to="/manage/campaign/edit/QAProspect">
          <ButtonWithIcon
            icon={<IoIosSettings />}
            handleClick={() => alert("Advanced settings")}
          >
            Advanced settings
          </ButtonWithIcon>
        </Link>
      </Header>
      <audio controls style={{ width: "100%", marginTop: 20, outline: "none" }}>
        <source
          src="http://www.pachd.com/sfx/city-park-ambience-1.mp3"
          type="audio/wav"
        />
      </audio>

      <NewDivide />
      <Header>
        <strong style={{ marginTop: 20 }}>
          {prospect.first_name} {prospect.last_name} information
        </strong>
      </Header>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="First name"
            required
            value={prospect.first_name}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Last name" value={prospect.last_name} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="Primary phone"
            value={prospect.primary_phone}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Primary Email" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Rep notes" value={prospect.notes} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Secondary Phone" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Secondary Email" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Third Phone" value={""} />
        </Grid>

        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Revenue" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Gender" value="Select" select>
            <MenuItem value={"Select"}>Select</MenuItem>
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
          </InputField>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Lead ID" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="Street"
            required
            value={prospect.street}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Street 2" value={""} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="City" value={prospect.city} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="State" value={prospect.state} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Zip code" value={prospect.zip} />
        </Grid>
      </Grid>

      <NewDivide />
      <Header>
        <strong style={{ marginTop: 20 }}>Scoring</strong>
      </Header>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="Disposition"
            value={prospect.disposition}
            select
          >
            <MenuItem value={prospect.disposition}>
              {prospect.disposition}
            </MenuItem>
          </InputField>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="NCS"
            value={prospect.ncs ? prospect.ncs : "s"}
            select
          >
            <MenuItem value={"s"}>Select</MenuItem>
          </InputField>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField
            fullWidth
            label="Quality"
            value={prospect.quality ? prospect.quality : "s"}
            select
          >
            <MenuItem value={"s"}>Select</MenuItem>
          </InputField>
        </Grid>
        <Grid item md={6} xs={12} style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              top: 30,
              left: -2,
              fontSize: 16,
              color: "#777777"
            }}
          >
            <Checkbox color="primary" /> Finished
          </span>
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Notes" value={""} />
        </Grid>
      </Grid>

      <NewDivide />
      <Header>
        <strong style={{ marginTop: 20 }}>
          Custom: US Troopers and Police Program
        </strong>
      </Header>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Campaign" value={"UPOA"} />
        </Grid>
        <Grid item md={6} xs={12}>
          <InputField fullWidth label="Amount" value={""} />
        </Grid>
      </Grid>
      <BtnCont>
        <CancelBtn onClick={() => setState({ ...state, edit: false })}>
          cancel
        </CancelBtn>
        <SaveButton onClick={() => alert("work in progress")}>save</SaveButton>
      </BtnCont>
    </Modal>
  );
};

export default EditProspect;
