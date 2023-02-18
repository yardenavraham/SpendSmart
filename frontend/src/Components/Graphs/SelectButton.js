import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function BasicSelect(props) {
    const [time, setTime] = React.useState(props.prev);
  
    const handleChange = (event) => {
        setTime(event.target.value);
        props.onSelectedValue(event.target.value);
    };


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={time}
          label="Time"
          onChange={handleChange}
        >
          <MenuItem value={props.prev}>{props.prev}</MenuItem>
          <MenuItem value={props.curr}>{props.curr}</MenuItem>
          <MenuItem value={props.next}>{props.next}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
