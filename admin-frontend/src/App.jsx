import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import UploadSchools from "./pages/uploadSchools";
import UploadStudents from "./pages/uploadStudents";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<div>HOME</div>} />
            <Route path="/upload-student-data" element={<UploadStudents />} />
            <Route path="/upload-school-data" element={<UploadSchools />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
