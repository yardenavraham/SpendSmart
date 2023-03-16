import dayjs from "dayjs";
import MaterialTable, { MTableBody } from "material-table";
import { forwardRef, useState, useRef } from "react";
import AddBox from "@mui/icons-material/AddBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import AddEditModal from '../AddEditModal/AddEditModal';
import { Modal, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ExportToCsv } from 'export-to-csv';
import Download from "@mui/icons-material/Download";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../../theme";
import { withStyles } from "@material-ui/core/styles";
import './CashFlowTable.scss';

const tableIcons = {
  Download: forwardRef((props, ref) => <Download {...props} ref={ref} />),
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

const ColorTypography = withStyles({
  root: {
    color: "#800000",
  }
})(Typography);

const NewTitle = ({ text, variant }) => (
  <ColorTypography
    variant={variant}
    style={{
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }}
  >
    {text}
  </ColorTypography>
);

const CashFlowTable = props => {
  //console.log('props.initialIncomesList ' + JSON.stringify(props.initialIncomesList));
  console.log("my table type" + props.tableType)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    props.getCashFlow();
  }

  const [addOrEdit, setAddOrEdit] = useState('add');
  const [selectedRow, setSelectedRow] = useState(null);
  const now = new Date();
  const firstDayOfCurrMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [datePickerValue, setDatePickerValue] = useState(dayjs(firstDayOfCurrMonth));

  const tableRef = useRef();
  const total = tableRef.current && tableRef.current.state.data.reduce((accumulator, currentValue) => accumulator = accumulator + currentValue.amount, 0);


  const onDelete = props.onDelete;
  const tableText = props.tableType //=== myTableType.Incomes ? "Incomes" : "Expenses"
  console.log('props.madeBy', JSON.stringify(props.madeBy));
  const madeByFilter = props.madeBy !== undefined ? arrayToObjectPairs(props.madeBy) : [];
  const categoryFilter = arrayToObjectPairs(props.category);

  const handleDatePickerChanged = (newDate) => {
    const newDateVal = new Date(newDate);
    const newDateValFormatted = `${newDateVal.getMonth() + 1}/${newDateVal.getFullYear()}`;
    setDatePickerValue(newDate);
    props.setCashFlowList(props.initialCashFlowList.filter(item => {
      const formattedDate = new Date(item.date);
      console.log('item ', `${parseInt(formattedDate.getMonth()) + 1}/${formattedDate.getFullYear()}`);
      return `${parseInt(formattedDate.getMonth()) + 1}/${formattedDate.getFullYear()}` === newDateValFormatted;
    }));
  }

  const cashFlowData = props.cashFlowList.map((transaction) => ({
    description: transaction.description,
    category: transaction.category,
    amount: transaction.amount,
    frequency: transaction.frequency,
    date: transaction.date, //{`${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`}
    madeBy: transaction.madeBy
  }))

  const downloadCSV = (data) => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Cash Flow CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);

  }


  console.log('madeBy ' + props.madeBy);
  const { madeBy } = props;

  return (
    <>
      <ThemeProvider theme={theme}>

        <MaterialTable
          // title={tableText + " Information"}
          title={<NewTitle variant="h4" text={tableText + " Information"} />}
          icons={tableIcons}
          actions={[
            {
              icon: props => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                >
                  <DatePicker
                    views={['month', 'year']}
                    label="Month and Year"
                    minDate={dayjs('2000-03-01')}
                    maxDate={dayjs(now.setFullYear(now.getFullYear() + 200))}
                    value={datePickerValue}
                    onChange={handleDatePickerChanged}
                    renderInput={(params) => <TextField {...params} helperText={null} />}
                  />
                </LocalizationProvider>
              ),
              isFreeAction: true  //Independent actions that will not on row' actions section
            },
            {
              icon: tableIcons.Download,
              tooltip: "Download CSV",
              isFreeAction: true, //Independent actions that will not on row' actions section
              onClick: () => { downloadCSV(cashFlowData) }
            },
            {
              icon: tableIcons.Add,
              tooltip: "Add",
              isFreeAction: true, //Independent actions that will not on row' actions section
              onClick: () => { setOpen(true); setAddOrEdit('add') }
            },

            rowData => ({
              icon: tableIcons.Edit,
              tooltip: 'Edit',
              onClick: () => { setOpen(true); setAddOrEdit('edit'); setSelectedRow(rowData) }
            }),
            rowData => ({
              icon: tableIcons.Delete,
              tooltip: 'Delete',
              onClick: (event, rowData) => { console.log('rowData ' + JSON.stringify(rowData)); onDelete(rowData._id) }
            })
          ]}
          options={{
            actionsColumnIndex: -1,
            filtering: true
          }}
          columns={[
            { title: "_id", field: "_id", hidden: true },
            {
              title: "Description", field: "description", filtering: true,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            },
            {
              title: "Category", field: "category", filtering: true, lookup: categoryFilter,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            },
            {
              title: "Amount", field: "amount", filtering: true,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            },
            {
              title: "Frequency", field: "frequency", filtering: true,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            },
            {
              title: "Date", field: "date", type: "date", filtering: true,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            },
            {
              title: "Made By", field: "madeBy", filtering: true, lookup: madeByFilter,
              cellStyle: {
                backgroundColor: '#FFFFFF',
                color: '#00000',
                fontSize: '16px'
              },
              headerStyle: {
                backgroundColor: '#FFFFFF',
              }
            }
          ]}
          data={props.cashFlowList.map((transaction) => ({
            _id: transaction._id,
            description: transaction.description,
            category: transaction.category,
            amount: transaction.amount,
            frequency: transaction.frequency,
            date: transaction.date, //{`${row.date.getDate()}/${row.date.getMonth()+1}/${row.date.getFullYear()}`}
            madeBy: transaction.madeBy
          }))}
          tableRef={tableRef}
          components={{
            Body: (props) => (
              <>
                <MTableBody {...props} />
                <tfoot>
                  <div className="incomes-material_total">
                    <div>{<NewTitle variant="h5" text="Total" />}</div>
                    <div>{<NewTitle variant="h5" text={total} />}</div>
                  </div>
                </tfoot>
              </>
            )
          }}
        />
      </ThemeProvider>
      {/* <table>
        <tr>
          <td>aaa</td>
          <td>aaa</td>
        </tr>
      </table> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddEditModal callbackAddTransaction={transaction => props.onAdd(transaction)} callbackEditTransaction={(id, transaction) => props.onEdit(id, transaction)} handleClose={handleClose} madeBy={madeBy} addOrEdit={addOrEdit} selectedRow={selectedRow} tableType={props.tableType} />
        </Box>
      </Modal>
    </>
  );
};

export default CashFlowTable;





