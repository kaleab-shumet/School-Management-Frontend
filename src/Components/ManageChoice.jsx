import React from "react";
import LinkButton from "./LinkButton";

function ManageChoice() {
  return (
    <div>
      
      <LinkButton text="Manage Student Information" to="/manage-student-info" />
      <LinkButton text="Manage Courses" to="/manage-courses" />
      <LinkButton text="Manage Student Result" to="/manage-student-result" />
      
    </div>
  );
}

export default ManageChoice;
