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
import React, { useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import axios from "../middlewares/axios";
import Snack from "../pages/partials/Snack";
import useGlobal from "../hooks/useGlobal";
import Loader from "../pages/partials/Loader";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlertMsg } = useGlobal();
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const handleClick = async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        const response = await axios.post("/login", {
          email: email,
          password: password,
        });

        if (response.status === 200) {
          cookie.set("accessToken", response.data.accessToken);
          cookie.set("refreshToken", response.data.refreshToken);
          navigate("/admin/home", { replace: true });
        }
      } catch (error) {
        console.log(error.response);
        setAlertMsg({
          type: "error",
          msg: error.response.data.errors[0].msg,
        });
      } finally {
        setPassword("");
        setLoading(false);
      }
    }
  };

  const validateFields = () => {
    if (email.length === 0) {
      setAlertMsg({
        type: "error",
        msg: "Can not accept empty email.",
      });
      return false;
    }
    if (password.length === 0) {
      setAlertMsg({
        type: "error",
        msg: "Can not accept empty password.",
      });
      return false;
    }
    return true;
  };
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
                GHC Admin
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {loading ? (
                <Loader text="Checking.." />
              ) : (
                <Button onClick={(e) => handleClick()}>Login</Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Snack />
    </>
  );
};

export default AdminLogin;
