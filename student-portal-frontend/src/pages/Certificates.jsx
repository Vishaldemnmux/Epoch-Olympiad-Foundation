import React from "react";
import "../styles/Certificates.css";


const Certificates = () => {
  const certificates = [
    { name: "Mathematics Olympiad", file: "math_olympiad.pdf" },
    { name: "Science Fair", file: "science_fair.pdf" },
    { name: "Essay Writing Competition", file: "essay_writing.pdf" },
    { name: "Coding Hackathon", file: "coding_hackathon.pdf" },
  ];

  return (
    <div className="certificates-container">
      <h2>Certificates</h2>
      <table className="certificates-table">
        <thead>
          <tr>
            <th>Certificate Name</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((certificate, index) => (
            <tr key={index}>
              <td>{certificate.name}</td>
              <td>
                <a href={`/downloads/${certificate.file}`} download>
                  📜 Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Certificates;
