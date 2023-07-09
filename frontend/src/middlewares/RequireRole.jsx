import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useGlobal from "../hooks/useGlobal";
import FullScreenLoader from "./common/loader/FullScreenLoader";

const RequireRole = (params) => {
    const ax = useAxiosPrivate();
    const { setAuthRoles } = useGlobal();
    useEffect(() => {
        const fetch_user_roles = async () => {
            try {
                const response = await ax.get("/api/rbacl/roles");
                if (response?.status === 200) {
                    setAuthRoles(response.data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetch_user_roles();
    }, []);

    return <Outlet />;
};

export default RequireRole;
