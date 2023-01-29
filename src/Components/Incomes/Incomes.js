// // import React, { useState } from 'react';
// // import Income from './Income';
// // import { Button, Modal, Box } from '@mui/material';
// // import './Incomes.scss';
// // import AddEditModal from './AddEditModal';

// // const style = {
// //     position: 'absolute',
// //     top: '50%',
// //     left: '50%',
// //     transform: 'translate(-50%, -50%)',
// //     width: 600,
// //     bgcolor: 'background.paper',
// //     borderRadius: '20px',
// //     boxShadow: 24,
// //     p: 4,
// // };

// // const Incomes = props => {

// //     const [open, setOpen] = useState(false);
// //     const handleOpen = () => setOpen(true);
// //     const handleClose = () => setOpen(false);

// //     return (
// //         <>
// //             <h1 className="incomes-header">Incomes</h1>
// //             <div className="incomes-total">Total: {props.total}</div>
// //             <div className='incomes'>
// //                 {props.items.map((income) => (
// //                     <Income
// //                         key={income.id}
// //                         id={income.id}
// //                         type={income.type}
// //                         date={income.date}
// //                         amount={income.amount}
// //                         onRemove={props.onRemove}
// //                     />
// //                 ))}
// //             </div>
// //             <Button onClick={handleOpen}>Add income</Button>
// //             <Modal
// //                 open={open}
// //                 onClose={handleClose}
// //                 aria-labelledby="modal-modal-title"
// //                 aria-describedby="modal-modal-description"
// //             >
// //                 <Box sx={style}>
// //                     <AddEditModal callbackAddIncome = {income => props.onAdd(income)}/>
// //                 </Box>
// //             </Modal>
// //         </>
// //     );

// // import * as React from 'react';
// import React, { useState } from 'react';

// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';
// import EditIcon from '@mui/icons-material/Edit';
// import AddIcon from '@mui/icons-material/Add';

// // import React, { useState } from 'react';
// // import Income from './Income';
// import { Button, Modal } from '@mui/material';
// import './Incomes.scss';
// import AddEditModal from '../AddEditModal/AddEditModal';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { Stack, TextField } from '@mui/material';
import dayjs from "dayjs";
// import { RowingRounded } from '@material-ui/icons';
// import SearchBar from "material-ui-search-bar";
// import FilterMaterialUi, { FilterField, TYPE } from "filter-material-ui";





// // function createData(name, type, amount, frequency, date, madeBy) {
// //   return {
// //     name,
// //     type,
// //     amount,
// //     frequency,
// //     date,
// //     madeBy
// //   };
// // }


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 600,
//     bgcolor: 'background.paper',
//     borderRadius: '20px',
//     boxShadow: 24,
//     p: 4
// };

// // const current = new Date();
// // const tomorrow = new Date();
// // tomorrow.setDate(current.getDate()+2);
// // const currentDateFormat = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
// // const tomorrowDateFormat = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;

// // const rows = [
// //   createData('income1', 'type1', 2000, 'every month', currentDateFormat, 'Adi'),
// //   createData('income2', 'type2', 1500, 'every month', tomorrowDateFormat, 'Yarden'),
// //   createData('income3', 'type3', 1000, 'every month', currentDateFormat, 'Inbal'),
// //   createData('income4', 'type4', 3500, 'every month', tomorrowDateFormat, 'Adi'),
// // //   createData('Gingerbread', 356, 16.0, 49, 3.9),
// // //   createData('Honeycomb', 408, 3.2, 87, 6.5),
// // //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// // //   createData('Jelly Bean', 375, 0.0, 94, 0.0),
// // //   createData('KitKat', 518, 26.0, 65, 7.0),
// // //   createData('Lollipop', 392, 0.2, 98, 0.0),
// // //   createData('Marshmallow', 318, 0, 81, 2.0),
// // //   createData('Nougat', 360, 19.0, 9, 37.0),
// // //   createData('Oreo', 437, 18.0, 63, 4.0),
// // ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// // with exampleArray.slice().sort(exampleComparator)
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// const headCells = [
//   {
//     id: 'description',
//     numeric: false,
//     disablePadding: true,
//     label: 'Description',
//   },
//   {
//     id: 'category',
//     numeric: true,
//     disablePadding: false,
//     label: 'Income category',
//   },
//   {
//     id: 'Amount',
//     numeric: true,
//     disablePadding: false,
//     label: 'Amount',
//   },
//   {
//     id: 'frequency',
//     numeric: true,
//     disablePadding: false,
//     label: 'Frequency',
//   },
//   {
//     id: 'date',
//     numeric: true,
//     disablePadding: false,
//     label: 'Date',
//   },
//   {
//     id: 'madeBy',
//     numeric: true,
//     disablePadding: false,
//     label: 'madeBy',
//   },
//   {}
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead >
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all desserts',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align='left'//{headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected, selected, onDelete } = props;
//   //console.log('selected  ' + JSON.stringify(selected));
//   console.log('selected', selected[0]);

