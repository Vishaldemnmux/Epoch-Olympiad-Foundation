import React from "react";
import "../styles/Results.css";

const Results = () => {
  const results = [
    { subject: "Mathematics", marks: 85, total: 100 },
    { subject: "Science", marks: 78, total: 100 },
    { subject: "English", marks: 90, total: 100 },
    { subject: "History", marks: 88, total: 100 },
  ];

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks Obtained</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.subject}</td>
              <td>{result.marks}</td>
              <td>{result.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
