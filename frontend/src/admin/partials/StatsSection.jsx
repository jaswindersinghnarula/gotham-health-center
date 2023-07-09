import { Box, Typography } from "@mui/material";
import Loader from "../../pages/partials/Loader";
import axios from "../../middlewares/axios";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";

const StatsSection = () => {
  const [loading, setloading] = useState(false);
  const [stats, setStats] = useState({ doctors: 0, petients: 0, guests: 0 });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setloading(true);
        const response = await axios.get("/dashboard/stats");
        if (response.status === 200) {
          let data = response.data;
          setStats((old) => {
            return { ...old, ...data };
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <Box
      sx={{
        marginBottom: "20px",
      }}
    >
      <Typography variant="h5" color="primary" mb={2}>
        Stats
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader text="Loading..." />
          </Box>
        ) : (
          <>
            <StatCard type="Doctors" quantity={stats.doctors} />
            <StatCard type="Patients" quantity={stats.petients} />
            <StatCard type="Guests" quantity={stats.guests} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default StatsSection;
