import React, { useState, useMemo } from 'react';
import './App.css';
import Incomes from './Components/Incomes/Incomes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {

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
  const previousMonth = new Date();
  tomorrow.setDate(current.getDate()+2);
  previousMonth.setDate(current.getDate()-32);

  const currentDateFormat = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const tomorrowDateFormat = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;

  const newDateVal = new Date(new Date());
  const newDateValFormatted = `${newDateVal.getMonth()+1}/${newDateVal.getFullYear()}`;

  const madeBy = ['Adi', 'Yarden', 'Inbal'];

  const initialIncomesList = [
    createData(Math.random().toString(), 'income1', 'Salary', 2000, 'every month', current, 'Adi'),
    createData(Math.random().toString(), 'income2', 'Salary', 1500, 'every month', previousMonth, 'Yarden'),
    createData(Math.random().toString(), 'income3', 'Allowance', 1000, 'every month', current, 'Inbal'),
    createData(Math.random().toString(), 'income4', 'Allowance', 3500, 'every month', tomorrow, 'Adi'),
  ];

  const [incomesList, setIncomesList] = useState(initialIncomesList.filter(item => 
    `${item.date.getMonth()+1}/${item.date.getFullYear()}` === newDateValFormatted));

  const [total, setTotal] = useState(
    incomesList.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0 )
  );

  useMemo(() => {
    setTotal(incomesList.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0));
  }, [incomesList]);

  const deleteHandler = (id, amount) => {
    console.log('deleteHandler app');
    console.log('id', id);
    console.log('amount', amount);

    setIncomesList(incomesList.filter(item => item.id !== id)); //filter returns new array
    // setTotal(prevTotal => {return prevTotal - amount});
  }

  const addIncomeHandler = newIncome => {
    console.log('success add')
    setIncomesList(prevItems => { //we have to update according the last snapshot
      return [newIncome, ...prevItems]; //spread all the tems in the array
    });
    // setTotal(total + parseInt(newIncome.amount));
    console.log('incomesList after ' + JSON.stringify(incomesList));
  }

  console.log('total ' + total);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Incomes initialIncomesList={initialIncomesList} incomesList={incomesList} setIncomesList={setIncomesList} onDelete={(id, amount) => deleteHandler(id, amount)} total={total} onAdd={income => addIncomeHandler(income)} onEdit={income => addIncomeHandler(income)} madeBy={madeBy}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
