import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../middlewares/axios";
import Loader from "../../pages/partials/Loader";

const RecentJoiners = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/doctors");
        if (response.status === 200) {
          console.log(response.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);
  return (
    <Box>
      <Typography variant="h5" color="primary" mb={2}>
        Recently Joined Doctors
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "flex-start",
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              height: "100px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader text="Loading..." />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default RecentJoiners;
