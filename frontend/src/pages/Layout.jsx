import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";
import AppNavigation from "./partials/AppNavigation";

const Layout = () => {
  return (
    <Box>
      <AppNavigation />
      <Outlet />
    </Box>
  );
};

export default Layout;
