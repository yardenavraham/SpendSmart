import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    MenuItem,
    Button,
    Box,
    Stack,
    Container,
    Avatar,
    CssBaseline,
    InputLabel,
    FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as consts from "../../Consts";
import AlertModal from "../Alerts/AlertModal";
import { Form, Formik, Field } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";
import DatePickerField from "../DatePickerField/DatePickerField";

const descriptionRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
const amountRegex = /^[+]?([.]\d+|\d+[.]?\d*)$/;
const frequencyRegex = /^[a-zA-Z\s]*$/;
const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

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
  frequency: Yup.string()
    .matches(frequencyRegex, "Only English letters")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters"),
  madeBy: Yup.string().required("Required"),
});

export default function AddEditModal(props) {
    //console.log('props11 ' + JSON.stringify(props));

    const { addOrEdit, madeBy, selectedRow, tableType } = props;
    const [madeByOptions, setMadeByOptions] = useState(madeBy);
    console.log('madeBy ' + madeBy);
    const theme = createTheme();
    const dataModel = tableType === consts.myTableType.Expenses ? consts.expense : consts.income
    console.log('table type ' + tableType);
    const labels = addOrEdit === 'add' ? dataModel.modolLabelsAdd : dataModel.modolLabelsEdit

    const initialValues = (addOrEdit === 'edit') ? {
        type: selectedRow.type,
        category: selectedRow.category,
        amount: selectedRow.amount,
        description: selectedRow.description,
        madeBy: selectedRow.madeBy,
        frequency: selectedRow.frequency,
        date: selectedRow.date
    } : {
        type: tableType,
        category: "",
        amount: "",
        description: "",
        madeBy: "",
        frequency: "",
        date: new Date()
    };

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        const timeId = setTimeout(() => {
            // After 2 seconds set the show value to false
            setShowSuccessAlert(false);
        }, 2000);

        return () => {
            clearTimeout(timeId);
        };
    }, [showSuccessAlert]);

    return (
        <>
            {showSuccessAlert && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <AlertModal
                        open={showSuccessAlert}
                        alertType="success"
                        message={labels.alertMessage}
                    />
                </Stack>
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
                  onSubmit={(values) => {
                    if(!values.date){
                        alert('Please enter a valid date');
                    }else{
                        props.addOrEdit === "add"
                        ? props.callbackAddTransaction(values)
                        : props.callbackEditTransaction(selectedRow._id, values);
                      setShowSuccessAlert(true);
                    }
                    //console.log('values ' + JSON.stringify(values));
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                      setFieldValue,
                    } = props;

                                        console.log("props " + JSON.stringify(props));
                                        return (
                                            <Form sx={{ alignItems: "center" }}>
                                                <Grid container spacing={2} justifyContent="center">
                                                    <Grid item xs={12} sm={12}>
                                                        <FormControl fullWidth>
                                                            <Field
                                                                component={Select}
                                                                name="category"
                                                                label="Category"
                                                            >
                                                                {dataModel.category.map((category) => (
                                                                    <MenuItem key={category} value={category}>
                                                                        {category}
                                                                    </MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormControl>
                                                    </Grid>
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
                                                        <Field
                                                            fullWidth
                                                            component={TextField}
                                                            name="frequency"
                                                            label="Frequency"
                                                        />
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
