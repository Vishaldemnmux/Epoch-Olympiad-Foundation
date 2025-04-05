import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Home from "./pages/Home";
import UploadBulkSchoolData from "./pages/UploadBulkSchoolData";
import UploadBulkStudentData from "./pages/UploadBulkStudentData";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Home />} />
            <Route
              path="/uploadStudentData"
              element={<UploadBulkStudentData />}
            />
            <Route
              path="/uploadSchoolData"
              element={<UploadBulkSchoolData />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
