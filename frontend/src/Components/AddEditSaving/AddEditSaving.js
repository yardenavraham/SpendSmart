import * as React from "react";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

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
    Grid
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as consts from "../../Consts";
import AlertModal from "../Alerts/AlertModal";
import { Form, Formik, Field } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";
import DatePickerField from "../DatePickerField/DatePickerField";

const descriptionRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
const goalRegex = /^[+]?([.]\d+|\d+[.]?\d*)$/;

const validationSchema = Yup.object().shape({
    description: Yup.string()
        .matches(descriptionRegex, "Only English letters and numbers")
        .min(2, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Required"),
    goal: Yup.string()
        .matches(goalRegex, "Only positive numbers")
        .min(2, "Minimum 2 characters")
        .max(50, "Maximum 50 characters")
        .required("Required"),
});

export default function AddEditSaving(props) {

    const { addOrEdit, selectedCard } = props;
    const theme = createTheme();
    const labels = addOrEdit === 'add' ? consts.ModolLabelsSavingAdd : consts.ModolLabelsSavingEdit

    const initialValues = (addOrEdit === 'edit') ? {
        goal: selectedCard.goal,
        description: selectedCard.description,
        date: selectedCard.date
    } : {
        goal: "",
        description: "",
        date: new Date()
    };


    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState('');

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
                                            setMessage('Please enter a valid date');
                                            setAlertType('error');
                                            setShowAlert(true);
                                            resetForm({ values: Object.assign({}, values, { date: new Date() }) })
                                        } else {
                                            props.addOrEdit === "add"
                                                ? props.callbackAddSaving(values)
                                                : props.callbackEditSaving(selectedCard._id, values);
                                            setMessage(labels.alertMessage);
                                            setAlertType('success');
                                            setShowAlert(true);
                                            resetForm({ values: '' })
                                        }
                                    }}
                                >
                                    {(props) => {
                                        const {
                                            values,
                                            setFieldValue,
                                        } = props;

                                        console.log("props " + JSON.stringify(props));
                                        return (
                                            <Form sx={{ alignItems: "center" }}>
                                                <Grid container spacing={2} justifyContent="center">
                                                    <Grid item xs={12} sm={12}>
                                                        <Field
                                                            fullWidth
                                                            component={TextField}
                                                            name="description"
                                                            label="What are you saving for?"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={6}>
                                                        <Field
                                                            component={TextField}
                                                            name="goal"
                                                            label="Goal"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6} sm={6}>
                                                        <DatePickerField
                                                            name="date"
                                                            value={values.date}
                                                            onChange={setFieldValue}
                                                        />
                                                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DesktopDatePicker
                                                                selected={(values.date && new Date(values.date)) || null}
                                                                onChange={val => {
                                                                    setFieldValue("date", val);
                                                                }}
                                                                views={['month', 'year']}
                                                                value={values.date }
                                                                renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
                                                            />
                                                        </LocalizationProvider> */}
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
