import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextField, Button } from "@mui/material";
import axios from "../utils/axios-instance";
function ResultTableRowForm(props) {
  const {
    userId,
    id,
    courseId,
    firstName,
    lastName,
    grade,
    courseName,
    testOne,
    assignmentOne,
    testTwo,
    assignmentTwo,
    finalExam,
    token,
  } = props;

  const [stateUserId, setStateUserId] = useState(userId);
  const [stateId, setStateId] = useState(id);
  const [stateCourseId, setSateCourseId] = useState(courseId);
  const [stateFirstName, setStateFirstName] = useState(firstName);
  const [stateLastName, setStateLastName] = useState(lastName);
  const [stateGrade, setStateGrade] = useState(grade);
  const [stateCourseName, setStateCourseName] = useState(courseName);
  const [stateTestOne, setStateTestOne] = useState(testOne);
  const [stateTestTwo, setStateTestTwo] = useState(testTwo);
  const [stateAssignmentOne, setStateAssignmentOne] = useState(assignmentOne);
  const [stateAssignmentTwo, setStateAssignmentTwo] = useState(assignmentTwo);
  const [stateFinalExam, setStateFinalExam] = useState(finalExam);

  const [showRow, setShowRow] = useState(true);

  const initValues = {
    userId,
    courseId,
    firstName,
    lastName,
    grade,
    courseName,
    testOne,
    assignmentOne,
    testTwo,
    assignmentTwo,
    finalExam,
  };

  const handleUpdate = () => {
    const modifiedData = {
      userId: stateUserId,
      courseId: stateCourseId,
      firstName: stateFirstName,
      lastName: stateLastName,
      grade: stateGrade,
      courseName: stateCourseName,
      testOne: stateTestOne,
      assignmentOne: stateAssignmentOne,
      testTwo: stateTestTwo,
      assignmentTwo: stateAssignmentTwo,
      finalExam: stateFinalExam,
    };

    console.log(modifiedData);

    const mKeys = Object.keys(modifiedData).filter(
      (m) => modifiedData[m] !== initValues[m]
    );

    console.log(mKeys);

    const newModifiedData = {};

    for (const k of mKeys) {
      newModifiedData[k] = modifiedData[k];
    }

    console.log("newModifiedData", newModifiedData);
    console.log("updating started...");

    if (stateId) {
      let data = JSON.stringify(newModifiedData);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "/api/admin/results/" + stateId,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          alert("Record Updated Successfully!");
        })
        .catch((error) => {
          alert("Unable to update record");
          console.log(error);
        });
    } else {
      const newReModified = {
        userId,
        courseId,
        ...newModifiedData,
      };
      let data = JSON.stringify(newReModified);
      console.log("data", data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/admin/results",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log("after response-", response.data);
          setStateId(response.data.data.id);
          alert("Record Updated Successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Unable to update record");
        });
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this record ?")) {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: "/api/admin/courses/" + id,
        headers: {
          Authorization: token,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setShowRow(false);
          alert("Record Successfully Deleted...");
        })
        .catch((error) => {
          alert("Unable to delete record...");
          console.log(error);
        });

      // Save it!
      console.log("Delete....");
    } else {
      // Do nothing!
      console.log("Cancel");
    }
  };

  return (
    <>
      {showRow && (
        <TableRow>
          <TableCell>{firstName}</TableCell>
          <TableCell align="right">{lastName}</TableCell>

          <TableCell align="right">{grade}</TableCell>

          <TableCell align="right">{courseName}</TableCell>

          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={stateTestOne}
              onChange={(e) => setStateTestOne(e.target.value)}
            />
          </TableCell>

          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={stateAssignmentOne}
              onChange={(e) => setStateAssignmentOne(e.target.value)}
            />
          </TableCell>

          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={stateTestTwo}
              onChange={(e) => setStateTestTwo(e.target.value)}
            />
          </TableCell>

          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={stateAssignmentTwo}
              onChange={(e) => setStateAssignmentTwo(e.target.value)}
            />
          </TableCell>

          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={stateFinalExam}
              onChange={(e) => setStateFinalExam(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <Button variant="outlined" onClick={handleUpdate}>
              Update
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default ResultTableRowForm;
