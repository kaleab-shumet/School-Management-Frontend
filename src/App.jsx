import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Results from "./pages/Results";
import AdminLogin from "./pages/admin/AdminLogin";
import Dash from "./pages/admin/Dash";
import ManageStudentInfo from "./pages/admin/ManageStudentInfo";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageStudentResult from "./pages/admin/ManageStudentResult";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

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
