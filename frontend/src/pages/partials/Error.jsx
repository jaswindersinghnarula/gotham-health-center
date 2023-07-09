import { Alert, Snackbar, Stack } from "@mui/material";
import useGlobal from "../../../hooks/useGlobal";
import { useState, useEffect } from "react";

const Error = () => {
    const { errorMsg } = useGlobal();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // errorMsg ? setShowAlert(true) : setShowAlert(false);
        errorMsg ? setOpen(true) : setOpen(false);
    }, [errorMsg]);

    const alert = (
        <Alert variant="outlined" severity="error" aria-live="assertive">
            <p>{errorMsg}</p>
        </Alert>
    );
    const handleClose = () => {};
    return open ? (
        <Stack sx={{ width: "100%", marginBottom: "20px" }} spacing={2}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    This is a success message!
                </Alert>
            </Snackbar>
        </Stack>
    ) : (
        <></>
    );
    // <Stack>{showAlert && alert}</Stack>;
};

export default Error;
