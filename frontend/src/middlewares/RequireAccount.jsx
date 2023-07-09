import { Navigate, Outlet } from "react-router-dom";
import useAccount from "../hooks/useAccount";

const RequireAccount = () => {
    const { account } = useAccount();

    if (account) {
        return <Outlet />;
    }
    return <Navigate to="/noaccount" replace />;
};

export default RequireAccount;
