import React from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Button color="inherit" onClick={onLogoutClicked}>
      Logout
    </Button>
  );
};

export default LogoutButton;