//   const incomesHeader = <div className="incomes-header">Incomes</div>;
  
//   const now = new Date();
//   const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//   const lastDayCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//   const [fromDate, setFromDate] = React.useState(firstDayCurrentMonth);
//   const [toDate, setToDate] = React.useState(lastDayCurrentMonth);

//   // const handleChangeDate = (newValue, dateType) => {
//   //   dateType === 'from' ? setFromDate(newValue) : setToDate(newValue);
//   //   console.log('newValue ' + newValue);
//   // };

//   const handleFromChangeDate = (newValue) => {
//     console.log('handleFromChangeDate newValue ' + newValue);
//     // console.log('check date ' + props.initialIncomesList[0].date.getTime());

//     setFromDate(newValue);

//     props.setIncomesList(props.initialIncomesList.filter(item => (item.date.getTime() >= newValue
//       && item.date.getTime() <= toDate)));
//   };

//   const handleToChangeDate = (newValue) => {
//     // setToDate(newValue);
//     console.log('newValue ' + newValue);
//     setToDate(newValue);
//     // console.log('check date ' + `${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`);

//     props.setIncomesList(props.initialIncomesList.filter(item => (item.date.getTime() >= fromDate
//       && item.date.getTime() <= newValue)));
//   };

//   return (
//     <>
//       <div>{incomesHeader}</div>
//       <Toolbar
//         sx={{
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//           ...(numSelected > 0 && {
//             bgcolor: (theme) =>
//               alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//           }),
//         }}
//       >
      
//         {numSelected > 0 ? (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             color="inherit"
//             variant="subtitle1"
//             component="div"
//           >
//             {/* {incomesHeader} */}
//             {numSelected} items selected
//           </Typography>
//         ) : (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             variant="h6"
//             id="tableTitle"
//             component="div"
//           >
//           {/* {incomesHeader} */}
//           </Typography>
//         )}

//         <div>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Stack spacing={3}>
//                   <DesktopDatePicker
//                       label="From Date"
//                       inputFormat="MM/DD/YYYY"
//                       value={fromDate}
//                       onChange={handleFromChangeDate}
//                       renderInput={(params) => <TextField {...params} />}
//                   />
//               </Stack>
//           </LocalizationProvider>
//         </div>

//         <div>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Stack spacing={3}>
//                   <DesktopDatePicker
//                       label="To Date"
//                       inputFormat="MM/DD/YYYY"
//                       value={toDate}
//                       onChange={handleToChangeDate}
//                       renderInput={(params) => <TextField {...params} />}
//                   />
//               </Stack>
//           </LocalizationProvider>
//         </div>

//         <div className="incomes-add_new_income" onClick={props.handleOpen} onHover>
//           <AddIcon /> Add New Income
//         </div>

//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton onClick={({selected}) => onDelete(selected)}>
//               <DeleteIcon/>
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton>
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Toolbar>
//     </>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function Incomes(props) {
//   const rows = props.incomesList;

//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('date');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

// const [open, setOpen] = useState(false);
// const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);

// const [searched, setSearched] = useState("");

//   const requestSearch = (searchedVal) => {
//     const filteredRows = props.initialIncomesList.filter((row) => {
//       return row.description.toLowerCase().includes(searchedVal.toLowerCase()) || row.category.toLowerCase().includes(searchedVal.toLowerCase());
//     });
//     props.setIncomesList(filteredRows);
//   };

