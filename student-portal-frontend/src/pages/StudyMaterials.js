import React from "react";
import "../styles/StudyMaterials.css";

const StudyMaterials = () => {
  const materials = [
    { subject: "Mathematics", title: "Algebra Basics", file: "algebra.pdf" },
    { subject: "Science", title: "Physics Notes", file: "physics.pdf" },
    { subject: "English", title: "Grammar Guide", file: "grammar.pdf" },
    { subject: "History", title: "Ancient History", file: "history.pdf" },
  ];

  return (
    <div className="study-materials-container">
      <h2>Study Materials</h2>
      <table className="study-materials-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Title</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={index}>
              <td>{material.subject}</td>
              <td>{material.title}</td>
              <td>
                <a href={`/downloads/${material.file}`} download>
                  📥 Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudyMaterials;
