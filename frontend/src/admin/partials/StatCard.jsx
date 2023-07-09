import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Box, Card, CardContent, Chip, Link, Typography } from "@mui/material";

const StatCard = (props) => {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 200,
        borderRadius: "20px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography color="secondary" variant="h3">
            {props.quantity || 0}
          </Typography>
          <Typography color="primary" variant="h3">
            <LocalHospitalIcon />
          </Typography>
        </Box>

        <Typography color="primary" variant="h5" id="card-description">
          {props.type}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
