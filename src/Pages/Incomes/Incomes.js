import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IncomesTable from '../../Components/IncomesTable/IncomesTable';
import axios from "axios";

const Incomes = () => {

    // function createData(
    //   id,
    //   description,
    //   category,
    //   amount,
    //   frequency,
    //   date,
    //   madeBy
    // ) {
    //   return {
    //     id,
    //     description,
    //     category,
    //     amount,
    //     frequency,
    //     date,
    //     madeBy,
    //   };
    // }
  
    // const current = new Date();
    // const tomorrow = new Date();
    // const previousMonth = new Date();
    // tomorrow.setDate(current.getDate() + 2);
    // previousMonth.setDate(current.getDate() - 32);
  
    // const currentDateFormat = `${current.getDate()}/${
    //   current.getMonth() + 1
    // }/${current.getFullYear()}`;
    // const tomorrowDateFormat = `${tomorrow.getDate()}/${
    //   tomorrow.getMonth() + 1
    // }/${tomorrow.getFullYear()}`;
  
    const newDateVal = new Date(new Date());
    const newDateValFormatted = `${newDateVal.getMonth()+1}/${newDateVal.getFullYear()}`;
  
    const madeBy = ['Adi', 'Yarden', 'Inbal'];
  
    // const initialIncomesList = [
    //   createData(Math.random().toString(), 'income1', 'Salary', 1000, 'every month', current, 'Adi'),
    //   createData(Math.random().toString(), 'income2', 'Salary', 1500, 'every month', previousMonth, 'Yarden'),
    //   createData(Math.random().toString(), 'income3', 'Allowance', 1000, 'every month', current, 'Inbal'),
    //   createData(Math.random().toString(), 'income4', 'Allowance', 3500, 'every month', tomorrow, 'Adi'),
    // ];

    const [initialIncomesList, setInitialIncomesList] = useState([]);
    const [incomesList, setIncomesList] = useState([]);

  
      useEffect(() => {
        getIncomes();
      }, []);
     
      const getIncomes = async () => {
        console.log('getIncomes');
        const response = await axios.get("http://localhost:4000/incomes");
        console.log('response.data ' + JSON.stringify(response.data));
        setInitialIncomesList(response.data);
        setIncomesList(response.data.filter(item => {
          const formattedDate = new Date(item.date);
          return `${formattedDate.getMonth()+1}/${formattedDate.getFullYear()}` === newDateValFormatted}));

      };


    //const [incomesList, setIncomesList] = useState(initialIncomesList.filter(item => 
     // `${item.date.getMonth()+1}/${item.date.getFullYear()}` === newDateValFormatted));
  
    // const deleteHandler = (id, amount) => {
    //   console.log("deleteHandler app");
    //   console.log("id", id);
    //   console.log("amount", amount);
    //   setIncomesList(incomesList.filter(item => item.id !== id)); //filter returns new array
    // }

    const deleteHandler = async (id) => {
      try {
        console.log('id to delete ' + id);
        await axios.delete(`http://localhost:4000/incomes/${id}`);
        getIncomes();
      } catch (error) {
        console.log(error);
      }
    };
  
    // const addIncomeHandler = (newIncome) => {
    //   console.log("success add");
    //   setIncomesList((prevItems) => {
    //     //we have to update according the last snapshot
    //     return [newIncome, ...prevItems]; //spread all the tems in the array
    //   });
  
  
    //   console.log("incomesList after " + JSON.stringify(incomesList));
    // };

    const addIncomeHandler = async (newIncome) => {
      try {
        console.log('newIncome ' + JSON.stringify(newIncome));
        await axios.post("http://localhost:4000/incomes", 
          newIncome
        );
        // navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    const editIncomeHandler = async (id, income) => {
      try {
        await axios.patch(`http://localhost:4000/incomes/${id}`,
         income
        );
        // navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
   

    return (
      <>
        <Typography align="left" variant="h4" component="h2">
          <IncomesTable initialIncomesList={initialIncomesList} incomesList={incomesList} setIncomesList={setIncomesList} onDelete={id => deleteHandler(id)} onAdd={income => addIncomeHandler(income)} onEdit={income => addIncomeHandler(income)} madeBy={madeBy}/>
        </Typography>
      </>
    );
  }
  export default Incomes;
