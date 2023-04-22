import { useEffect, useState } from "react";
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
import uuid from "react-uuid";
import _ from "underscore";
import ResultTableRowForm from "./ResultTableRowForm";

const getCoursesByGrade = (grd, token, callback) => {
  console.log("getCoursesByGrade");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/api/admin/courses?grade=" + grd,
    headers: {
      Authorization: token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log("waiting response result");
      console.log(response.data);

      callback(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const setupData = (response, params, callback) => {
  const { courseId, grade, bearerToken, courseName } = params;
  const rqData = response.data.data;

  let finalData = null;

  if (typeof rqData !== "undefined" && rqData.length > 0) {
    const rqResult = rqData.map((e) => {
      const id = e.id;
      const userId = e.user.id;
      const firstName = e.user.firstName;
      const lastName = e.user.lastName;
      const grade = e.grade;
      const courseName = e.course.name;
      const testOne = e.testOne;
      const assignmentOne = e.assignmentOne;
      const testTwo = e.testTwo;
      const assignmentTwo = e.assignmentTwo;
      const finalExam = e.finalExam;

      return {
        id,
        courseId,
        userId,
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
    });

    console.log("rqResult", rqResult);

    getAllCoursesByGrade(grade, bearerToken, (response) => {
      const usersData = response.data.map((e) => {
        return {
          userId: e.id,
          id: null,
          courseId,
          firstName: e.firstName,
          lastName: e.lastName,
          grade: e.grade,
          courseName,
          testOne: null,
          testTwo: null,
          assignmentOne: null,
          assignmentTwo: null,
          finalExam: null,
        };
      });

      finalData = usersData.map((e) =>
        _.extend(
          e,
          rqResult.find((r) => r.userId === e.userId)
        )
      );

      callback(finalData);
    });
  } else {
    getAllCoursesByGrade(grade, bearerToken, (response) => {
      finalData = response.data.map((e) => {
        return {
          userId: e.id,
          id: null,
          courseId,
          firstName: e.firstName,
          lastName: e.lastName,
          grade: e.grade,
          courseName,
          testOne: null,
          assignmentOne: null,
          assignmentTwo: null,
          finalExam: null,
        };
      });
      callback(finalData);
    });
  }
};

const getAllCoursesByGrade = (grade, token, callback) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "/api/admin/users?grade=" + grade,
    headers: {
      Authorization: token,
    },
  };

  axios
    .request(config)
    .then((response) => {
      callback(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

function StudentResult() {
  const [grade, setGrade] = useState(12);
  const [coursesList, setCourseList] = useState([]);
  const [data, setData] = useState([]);

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");

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
    setCourseList([]);
    setCourseId("");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/api/admin/users?grade=" + grade,
      headers: {
        Authorization: bearerToken,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getCoursesByGrade(grade, bearerToken, (resp) => {
      setCourseList(resp.data);
    });
  }, [grade]);

  useEffect(() => {
    console.log("CourseId changed..." + courseId);

    if (courseId) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "/api/admin/results?grade=" + grade + "&courseId=" + courseId,
        headers: {
          Authorization: bearerToken,
        },
      };

      axios
        .request(config)
        .then((response) => {
          setupData(
            response,
            {
              courseId,
              grade,
              bearerToken,
              courseName,
            },
            (finalData) => {
              console.log(finalData);

              setData(finalData);
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [courseId]);

  const handleChange = (event) => {
    setGrade(event.target.value);
  };

  const handleCourseChange = (event) => {
    const hid = event.target.value;
    setCourseId(hid);
    setCourseName(coursesList.find((e) => e.id === hid).name);
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
          defaultValue={12}
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

      {typeof coursesList !== "undefined" && coursesList.length > 0 && (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 700 }}>
          <InputLabel id="demo-simple-select-standard-label">Course</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Course"
            value={courseId}
            defaultValue={courseId}
            onChange={handleCourseChange}
          >
            {coursesList.map((e) => {
              return (
                <MenuItem key={uuid()} value={e.id}>
                  {e.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      )}

      <div>
        <Button variant="outlined" onClick={handleOnRegisterClicked}>
          {" "}
          {formMessage} Registration Form
        </Button>

        {/* {showCreateStudentForm && <CreateStudentForm token={bearerToken} />} */}

        <h3>Students Result List</h3>

        {/* "testOne": 12.0,
        "assignmentOne": 17.0,
        "testTwo": 15.0,
        "assignmentTwo": 20.0,
        "finalExam": 20.0, */}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Grade</TableCell>
                <TableCell align="right">Course Name</TableCell>
                <TableCell align="right">Test 1 (15%)</TableCell>
                <TableCell align="right">Assignment 1 (20%)</TableCell>
                <TableCell align="right">Test 2 (15%)</TableCell>
                <TableCell align="right">Assignment 2 (20%)</TableCell>
                <TableCell align="right">Final Exam (30%)</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            {typeof data !== "undefined" && data.length > 0 && courseId && (
              <TableBody>
                {data.map((d) => {
                  return (
                    <ResultTableRowForm
                      key={uuid()}
                      userId={d.userId}
                      id={d.id}
                      courseId={d.courseId}
                      firstName={d.firstName}
                      lastName={d.lastName}
                      grade={d.grade}
                      courseName={d.courseName}
                      testOne={d.testOne}
                      assignmentOne={d.assignmentOne}
                      testTwo={d.testTwo}
                      assignmentTwo={d.assignmentTwo}
                      finalExam={d.finalExam}
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

export default StudentResult;
