import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setIsSidebarOpen(!mobile);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const student = {
    name: "Rahul Sharma",
    batch: "2023",
    enrollmentId: "STU12345",
    mobile: "9876543210",
  };

  return (
    <div className="dashboard-container">
      {isMobile && (
        <button className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <h3>Student Portal</h3>
        <ul>
          <li onClick={() => navigate("/admit-card")}>Admit Card</li>
          <li onClick={() => navigate("/results")}>Results</li>
          <li onClick={() => navigate("/study-materials")}>Study Materials</li>
          <li onClick={() => navigate("/certificates")}>Certificates</li>
          <li onClick={() => navigate("/answer-key")}>Answer Keys</li>
          <li onClick={() => navigate("/feedback")}>Feedback</li>
          <li onClick={() => navigate("/practice-omr")}>Practice OMR</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <h2>Welcome, {student.name}!</h2>
        <div className="student-info">
          <p><strong>Batch:</strong> {student.batch}</p>
          <p><strong>Enrollment ID:</strong> {student.enrollmentId}</p>
          <p><strong>Mobile:</strong> {student.mobile}</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
