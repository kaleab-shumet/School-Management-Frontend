import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import axios from "../utils/axios-instance";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page from refreshing on submit
    if (validateEmail()) {
      // check if email is valid
      setEmailError(false);
      console.log("Email:", email);
      console.log("Password:", password);

      // add your login logic here

      let data = JSON.stringify({
        email: email,
        password: password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/auth",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setErrorMessage("");
          const { token } = response.data.data; // extract token from response

          const bearerToken = "Bearer " + String(token);
          //console.log(bearerToken);
          localStorage.setItem("bearerToken", bearerToken); // save token in localStorage
          navigate("/results");
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage(error.response.data.message);
        });
    } else {
      setEmailError(true); // set email error state to true
    }
  };

  const validateEmail = () => {
    const re = /\S+@\S+\.\S+/; // regular expression for email validation
    return re.test(email); // return true if email is valid, false if not
  };

  return (
    <div>
      <div>
        <h1 style={{ margin: "auto", textAlign: "center" }}>Students Result</h1>
        <h2>For Students Only</h2>
        <h3>
          Please Log In with your email and password to check your result !
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          error={emailError} // add error state to text field component
          helperText={emailError ? "Invalid email" : ""} // add helper text for error state
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </div>
  );
};

export default LoginForm;
