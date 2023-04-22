import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ProgressBar = (props) => {
  const { isLoading } = props;

  const root = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };

  if (!isLoading) {
    return <></>;
  }

  return (
    <Box sx={root}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressBar;
