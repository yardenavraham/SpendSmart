import React, { useState } from "react";
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
import AppFooter from "./Components/AppHeader/AppFooter";

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

