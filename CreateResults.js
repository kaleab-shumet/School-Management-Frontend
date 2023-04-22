import axios from "axios";

const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODU3MTM0MDUsImlhdCI6MTY4MjExMzQwNX0.QEVo9G2FpjAzGYy2fRvi7xkGS0F59zrRGCTNfFGgOlKS6Ilg3cvFQL-cz-tQGznxrHObvXoqoJlC5ZHPfDs8vA'

const getAllStudents = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8081/api/admin/users",
    headers: {
      Authorization:token
    },
  };

  const response = await axios.request(config);
  return response.data.data.filter((e) => e.role !== "ADMIN");
};

const getCoursesByGrade = async (grade) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:8081/api/admin/courses?grade=" + grade,
    headers: {
      Authorization:token
    },
  };

  const response = await axios.request(config);

  return response.data.data;
};

const createResult = async (userId, courseId) => {
  let data = JSON.stringify({
    userId: userId,
    courseId: courseId,
    testOne: randomInteger(10, 15),
    assignmentOne: randomInteger(15, 20),
    testTwo: randomInteger(10, 15),
    assignmentTwo: randomInteger(15, 20),
    finalExam: randomInteger(20, 30),
  });
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8081/api/admin/results",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  const response = await axios.request(config);

  console.log(JSON.stringify(response.data));
};

const main = async () => {
  const studentsList = await getAllStudents();

  for (const std of studentsList) {
    const coursesList = await getCoursesByGrade(std.grade);

    console.log(JSON.stringify(coursesList));

    for (const cl of coursesList) {
      try{
      await createResult(std.id, cl.id);
      }
      catch(error){
        //console.log(error)
      }
    }
  }
};

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();
