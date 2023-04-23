import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginForm from "../Components/LoginForm";
import {  useNavigate } from "react-router-dom";
import SimpleNavbar from "../Components/SimpleNavBar";

export default function Login() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <SimpleNavbar />
        </Grid>
        
        <Grid item xs={12} md={3}>
        </Grid>

        <Grid item xs={12} md={6} sx={{ paddingTop: "128px" }}>
            <LoginForm />
        </Grid>

        
        <Grid item xs={12} md={3}>
        </Grid>
        
      </Grid>
    </Box>
  );
}
