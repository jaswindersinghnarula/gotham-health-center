import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const LoginPage = () => {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Paper
            sx={{
              borderRadius: "10px",
              padding: "20px",
              width: "400px",
            }}
            elevation={3}
          >
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalHospitalIcon color="primary" sx={{ fontSize: "30px" }} />
              <Typography
                sx={{
                  fontSize: "30px",
                }}
                level="display1"
                color="primary"
              >
                GHC
              </Typography>
            </Box>
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontSize: "30px",
                }}
                level="display1"
                color="primary"
              >
                Login
              </Typography>
              <Button href="/">&lt; Back</Button>
            </Box>
            <Divider
              sx={{
                marginBottom: "20px",
              }}
              variant="fullWidth"
            />
            <FormControl
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <TextField
                name="email"
                id="email"
                label="Email"
                variant="outlined"
                autoComplete={false}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <TextField
                name="password"
                type="password"
                id="password"
                label="Password"
                variant="outlined"
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button>Login</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
