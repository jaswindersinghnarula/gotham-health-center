import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BookingModal from "./BookingModal";
const DoctorCard = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: "auto",
        // resize: "horizontal",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingTop: "16px",
          paddingLeft: "16px",
          paddingRight: "16px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
          src={props.Detail.avatar}
        />
        <LocalHospitalIcon
          color="primary"
          sx={{
            fontSize: 30,
          }}
        />
      </Box>
      <CardContent
        sx={{
          height: "110px",
        }}
      >
        <Typography variant="h5" color="primary">
          {`${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography mb={2} variant="caption" color="secondary">
          {props.Detail.qualification}
        </Typography>
        <Typography color="secondary" variant="body2">
          {props.Detail.bio.length > 100
            ? `${props.Detail.bio.slice(0, 100 - 1)} ...`
            : props.Detail.bio}
        </Typography>
      </CardContent>
      <Box
        sx={{
          padding: "5px",
          color: "white",
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            color: "white",
            display: "block",
          }}
          size="sm"
          onClick={handleOpen}
        >
          Book Appointment
        </Button>
      </Box>
      <BookingModal {...props} open={open} handleClose={handleClose} />
    </Card>
  );
};

export default DoctorCard;
