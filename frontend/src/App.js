import React, { useState } from "react";
import "./App.css";
import AppHeader from "./Components/AppHeader/AppHeader";
import Home from "./Pages/Home/Home";
import CashFlow from "./Pages/CashFlow/CashFlow";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { createTheme } from '@mui/material/styles';
import { myTableType, incomeCategory, expenseCategory} from "./Consts";

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Routes,
  Link,
  Router,
} from "react-router-dom";
import AppFooter from "./Components/AppFooter/AppFooter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import EditInformation from "./Pages/EditInformation/EditInformation";

export default function App() {

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
              <Route path="incomes" element={<CashFlow transactionType={myTableType.Incomes} categoriesList={incomeCategory} />} />
              <Route path="expenses" element={<CashFlow transactionType={myTableType.Expenses} categoriesList={expenseCategory} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="signin" element={<SignIn/>} />
              <Route path="signup" element={<SignUp/>} />
              <Route path="editinformation" element={<EditInformation/>} />
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

