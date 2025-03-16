import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/AdmitCard.css';

const AdmitCard = () => {
  const admitRef = useRef();

  const student = {
    rollNo: '16100606',
    class: '6',
    section: 'A',
    name: 'Vatsal Yadav',
    fatherName: 'Rajesh Yadav',
    motherName: 'Chandrajeet',
    schoolName: 'S. J. EDUCATION CENTRE, HANSH PURAM',
    exams: [
      { name: 'IAO', participated: false },
      { name: 'ITST', participated: false },
      { name: 'IMO', participated: true, date: '9 November 2024, During School Hours' },
      { name: 'IGKO', participated: false },
    ],
    examCenter: 'YOUR OWN SCHOOL',
  };

  const downloadAdmitCard = () => {
    html2canvas(admitRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('Admit_Card.pdf');
    });
  };

  return (
    <div className="admit-card-container">
      <h2>Admit Card</h2>
      <div className="admit-card" ref={admitRef}>
        <div className="admit-header">
          <img src="/logo.png" alt="Logo" className="admit-logo" />
          <h3>INTERNATIONAL OLYMPIAD EXAMS</h3>
          <p>BASIC LEVEL - SESSION 2024-25</p>
        </div>

        <div className="admit-body">
          <p><strong>Roll No:</strong> {student.rollNo} <strong>Class:</strong> {student.class} <strong>Section:</strong> {student.section}</p>
          <p><strong>Student's Name:</strong> {student.name}</p>
          <p><strong>Father's Name:</strong> {student.fatherName}</p>
          <p><strong>Mother's Name:</strong> {student.motherName}</p>
          <p><strong>School Name:</strong> {student.schoolName}</p>

          <h4>Exams to Write:</h4>
          <ul>
            {student.exams.map((exam, index) => (
              <li key={index}>
                {exam.name} - {exam.participated ? exam.date : 'Not participated'}
              </li>
            ))}
          </ul>

          <p><strong>Exam Center:</strong> {student.examCenter}</p>
        </div>

        <div className="admit-footer">
          <button onClick={downloadAdmitCard} className="download-btn">Download Admit Card</button>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