//   const cancelSearch = () => {
//     setSearched("");
//     requestSearch(searched);
//   };

//   return (
//     <>
//         <Box sx={{ width: '100%' }}>
//         <Paper className="incomes" sx={{ width: '100%', mb: 2 }}>
//             <EnhancedTableToolbar numSelected={selected.length} selected={selected} onDelete={props.onDelete} open={open} handleOpen={handleOpen} handleClose={handleClose} initialIncomesList={props.initialIncomesList} setIncomesList={props.setIncomesList}/>
//             <SearchBar
//               value={searched}
//               onChange={(searchVal) => requestSearch(searchVal)}
//               onCancelSearch={() => cancelSearch()}
//             />
//             <TableContainer>
//             <Table
//                 sx={{ minWidth: 750 }}
//                 aria-labelledby="tableTitle"
//                 size={dense ? 'small' : 'medium'}
//             >
//                 <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//                 className="incomes-table_header"
//                 />
//                 <TableBody>
//                 {stableSort(rows, getComparator(order, orderBy))
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row, index) => {
//                     const isItemSelected = isSelected(row.id);
//                     const labelId = `enhanced-table-checkbox-${index}`;

//                     return (
//                         <TableRow
//                         hover
//                         onClick={(event) => handleClick(event, row.id)}
//                         role="checkbox"
//                         aria-checked={isItemSelected}
//                         tabIndex={-1}
//                         key={row.id}
//                         selected={isItemSelected}
//                         >
//                         <TableCell padding="checkbox">
//                             <Checkbox
//                             color="primary"
//                             checked={isItemSelected}
//                             inputProps={{
//                                 'aria-labelledby': labelId,
//                             }}
//                             />
//                         </TableCell>
//                         <TableCell
//                             component="th"
//                             id={labelId}
//                             scope="row"
//                             padding="none"
//                         >
//                             {row.description}
//                         </TableCell>
//                         <TableCell align="left">{row.category}</TableCell>
//                         <TableCell align="left">{row.amount}</TableCell>
//                         <TableCell align="left">{row.frequency}</TableCell>
//                         <TableCell align="left">{`${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`}</TableCell>
//                         <TableCell align="left">{row.madeBy}</TableCell>
//                         <TableCell align="left" className="incomes-edit_income">
//                           <EditIcon onClick={handleOpen}>Edit income</EditIcon>
//                           <Modal
//                               open={open}
//                               onClose={handleClose}
//                               aria-labelledby="modal-modal-title"
//                               aria-describedby="modal-modal-description"
//                           >
//                               <Box sx={style}>
//                                   <AddEditModal callbackEditIncome = {row => props.onEdit(row)}/>
//                               </Box>
//                           </Modal>
//                         </TableCell>

//                         </TableRow>
//                     );
//                     })}
//                 {emptyRows > 0 && (
//                     <TableRow
//                     style={{
//                         height: (dense ? 33 : 53) * emptyRows,
//                     }}
//                     >
//                     <TableCell colSpan={6} />
//                     </TableRow>
//                 )}
//                 </TableBody>
//             </Table>
//             </TableContainer>
//             <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//         <FormControlLabel
//             control={<Switch checked={dense} onChange={handleChangeDense} />}
//             label="Dense padding"
//         />
//         </Box>
//         {/* <Button onClick={handleOpen}>Add income</Button> */}
//         <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Box sx={style}>
//                 <AddEditModal callbackAddIncome = {income => props.onAdd(income)}/>
//             </Box>
//         </Modal>
//     </>
//   );
// }

import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef, useState } from "react";
import { TableCell, TableFooter, TableRow } from "@material-ui/core";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AddEditModal from '../AddEditModal/AddEditModal';
import { Button, Modal, Box } from '@mui/material';
import { Hidden } from "@material-ui/core";
import { incomeCategory } from '../../Consts';

import TextField from '@mui/material/TextField';
// import { LocalizationProvider } from '@mui/x-date-pickers-pro';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DateRangePicker, DateRange } from "mui-daterange-picker";



const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
};

