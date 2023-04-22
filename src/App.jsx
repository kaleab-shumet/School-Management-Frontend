import React from "react";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Results from "./pages/Results";
import AdminLogin from "./pages/admin/AdminLogin";
import Dash from "./pages/admin/Dash";
import ManageStudentInfo from "./pages/admin/ManageStudentInfo";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageStudentResult from "./pages/admin/ManageStudentResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/results" element={<Results />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/manage-student-info" element={<ManageStudentInfo />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
        <Route path="/manage-student-result" element={<ManageStudentResult />} />
      </Routes>
    </Router>
  );
};

export default App;
