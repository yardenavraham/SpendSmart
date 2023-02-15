import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IncomesOutcomesTable from '../../Components/IncomesOutcomesTable/IncomesOutcomesTable';
import axios from "axios";
import { incomeCategory, myTableType } from "../../Consts";

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
  const newDateValFormatted = `${newDateVal.getMonth() + 1}/${newDateVal.getFullYear()}`;

  const madeBy = ['Adi', 'Yarden', 'Inbal', 'Michal', 'Yulia'];

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
    const response = await axios.get("http://localhost:27017/incomes");
    //console.log('response.data ' + JSON.stringify(response.data));
    setInitialIncomesList(response.data);
    setIncomesList(response.data.filter(item => {
      const formattedDate = new Date(item.date);
      return `${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}` === newDateValFormatted
    })
      .sort((a, b) => new Date(a.date) - new Date(b.date)));

  };

  const deleteHandler = async (id) => {
    try {
      console.log('id to delete ' + id);
      await axios.delete(`http://localhost:27017/incomes/${id}`);
      getIncomes();
    } catch (error) {
      console.log(error);
    }
  };


  const addIncomeHandler = async (newIncome) => {
    try {
      console.log('newIncome ' + JSON.stringify(newIncome));
      await axios.post("http://localhost:27017/incomes",
        newIncome
      );
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const editIncomeHandler = async (id, income) => {
    try {
      console.log('id ' + id);
      console.log('income ' + JSON.stringify(income));
      await axios.patch(`http://localhost:27017/incomes/${id}`,
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
        <IncomesOutcomesTable initialIncomesList={initialIncomesList} incomesList={incomesList} setIncomesList={setIncomesList} onDelete={id => deleteHandler(id)} onAdd={income => addIncomeHandler(income)} onEdit={(id, income) => editIncomeHandler(id, income)} madeBy={madeBy} getIncomes={getIncomes} category={incomeCategory} myTableType={myTableType.Incomes} />
      </Typography>
    </>
  );
}
export default Incomes;
