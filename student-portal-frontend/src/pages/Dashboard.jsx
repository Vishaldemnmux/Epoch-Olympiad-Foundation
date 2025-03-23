import React from "react";
import { Bell } from "lucide-react";

function App() {
  return (
    <div className="flex-1 w-full h-screen lg:p-8 p-2">

      {/* HEADER USER INFO */}
       <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <span className="text-white font-semibold text-xl">J</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Welcome, John Doe</h2>
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

            {/* Avatar */}
            <img
              src="https://i.pravatar.cc/100?u=john"
              alt="User Avatar"
              className="w-14 h-14 rounded-full border border-gray-300 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6">
          {/* Left Column */}

          <InfoField label="ROLL NO" value="192113" delay={0} />
          <InfoField label="STUDENT NAME" value="XYZ SHARMA" delay={100} />
          <InfoField label="FATHER'S NAME" value="MR. ABC SHARMA" delay={200} />
          <InfoField label="MOTHER'S NAME" value="MRS. EFG RANI" delay={300} />
          <InfoField label="MOBILE NO" value="9898989898" delay={400} />

          <InfoField
            label="SCHOOL NAME"
            value="EURO INTERNATIONAL SCHOOL"
            delay={500}
          />
          <InfoField label="SCHOOL CODE" value="12500011" delay={600} />
          <InfoField label="CLASS AND SECTION" value="6TH B" delay={700} />
          <InfoField
            label="CITY, STATE"
            value="GURUGRAM, HARYANA"
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
