import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "../utils/axios-instance";
import CourseTableRowForm from "./CourseTableRowForm";
import uuid from "react-uuid";
import CreateCourseForm from "./CreateCourseForm";

function CourseInfo() {
  const [grade, setGrade] = React.useState(12);
  const [data, setData] = React.useState([]);

  const [showCreateStudentForm, setShowCreateStudentForm] = useState(false);
  const [formMessage, setFormMessage] = useState("Open");

  const gradeArrays = Array.from(Array(12).keys());

  const bearerToken = localStorage.getItem("bearerToken");

  const handleOnRegisterClicked = () => {
    const scs = !showCreateStudentForm;
    setShowCreateStudentForm(scs);
    if (scs) {
      setFormMessage("Close");
    } else {
      setFormMessage("Open");
    }
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/admin/courses?grade=" + grade,
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data.data);

        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [grade]);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  return (
    <div>
      <h3>Select Students by there grades</h3>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 700 }}>
        <InputLabel id="demo-simple-select-standard-label">Grade</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={grade}
          onChange={handleChange}
          label="Grade"
          defaultValue={grade}
        >
          {gradeArrays.map((e) => {
            const n = e + 1;
            return (
              <MenuItem key={uuid()} value={n}>
                Grade {n}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <div>
        <Button variant="outlined" onClick={handleOnRegisterClicked}>
          {" "}
          {formMessage} Course Creation Form
        </Button>

        {showCreateStudentForm && <CreateCourseForm grade={grade} token={bearerToken} />}

        <h3>Courses List</h3>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Id</TableCell>
                <TableCell>Course Name</TableCell>
                <TableCell align="right">Instructor</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            {typeof data !== "undefined" && data.length > 0 && (
              <TableBody>
                {data.map((d) => {
                  return (
                    <CourseTableRowForm
                      key={uuid()}
                      id={d.id}
                      grade={grade}
                      courseName={d.name}
                      courseInstructor={d.instructor}
                      token={bearerToken}
                    />
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default CourseInfo;
