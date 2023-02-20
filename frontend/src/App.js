import React, { useState, useContext } from "react"
import { Navigate } from 'react-router-dom';
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
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import AppFooter from "./Components/AppFooter/AppFooter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import EditInformation from "./Pages/EditInformation/EditInformation";
import AuthContext from "./store/auth-context";
import LogOut from './Pages/Logout/Logout';
import PrivateRoute from "./Routes/PrivateRoute";
// import PublicRoute from "./Routes/PublicRoute";

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

  const authCtx = useContext(AuthContext);
  console.log('authCtx.isLoggedIn ' + authCtx.isLoggedIn);

  const conditionalRouting = item => {
    return !item.logged ? (
      item.element
    ) : (
      <Navigate replace to={"/"} />
    );
  }
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
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="/" element={<Home />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="incomes" element={<CashFlow transactionType={myTableType.Incomes} categoriesList={incomeCategory} />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="expenses" element={<CashFlow transactionType={myTableType.Expenses} categoriesList={expenseCategory} />} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
              {/* <Route exact path='/' element={<PublicRoute/>}> */}
                <Route path="signin" element={<SignIn />} />
              {/* </Route> */}
              {/* <Route exact path='/' element={<PrivateRoute/>}> */}
                <Route path="signup" element={<SignUp />} />
              {/* </Route> */}
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="logout" element={<LogOut/>} />
              </Route>
              <Route exact path='/' element={<PrivateRoute/>}>
                <Route path="editinformation" element={<EditInformation/>} />
               </Route>
            </Routes>
             </Box>
          </BrowserRouter>
        </Box>
      </Container>
      </ThemeProvider>
    </div>
  );
}

