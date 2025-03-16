import React, { useState } from "react";
import "../styles/Results.css";

const Results = () => {
  const exams = [
    "AIO BASIC LEVEL",
    "ITST BASIC LEVEL",
    "IMO BASIC LEVEL",
    "AIO ADVANCE LEVEL",
    "ITST ADVANCE LEVEL",
    "IMO ADVANCE LEVEL",
    "IGKO"
  ];

  const [selectedExam, setSelectedExam] = useState(exams[0]);
  const [showPerformance, setShowPerformance] = useState(false);

  const resultData = {
    "AIO BASIC LEVEL": {
      examStatus: "Present",
      rollNo: "16100606",
      studentName: "VATSAL YADAV",
      fatherName: "Rajesh Yadav",
      motherName: "Chandrajeet",
      schoolName: "S. J. EDUCATION CENTRE, HANSH PURAM",
      nationalRank: 302,
      cityRank: 116,
      classRank: 8,
      sectionRank: 4,
      award: "CERTIFICATE",
      totalScore: 39,
      grade: "D",
      sectionWisePerformance: [
        {
          sectionName: "Everyday Mathematics",
          maxScore: 40,
          yourScore: 34,
          highestInSchool: 36,
          highestInCity: 40,
          highestInCountry: 40,
          highestInternationally: 40,
          totalQuestions: 20,
          correct: 10,
          incorrect: 9,
          unattempted: 1
        },
        {
          sectionName: "Mathematical Reasoning",
          maxScore: 15,
          yourScore: 15,
          highestInSchool: 15,
          highestInCity: 15,
          highestInCountry: 15,
          highestInternationally: 15,
          totalQuestions: 5,
          correct: 2,
          incorrect: 3,
          unattempted: 0
        },
        {
          sectionName: "Case Study Based Questions",
          maxScore: 20,
          yourScore: 16,
          highestInSchool: 20,
          highestInCity: 20,
          highestInCountry: 20,
          highestInternationally: 20,
          totalQuestions: 5,
          correct: 2,
          incorrect: 3,
          unattempted: 0
        },
        {
          sectionName: "HOTS",
          maxScore: 25,
          yourScore: 5,
          highestInSchool: 10,
          highestInCity: 20,
          highestInCountry: 20,
          highestInternationally: 20,
          totalQuestions: 4,
          correct: 1,
          incorrect: 2,
          unattempted: 1
        }
      ]
    },
    "ITST BASIC LEVEL": null,
    "IMO BASIC LEVEL": null,
    "AIO ADVANCE LEVEL": null,
    "ITST ADVANCE LEVEL": null,
    "IMO ADVANCE LEVEL": null,
    "IGKO": null,
  };

  const handleDownload = () => {
    alert("Downloading Result...");
  };

  const result = resultData[selectedExam];

  return (
    <div className="results-container">
      <h2>Exam Results</h2>
      <div className="dropdown-container">
        <select onChange={(e) => setSelectedExam(e.target.value)} value={selectedExam}>
          {exams.map((exam, index) => (
            <option key={index} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {result === null ? (
        <div className="result-card">
          <h3>{selectedExam}</h3>
          <p className="not-participated">Not Participated</p>
        </div>
      ) : (
        <div className="result-card">
          <h3>{selectedExam}</h3>
          <p><strong>Exam Status:</strong> {result.examStatus}</p>
          <p><strong>Roll No:</strong> {result.rollNo}</p>
          <p><strong>Student's Name:</strong> {result.studentName}</p>
          <p><strong>National Rank:</strong> {result.nationalRank}</p>
          <p><strong>City Rank:</strong> {result.cityRank}</p>
          <p><strong>Class Rank:</strong> {result.classRank}</p>
          <p><strong>Section Rank:</strong> {result.sectionRank}</p>
          <button className="download-btn" onClick={handleDownload}>
            Download Result
          </button>

          {result.examStatus === "Present" && (
            <button className="performance-btn" onClick={() => setShowPerformance(!showPerformance)}>
              {showPerformance ? "Hide Performance" : "Show Performance"}
            </button>
          )}

          {showPerformance && (
            <div className="performance-section">
              <h3>Performance Report</h3>
              <p><strong>Total Score:</strong> {result.totalScore}</p>
              <p><strong>Grade:</strong> {result.grade}</p>

              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Section Name</th>
                    <th>Max Score</th>
                    <th>Your Score</th>
                    <th>Correct</th>
                    <th>Incorrect</th>
                    <th>Unattempted</th>
                  </tr>
                </thead>
                <tbody>
                  {result.sectionWisePerformance.map((section, index) => (
                    <tr key={index}>
                      <td>{section.sectionName}</td>
                      <td>{section.maxScore}</td>
                      <td>{section.yourScore}</td>
                      <td>{section.correct}</td>
                      <td>{section.incorrect}</td>
                      <td>{section.unattempted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h4>Grading Criteria</h4>
              <ul>
                <li>90-100%: Grade A - 🏆 "EPICON"</li>
                <li>80-89%: Grade B - 🌟 "INTELLIGENT"</li>
                <li>60-79%: Grade C - 🏅 "ACHIEVER"</li>
                <li>Below 60%: Grade D - 💪 "LABORIOUS"</li>
              </ul>

              <button className="download-btn" onClick={handleDownload}>
                Download Performance Report
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
