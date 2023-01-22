import React, { useState } from 'react';
import './App.css';
import Incomes from './Components/Incomes/Incomes';
// import AddIncome from './Components/AddIncome/AddIncome';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App() {

  const current = new Date();
  const currentDateFormat = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const incomes = [
    {
      id: '1',
      type: 'income1',
      date: currentDateFormat,
      amount: 5000
    },
    {
      id: '2',
      type: 'income1',
      date: currentDateFormat,
      amount: 2000
    },
    {
      id: '3',
      type: 'income1',
      date: currentDateFormat,
      amount: 1800
    }
  ];

  // const [initialItems, setInitialItems] = useState(incomes);
  const [items, setItems] = useState(incomes);
  const [total, setTotal] = useState(
    items.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0 )
  );

  const onRemove = (id, amount) => {
    console.log('onRemove app');
    console.log('id app ' + id);
    setItems(items.filter(item => item.id !== id)); //filter returns new array
    setTotal(prevTotal => {return prevTotal - amount});
  }

  const addIncomeHandler = newIncome => {
    console.log('success add')
    setItems(prevItems => { //we have to update according the last snapshot
      return [newIncome, ...prevItems]; //spread all the tems in the array
    });
    setTotal(total + parseInt(newIncome.amount));
    console.log('items after ' + JSON.stringify(items));
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Incomes items={items} onRemove={onRemove} total={total}/>
        {/* <AddIncome onAddIncome={addIncomeHandler}/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
