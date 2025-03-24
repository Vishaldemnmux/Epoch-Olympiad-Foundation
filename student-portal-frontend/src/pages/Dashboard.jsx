import React from "react";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

function App() {
  const { state } = useLocation();
  const student = state?.student;

  return (
    <div className="flex-1 w-full h-screen lg:p-8 p-2">
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
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </div>

          <img
            src={`https://i.pravatar.cc/100?u=${student?.["Mob No"]}`}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border border-gray-300 object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          label="CITY, STATE"
          value={`${student?.City || ""}, ${student?.State || ""}`.trim() || "N/A"}
          delay={800}
        />
      </div>
    </div>
  );
}

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

export default App;
