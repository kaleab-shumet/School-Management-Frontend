import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";
import SimpleNavbar from "../Components/SimpleNavBar";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <SimpleNavbar />
        </Grid>

        <Grid item xs={12} md={3}></Grid>

        <Grid item xs={12} md={6} sx={{ paddingTop: "128px" }}>
          <Typography variant="h1" gutterBottom>
            Kazmas School Management
          </Typography>

          <Typography variant="h4">Check your Student Result Online</Typography>
          <Typography sx={{marginTop: 3}}>
            No more waiting in lines, check your results instantly!
          </Typography>

          <Button style={{marginX: "auto"  }} sx={{
            marginTop: 3,
            paddingX: 7,
            paddingY: 2
            
          }} variant="contained" size="large" component={Link} to="/login">
            Log In
          </Button>
        </Grid>

        <Grid item xs={12} md={3}></Grid>
      </Grid>
    </Box>
  );
}
