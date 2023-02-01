import dayjs from "dayjs";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef, useState, useRef } from "react";
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
import MUIDatePicker from './MUIDatePicker';
import { MonthPicker } from '@mui/x-date-pickers/MonthPicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';



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

    const [datePickerValue, setDatePickerValue] = useState(dayjs('2023-01-01'));

    const handleDatePickerChanged = (newDate) => {
      console.log('newDate ' + newDate);
      const newDateVal = new Date(newDate);
      const newDateValFormatted = `${newDateVal.getMonth()+1}/${newDateVal.getFullYear()}`;

      setDatePickerValue(newDate);

      props.setIncomesList(props.initialIncomesList.filter(item => 
        `${item.date.getMonth()+1}/${item.date.getFullYear()}` === newDateValFormatted));
    }


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
                  {/* <TableRow className="incomes-total" >
                    <TableCell colSpan={2} />
                    <TableCell colSpan={2}>Total: {total}</TableCell>
                  </TableRow> */}
                  <TableRow>

                  {/* <MUIDatePicker callbackDateChanged = {newValue => handleChangeFromDate(newValue)} fromOrTo/> */}
                  {/* <MUIDatePicker callbackDateChanged = {newValue => handleChangeToDate(newValue)}/> */}

                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    // localeText={{ start: 'From Date', end: 'To Date' }}
                  >
                        <DatePicker
                          views={['month', 'year']}
                          label="Month and Year"
                          minDate={dayjs('2000-03-01')}
                          maxDate={dayjs(new Date())}
                          value={datePickerValue}
                          onChange={handleDatePickerChanged}
                          renderInput={(params) => <TextField {...params} helperText={null} />}
                        />

                  </LocalizationProvider>
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





