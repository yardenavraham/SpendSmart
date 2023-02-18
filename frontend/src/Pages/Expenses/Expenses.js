import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CashFlow from '../../Components/CashFlowTable/CashFlowTable';
import { expenseCategory, myTableType } from "../../Consts";

// import IncomesTable from '../../Components/IncomesTable/IncomesTable';

import axios from "axios";
import CashFlowTable from "../../Components/CashFlowTable/CashFlowTable";

const Expenses = () => {

  const newDateVal = new Date(new Date());
  const newDateValFormatted = `${newDateVal.getMonth() + 1}/${newDateVal.getFullYear()}`;

  const madeBy = ['Adi', 'Yarden', 'Inbal', 'Michal', 'Yulia'];

  const [initialIncomesList, setInitialIncomesList] = useState([]);
  const [incomesList, setIncomesList] = useState([]);


  useEffect(() => {
    getIncomes();
  }, []);

  const getIncomes = async () => {
    const response = await axios.get("http://localhost:27017/CashFlow");
    //console.log('response.data ' + JSON.stringify(response.data));
    setInitialIncomesList(response.data);
    setIncomesList(response.data.filter(item => {
      const formattedDate = new Date(item.date);
      return (`${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}` === newDateValFormatted) && (item.type === "Expenses")
    })
      .sort((a, b) => new Date(a.date) - new Date(b.date)));

  };

  const deleteHandler = async (id) => {
    try {
      console.log('id to delete ' + id);
      await axios.delete(`http://localhost:27017/CashFlow/${id}`);
      getIncomes();
    } catch (error) {
      console.log(error);
    }
  };


  const addIncomeHandler = async (newIncome) => {
    try {
      console.log('newIncome ' + JSON.stringify(newIncome));
      await axios.post("http://localhost:27017/CashFlow",
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
      await axios.patch(`http://localhost:27017/CashFlow/${id}`,
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
        <CashFlowTable initialIncomesList={initialIncomesList} incomesList={incomesList} setIncomesList={setIncomesList} onDelete={id => deleteHandler(id)} onAdd={income => addIncomeHandler(income)} onEdit={(id, income) => editIncomeHandler(id, income)} madeBy={madeBy} getIncomes={getIncomes} category={expenseCategory} tableType={myTableType.Expenses} />
      </Typography>
    </>
  );
}
export default Expenses;

