import React from "react";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField, Select } from '@mui/material';

const DatePickerField = ({ name, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
      selected={(value && new Date(value)) || null}
      onChange={val => {
        onChange(name, val);
      }}
      renderInput={(params) => <TextField {...params} sx={{ width:"100%" }}/>}
    />
     </LocalizationProvider>
  );
};

export default DatePickerField;