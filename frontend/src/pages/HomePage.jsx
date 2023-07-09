import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Loader from "./partials/Loader";
import axios from "axios";
import DoctorCard from "./partials/DoctorCard";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/doctors");
        if (response.status === 200) {
          setDoctors(response.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Typography color="primary" variant="h4" gutterBottom>
          Our Medical Team
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",

            gap: "20px",
            // height: "500px",
          }}
        >
          {loading ? (
            <Loader text="Loading..." />
          ) : (
            doctors.map((doctor, index) => {
              return <DoctorCard key={index} {...doctor} />;
            })
          )}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
