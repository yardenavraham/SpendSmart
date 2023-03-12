import React, {useEffect} from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import { useState, useContext } from "react";
import axios from "axios";
import  AuthContext from '../../store/auth-context';
import { useNavigate } from "react-router-dom";
import UploadImage from '../../Components/UploadImage/UploadImage';
import AlertModal from "../../Components/Alerts/AlertModal";
import AccountEditCard from "../../Components/EditAccount/AccountEditCard";
import PartnersList from "../../Components/Forms/PartnersList";
import {Field, Formik, Form} from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import {confirmPasswordValidation, emailValidation, nameValidation, passwordValidation} from "../../Components/Forms/FormikValidations";
import theme from "../../theme";
import { DotLoaderOverlay } from 'react-spinner-overlay'

const fields = {
    current: {id: 'current', text: 'Current Password'},
    password: {id: 'password', text: 'New Password'},
    confirm: {id: 'confirm', text: 'Confirm Password'}
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
    console.log("ACCOUNT = " + JSON.stringify(account));
    return await account?.partners || [];
}

export default function Profile() {
    
    const authCtx = useContext(AuthContext);
    // console.log('authCtx', JSON.stringify(authCtx.accountDetails));
    //UploadImage states
    const [image, setImage] = useState(authCtx.accountDetails.image);
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('error');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    console.log(authCtx.accountDetails)
    const [partners, setPartners] = useState([])
    useEffect(() => {
        setImage(authCtx.image);
        async function fetch() {
            const id = authCtx.accountDetails.id;
            console.log("ACCOUNT ID = " + id)
            if (id) {
                const savedPartners = await getPartnersFromDB(id);
                console.log("SAVED PARTNERS = " + JSON.stringify(savedPartners))
                setPartners(savedPartners.map(partner => {
                    return {
                        partnerFirstName: partner.firstName,
                        partnerLastName: partner.lastName,
                        partnerEmail: partner.email
                    }
                }));
            }
        }
        fetch().then(() => {
            console.log("Loaded partner from DB")
            setIsLoading(false)
        });
    }, [authCtx]);
    
    const alert = (type, message) => {
        setShowAlert(true)
        setAlertType(type)
        setMessage(message)
    }
    
    
    const saveHandler = async (values) => {
        try {
            const account = authCtx.accountDetails;
            const data = {}
            
            if (image !== null) {
                let formData = new FormData();
                formData.append('file', image);
                
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                console.log('formData', formData);
                
                const res = await axios.post("http://localhost:27017/uploadimage", formData, config);
                data.image = res.data.file;
            }
            else {
                data.image = null;
            }
            
            if (values[fields.confirm.id] !== '') {
                data.oldPassword = values[fields.current.id];
                data.password = values[fields.confirm.id];
            }
            
            
            const mapPartner = (values) => {
                return {
                    firstName: values.partnerFirstName,
                    lastName: values.partnerLastName,
                    email: values.partnerEmail
                }
            }
            data.partners = values.partners.map(p => mapPartner(p))
            
            const response = await axios.patch(`http://localhost:27017/Account/${account.id}`,
              data
            );
            authCtx.onLogin(response.data.token);
            console.log(response);
            alert('success', "The account has been updated")
            
        } catch (error) {
            console.error(error);
            alert('error', error.response.data.message)
        }
    };
    
    const UpdatePasswordElement = () => {
        const passwordField = (field) => {
            return (
              <Grid item xs={12}>
                  <Field
                    fullWidth
                    component={TextField}
                    id={field.id}
                    name={field.id}
                    label={field.text}
                    type="password"
                  />
              </Grid>
            )
        }
        
        return (
          <>
              <Grid container spacing={2} style={{alignItems: 'center'}} sx={{ marginTop: 2, paddingX: 2 }}>
                  {passwordField(fields.current)}
                  {passwordField(fields.password)}
                  {passwordField(fields.confirm)}
              </Grid>
          </>
        )
    }
    
    const UpdateImageElement = () => {
        //console.log('image before21 ', image);
        
        return (
          <>
              {
                  // authCtx.accountDetails.image !== undefined &&
                  <UploadImage selectedImage={image} setSelectedImage={setImage} currentImageName={authCtx.accountDetails.image}/>}
          </>
        );
    }
    
    const UpdatePartnersElement = (partners) => {
        return (
          <PartnersList partners={partners}/>
        )
    }
    
    const validationSchema = Yup.object().shape({
        password: passwordValidation,
        confirm: confirmPasswordValidation,
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
          {showAlert && (
            <AlertModal
              open={showAlert}
              alertType={alertType}
              message={message}
              setOpen={setShowAlert}
            />
          )}
          <ThemeProvider theme={theme}>
              <DotLoaderOverlay loading={isLoading} size={28} color="#005689"/>
              {/*<div className="third-color" style={{ height: '100%', left: '0px', width: '100%' }}>*/}
              {/*    <Container component="main" maxWidth="sm" style={{ backgroundColor: 'white', borderRadius: 10 }}>*/}
              {/*        <CssBaseline />*/}
              <Formik validateOnChange validateOnBlur
                      initialValues={{
                          partners: partners,
                          ...getInitialFormValues()
                      }}
                      enableReinitialize={true}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                          saveHandler(values).then(r => console.log("completed save account with response: " + r));
                          setTimeout(() => {
                              // alert(JSON.stringify(values, null, 2));
                              navigate("/");
                          }, 2000);
                      }}
              >
                  {({ values, handleSubmit }) => (
                    <>
                        <Form>
                            <Grid container spacing={4}>
                                <Grid item xs={6}>
                                    <Grid container direction="column" rowSpacing={4}>
                                        <AccountEditCard header="Photo" element={UpdateImageElement()}/>
                                        <AccountEditCard header="Password" element={UpdatePasswordElement()}/>
                                    </Grid>
                                </Grid>
                                <AccountEditCard header="Partners" element={UpdatePartnersElement(values.partners)}/>
                            </Grid>
                            <Grid container sx={{mt: 3, mb: 2, justifyContent: "center"}}>
                                <Button
                                  type="submit"
                                  color="dark"
                                  variant="contained"
                                  onClick={handleSubmit}
                                  sx={{mt: 3, mb: 2, justifyContent: "center"}}>
                                    Update
                                </Button>
                            </Grid>
                        </Form>
                    </>
                  )}
              </Formik>
          </ThemeProvider>
      </>
    );
}
