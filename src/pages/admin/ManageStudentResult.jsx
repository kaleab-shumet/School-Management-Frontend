import React, { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar";
import ProgressBar from "../../Components/ProgressBar";
import axios from "../../utils/axios-instance";
import StudentResult from "../../Components/StudentResult"

const ManageStudentResult = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    console.log(bearerToken);

    if (bearerToken == null) return navigate("/admin-login");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/auth/verify",
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        navigate("/admin-login");
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>

        <Grid item xs={12} md={1}></Grid>

        <Grid item xs={12} md={10} sx={{ paddingTop: "64px" }}>
          <ProgressBar isLoading={isLoading} />

          {!isLoading && <StudentResult />}
        </Grid>

        <Grid item xs={12} md={1}></Grid>
      </Grid>
    </Box>
  );
};

export default ManageStudentResult;
