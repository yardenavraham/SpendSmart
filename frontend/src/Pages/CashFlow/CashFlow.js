import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CashFlowTable from '../../Components/CashFlowTable/CashFlowTable';
import axios from "axios";

const CashFlow = (props) => {

  const newDateVal = new Date(new Date());
  const newDateValFormatted = `${newDateVal.getMonth() + 1}/${newDateVal.getFullYear()}`;

  const madeBy = ['Adi', 'Yarden', 'Inbal', 'Michal', 'Yulia']; //TODO remove this
  const accountName = "myAccount"; //TODO remove this

  const {transactionType} = props;
  const [initialCashFlowList, setInitialCashFlowList] = useState([]);
  const [cashFlowList, setCashFlowList] = useState([]);


  useEffect(() => {
    getCashFlow();
  }, [transactionType]);

  const getCashFlow = async () => {
    console.log('getCashFlow');
    console.log(transactionType);

    const response = await axios.get(`http://localhost:27017/CashFlow/${accountName}`);
    console.log('response.data ' + JSON.stringify(response.data));
    setInitialCashFlowList(response.data);
    setCashFlowList(response.data.filter(item => {
      const formattedDate = new Date(item.date);
      return (`${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}` === newDateValFormatted) && (item.type === transactionType)
    })
      .sort((a, b) => new Date(a.date) - new Date(b.date)));

  };

  const deleteHandler = async (id) => {
    try {
      console.log('id to delete ' + id);
      await axios.delete(`http://localhost:27017/CashFlow/${id}`);
      getCashFlow();
    } catch (error) {
      console.log(error);
    }
  };


  const addTransactionHandler = async (newTransaction) => {
    try {
      console.log('newTransaction ' + JSON.stringify(newTransaction));
      await axios.post(`http://localhost:27017/CashFlow/${accountName}`,
        newTransaction
      );
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const editTransactionHandler = async (id, transaction) => {
    try {
      console.log('id ' + id);
      console.log('transaction ' + JSON.stringify(transaction));
      await axios.patch(`http://localhost:27017/CashFlow/${id}`,
        transaction
      );
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <Typography align="left" variant="h4" component="h2">
        <CashFlowTable initialCashFlowList={initialCashFlowList} cashFlowList={cashFlowList} setCashFlowList={setCashFlowList} onDelete={id => deleteHandler(id)} onAdd={transaction => addTransactionHandler(transaction)} onEdit={(id, transaction) => editTransactionHandler(id, transaction)} madeBy={madeBy} getCashFlow={getCashFlow} category={props.categoriesList} tableType={transactionType} />
      </Typography>
    </>
  );
}
export default CashFlow;
