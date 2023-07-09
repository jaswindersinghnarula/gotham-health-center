import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import StatsSection from "./partials/StatsSection";
import RecentJoiners from "./partials/RecentJoiners";

const AdminHome = () => {
  return (
    <Container
      sx={{
        marginTop: "20px",
      }}
      maxWidth="lg"
    >
      <StatsSection />
      <RecentJoiners />
    </Container>
  );
};

export default AdminHome;
