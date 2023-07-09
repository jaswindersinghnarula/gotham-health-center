import useAuth from "./useAuth";
import Cookies from "universal-cookie";
import useAxiosPrivate from "./useAxiosPrivate";

const cookie = new Cookies();
const useLogout = () => {
    const { setAuth } = useAuth();
    const axp = useAxiosPrivate();

    const logout = async () => {
        setAuth({});
        cookie.remove("access_token");
        try {
            const response = await axp.post("/logout");
        } catch (error) {
            console.error(error);
        }
    };

    return logout;
};

export default useLogout;
