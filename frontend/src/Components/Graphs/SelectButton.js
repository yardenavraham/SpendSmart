import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// const [selectedOption, setSelectedOption] = useState('previous')

// const onChange = selected => setSelectedOption(selected)

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
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import Grow from '@mui/material/Grow';
// import Paper from '@mui/material/Paper';
// import Popper from '@mui/material/Popper';
// import MenuItem from '@mui/material/MenuItem';
// import MenuList from '@mui/material/MenuList';

// const options = ['Previous month', 'Current Month', 'Next Month'];

// export default function SplitButton() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);
//   const [selectedIndex, setSelectedIndex] = React.useState(1);

//   const handleClick = () => {
//     console.info(`You clicked ${options[selectedIndex]}`);
//   };

//   const handleMenuItemClick = (event, index) => {
//     setSelectedIndex(index);
//     setOpen(false);
//   };

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
//         <Button onClick={handleClick}>{options[selectedIndex]}</Button>
//         <Button
//           size="small"
//           aria-controls={open ? 'split-button-menu' : undefined}
//           aria-expanded={open ? 'true' : undefined}
//           aria-label="select merge strategy"
//           aria-haspopup="menu"
//           onClick={handleToggle}
//         >
//           <ArrowDropDownIcon />
//         </Button>
//       </ButtonGroup>
//       <Popper
//         sx={{
//           zIndex: 1,
//         }}
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         transition
//         disablePortal
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === 'bottom' ? 'center top' : 'center bottom',
//             }}
//           >
//             <Paper>
//               <ClickAwayListener onClickAway={handleClose}>
//                 <MenuList id="split-button-menu" autoFocusItem>
//                   {options.map((option, index) => (
//                     <MenuItem
//                       key={option}
//                       //disabled={index === 2}
//                       selected={index === selectedIndex}
//                       onClick={(event) => handleMenuItemClick(event, index)}
//                     >
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </MenuList>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </React.Fragment>
//   );
// }