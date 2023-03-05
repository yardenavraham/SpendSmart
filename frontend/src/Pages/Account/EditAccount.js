// import * as React from 'react';
import React from 'react'
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

export default function EditAccount() {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [message, setMessage] = useState('');
    
    const [passwordFormValues, setPasswordFormValues] = useState(getInitialFormValues());
    const [image, setImage] = useState(null);
    
    
    const  handleChange = (e) => {
        const { name, value } = e.target;
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
            console.log(JSON.stringify(account));
            const data = {}
            
            if (passwordFormValues[fields.confirm.id] !== '') {
                data.oldPassword = passwordFormValues[fields.current.id];
                data.password = passwordFormValues[fields.confirm.id];
            }
            
            data.image = image;
            console.log(JSON.stringify(data));
            
            const response = await axios.patch(`http://localhost:27017/Account/${account.id}`,
              data
            );
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
    
    const ChanePasswordElement = () => {
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
              <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
                  <Grid container spacing={2} style={{ alignItems: 'center', marginLeft: 0 }}>
                      {textField(fields.current, 'Invalid password')}
                      {textField(fields.new, 'Invalid password')}
                      {textField(fields.confirm, 'Passwords don\'t match')}
                  </Grid>
              </Box>
          </>
        );
    
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
                          <AccountEditCard header="Photo"/>
                          <AccountEditCard header="Password" element={ChanePasswordElement()}/>
                      </Grid>
                  </Grid>
                  <AccountEditCard header="Partners"/>
              </Grid>
              <Grid container sx={{ mt: 3, mb: 2, justifyContent: "center" }}>
                  <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    onClick={submit}
                    sx={{ mt: 3, mb: 2, justifyContent: "center" }}>
                      Update
                  </Button>
              </Grid>
    
          </ThemeProvider>
      </>
    );
}
