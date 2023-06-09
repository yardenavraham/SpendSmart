import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./SignUp.css";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from 'react';
import  AuthContext from '../../store/auth-context';
import { useNavigate } from "react-router-dom";
import AlertModal from "../../Components/Alerts/AlertModal";
import PartnersList from "../../Components/Forms/PartnersList"
import {confirmPasswordValidation, emailValidation, nameValidation, passwordValidation} from "../../Components/Forms/FormikValidations";

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

// const theme = createTheme();

const validationSchema = Yup.object().shape({
  account: nameValidation,
  firstName: nameValidation,
  lastName: nameValidation,
  email: emailValidation,
  password: passwordValidation.required("Required"),
  confirmPassword: confirmPasswordValidation.required("Required"),
  partners: Yup.array(
    Yup.object({
      partnerFirstName: nameValidation,
      partnerLastName: nameValidation,
      partnerEmail: emailValidation,
    })
  ),
});

export default function SignUp() {

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const mapPartner = (values) => {
    return {
      firstName: values.partnerFirstName,
      lastName: values.partnerLastName,
      email: values.partnerEmail
    }
  }
  
  const map = (values) => {
    const partners = [{
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      image: 'aaaaaa'
    }]
    values.partners.map(p => mapPartner(p)).forEach(p => partners.push(p));
    return {
      name: values.account,
      password: values.password,
      partners: partners
    }
  }
  
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  
  
  const saveHandler = async (account) => {
    try {
      console.log('Saving account ' + JSON.stringify(account));
      const response = await axios.post("http://localhost:27017/signup", map(account));
      authCtx.onLogin(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
      setShowAlert(true);
      setMessage(error.response.data.message);
    }
  };
  
  
  return (
    <>
      {showAlert && (
        <AlertModal
          open={showAlert}
          alertType={'error'}
          message={message}
          setOpen={setShowAlert}
        />
      )}
      
    {/* <ThemeProvider theme={theme}> */}
      <div
        className="back"
        style={{
          height: "100%",
          position: "sticky",
          left: "0px",
          width: "100%",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          alignItems="center"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <CssBaseline />

          <Box
            sx={{
              paddingTop: 2,
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
              <Grid container sx={{ alignItems: "center" }}>
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
                      saveHandler(values).then(r => console.log("completed save account with response: " + r));
                      setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({ values }) => (
                    <Form sx={{ alignItems: "center" }}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            component={TextField}
                            name="account"
                            label="Profile Name"
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
                        <PartnersList partners={values.partners}/>
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
    {/* </ThemeProvider> */}
    </>
  );
}
