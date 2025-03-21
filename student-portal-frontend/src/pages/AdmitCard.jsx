import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import admitCard from "../assets/admitCard.jpeg";

const AdmitCard = () => {
  const [selectedOlympiad, setSelectedOlympiad] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  return (
    <div className=" space-y-3 w-full h-full flex flex-col p-4">

      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <FileText />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Admit Card</h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col w-full gap-2 justify-center">
        <select
          className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedOlympiad}
          onChange={(e) => setSelectedOlympiad(e.target.value)}
        >
          <option value="">Which Olympiad</option>
          <option value="math">Mathematics</option>
          <option value="science">Science</option>
        </select>

        <select
          className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
        </select>
      </div>

      {/* Admit Card Container */}
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-3xl animate-slideUp transition-all hover:shadow-2xl">
          <img src={admitCard} alt="Admit Card" className="w-full" />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
          <Download size={16} />
          Download PDF
        </button>
        <button className="text-blue-600 px-4 py-2 hover:underline">or</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all">
          <Download size={16} />
          Download Image
        </button>
      </div>
    </div>
  );
};

export default AdmitCard;
