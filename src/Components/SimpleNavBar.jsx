import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Logo from "../assets/logo.svg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const SimpleNavbar = (props) => {
  const { isLoggedIn } = props;

  return (
    <div>
      <AppBar>
        <Toolbar>
          <img src={Logo} alt="logo" style={{ marginRight: "10px", width:"3", height: "3"}} />
          <Typography variant="h6">Kazmas School Management</Typography>

          <div style={{ marginLeft: "auto" }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>

            <Button color="inherit" component={Link} to="/results">
              Result
            </Button>

            {!isLoggedIn && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Student
                </Button>
                <Button color="inherit" component={Link} to="/admin-login">
                  Admin
                </Button>
              </>
            )}
            {isLoggedIn && <LogoutButton />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SimpleNavbar;
