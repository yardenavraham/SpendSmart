import React, { useState } from "react";
import "./App.css";
import Incomes from "./Pages/Incomes/Incomes";
import AppHeader from "./Components/AppHeader/AppHeader";
import Home from "./Pages/Home/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { createTheme } from '@mui/material/styles';
import Expenses from "./Pages/Expenses/Expenses";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
  Link,
  Router,
} from "react-router-dom";
import AppFooter from "./Components/AppHeader/AppFooter";

export default function App() {
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

  const madeBy = ["Adi", "Yarden", "Inbal"];

  const initialIncomesList = [
    createData(
      Math.random().toString(),
      "income1",
      "Salary",
      2000,
      "every month",
      current,
      "Adi"
    ),
    createData(
      Math.random().toString(),
      "income2",
      "Salary",
      1500,
      "every month",
      previousMonth,
      "Yarden"
    ),
    createData(
      Math.random().toString(),
      "income3",
      "Allowance",
      1000,
      "every month",
      current,
      "Inbal"
    ),
    createData(
      Math.random().toString(),
      "income4",
      "Allowance",
      3500,
      "every month",
      tomorrow,
      "Adi"
    ),
  ];

  const [incomesList, setIncomesList] = useState(initialIncomesList);
  const [total, setTotal] = useState(
    incomesList.reduce(
      (accumulator, currentValue) =>
        (accumulator = accumulator + currentValue.amount),
      0
    )
  );

  const deleteHandler = (id, amount) => {
    console.log("deleteHandler app");
    console.log("id", id);
    console.log("amount", amount);

    setIncomesList(incomesList.filter((item) => item.id !== id)); //filter returns new array
    setTotal((prevTotal) => {
      return prevTotal - amount;
    });
  };

  const addIncomeHandler = (newIncome) => {
    console.log("success add");
    setIncomesList((prevItems) => {
      //we have to update according the last snapshot
      return [newIncome, ...prevItems]; //spread all the tems in the array
    });
    setTotal(total + parseInt(newIncome.amount));
    console.log("incomesList after " + JSON.stringify(incomesList));
  };

  console.log("total " + total);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#005689',
      },
      secondary: {
        light: '#0066ff',
        main: '#212121',
        contrastText: '#ffcc00',
      },
    },
});



  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#fff", height: "100vh" }}>
          <Toolbar />
          <BrowserRouter>
            <AppHeader />
            <Box component="div" sx={{ p: 3 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="incomes" element={<Incomes />} />
              <Route path="expenses" element={<Expenses />} />
            </Routes>
             </Box>
          </BrowserRouter>
        </Box>
      </Container>
      <AppFooter />
      </ThemeProvider>
    </div>
  );
}

