// import * as React from 'react';
import React, {useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useContext } from "react";
import axios from "axios";
import  AuthContext from '../../store/auth-context';
import { useNavigate } from "react-router-dom";
import UploadImage from '../../Components/UploadImage/UploadImage';
import AlertModal from "../../Components/Alerts/AlertModal";
import AccountEditCard from "../../Components/EditAccount/AccountEditCard";
import PartnersList from "../../Components/Forms/PartnersList";
import {Formik} from "formik";
import * as Yup from "yup";
import {confirmPasswordValidation, emailValidation, nameValidation, passwordValidation} from "../../Components/Forms/FormikValidations";

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="/">
              SpendSmart
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
    );
}

const theme = createTheme();

function passwordsEqual(ps1, ps2) {
    return ps1 === ps2;
}

const fields = {
    current: {id: "currentPass", text: 'Current Password'},
    new: {id: 'newPass', text: 'New Password'},
    confirm: {id: 'confirmPass', text: 'Confirm Password'}
}

function validate(value, fieldName, formValues = {}) {
    switch (fieldName) {
      //TODO: password requirements from signup
        case fields.confirm.id:
            return !passwordsEqual(value, formValues[fields.new.id])
        default:
            return false;
    }
}

function getInitialFormValues() {
    return Object.values(fields).reduce((state, field) => {
        state[field.id] = '';
        return state;
    }, {});
}

async function getAccount(id) {
    const response = await axios.get(`http://localhost:27017/Account/${id}`);
    return response.data;
}

async function getPartnersFromDB(accountId) {
    const account = await getAccount(accountId);
    console.log("ACCOUNT AFTER AWAIT = " + JSON.stringify(account));
    return await account?.partners || [];
}

export default function EditAccount() {
    
    const [imageName, setImageName] = useState(null);
    const authCtx = useContext(AuthContext);
    console.log('authCtx', JSON.stringify(authCtx.accountDetails));
    const [image, setImage] = useState(authCtx.accountDetails.image);

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [message, setMessage] = useState('');
    
    const [passwordFormValues, setPasswordFormValues] = useState(getInitialFormValues());
    console.log(authCtx.accountDetails)
    const [partners, setPartners] = useState([])
    useEffect(() => {
        setImage(authCtx.image);
        async function fetch() {
            console.log('authCtx.id', authCtx.id);
            const savedPartners = await getPartnersFromDB(authCtx.id);
        
            console.log("SAVED PARTNERS = " + JSON.stringify(savedPartners))
            setPartners(savedPartners.map(partner => {return {
                key: partner.email,
                partnerFirstName: partner.firstName,
                partnerLastName: partner.lastName,
                partnerEmail: partner.email
            }}));
        }
        fetch();
    }, [authCtx.id, authCtx.image]);
    
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log('field: [' + name + "], value: [" + value + "], current values: [" + JSON.stringify(passwordFormValues) + "]");
        
        setPasswordFormValues(previousFormValues => {
            return {
                ...previousFormValues,
                [name]: value
            }
        })
    }
    
    const saveHandler = async () => {
        try {
            const account = authCtx.accountDetails;
            console.log('account', JSON.stringify(account));
            console.log('account.id', JSON.stringify(account.id));

            const data = {};
            console.log('imageName', imageName);
            data.image = imageName;
            const response = await axios.patch(`http://localhost:27017/Account/${account.id}`,
                data
            );
            authCtx.onLogin(response.data.token);
            console.log(response);
            setShowAlert(true)
            setAlertType('success')
            setMessage("The account has been updated")
            //TODO: timeout
            
            
        } catch (error) {
            console.error(error);
            setShowAlert(true);
            setAlertType('error');
            setMessage(error.response.data.message);
        }
    };
    
    const submit = (event) => {
        event.preventDefault();
        
        if (!passwordsEqual(passwordFormValues[fields.new.id], passwordFormValues[fields.confirm.id])) {
            setShowAlert(true);
            setAlertType('error');
            setMessage("Confirmation does not match the new password")
            return;
        }        
        saveHandler();        
    };
    
    const UpdatePasswordElement = () => {
        const textField = (field, errorMessage) => {
            const error = validate(passwordFormValues[field.id], field.id, passwordFormValues);
            console.log(passwordFormValues[field.id])
            return <Grid item xs={12}>
                <TextField
                  variant="standard"
                  name={field.id}
                  label={field.text}
                  type="password"
                  id={field.id}
                  value={passwordFormValues[field.id]}
                  onChange={handleChange}
                  error={error}
                  helperText={error && errorMessage}
                />
            </Grid>
        }
        
        return (
          <>
              <Box component="form" noValidate onSubmit={submit} sx={{mt: 1}}>
                  <Grid container spacing={2} style={{alignItems: 'center', marginLeft: 0}}>
                      {textField(fields.current, 'Invalid password')}
                      {textField(fields.new, 'Invalid password')}
                      {textField(fields.confirm, 'Passwords don\'t match')}
                  </Grid>
              </Box>
          </>
        );
        
    }

    const UpdateImageElement = () => {
        //console.log('image before21 ', image);

        return (
          <>
              {authCtx.accountDetails.image !== undefined && <UploadImage selectedImage={image} setSelectedImage={setImage} setImageName={setImageName} currentImageName={authCtx.accountDetails.image}/>}
          </>
        );
    }
    
    const UpdatePartnersElement = () => {
        
        const validationSchema = Yup.object().shape({
            // firstName: nameValidation,
            // lastName: nameValidation,
            // email: emailValidation,
            password: passwordValidation,
            confirmPassword: confirmPasswordValidation,
            partners: Yup.array(
              Yup.object({
                  partnerFirstName: nameValidation,
                  partnerLastName: nameValidation,
                  partnerEmail: emailValidation,
              })
            ).min(1),
        });
        
        return (
          <>
              <Formik
                initialValues={{
                    partners: partners,
                }}
                // values={{partners: partners}}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting}) => {
                    saveHandler(values).then(r => console.log("completed save account with response: " + r));
                    setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
              >
                  {({ values }) => (
                    <PartnersList partners={values.partners}/>
                  )}
              </Formik>
          </>)
    }
    
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
              {/*<div className="third-color" style={{ height: '100%', left: '0px', width: '100%' }}>*/}
              {/*    <Container component="main" maxWidth="sm" style={{ backgroundColor: 'white', borderRadius: 10 }}>*/}
              {/*        <CssBaseline />*/}
              <Grid container spacing={4}>
                  <Grid item xs={6}>
                      <Grid container direction="column" rowSpacing={4}>
                          <AccountEditCard header="Photo" element={UpdateImageElement()}/>
                          <AccountEditCard header="Password" element={UpdatePasswordElement()}/>
                      </Grid>
                  </Grid>
                  <AccountEditCard header="Partners" element={UpdatePartnersElement()}/>
              </Grid>
              <Grid container sx={{mt: 3, mb: 2, justifyContent: "center"}}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={submit}
                    sx={{mt: 3, mb: 2, justifyContent: "center"}}>
                      Update
                  </Button>
              </Grid>
          
          </ThemeProvider>
      </>
    );
}
