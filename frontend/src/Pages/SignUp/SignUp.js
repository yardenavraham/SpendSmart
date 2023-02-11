import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";
import { Form, Formik, Field, FieldArray } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";


function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="/">
            SpendSmart
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const nameRegex = /^[A-Za-z]+$/;

const validationSchema = Yup.object().shape({
    account: Yup.string()
        .matches(nameRegex, "Only English letters")
        .min(2, "Account Name is too short")
        .max(50, "Account Name is too long")
        .required("Required"),
    firstName: Yup.string()
        .matches(nameRegex, "Only English letters")
        .min(2, "First Name is too short")
        .max(50, "First Name is too long")
        .required("Required"),
    lastName: Yup.string()
        .matches(nameRegex, "Only English letters")
        .min(2, "Last Name is too short")
        .max(50, "Last Name is too long")
        .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(4, "Password is too short")
        .max(50, "Password is too long")
        .required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    partners: Yup.array(
        Yup.object({
            partnerFirstName: Yup.string().matches(nameRegex, "Only English letters").required("Required"),
            partnerLastName: Yup.string().matches(nameRegex, "Only English letters").required("Required"),
            partnerEmail: Yup.string().email("Invalid email").required("Required"),
        })
    ),
});

export default function SignUp() {
    const partnersGroup = {
        partnerFirstName: "",
        partnerLastName: "",
        partnerEmail: "",
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="back" style={{ height: '100%', position: 'sticky', left: '0px', width: '100%', }}>
                <Container
                    component="main"
                    maxWidth="xs"
                    alignItems="center"
                    style={{ backgroundColor: "white", borderRadius: 10 }}
                >
                    <CssBaseline />

                    <Box
                        sx={{

                            paddingTop: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                        }}
                    >
                        <Avatar className="" sx={{ m: 1, bgcolor: "#ff895d" }}></Avatar>
                        <Typography component="h1" variant="h4">
                            Sign up
                        </Typography>

                        <Box sx={{ mt: 3, alignItems: "center" }} justifyContent="center">
                            <Grid container sx={{ alignItems: "center" }} >
                                <Formik
                                    initialValues={{
                                        account: "",
                                        firstName: "",
                                        lastName: "",
                                        email: "",
                                        password: "",
                                        confirmPassword: "",
                                        partners: [],
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            alert(JSON.stringify(values, null, 2));
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ values }) => (
                                        <Form sx={{ alignItems: "center" }} >
                                            <Grid container spacing={2} justifyContent="center" >
                                                <Grid item xs={12} >
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        name="account"
                                                        label="Account Name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="firstName"
                                                        label="First Name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Field
                                                        component={TextField}
                                                        name="lastName"
                                                        label="Last Name"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        name="email"
                                                        label="Email Address"
                                                        type="email"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        name="password"
                                                        label="Password"
                                                        type="password"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Field
                                                        fullWidth
                                                        component={TextField}
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        type="password"
                                                    />
                                                </Grid>
                                                <FieldArray name="partners">
                                                    {({ push, remove }) => (
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                            sx={{ marginTop: 2, paddingX: 2 }}
                                                        >
                                                            {values.partners.map((_, index) => (
                                                                <>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field
                                                                            fullWidth
                                                                            name={`partners.${index}.partnerFirstName`}
                                                                            component={TextField}
                                                                            label="First Name"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6}>
                                                                        <Field
                                                                            fullWidth
                                                                            name={`partners.${index}.partnerLastName`}
                                                                            component={TextField}
                                                                            label="Last Name"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={9}>
                                                                        <Field
                                                                            fullWidth
                                                                            name={`partners.${index}.partnerEmail`}
                                                                            component={TextField}
                                                                            label="Email Address"
                                                                            type="email"
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={3}>
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="error"
                                                                            onClick={() => remove(index)}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    </Grid>
                                                                </>
                                                            ))}{" "}
                                                            <Grid container item xs={12} justifyContent="center" >
                                                                <Button

                                                                    variant="outlined"
                                                                    color="success"
                                                                    onClick={() => push(partnersGroup)}
                                                                >
                                                                    Add Another Account Partner
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    )}
                                                </FieldArray>
                                                <Grid container item xs={12}>
                                                    <Button
                                                        type="submit"
                                                        fullWidth
                                                        variant="contained"
                                                        sx={{ mt: 3, mb: 2 }}
                                                    >
                                                        Sign Up
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Form>
                                    )}
                                </Formik>
                            </Grid>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    <Copyright sx={{ mt: 5, paddingBottom: 3 }} />
                </Container>
            </div>
        </ThemeProvider>
    );
}
