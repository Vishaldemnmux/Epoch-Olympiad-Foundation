import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile || ""; 
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student details from API when component mounts
  useEffect(() => {
    const fetchStudentDetails = async () => {
      console.log(mobile);
      if (!mobile) return;
      try {
        const response = await fetch("/get-student", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${mobile}`,
          },
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setStudent(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
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
        {loading ? (
          <p>Loading student details...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : student ? (
          <>
            <h2>Welcome, {student["Student's name"]}!</h2>
            <p><strong>Roll No:</strong> {student["Roll no"]}</p>
            <p><strong>Class:</strong> {student["Class"]}</p>
            <p><strong>Section:</strong> {student["Section"]}</p>
            <p><strong>Father's Name:</strong> {student["Father's Name"]}</p>
            <p><strong>Mother's Name:</strong> {student["Mother's Name"]}</p>
            <p><strong>School:</strong> {student["School"]}</p>
            <p><strong>School Code:</strong> {student["School Code"]}</p>
            <p><strong>Mobile No:</strong> {student["Mob No"]}</p>
            <p><strong>City:</strong> {student["City"]}</p>
          </>
        ) : (
          <p>No student details found.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
