import * as React from 'react';
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

import { useState } from "react";





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


function isValidEmail(email) {
    return !/\S+@\S+\.\S+/.test(email);
}

function isEqualPassword(ps1, ps2) {
    return ps1 === ps2;
}

function isValidName(name) {
    return !/^[A-Za-z]+$/.test(name);
}

const fieldNames = {
    OLDPASSWORD: 'OldPassword',
    PASSWORD: 'password',
    PASSWORD2: 'password2'
}

function validate(value, fieldName, formValues = {}) {
    switch (fieldName) {
        case fieldNames.FIRST_NAME:
            return isValidName(value);
        case fieldNames.LAST_NAME:
            return isValidName(value);
        case fieldNames.EMAIL:
            return isValidEmail(value);
        case fieldNames.PASSWORD2:
            return !isEqualPassword(value, formValues[fieldNames.PASSWORD].value)
        default:
            return false;
    }
}

function getInitialFormValues() {
    return Object.values(fieldNames).reduce((state, fieldName) => {
        state[fieldName] = { value: '', error: false };
        return state;
    }, {});
}

export default function EditInformation() {

    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        /// this need to be changed... 
        if (!isValidName(data.get(fieldNames.FIRST_NAME))) {
            console.log("first name contained numeric")
        }

        if (!isValidName(data.get(fieldNames.LAST_NAME))) {
            console.log("last name contained numeric")
        }

        if (!isEqualPassword(data.get(fieldNames.PASSWORD), data.get(fieldNames.PASSWORD2))) {
            console.log("password not alike")
        }

        console.log({
            email: data.get(fieldNames.OLDPASSWORD),
            password: data.get(fieldNames.PASSWORD),
            password2: data.get(fieldNames.PASSWORD2),

        });
    };
    //const [firstNameValue, setFirstName] = useState('');
    //console.log({ firstNameValue })


    const [formValues, setFormValues] = useState(getInitialFormValues());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(previousFormValues => {
            const error = validate(value, name, previousFormValues);
            return {
                ...formValues,
                [name]: {
                    value,
                    error
                }
            }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="third-color" style={{ height: '100%', left: '0px', width: '100%' }}>
                <Container component="main" maxWidth="sm" style={{ backgroundColor: 'white', borderRadius: 10 }}>
                    <CssBaseline />

                    <Box
                        sx={{

                            paddingTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
                            <Grid container spacing={2}>

                                <Grid container sx={{ justifyContent: "center" }}>
                                    <Typography component="h1" variant="h6" align='center' sx={{ mt: 6, justifyContent: "center" }}>
                                        Change Password
                                    </Typography>

                                </Grid>
                                <Grid container item xs={12} style={{ alignItems: 'left', marginLeft: 36 }}>
                                    <TextField

                                        variant="standard"
                                        name={fieldNames.OLDPASSWORD}
                                        label="Old Password"
                                        type="password"
                                        id="OldPassword"
                                        value={formValues[fieldNames.OLDPASSWORD].value}
                                        onChange={handleChange}
                                        error={formValues[fieldNames.OLDPASSWORD].error}
                                        helperText={formValues[fieldNames.OLDPASSWORD].error && 'Invalid password'}
                                    //autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="standard"
                                        name={fieldNames.PASSWORD}
                                        label="New Password"
                                        type="password"
                                        id="password"
                                        value={formValues[fieldNames.PASSWORD].value}
                                        onChange={handleChange}
                                        error={formValues[fieldNames.PASSWORD].error}
                                        helperText={formValues[fieldNames.PASSWORD].error && 'Invalid password'}
                                    //autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="standard"
                                        name={fieldNames.PASSWORD2}
                                        label="Confirm New Password"
                                        type="password"
                                        id="password2"
                                        value={formValues[fieldNames.PASSWORD2].value}
                                        onChange={handleChange}
                                        error={formValues[fieldNames.PASSWORD2].error}
                                        helperText={formValues[fieldNames.PASSWORD2].error && "Passwords don't match"}
                                    //autoComplete="new-password"
                                    />
                                </Grid>


                            </Grid>
                            <Grid container sx={{ mt: 3, mb: 2, justifyContent: "center" }}>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, justifyContent: "center" }}>
                                    Change PASSWORD
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5, paddingBottom: 3 }} />
                </Container>
            </div>
        </ThemeProvider>
    );
}
