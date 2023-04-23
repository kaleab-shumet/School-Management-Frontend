import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../assets/logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <img src={Logo} alt="logo" style={{ marginRight: "10px" }} />
          <Typography variant="h6">Kazmas School Management</Typography>

          <div style={{ marginLeft: "auto" }}>
            <Button color="inherit" component={Link} to="/dash">
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/manage-student-info">
              Student Info
            </Button>
            <Button color="inherit" component={Link} to="/manage-courses">
              Courses
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/manage-student-result"
            >
              Student Results
            </Button>

            <LogoutButton />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
