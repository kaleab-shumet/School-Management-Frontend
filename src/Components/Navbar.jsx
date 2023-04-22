import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../assets/react.svg";
import { Button } from "@mui/material";

const Navbar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <img src={Logo} alt="logo" style={{ marginRight: "10px" }} />
          <Typography variant="h6">Kazmas School Management</Typography>


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
