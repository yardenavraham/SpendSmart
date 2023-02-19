import React, { useState, useContext } from "react"
import { Navigate } from 'react-router-dom';
import "./App.css";
import AppHeader from "./Components/AppHeader/AppHeader";
import Home from "./Pages/Home/Home";
import Incomes from "./Pages/Incomes/Incomes";
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
import AppFooter from "./Components/AppFooter/AppFooter";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import EditInformation from "./Pages/EditInformation/EditInformation";
import AuthContext from "./store/auth-context";
import LogOut from './Pages/Logout/Logout';
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import Logout from "./Pages/Logout/Logout";

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

  const routingList = [
    {
      path: "/",
      element: <Home />,
      logged: authCtx.isLoggedIn
    },
    {
      path: "incomes",
      element: <Incomes />,
      logged: authCtx.isLoggedIn
    },
    {
      path: "expenses",
      element: <Expenses />,
      logged: authCtx.isLoggedIn
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      logged: authCtx.isLoggedIn
    },
    {
      path: "signin",
      element: <SignIn />,
      logged: !authCtx.isLoggedIn
    },
    {
      path: "signup",
      element: <SignUp />,
      logged: !authCtx.isLoggedIn
    },
    {
      path: "logout",
      element: <LogOut />,
      logged: authCtx.isLoggedIn
    },
    {
      path: "editinformation",
      element: <EditInformation />,
      logged: true
    },
  ];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#fff", height: "100vh" }}>
          <Toolbar />
          <BrowserRouter>
            <AppHeader />
            <Box component="div" sx={{ p: 3 }}>
              {/* {authCtx.isLoggedIn ? <PrivateRoutes /> : <PublicRoutes />} */}
            <Routes>
              {/* {routingList.map((item) => (
                <Route key={item.path} path={item.path} element={conditionalRouting(item)} />
              ))}; */}
              <Route path="/" element={<Home />} />
              <Route path="incomes" element={<Incomes />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="dashboard" element={<Dashboard />} />
            <Route path="signin" element= {!authCtx.isLoggedIn ? (
                <SignIn />
              ) : (
                <Navigate replace to={"/"} />
              )} />
             <Route path="signup" element={!authCtx.isLoggedIn ? (
                <SignUp />
              ) : (
                <Navigate replace to={"/"} />
              )} />
              <Route path='logout' element={authCtx.isLoggedIn ? (
                <LogOut />
              ) : (
                <Navigate replace to={"/"} />
              )} />
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

