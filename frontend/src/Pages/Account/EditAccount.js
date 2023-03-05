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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState, useContext } from "react";
import axios from "axios";
import  AuthContext from '../../store/auth-context';
import { useNavigate } from "react-router-dom";
import UploadImage from '../../Components/UploadImage/UploadImage';
import AlertModal from "../../Components/Alerts/AlertModal";

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

function isEqualPassword(ps1, ps2) {
    return ps1 === ps2;
}


const fieldNames = {
    OLDPASSWORD: 'OldPassword',
    PASSWORD: 'password',
    PASSWORD2: 'password2'
}

function validate(value, fieldName, formValues = {}) {
    switch (fieldName) {
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

export default function EditAccount() {
    
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    console.log('authCtx ' + JSON.stringify(authCtx));
    
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    
    const saveHandler = async () => {
        try {
            const account = authCtx.accountDetails;
            console.log('account', JSON.stringify(account));
            console.log('account.id', JSON.stringify(account.id));

            const data = {};
            const fd = new FormData()

            fd.append('file', image, image.name)

        
            if (formValues[fieldNames.PASSWORD2].value !== '') {
                data.oldPassword = formValues[fieldNames.OLDPASSWORD].value;
                data.password = formValues[fieldNames.PASSWORD2].value;
            }
            
            console.log('image', image);
            data.image = image;
            console.log(JSON.stringify('data', JSON.stringify(data)));

            const form = new FormData();
            form.append('image', image);
            for (const value of form.values()) {
                console.log('fd val', value);
              }
            const config = {     
                headers: { 'content-type': 'multipart/form-data' }
            }
            
            await axios.patch(`http://localhost:27017/Account/${account.id}`,
                form, config
            );
        } catch (error) {
            console.error(error);
            setShowAlert(true);
            // setMessage(error.response.data.message);
        }
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        // Do we need this? there is other
        if (!isEqualPassword(data.get(fieldNames.PASSWORD), data.get(fieldNames.PASSWORD2))) {
            console.log("password not alike")
        }
        
        console.log({
            email: data.get(fieldNames.OLDPASSWORD),
            password: data.get(fieldNames.PASSWORD),
            password2: data.get(fieldNames.PASSWORD2),
            
        });
        
        saveHandler();
        
        
    };
    //const [firstNameValue, setFirstName] = useState('');
    //console.log({ firstNameValue })
    
    
    const [formValues, setFormValues] = useState(getInitialFormValues());
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('name ' + name);
        console.log('value ' + value);
        console.log('formValues ' + JSON.stringify(formValues));
        
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
      <>
          {showAlert && (
            <AlertModal
              open={showAlert}
              alertType={'error'}
              message={message}
              setOpen={setShowAlert}
            />
          )}
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
                                      <UploadImage selectedImage={image} setSelectedImage={setImage} name={imageName} setName={setImageName}/>
                                  </Grid>
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
                              <Typography component="h1" variant="h6" align='center' sx={{ mt: 6, justifyContent: "center" }}>
                                  Edit shared account
                              </Typography>
                              <Grid container >
                                  <Grid item xs={12} sm={6} >
                                      <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="yaararm@gmail.com" sx={{ mt: 1 }}
                                      />
                                  </Grid>
                                  <Grid item xs={12} sm={6} >
                                      <Button
                                        type="submit"
                                        color="error"
                                        //variant="contained" 
                                        variant="outlined"
                                        sx={{mt:1}}                                       >
                                          delete
                                      </Button>
                                  </Grid>
                              </Grid>
                          </Box>
                      </Box>
                      <Copyright sx={{ mt: 5, paddingBottom: 3 }} />
                  </Container>
              </div>
          </ThemeProvider>
      </>
    );
}
