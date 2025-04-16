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

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 border-b text-left text-lg font-semibold text-indigo-700 hover:bg-indigo-50 transition duration-200"
      >
        {title}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-6 py-6">{children}</div>}
    </div>
  );
};

const Dashboard = () => {
  const student = useSelector((state) => state.auth.user);

  console.log(student);

  // Extract subject prefixes dynamically (e.g., IAOL, IITSTL, IIMOL, IGKOL, IENGOL)
  const subjects = Array.from(
    new Set(
      Object.keys(student || {})
        .filter((key) => key.match(/^(.*)(L Basic|L Advance|L Basic Book)$/))
        .map((key) => key.split(" ")[0])
    )
  ).map((prefix) => ({
    prefix,
    display: prefix, // Use full prefix (e.g., IAOL) instead of shortening
  }));

  return (
    <div className="flex-1 w-full min-h-screen lg:p-8 p-4">
      {/* HEADER USER INFO */}
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <span className="text-white font-semibold text-xl">
              {student?.["Student's Name"]?.charAt(0) || "S"}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
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

      {/* Info Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <InfoField label="ROLL NO" value={student?.["Roll No"] || "N/A"} delay={0} />
        <InfoField label="STUDENT NAME" value={student?.["Student's Name"] || "N/A"} delay={100} />
        <InfoField label="FATHER'S NAME" value={student?.["Father's Name"] || "N/A"} delay={200} />
        <InfoField label="MOTHER'S NAME" value={student?.["Mother's Name"] || "N/A"} delay={300} />
        <InfoField label="MOBILE NO" value={student?.["Mob No"] || "N/A"} delay={400} />
        <InfoField label="SCHOOL NAME" value={student?.School || "N/A"} delay={500} />
        <InfoField label="SCHOOL CODE" value={student?.["School Code"] || "N/A"} delay={600} />
        <InfoField
          label="CLASS AND SECTION"
          value={`${student?.Class || ""} ${student?.Section || ""}`.trim() || "N/A"}
          delay={700}
        />
        <InfoField
          label="SCHOOL AREA, CITY"
          value={`${student?.Area || ""}, ${student?.["School City"] || ""}`.trim() || "N/A"}
          delay={800}
        />
      </div>

      {/* Participation Details Accordion */}
      <AccordionSection title="Participation Details">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Level</th>
                {subjects.map((subject, idx) => (
                  <th key={idx} className="px-6 py-3 text-left">
                    {subject.display}
                  </th>
                ))}
                <th className="px-6 py-3 text-left">Exam Fee Paid</th>
              </tr>
            </thead>
            <tbody>
              {/* Basic Level Row */}
              <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      B
                    </div>
                    <span className="ml-3 font-medium">Basic</span>
                  </div>
                </td>
                {subjects.map((subject, idx) => (
                  <td key={idx} className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student[`${subject.prefix} Basic`] === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {student[`${subject.prefix} Basic`] === 1 ? "Yes" : "Not participated"}
                    </span>
                  </td>
                ))}
                <td className="px-6 py-4 text-gray-600">
                  Cash: ₹{student["Basic Level Paid Amount"] || "0"}, Online: ₹
                  {student["Basic Level Amount Paid Online"] || "0"}
                </td>
              </tr>
              {/* Advance Level Row */}
              <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      A
                    </div>
                    <span className="ml-3 font-medium">Advance</span>
                  </div>
                </td>
                {subjects.map((subject, idx) => (
                  <td key={idx} className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student[`${subject.prefix} Advance`] === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {student[`${subject.prefix} Advance`] === 1
                        ? subject.display === "IIMOL"
                          ? "✓ Qualified"
                          : "Yes"
                        : "Not participated"}
                    </span>
                  </td>
                ))}
                <td className="px-6 py-4 text-gray-600">
                  Cash: ₹{student["Advance Level Paid Amount"] || "0"}, Online: ₹
                  {student["Advance Level Amount Paid Online"] || "0"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection>

      {/* Workbook Details Accordion */}
      <AccordionSection title="Workbook Details">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold">
              <tr>
                {subjects.map((subject, idx) => (
                  <th key={idx} className="px-6 py-3 text-left">
                    {subject.display}
                  </th>
                ))}
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                {subjects.map((subject, idx) => (
                  <td key={idx} className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        student[`${subject.prefix} Basic Book`] === 1
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {student[`${subject.prefix} Basic Book`] === 1 ? "Yes" : "No"}
                    </span>
                  </td>
                ))}
                <td className="px-6 py-4 text-gray-600">
                  {subjects.some(
                    (subject) => student[`${subject.prefix} Basic Book`] === 1
                  ) && student.bookStatus
                    ? `Delivered on ${student.bookStatus}`
                    : "Not delivered"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection>

      {/* Special Study Materials Accordion (Commented Out) */}
      {/* <AccordionSection title="Special Study Materials">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Eligible for Free</th>
                <th className="px-6 py-3 text-left">Free Materials Worth</th>
                <th className="px-6 py-3 text-left">Details</th>
                <th className="px-6 py-3 text-left">Remark</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Yes
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">₹ 200</td>
                <td className="px-6 py-4 text-gray-600">
                  1 Online Practice Exam, 1 Basic Level Sample Paper, 1 Advance Level Sample Paper
                </td>
                <td className="px-6 py-4 text-gray-600">Opt 3 more exams</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition duration-150"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    Download
                  </a>
                </td>
              </tr>
              <tr className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 text-gray-600">No</td>
                <td className="px-6 py-4 text-gray-600">₹ 2000</td>
                <td className="px-6 py-4 text-gray-600">
                  8 Online Practice Exams Free, 4 Previous Year Basic Level Papers, 3 Previous Year Advance Level Papers, 4 Basic Level Sample Papers, 3 Advance Level Sample Papers
                </td>
                <td className="px-6 py-4 text-gray-600">Get study materials worth ₹ 2000</td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition duration-150">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
                      ></path>
                    </svg>
                    Click here
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AccordionSection> */}
    </div>
  );
};

export default Dashboard;


 