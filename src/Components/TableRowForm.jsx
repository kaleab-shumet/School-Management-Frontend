import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextField, Button } from "@mui/material";
import axios from "../utils/axios-instance";
function TableRowForm(props) {
  const { id, firstName, lastName, grade, email, token } = props;

  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [grd, setGrd] = useState(grade);
  const [eml, setEml] = useState(email);

  const [showRow, setShowRow] = useState(true);

  const initValues = {
    firstName,
    lastName,
    grade,
    email,
  };

  const handleUpdate = () => {
    const modifiedData = {
      firstName: fname,
      lastName: lname,
      grade: grd,
      email: eml,
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
      url: "/api/admin/users/" + id,
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
        url: "/api/admin/users/" + id,
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
              defaultValue={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={grd}
              onChange={(e) => setGrd(e.target.value)}
            />
          </TableCell>
          <TableCell align="right">
            <TextField
              id="outlined-required"
              defaultValue={eml}
              onChange={(e) => setEml(e.target.value)}
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

export default TableRowForm;
