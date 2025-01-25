import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress
        sx={{ mx: "auto", paddingBlockStart: "4px" }}
        style={{ width: "30px", height: "30px" }}
      />
    </Box>
  );
};

export default Spinner;
