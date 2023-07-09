import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalProvider";
import { AuthProvider } from "./context/AuthProvider";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#52be80",
    },
    secondary: {
      main: "#777777",
    },
    muted: {
      main: "#e0e0e0",
    },
    highlight: {
      main: "#f5f5f5",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <GlobalProvider>
          <Routes>
            <Route path="/*" element={<App />}></Route>
          </Routes>
        </GlobalProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
