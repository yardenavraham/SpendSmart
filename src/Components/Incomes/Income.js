import React from 'react';
import './Income.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

// import incomeTypes from '../../incomeTypes';

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main
    },
  }));

const Income = props => {

    // const [incomeType, setIncomeType] = React.useState('');

    // const handleIncomeTypeChange = (event: SelectChangeEvent) => {
    //     setIncomeType(event.target.value);
    // };

    const classes = useStyles();


    return (
        <div className='income'>
            <div>
                {props.type}


                {/* <FormControl sx={{ m: 0.5 , minWidth: 240 }}>
                    <InputLabel id="demo-simple-select-helper-label">Income Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={incomeType}
                        label="Type"
                        onChange={handleIncomeTypeChange}
                        options={incomeTypes}
                        defaultValue={props.type}
                        MenuProps={incomeTypes}
                    >
                        {incomeTypes.map((incomeType) => (
                            <MenuItem value={incomeType}>{incomeType}</MenuItem>
                        ))}    
                    </Select>
                </FormControl> */}
            </div>
            <div>
                {props.date}
            </div>
            <div>
                {props.amount}ILS
            </div>
            <div>
                {/* <button onClick={() => props.onRemove(props.id, props.amount)}>remove</button> */}

                <Button
                    variant="contained"
                    color="a"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    //onClick={() => { props.onRemove(props.id, props.amount)}}
                >
                    Delete
                </Button>
            </div>
        </div>

    );
}
export default Income;