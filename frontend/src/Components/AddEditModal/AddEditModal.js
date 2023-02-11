import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem, Select, TextField, Card, Button, Box, Stack, Container, Avatar, CssBaseline, InputLabel, FormControl, Alert, AlertTitle } from '@mui/material';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { incomeCategory } from '../../Consts';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { NestCamWiredStandTwoTone } from '@mui/icons-material';
import validator from 'validator';
import AlertModal from '../Alerts/AlertModal';

export default function AddEditModal(props) {

    const theme = createTheme();
    const [income, setIncome] = useState({ date: new Date() }); //complete!!!
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [madeBy, setMadeBy] = useState('');

    const [dateVal, setDateValue] = useState(new Date());

    //validations
    const [amountIsValid, setAmountIsValid] = useState(false);
    const [amountIsTouched, setAmountIsTouched] = useState(false);
    const amountIsInvalid = !amountIsValid && amountIsTouched;

    const [dateIsValid, setDateIsValid] = useState(true);
    const [dateIsTouched, setDateIsTouched] = useState(false);
    const dateIsInvalid = !dateIsValid || dateVal === null;
    console.log('dateIsValid ' + dateIsValid);
    console.log('dateVal ' + dateVal);

    console.log('dateIsInvalid ' + dateIsInvalid);

    const [descriptionIsValid, setDescriptionIsValid] = useState(false);
    const [descriptionIsTouched, setDescriptionIsTouched] = useState(false);
    const descriptionIsInvalid = !descriptionIsValid && descriptionIsTouched;

    const [categoryIsTouched, setCategoryIsTouched] = useState(false);
    const categoryIsInvalid = category === '' && categoryIsTouched;

    const [frequencyIsTouched, setFrequencyIsTouched] = useState(false);
    const frequencyIsInvalid = frequency === '' && frequencyIsTouched;

    const [madeByIsTouched, setMadeByIsTouched] = useState(false);
    const madeByIsInvalid = madeBy === '' && madeByIsTouched;

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    let formIsValid = false;
    if (!amountIsInvalid && !dateIsInvalid && !descriptionIsInvalid && !categoryIsInvalid && !frequencyIsInvalid && !madeByIsInvalid) {
        formIsValid = true;
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowSuccessAlert(false)
        }, 3000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [showSuccessAlert]);
    
      // If show is false the component will return null and stop here
    //   if (!showSuccessAlert) {
    //     return null;
    //   }



    const handleChangeDate = (newDate) => {
        console.log('handleChangeDate');
        console.log('newDate ' + JSON.stringify(newDate));
        setDateValue(newDate);
        setIncome({ ...income, date: newDate });
        console.log('validator ' + validator.isDate(newDate));
        if (validator.isDate(newDate)) {
            setDateIsValid(true);
        }
        else{
            setDateIsValid(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowSuccessAlert(true);
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     category: data.get('category'),
        //     date: data.get('dateVal'),
        //     amount: data.get('amount'),
        //     description: data.get('description'),
        //     madeBy: data.get('madeBy')
        // });
        console.log('income ' + JSON.stringify(income));
        props.callbackAddIncome(income);

    };

    const amountChangeHandler = (event) => {
        const enteredAmount = event.target.value;
        setIncome({ ...income, amount: enteredAmount });
        if (!isNaN(enteredAmount) &&  enteredAmount >= 0) {
            setAmountIsValid(true);
        }
        else{
            setAmountIsValid(false);
        }
    }

    const descriptionChangeHandler = event => {
        setIncome({ ...income, description: event.target.value });
        if (validator.isAlphanumeric(event.target.value)) {
            setDescriptionIsValid(true);
        }
        else{
            setDescriptionIsValid(false);
        }

    }

    const dateBlur = () => {
        setDateIsTouched(true);
        console.log('hereeee');
        console.log('dateIsTouched ' + dateIsTouched);
    }

    return (
        <>
    {showSuccessAlert && <Stack sx={{ width: '100%' }} spacing={2}>
        <AlertModal open={showSuccessAlert} alertType="success" message="The income has been added successfully!"/>
    </Stack>}
        <ThemeProvider theme={theme}>
            <Avatar onClick={props.handleClose} sx={{ m: 2 }}>
                <CloseIcon />
            </Avatar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add income
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel required id="categoryLable">Category</InputLabel>
                                    <Select
                                        labelId="categoryLable"
                                        required
                                        fullWidth
                                        label="Category"
                                        name="category"
                                        value={category}
                                        onChange={
                                            (e) => {
                                                setIncome({ ...income, category: e.target.value });
                                                setCategory(e.target.value);
                                            }
                                        }
                                        error={categoryIsInvalid}
                                        helperText={categoryIsInvalid && "Category is invalid"}
                                        onBlur={() => setCategoryIsTouched(true)}
                                    >
                                        {incomeCategory.map((category) => (
                                            <MenuItem key={category} value={category}>
                                                {category}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Amount"
                                    name="amount"
                                    onChange={amountChangeHandler}
                                    onBlur={() => setAmountIsTouched(true)}
                                    error={amountIsInvalid}
                                    helperText={amountIsInvalid && "Amount is invalid"}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    onChange={descriptionChangeHandler}
                                    onBlur={() => setDescriptionIsTouched(true)}
                                    error={descriptionIsInvalid}
                                    helperText={descriptionIsInvalid && "description is invalid"}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="madeBy"
                                    label="Made by"
                                    name="madeBy"
                                    onChange={
                                        e => {
                                            setIncome({ ...income, madeBy: e.target.value });
                                            setMadeBy(e.target.value);
                                        }
                                    }
                                    error={madeByIsInvalid}
                                    helperText={madeByIsInvalid && "Made By is invalid"}
                                    onBlur={() => setMadeByIsTouched(true)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="frequency"
                                    label="Frequency"
                                    name="frequency"
                                    value={frequency}
                                    onChange={
                                        e => {
                                            setIncome({ ...income, frequency: e.target.value });
                                            setFrequency(e.target.value);
                                        }
                                    }
                                    error={frequencyIsInvalid}
                                    helperText={frequencyIsInvalid && "Frequency is invalid"}
                                    onBlur = {() => setFrequencyIsTouched(true)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="MM/DD/YYYY"
                                            value={dateVal}
                                            onChange={e => handleChangeDate(e)}
                                            renderInput={(params) => <TextField {...params} sx={{ width:"100%" }} error={dateIsInvalid}/>}
                                            error={dateIsInvalid}
                                            helperText={frequencyIsInvalid && "Date is invalid"}
                                            />
                                    </Stack>
                                </LocalizationProvider>

                            </Grid>

                        </Grid>
                        <Button
                            disabled={!formIsValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    );
}