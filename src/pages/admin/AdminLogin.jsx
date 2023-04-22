import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../../Components/Navbar";
import AdminLoginForm from "../../Components/AdminLoginForm";

export default function AdminLogin() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        
        <Grid item xs={12} md={3}>
        </Grid>

        <Grid item xs={12} md={6} sx={{ paddingTop: "128px" }}>
          <AdminLoginForm />
        </Grid>

        
        <Grid item xs={12} md={3}>
        </Grid>
        
      </Grid>
    </Box>
  );
}
