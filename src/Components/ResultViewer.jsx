import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import uuid from "react-uuid";

function ResultViewer(props) {
  const { result } = props;

  const user = result.data[0].user;

  const requiredResultData = result.data.map((e) => {
    const courseName = e.course.name;
    const courseInstructor = e.course.instructor;
    const testOne = e.testOne;
    const assignmentOne = e.assignmentOne;
    const testTwo = e.testTwo;
    const assignmentTwo = e.assignmentTwo;
    const finalExam = e.finalExam;
    const total = testOne + assignmentOne + testTwo + assignmentTwo + finalExam;

    return {
      courseName,
      courseInstructor,
      testOne,
      assignmentOne,
      testTwo,
      assignmentTwo,
      finalExam,
      total,
    };
  });

  console.log(JSON.stringify(result));

  return (
    <div>
      <h3>Student Information</h3>
      <div>
        <p>First Name: {user.firstName}</p>
        <p>Last Name: {user.lastName}</p>
        <p>Email: {user.email}</p>
        <p>Grade: {user.grade}</p>
      </div>

      <h3>Student Result</h3>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell align="right">Test 1 (15%)</TableCell>
                <TableCell align="right">Assignment 1 (20%)</TableCell>

                <TableCell align="right">Test 2 (15%)</TableCell>
                <TableCell align="right">Assignment 2 (20%)</TableCell>

                <TableCell align="right">Final Exam (30%)</TableCell>
                <TableCell align="right">
                  <strong>Total (100%)</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requiredResultData.map((result) => (
                <TableRow
                  key={uuid()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {result.courseName}
                  </TableCell>
                  <TableCell align="right">{result.courseInstructor}</TableCell>
                  <TableCell align="right">{result.testOne}</TableCell>
                  <TableCell align="right">{result.assignmentOne}</TableCell>
                  <TableCell align="right">{result.testTwo}</TableCell>
                  <TableCell align="right">{result.assignmentTwo}</TableCell>
                  <TableCell align="right">{result.finalExam}</TableCell>
                  <TableCell align="right">
                    <strong>{result.total}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ResultViewer;
