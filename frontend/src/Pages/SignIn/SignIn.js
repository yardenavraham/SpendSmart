import * as React from 'react';
import { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './SignIn.css';
import  AuthContext from '../../store/auth-context';

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

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    function isValidEmail(email) {
        return !/\S+@\S+\.\S+/.test(email);
    }

    const fieldNames = {
        ACCOUNT_NAME: 'accountName',
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    function validate(value, fieldName, formValues = {}) {
        switch (fieldName) {
            case fieldNames.EMAIL:
                return isValidEmail(value);
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

    const authCtx = useContext(AuthContext);

    const signInClicked = () => {
        console.log('signInClicked ' + JSON.stringify(formValues));
        authCtx.onLogin(formValues);
    }

    return (
        <ThemeProvider theme={theme}>
            {/* <div className="first" style={{ height: '100%',   left: '0px', width: '100%' }}> */}

                <Container component="main" maxWidth="xs" style={{ backgroundColor: 'white', borderRadius: 10 }}>
                    <CssBaseline />
                    <Box
                        sx={{
                           
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar className='fourth' sx={{ m: 1, mt: 5, bgcolor: '#ff895d' }}>

                        </Avatar>
                        <Typography component="h1" variant="h4">
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                required
                                fullWidth
                                id="accountName"
                                label="Account Name"
                                name="accountName"
                                autoComplete="accountName"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name={fieldNames.EMAIL}
                                value={formValues[fieldNames.EMAIL].value}
                                onChange={handleChange}
                                error={formValues[fieldNames.EMAIL].error}
                                helperText={formValues[fieldNames.EMAIL].error && 'Invalid email'}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                sx={{ mt: 1 }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={signInClicked}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent="center">

                                <Grid item justifyContent="center">
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            {/* </div> */}
        </ThemeProvider>
    );
}
