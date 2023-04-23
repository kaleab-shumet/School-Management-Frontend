import React, { useEffect, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProgressBar from "../Components/ProgressBar";
import axios from "../utils/axios-instance";
import ResultViewer from "../Components/ResultViewer";
import SimpleNavbar from "../Components/SimpleNavBar";

const Results = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const bearerToken = localStorage.getItem("bearerToken");
    console.log(bearerToken);

    if (bearerToken == null) return navigate("/login");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/student/results",
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setIsLoading(false);
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <SimpleNavbar isLoggedIn={true} />
        </Grid>

        <Grid item xs={12} md={2}></Grid>

        <Grid item xs={12} md={8} sx={{ paddingTop: "64px" }}>
          <ProgressBar isLoading={isLoading} />

          {Object.keys(result).length > 0 && <ResultViewer result={result} />}
        </Grid>

        <Grid item xs={12} md={2}></Grid>
      </Grid>
    </Box>
  );
};

export default Results;
