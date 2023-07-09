import { useContext } from "react";
import AlertContext from "../context/AlertProvider";

const useAlerts = () => {
    return useContext(AlertContext);
};

export default useAlerts;
