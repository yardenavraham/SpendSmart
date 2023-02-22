import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";

function BasicSelect(props) {
  const [time, setTime] = React.useState(props.curr);
  const [date, setDate] = React.useState(calculateMonth(props.curr));

  const handleChange = (event) => {
    setTime(event.target.value);
    setDate(calculateMonth(event.target.value));
    props.onSelectedValue(event.target.value);
  };

  function calculateMonth(value) {
    const now = new Date();
    if (value === props.prev) {
      var newDate = new Date(now.setMonth(now.getMonth()-1));
      console.log("prev");
      return newDate.toLocaleString("en-us", { month: "long", year: "numeric" });
    }
    if (value === props.next) {
      var newDate = new Date(now.setMonth(now.getMonth()+1));
      console.log("next");
      return newDate.toLocaleString("en-us", { month: "long", year: "numeric" });
    }
    return new Date().toLocaleString("en-us", {
      month: "long",
      year: "numeric",
    });
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Grid container>
          <InputLabel id="select-label">Time</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={time}
            label="Time"
            onChange={handleChange}
          >
            <MenuItem value={props.prev}>{props.prev}</MenuItem>
            <MenuItem value={props.curr}>{props.curr}</MenuItem>
            <MenuItem value={props.next}>{props.next}</MenuItem>
          </Select>
          <Typography variant="h6" sx={{marginLeft: 7, mt:2}}>{date}</Typography>
        </Grid>
      </FormControl>
    </Box>
  );
}

export default BasicSelect;
