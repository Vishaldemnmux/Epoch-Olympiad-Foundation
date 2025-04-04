import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import UploadSchools from "./pages/UploadSchools";
import UploadStudents from "./pages/UploadStudents";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<div>HOME</div>} />
            <Route path="/uploadStudentData" element={<UploadStudents />} />
            <Route path="/uploadSchoolData" element={<UploadSchools />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
