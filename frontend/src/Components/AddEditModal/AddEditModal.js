import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  MenuItem,
  Button,
  Box,
  Stack,
  Container,
  Avatar,
  CssBaseline,
  FormControl,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as consts from "../../Consts";
import AlertModal from "../Alerts/AlertModal";
import { Form, Formik, Field } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";
import DatePickerField from "../DatePickerField/DatePickerField";
import axios from "axios";
import AuthContext from '../../store/auth-context';

const descriptionRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
const amountRegex = /^[+]?([.]\d+|\d+[.]?\d*)$/;

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Required"),
  description: Yup.string()
    .matches(descriptionRegex, "Only English letters and numbers")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
  amount: Yup.string()
    .matches(amountRegex, "Only positive numbers")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .required("Required"),
  madeBy: Yup.string().required("Required"),
  //savingTypes: Yup.string().required("Required"),
});

export default function AddEditModal(props) {
  const { addOrEdit, madeBy, selectedRow, tableType } = props;
  const [madeByOptions] = useState(madeBy);
  const theme = createTheme();
  const dataModel =
    tableType === consts.myTableType.Expenses ? consts.expense : consts.income;
  const labels =
    addOrEdit === "add" ? dataModel.modolLabelsAdd : dataModel.modolLabelsEdit;

  const initialValues =
    addOrEdit === "edit"
      ? {
          type: selectedRow.type,
          category: selectedRow.category,
          amount: selectedRow.amount,
          description: selectedRow.description,
          madeBy: selectedRow.madeBy,
          frequency: selectedRow.frequency,
          date: selectedRow.date,
          savingType: selectedRow.savingType
        }
      : {
          type: tableType,
          category: "",
          amount: "",
          description: "",
          madeBy: "",
          frequency: 1,
          date: new Date(),
          savingType: ""
        };

  // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // const [showErrorAlert, setShowErrorAlert] = useState(false);

  const authCtx = useContext(AuthContext);
  const account = authCtx.accountDetails.accountName;

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const frequencyArr = Array(12)
    .fill(0)
    .map((_, i) => i + 1);

  const [savingsTypeOptions, setSavingsTypeOptions] = useState();
  const [savingsTypeHidden, setSavingsTypeHidden] = useState(true);


  const getSavingTypesFromAllSavings = async () => {
    const response = await axios.get(
      `http://localhost:27017/Saving/${account}`
    );
    console.log('response.data', response.data);
    let listWithDuplicates =  response.data.map((item) => item.description);
    const withoutDuplicates = [...new Set(listWithDuplicates)];
    console.log('withoutDuplicates', withoutDuplicates);

    setSavingsTypeOptions(withoutDuplicates);
    console.log('savingsTypeOptions', savingsTypeOptions);
  };

  const handleCategoryChange = (event) => {
    var category = event.target.value;
    console.log(category);
    if (category === "Saving") {
      setSavingsTypeHidden(false);
      // call to db to extract the savvings types
      getSavingTypesFromAllSavings();
    } else {
      setSavingsTypeHidden(true);
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <AlertModal
          open={showAlert}
          alertType={alertType}
          message={message}
          setOpen={setShowAlert}
        />
      )}
      <ThemeProvider theme={theme}>
        <Avatar onClick={props.handleClose} sx={{ m: 2 }}>
          <CloseIcon />
        </Avatar>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {labels.addOrEditIcon}
            </Avatar>
            <Typography component="h1" variant="h5">
              {labels.action}
            </Typography>

            <Box sx={{ mt: 3, alignItems: "center" }} justifyContent="center">
              <Grid container sx={{ alignItems: "center" }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    if (!values.date) {
                      setMessage("Please enter a valid date");
                      setAlertType("error");
                      setShowAlert(true);
                      resetForm({
                        values: Object.assign({}, values, { date: new Date() }),
                      });
                    } else {
                      props.addOrEdit === "add"
                        ? props.callbackAddTransaction(values)
                        : props.callbackEditTransaction(
                            selectedRow._id,
                            values
                          );
                      setMessage(labels.alertMessage);
                      setAlertType("success");
                      setShowAlert(true);
                      resetForm({ values: "" });
                    }
                  }}
                >
                  {(props) => {
                    const { values, setFieldValue } = props;

                    // console.log("props " + JSON.stringify(props));
                    return (
                      <Form sx={{ alignItems: "center" }}>
                        <Grid container spacing={2} justifyContent="center">
                          <Grid item xs={12} sm={12}>
                            <FormControl fullWidth>
                              <Field
                                component={Select}
                                name="category"
                                label="Category"
                                onChange={handleCategoryChange}
                              >
                                {dataModel.category.map((category) => (
                                  <MenuItem key={category} value={category}>
                                    {category}
                                  </MenuItem>
                                ))}
                              </Field>
                              </FormControl>
                              </Grid>
                              {!savingsTypeHidden && savingsTypeOptions ? (
                                <Grid item xs={12} sm={12}>
                                <FormControl spacing={2} fullWidth>
                                  <Field
                                  fullWidth
                                  component={Select}
                                  name="savingType"
                                  label="saving Type"
                                  >
                                  {savingsTypeOptions.map((type) => (
                                      <MenuItem fullWidth key={type} value={type}>
                                      {type}
                                    </MenuItem>
                                  ))}
                                </Field>
                                </FormControl>
                                </Grid>) : null}
                          <Grid item xs={12}>
                            <Field
                              fullWidth
                              component={TextField}
                              name="description"
                              label="Description"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Field
                              component={TextField}
                              name="amount"
                              label="Amount"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                              <Field
                                fullWidth
                                component={Select}
                                name="madeBy"
                                label="Made By"
                              >
                                {madeByOptions.map((name) => (
                                  <MenuItem key={name} value={name}>
                                    {name}
                                  </MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <FormControl fullWidth>
                                <Field
                                  defaultValue={"1"}
                                  component={Select}
                                  name="frequency"
                                  label="Monthly frequency"
                                >
                                  {frequencyArr.map((num) => (
                                    <MenuItem key={num} value={num}>
                                      {num}
                                    </MenuItem>
                                  ))}
                                </Field>
                            </FormControl>
                            {/* <Field
                                                            fullWidth
                                                            component={TextField}
                                                            name="frequency"
                                                            label="Frequency"
                                                        /> */}
                          </Grid>
                          <Grid item xs={12}>
                            <DatePickerField
                              name="date"
                              value={values.date}
                              onChange={setFieldValue}
                            />
                          </Grid>

                          <Grid container item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                            >
                              Save
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
