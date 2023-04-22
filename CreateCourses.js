import axios from "axios";

let coursesList = ["English", "Amharic", "Math", "Civics"];

const createCourse = async () => {
  for (let grade = 9; grade <= 12; grade++) {
    for (let index = 0; index < coursesList.length; index++) {
      try {
        const course = coursesList[index];

        let data = JSON.stringify({
          name: String(course + " Grade " + grade),
          grade: grade,
          instructor: String("" + course + " Instructor For Grade " + grade),
        });

        console.log("Working on........");
        console.log(data);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:8081/api/admin/courses",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJleHAiOjE2ODU3MTM0MDUsImlhdCI6MTY4MjExMzQwNX0.QEVo9G2FpjAzGYy2fRvi7xkGS0F59zrRGCTNfFGgOlKS6Ilg3cvFQL-cz-tQGznxrHObvXoqoJlC5ZHPfDs8vA",
          },
          data: data,
        };

        const response = await axios.request(config);

        console.log(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    }
  }
};

createCourse();
