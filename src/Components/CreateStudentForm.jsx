import React, { useState } from "react";
import { Input, Button, FormControl } from "@mui/material";
import axios from "../utils/axios-instance";

function CreateStudentForm(props) {
  const { token } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Registering...");

    let data = JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      grade,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/admin/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Student Registered Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Some error happend - Sorry Unable to create user");
      });

    console.log(data);
  };

  return (
    <div>
      <h4>Register Student</h4>
      <form onSubmit={handleRegister}>
        <Input
          name="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          name="lastName"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="number"
          name="grade"
          value={grade}
          placeholder="Grade"
          onChange={(e) => setGrade(e.target.value)}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
}

export default CreateStudentForm;
