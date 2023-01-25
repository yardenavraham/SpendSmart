import React, { useState } from 'react';
import './App.css';
import Incomes from './Components/Incomes/Incomes';
// import AddIncome from './Components/AddIncome/AddIncome';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App() {

  // const current = new Date();
  // const currentDateFormat = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  // const incomes = [
  //   {
  //     id: '1',
  //     category: 'income1',
  //     date: currentDateFormat,
  //     amount: 5000
  //   },
  //   {
  //     id: '2',
  //     category: 'income2',
  //     date: currentDateFormat,
  //     amount: 2000
  //   },
  //   {
  //     id: '3',
  //     category: 'income345',
  //     date: currentDateFormat,
  //     amount: 1400
  //   }
  // ];

  function createData(id, description, category, amount, frequency, date, madeBy) {
    return {
      id, 
      description,
      category,
      amount,
      frequency,
      date,
      madeBy
    };
  }

const current = new Date();
const tomorrow = new Date();
tomorrow.setDate(current.getDate()+2);
const currentDateFormat = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
const tomorrowDateFormat = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;

const initialIncomes = [
  createData(Math.random().toString(), 'income1', 'category1', 2000, 'every month', currentDateFormat, 'Adi'),
  createData(Math.random().toString(), 'income2', 'category2', 1500, 'every month', tomorrowDateFormat, 'Yarden'),
  createData(Math.random().toString(), 'income3', 'category3', 1000, 'every month', currentDateFormat, 'Inbal'),
  createData(Math.random().toString(), 'income4', 'category4', 3500, 'every month', tomorrowDateFormat, 'Adi'),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
//   createData('Honeycomb', 408, 3.2, 87, 6.5),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Jelly Bean', 375, 0.0, 94, 0.0),
//   createData('KitKat', 518, 26.0, 65, 7.0),
//   createData('Lollipop', 392, 0.2, 98, 0.0),
//   createData('Marshmallow', 318, 0, 81, 2.0),
//   createData('Nougat', 360, 19.0, 9, 37.0),
//   createData('Oreo', 437, 18.0, 63, 4.0),
];



  // const [initialItems, setInitialItems] = useState(incomes);
  const [incomesList, setIncomesList] = useState(initialIncomes);
  const [total, setTotal] = useState(
    incomesList.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0 )
  );

  const onRemove = (id, amount) => {
    console.log('onRemove app');
    console.log('id app ' + id);
    setIncomesList(incomesList.filter(item => item.id !== id)); //filter returns new array
    setTotal(prevTotal => {return prevTotal - amount});
  }

  const addIncomeHandler = newIncome => {
    console.log('success add')
    setIncomesList(prevItems => { //we have to update according the last snapshot
      return [newIncome, ...prevItems]; //spread all the tems in the array
    });
    setTotal(total + parseInt(newIncome.amount));
    console.log('incomesList after ' + JSON.stringify(incomesList));
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Incomes incomesList={incomesList} onRemove={onRemove} total={total} onAdd={income => addIncomeHandler(income)}/>
        {/* <AddIncome onAddIncome={addIncomeHandler}/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