const arrayToObjectPairs = (arr) => {
  const obj = {};
  let keys = arr;
  let values = arr;
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = values[i];
  }
  return obj;
}

const Incomes = props => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const onDelete = props.onDelete;
    console.log('props.total ' + props.total);

    const total = props.total;

    const madeByFilter = arrayToObjectPairs(props.madeBy);
    const incomeCategoryFilter = arrayToObjectPairs(incomeCategory);

    // const [value, setValue] = useState([null, null]);

    // const [fromDateValue, setFromDateValue] = useState(0);
    // const [toDateValue, setToDateValue] = useState(10000000000000000000);

    // const [openDatePicker, setOpenDatePicker] = useState(false);
    // const [dateRange, setDateRange] = useState<DateRange>({});
    // const toggle = () => setOpen(!open);




    // const handleChangeFromDate = newValue => {
    //   setFromDateValue(newValue);
    //   console.log('newValue ' + newValue);
    //   props.setIncomesList(props.initialIncomesList.filter(item => (item.date.getTime() >= newValue
    //   && item.date.getTime() <= toDateValue)));
    // }

    // const handleChangeToDate = newValue => {
    //   setToDateValue(newValue);
    //   props.setIncomesList(props.initialIncomesList.filter(item => (item.date.getTime() <= newValue
    //   && item.date.getTime() >= fromDateValue)));
    // }


    const handleDateFilter = (term, rowData) => {
      return new Date(term).setHours(0, 0, 0, 0) <= new Date(rowData.due_date)
        ? true
        : false;
    };

  return (
    <>
      <MaterialTable
        title="Incomes Information"
        icons={tableIcons}
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: "Add an Income",
            isFreeAction: true, //Independent actions that will not on row' actions section
            onClick: () => {setOpen(true)}
          },
          rowData => ({
            icon: tableIcons.Edit,
            tooltip: 'Edit an Income',
            onClick: () => {setOpen(true)}
          }),
          rowData => ({
            icon: tableIcons.Delete,
            tooltip: 'Delete an Income',
            onClick: (event, rowData) => {onDelete(rowData.id, rowData.amount)}
          })
        ]}
        options={{
          actionsColumnIndex: -1,
          filtering: true
        }}
        columns={[
          { title: "id", field: "id", hidden: true },
          { title: "Description", field: "description", filtering: true },
          { title: "Category", field: "category", filtering: true, lookup: incomeCategoryFilter,
        },
          { title: "Amount", field: "amount", filtering: true },
          { title: "Frequency", field: "frequency", filtering: true },
          { title: "Date", field: "date",  type: "date" },
          { title: "MadeBy", field: "madeBy", filtering: true, lookup: madeByFilter }
        ]}
        data={props.incomesList.map((income) => ({
          id: income.id,
          description: income.description,
          category: income.category,
          amount: income.amount,
          frequency: income.frequency,
          date: income.date, //{`${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`}
          madeBy: income.madeBy
        }))}
        components={{
          Toolbar: (props) => (
            <div style={{ backgroundColor: "#e8eaf5" }}>
              <MTableToolbar {...props} />
              <TableFooter className="incomes-total" >
                  <TableRow className="incomes-total" >
                    <TableCell colSpan={2} />
                    <TableCell colSpan={2}>Total: {total}</TableCell>
                  </TableRow>
                  <TableRow>
                  {/* <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'From Date', end: 'To Date' }}
                  > */}
                    {/* <DateRangePicker
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </>
                      )}
                    /> */}
                    {/* <DesktopDatePicker
                      label="From Date"
                      inputFormat="MM/DD/YYYY"
                      value={fromDateValue}
                      onChange={handleChangeFromDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DesktopDatePicker
                      label="To Date"
                      inputFormat="MM/DD/YYYY"
                      value={toDateValue}
                      onChange={handleChangeToDate}
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                  {/* </LocalizationProvider> */}
                  </TableRow>
                </TableFooter>
            </div>
          )
        }}
        // footerData={ totalsData }
      />
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
              <AddEditModal callbackAddIncome = {income => props.onAdd(income)}/>
          </Box>
      </Modal>
    </>
  );
};

export default Incomes;





