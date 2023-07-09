import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const BookingModal = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle color="primary">
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <LocalHospitalIcon />
          <Typography variant="h6">Book an appointment</Typography>
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
              }}
              src={props.Detail.avatar}
            />
            <Box>
              <Typography variant="h5" color="primary">
                {`${props.firstName} ${props.lastName}`}
              </Typography>
              <Typography mb={2} variant="caption" color="secondary">
                {props.Detail.qualification}
              </Typography>
            </Box>
          </Box>

          <Typography color="secondary" variant="body2">
            {props.Detail.bio}
          </Typography>
        </DialogContentText>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker label="Pick Time *" size="sm" />
          </LocalizationProvider>
          <TextField
            name="email"
            id="email"
            label="Email *"
            variant="outlined"
            autoComplete={false}
          />
        </Box>
      </DialogContent>
      <Typography ml={3} variant="caption" color="secondary">
        Continue as guest
      </Typography>
      <Divider />
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={props.handleClose}>Book</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
