import React, { useState } from "react";
import { Input, Button, FormControl } from "@mui/material";
import axios from "../utils/axios-instance";

/*

{
"firstName":"Student",
"lastName":"Father",
"email":"student@student.com",
"password":"student",
"grade":9
}

*/

function CreateCourseForm(props) {
  const { grade, token } = props;
  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");

  const handleCreateCourse = (event) => {
    event.preventDefault();
    console.log("Creating Course...");

    let data = JSON.stringify({
      name,
      grade,
      instructor,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/admin/courses",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        alert("Course Added Successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Some error happend - Unable to Create Course");
      });

    console.log(data);
  };

  return (
    <div>
      <h4>Create Course for Grade {grade}</h4>
      <form onSubmit={handleCreateCourse}>
        <Input
          name="name"
          value={name}
          placeholder="Course Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          name="instructor"
          value={instructor}
          placeholder="Course Instructor"
          onChange={(e) => setInstructor(e.target.value)}
        />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
}

export default CreateCourseForm;
