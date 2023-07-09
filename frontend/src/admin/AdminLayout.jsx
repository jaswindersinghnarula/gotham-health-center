import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavigation from "./partials/AppNavigation";

const AdminLayout = () => {
  return (
    <Box>
      <AdminNavigation />
      <Outlet />
    </Box>
  );
};

export default AdminLayout;
