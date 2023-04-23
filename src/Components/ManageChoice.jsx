import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

function ManageChoice() {
  const style = {
    bttn: {
      margin: 5,
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Kazmas School Management
      </Typography>
      <Typography variant="h4">What would you like to do ?</Typography>

      <Button
        style={style.bttn}
        variant="contained"
        size="large"
        component={Link}
        to="/manage-student-info"
      >
        Manage Student Information
      </Button>

      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/manage-courses"
        style={style.bttn}
      >
        Manage Courses
      </Button>

      <Button
        variant="contained"
        size="large"
        component={Link}
        to="/manage-student-result"
        // style={style.bttn}
      >
        Manage Student Result
      </Button>
    </div>
  );
}

export default ManageChoice;
