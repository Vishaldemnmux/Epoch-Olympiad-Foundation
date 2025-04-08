import React, { useState } from "react";
import { useSelector } from "react-redux";

function InfoField({ label, value, delay = 0 }) {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
}

const TableHeader = ({ children }) => (
  <th className="text-sm font-semibold text-gray-700 p-3 bg-gray-100">
    {children}
  </th>
);

const TableCell = ({ children, highlight }) => (
  <td
    className={`p-3 text-center ${
      highlight ? "text-green-600 font-semibold" : "text-gray-800"
    }`}
  >
    {children}
  </td>
);

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 border-b text-left text-lg font-semibold text-blue-700 hover:bg-blue-50 transition"
      >
        {title}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 py-6">{children}</div>}
    </div>
  );
};

const Dashboard = () => {
  const student = useSelector((state) => state.auth.user);

  console.log(student);

  return (
    <div className="flex-1 w-full min-h-screen lg:p-8 p-2 bg-gray-50">
      {/* HEADER USER INFO */}
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-white font-semibold text-xl">
              {student?.["Student's Name"]?.charAt(0) || "S"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              Welcome, {student?.["Student's Name"] || "Student"}
            </h2>
            <p className="text-gray-600">Your Dashboard Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={`https://i.pravatar.cc/100?u=${student?.["Mob No"]}`}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border border-gray-300 object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InfoField
          label="ROLL NO"
          value={student?.["Roll No"] || "N/A"}
          delay={0}
        />
        <InfoField
          label="STUDENT NAME"
          value={student?.["Student's Name"] || "N/A"}
          delay={100}
        />
        <InfoField
          label="FATHER'S NAME"
          value={student?.["Father's Name"] || "N/A"}
          delay={200}
        />
        <InfoField
          label="MOTHER'S NAME"
          value={student?.["Mother's Name"] || "N/A"}
          delay={300}
        />
        <InfoField
          label="MOBILE NO"
          value={student?.["Mob No"] || "N/A"}
          delay={400}
        />
        <InfoField
          label="SCHOOL NAME"
          value={student?.School || "N/A"}
          delay={500}
        />
        <InfoField
          label="SCHOOL CODE"
          value={student?.["School Code"] || "N/A"}
          delay={600}
        />
        <InfoField
          label="CLASS AND SECTION"
          value={
            `${student?.Class || ""} ${student?.Section || ""}`.trim() || "N/A"
          }
          delay={700}
        />
        <InfoField
          label="SCHOOL AREA, CITY"
          value={
            `${student?.Area || ""}, ${
              student?.["School City"] || ""
            }`.trim() || "N/A"
          }
          delay={800}
        />
      </div>

      {/* Participation Details Accordion */}
      <AccordionSection title="Participation Details">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>LEVEL</TableHeader>
                <TableHeader>IAO</TableHeader>
                <TableHeader>ITST</TableHeader>
                <TableHeader>IMO</TableHeader>
                <TableHeader>IGKO</TableHeader>
                <TableHeader>EXAM FEE PAID</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <TableCell>Basic</TableCell>
                <TableCell highlight={student["IAOL Basic"] === 1}>
                  {student["IAOL Basic"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell highlight={student["IITSTL Basic"] === 1}>
                  {student["IITSTL Basic"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell highlight={student["IIMOL Basic"] === 1}>
                  {student["IIMOL Basic"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell highlight={student["IGKOL Basic"] === 1}>
                  {student["IGKOL Basic"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell>
                  Cash: ₹{student["Basic Level Paid Amount"] || "0"}, Online: ₹
                  {student["Basic Level Amount Paid Online"] || "0"}
                </TableCell>
              </tr>
              <tr className="hover:bg-gray-50">
                <TableCell>Advance</TableCell>
                <TableCell highlight={student["IAOL Advance"] === 1}>
                  {student["IAOL Advance"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell highlight={student["IITSTL Advance"] === 1}>
                  {student["IITSTL Advance"] === 1 ? "Yes" : "Not participated"}
                </TableCell>
                <TableCell highlight={student["IIMOL Advance"] === 1}>
                  {student["IIMOL Advance"] === 1
                    ? "✓ Qualified"
                    : "Not participated"}
                </TableCell>
                <TableCell>NA</TableCell> {/* IGKOL Advance not in data */}
                <TableCell>
                  Cash: ₹{student["Advance Level Paid Amount"] || "0"}, Online:
                  ₹{student["Advance Level Amount Paid Online"] || "0"}
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection>

      {/* Workbook Details Accordion */}
      <AccordionSection title="Workbook Details">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>IAO</TableHeader>
                <TableHeader>ITST</TableHeader>
                <TableHeader>IMO</TableHeader>
                <TableHeader>STATUS</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <TableCell>No</TableCell>
                <TableCell>No</TableCell>
                <TableCell highlight>Yes</TableCell>
                <TableCell>Delivered on 05 October, 2024</TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection>

      {/* Special Study Materials Accordion */}
      <AccordionSection title="Special Study Materials">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <TableHeader>ELIGIBLE FOR FREE</TableHeader>
                <TableHeader>FREE MATERIALS WORTH</TableHeader>
                <TableHeader>DETAILS</TableHeader>
                <TableHeader>REMARK</TableHeader>
                <TableHeader>STATUS</TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <TableCell>Yes</TableCell>
                <TableCell>₹ 200</TableCell>
                <TableCell>
                  1 Online Practice Exam, 1 Basic Level Sample Paper, 1 Advance
                  Level Sample Paper
                </TableCell>
                <TableCell>Opt 3 more exams</TableCell>
                <TableCell className="text-blue-600">
                  Download from 'Study Material' tab
                </TableCell>
              </tr>
              <tr className="hover:bg-gray-50">
                <TableCell>No</TableCell>
                <TableCell>₹ 2000</TableCell>
                <TableCell>
                  8 Online Practice Exams Free, 4 Previous Year Basic Level
                  Papers, 3 Previous Year Advance Level Papers, 4 Basic Level
                  Sample Papers, 3 Advance Level Sample Papers
                </TableCell>
                <TableCell>Get study materials worth ₹ 2000</TableCell>
                <TableCell>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Click here
                  </button>
                </TableCell>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection>
    </div>
  );
};

export default Dashboard;
