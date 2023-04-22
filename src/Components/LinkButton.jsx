import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LinkButton(props) {
  const { text, to } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button
      sx={{
        width: 200,
        height: 200,
        fontSize: 24,
        backgroundColor: "primary.dark",
        color: "white",
        "&:hover": {
          backgroundColor: "#4a00a2",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
}

export default LinkButton;
