import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IncomesTable from '../../Components/IncomesTable/IncomesTable';

const Incomes = () => {

    function createData(
      id,
      description,
      category,
      amount,
      frequency,
      date,
      madeBy
    ) {
      return {
        id,
        description,
        category,
        amount,
        frequency,
        date,
        madeBy,
      };
    }
  
    const current = new Date();
    const tomorrow = new Date();
    const previousMonth = new Date();
    tomorrow.setDate(current.getDate() + 2);
    previousMonth.setDate(current.getDate() - 32);
  
    const currentDateFormat = `${current.getDate()}/${
      current.getMonth() + 1
    }/${current.getFullYear()}`;
    const tomorrowDateFormat = `${tomorrow.getDate()}/${
      tomorrow.getMonth() + 1
    }/${tomorrow.getFullYear()}`;
  
    const newDateVal = new Date(new Date());
    const newDateValFormatted = `${newDateVal.getMonth()+1}/${newDateVal.getFullYear()}`;
  
    const madeBy = ['Adi', 'Yarden', 'Inbal'];
  
    const initialIncomesList = [
      createData(Math.random().toString(), 'income1', 'Salary', 1000, 'every month', current, 'Adi'),
      createData(Math.random().toString(), 'income2', 'Salary', 1500, 'every month', previousMonth, 'Yarden'),
      createData(Math.random().toString(), 'income3', 'Allowance', 1000, 'every month', current, 'Inbal'),
      createData(Math.random().toString(), 'income4', 'Allowance', 3500, 'every month', tomorrow, 'Adi'),
    ];
  
    const [incomesList, setIncomesList] = useState(initialIncomesList.filter(item => 
      `${item.date.getMonth()+1}/${item.date.getFullYear()}` === newDateValFormatted));
  
    // const [total, setTotal] = useState(
    //   incomesList.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0 )
    // );
  
    // useEffect(() => {
    //   setTotal(incomesList.reduce((accumulator,currentValue) =>  accumulator = accumulator + currentValue.amount, 0));
    // }, [incomesList]);
  
    const deleteHandler = (id, amount) => {
      console.log("deleteHandler app");
      console.log("id", id);
      console.log("amount", amount);
  
      setIncomesList(incomesList.filter(item => item.id !== id)); //filter returns new array
      // setTotal(prevTotal => {return prevTotal - amount});
    }
  
    const addIncomeHandler = (newIncome) => {
      console.log("success add");
      setIncomesList((prevItems) => {
        //we have to update according the last snapshot
        return [newIncome, ...prevItems]; //spread all the tems in the array
      });
  
  
      console.log("incomesList after " + JSON.stringify(incomesList));
    };

    return (
      <>
        <Typography align="left" variant="h4" component="h2">
          <IncomesTable initialIncomesList={initialIncomesList} incomesList={incomesList} setIncomesList={setIncomesList} onDelete={(id, amount) => deleteHandler(id, amount)} onAdd={income => addIncomeHandler(income)} onEdit={income => addIncomeHandler(income)} madeBy={madeBy}/>
        </Typography>
        
        {/* income component here*/}
      </>
    );
  }
  export default Incomes;
