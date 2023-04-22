import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextField, Button } from "@mui/material";
import axios from "../utils/axios-instance";
function CourseTableRowForm(props) {
  const { id, courseName, courseInstructor, grade, token } = props;

  const [name, setName] = useState(courseName);
  const [instructor, setInstructor] = useState(courseInstructor);

  const [showRow, setShowRow] = useState(true);

  const initValues = {
    name: courseName,
    instructor: courseInstructor,
  };

  const handleUpdate = () => {
    const modifiedData = {
      name,
      instructor,
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

    console.log(newModifiedData);

    let data = JSON.stringify(modifiedData);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "/api/admin/courses/" + id,
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
      });
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
          <TableCell>{id}</TableCell>
          <TableCell>
            <TextField
              id="outlined-required"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={instructor}
              onChange={(e) => setInstructor(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <Button variant="outlined" onClick={handleUpdate}>
              Update
            </Button>
          </TableCell>
          <TableCell align="right">
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default CourseTableRowForm;
