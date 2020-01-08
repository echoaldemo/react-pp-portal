import React from "react";
import {
  InputLabel,
  InputBase,
  InputAdornment,
  Button,
  Grid,
  Collapse,
  FormControl,
  FormHelperText,
  Input
} from "@material-ui/core";
import { validateEmail, validateWebsite } from "../utils";
import { settings as useStyles, CustomSwitch } from "../styles";
//import { remove } from '../../../../../utils/api';
//import Modal from './Dialog';
import {DeleteModal} from "common-components";


interface Props {
  company: any;
  handleFormSubmit: any;
  history: any;
}

const Form: React.FC<Props> = ({ company, handleFormSubmit, history }) => {
  const classes = useStyles();
  const [companyDetails, setCompanyDetails] = React.useState(company);
  const [collapse, setCollapse] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    name: "",
    invalid: false,
    deleting: false,
    deleted: false
  });
  const [errors, setErrors] = React.useState({
    name: false,
    email: false,
    website: false
  });

  const handleChange = (e: any) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.id]: e.target.value
    });
    setCollapse(true);
    if (e.target.id === "name") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          [e.target.id]: true
        });
      } else {
        setErrors({
          ...errors,
          [e.target.id]: false
        });
      }
    } else if (e.target.id === "email") {
      handleBlur(e);
    } else if (e.target.id === "website") {
      if (e.target.value !== "") {
        setErrors({
          ...errors,
          website: !validateWebsite(e.target.value)
        });
      } else {
        setErrors({
          ...errors,
          website: false
        });
      }
    }
  };
  const handleBlur = (e: any) => {
    e.target.value === ""
      ? setErrors({
          ...errors,
          email: false
        })
      : setErrors({
          ...errors,
          email: !validateEmail(e.target.value)
        });
  };
  const handleValue = (e: any) => {
    setValue({
      ...value,
      name: e.target.value,
      invalid: !(e.target.value === companyDetails.name)
    });
  };
  const delCompany = () => {
    setValue({
      ...value,
      deleting: true
    });
    /* remove(`/identity/company/${companyDetails.uuid}/`).then(() => {
      setValue({
        ...value,
        deleted: true
      });
    }); */
  };
  const handleDialogOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <form
            onSubmit={e => {
              handleFormSubmit(e, companyDetails, errors);
              setCollapse(false);
            }}
          >
            <Grid container>
              <Grid item lg={12} className={classes.inputContainer}>
                <FormControl fullWidth error={errors.name}>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      shrink: classes.shrink,
                      focused: classes.focused
                    }}
                    htmlFor="name"
                    required
                  >
                    Company name
                  </InputLabel>
                  <Input
                    autoComplete="off"
                    classes={{
                      root: classes.input,
                      underline: classes.textField
                    }}
                    id="name"
                    value={companyDetails.name}
                    onChange={e => handleChange(e)}
                    required
                  />
                  <FormHelperText id="company-name" error={errors.name}>
                    {errors.name && "A company name is required"}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={12} className={classes.inputContainer}>
                <FormControl fullWidth error={errors.email}>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      shrink: classes.shrink,
                      focused: classes.focused
                    }}
                    htmlFor="email"
                  >
                    Company Email
                  </InputLabel>
                  <Input
                    autoComplete="off"
                    className={classes.textField}
                    id="email"
                    value={companyDetails.email ? companyDetails.email : ""}
                    onChange={e => handleChange(e)}
                    onBlur={e => handleBlur(e)}
                  />
                  <FormHelperText id="email" error={errors.email}>
                    {errors.email && "Invalid email format"}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={12} className={classes.inputContainer}>
                <FormControl fullWidth>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      shrink: classes.shrink,
                      focused: classes.focused
                    }}
                    htmlFor="website"
                  >
                    Website
                  </InputLabel>
                  <Input
                    autoComplete="off"
                    className={classes.textField}
                    id="website"
                    value={companyDetails.website ? companyDetails.website : ""}
                    onChange={e => handleChange(e)}
                    onBlur={e => handleChange(e)}
                  />
                  <FormHelperText id="website" error={errors.website}>
                    {errors.website &&
                      "The website url must be in this form https://example.com"}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item lg={12} className={classes.inputContainer}>
                <FormControl fullWidth disabled>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      shrink: classes.shrink,
                      focused: classes.focused
                    }}
                    htmlFor="status"
                  >
                    Campaign status
                  </InputLabel>
                  <Input
                    className={classes.textField}
                    id="input"
                    value={companyDetails.active ? "Active" : "Inactive"}
                    endAdornment={
                      <InputAdornment position="end">
                        <CustomSwitch
                          id="active"
                          checked={companyDetails.active}
                          onChange={e => {
                            setCompanyDetails({
                              ...companyDetails,
                              [e.target.id]: e.target.checked
                            });
                            setCollapse(true);
                          }}
                          color="default"
                        />
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="status"></FormHelperText>
                </FormControl>
              </Grid>
              <Grid item lg={12} className={classes.inputContainer}>
                <FormControl fullWidth disabled>
                  <InputLabel
                    classes={{
                      root: classes.inputLabel,
                      shrink: classes.shrink,
                      focused: classes.focused
                    }}
                    htmlFor="website"
                  >
                    Delete rapid response test
                  </InputLabel>
                  <InputBase
                    style={{
                      margin: 8
                    }}
                    //shrink="false"
                    value={" "}
                    id="del"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          classes={{ root: classes.delBtn }}
                          onClick={handleDialogOpen}
                        >
                          Delete
                        </Button>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="del"></FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Collapse
              in={collapse}
              classes={{ wrapper: classes.collapseWrapper }}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                transition: "all 1s ease"
              }}
            >
              <span
                style={{
                  width: "50%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <button
                  disabled={errors.name || errors.email || errors.website}
                  type="submit"
                  className={classes.button}
                  style={
                    errors.name || errors.email || errors.website
                      ? {
                          color: "rgba(0,0,0,0.38)",
                          backgroundColor: "rgba(0,0,0,0.12)",
                          cursor: "default"
                        }
                      : {
                          color: "rgba(255,255,255,0.87",
                          backgroundColor: "rgb(182,211,107)"
                        }
                  }
                >
                  SAVE
                </button>
                <button
                  type="button"
                  className={classes.button}
                  onClick={e => {
                    setCompanyDetails(company);
                    setErrors({
                      name: false,
                      email: false,
                      website: false
                    });
                  }}
                >
                  CANCEL
                </button>
              </span>
            </Collapse>
          </form>
        </div>
      </div>
      <DeleteModal
      open={open}
      header="Delete Company"
      name={companyDetails.name}
      msg="company"
      closeFn={handleDialogClose}
      delFn={delCompany} 
      />
    </>
  );
};

export default Form;
