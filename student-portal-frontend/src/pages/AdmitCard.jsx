import React from "react";
import "../styles/AdmitCard.css";

const AdmitCard = () => {
  const student = {
    name: "Rahul Sharma",
    batch: "2023",
    enrollmentId: "STU12345",
    examCenter: "Delhi Public School, Sector 45",
    examDate: "March 25, 2025",
  };

  return (
    <div className="admit-card-container">
      <h2>Admit Card</h2>
      <div className="admit-card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Batch:</strong> {student.batch}</p>
        <p><strong>Enrollment ID:</strong> {student.enrollmentId}</p>
        <p><strong>Exam Center:</strong> {student.examCenter}</p>
        <p><strong>Exam Date:</strong> {student.examDate}</p>
        <button onClick={() => alert("Downloading Admit Card...")}>
          Download Admit Card
        </button>
      </div>
    </div>
  );
};

export default AdmitCard;
