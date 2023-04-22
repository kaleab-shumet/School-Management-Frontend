import axios from "axios";

const createSingleUser = async (fName, lName, grade) => {
  const email = `${fName}grade${grade}@student.com`;
  let data = JSON.stringify({
    firstName: fName,
    lastName: lName,
    email,
    password: fName,
    grade,
  });

  console.log(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:8081/api/admin/users",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODU3MTM0MDUsImlhdCI6MTY4MjExMzQwNX0.QEVo9G2FpjAzGYy2fRvi7xkGS0F59zrRGCTNfFGgOlKS6Ilg3cvFQL-cz-tQGznxrHObvXoqoJlC5ZHPfDs8vA",
    },
    data: data,
  };

  const response = await axios.request(config);
  console.log(JSON.stringify(response.data));
};

const createUsers = async () => {
  for (let grade = 9; grade <= 12; grade++) {
    for (let index = 1; index <= 20; index++) {
      createSingleUser("student" + index, "studentLastName" + index, grade);
    }
  }
};

createUsers();
