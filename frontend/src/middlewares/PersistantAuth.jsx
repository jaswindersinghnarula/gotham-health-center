import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "./axios";
import { useEffect, useState } from "react";

const cookie = new Cookies();

const PersistantAuth = () => {
  const { auth, setAuth } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const access_token = cookie.get("accessToken");
    const refresh_token = cookie.get("refreshToken");

    const validate_token = async () => {
      try {
        const response = await axios.get("/validate_token", {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        });
        if (response.status === 200) {
          const user = response?.data;
          setAuth({
            user: user,
            access_token: access_token,
            refresh_token: refresh_token,
          });
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    !auth?.user ? validate_token() : setLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  } else {
    return <Outlet />;
  }
};

export default PersistantAuth;
