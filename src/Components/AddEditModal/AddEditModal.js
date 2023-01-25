import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem, Select, TextField, Card, Button, Box, Stack, Container, Avatar, CssBaseline, InputLabel, FormControl } from '@mui/material';
import dayjs from 'dayjs';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import AddIcon from '@mui/icons-material/Add';
import AddIcon from '@material-ui/icons/Add';
import { incomeCategory } from '../../Consts';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function AddEditModal(props) {
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            id: Math.random().toString(),
            category: data.get('category'),
            date: data.get('dateVal'),
            amount: data.get('amount'),
            description: data.get('description'),
            madeBy: data.get('madeBy')
        });
        console.log('income ' + JSON.stringify(income));
        props.callbackAddIncome(income);
    };

    const theme = createTheme();
    const [income, setIncome] = useState({
        id: Math.random().toString(),
        type: '',
        // date: currentDateFormat,
        amount: ''
    });
    // const [value, setValue] = useState(new Date());
    const [category, setCategory] = useState('');

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    const [dateVal, setDateValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
    console.log('dateVal ' + dateVal);
    setIncome({ ...income, date: dateVal });
  };


    return (
        <ThemeProvider theme={theme}>
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
                            {/* <Grid item xs={12} sm={12}>
                                <TextField
                                    fullWidth
                                    id="date"
                                    label="Date"
                                    name="date"
                                />
                            </Grid> */}
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
                                            handleChangeCategory(e)}
                                        }
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
                                    onChange={e => setIncome({ ...income, amount: e.target.value })} 
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    onChange={e => setIncome({ ...income, description: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="madeBy"
                                    label="Made by"
                                    name="madeBy"
                                    onChange={e => setIncome({ ...income, madeBy: e.target.value })} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="MM/DD/YYYY"
                                            value={dateVal}
                                            onChange={handleChangeDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>

                            </Grid>

                        </Grid>
                        <Button
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
    );
}