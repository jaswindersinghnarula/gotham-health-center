import { Box } from "@mui/material";

const Loader = (props) => {
  return (
    <Box
      sx={{
        color: "muted.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& span": {
          display: "inline-block",
          // background-color: lightblue;
          width: "40px",
          height: "20px",
          background: "url('./loader.svg') no-repeat right top",
          backgroundSize: "50px 20px",
        },
      }}
    >
      <Box>{props.text}</Box>
      <span></span>
    </Box>
  );
};

export default Loader;
