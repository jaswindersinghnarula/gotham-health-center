import { Alert, Snackbar, Stack } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import useGlobal from "../../hooks/useGlobal";

const Snack = () => {
  const { alertMsg, setAlertMsg } = useGlobal();
  const [open, setOpen] = useState(false);
  const [state] = useState({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = state;

  useEffect(() => {
    if (alertMsg) {
      setOpen(true);
    }
  }, [alertMsg]);

  const handleClose = () => {
    setAlertMsg(null);
    setOpen(false);
  };

  return alertMsg ? (
    <Stack>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertMsg?.type}
          sx={{ width: "100%" }}
        >
          {alertMsg?.msg}
        </Alert>
      </Snackbar>
    </Stack>
  ) : (
    <></>
  );
};

export default Snack;
