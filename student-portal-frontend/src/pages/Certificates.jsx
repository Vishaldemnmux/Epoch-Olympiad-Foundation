import React, { useState } from "react";
import { Download, FileText } from "lucide-react";
import certificate from "../assets/certificates.png";

const Certificates = () => {
  const [selectedLevel, setSelectedLevel] = useState("IMO BASIC LEVEL");

  return (
    <div className="space-y-4 w-full h-full p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <span className=" font-semibold">
            <FileText />
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">Certificates</h1>
      </div>

      {/* Level Selector */}
      <div>
        <select
          className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="IMO BASIC LEVEL">IMO BASIC LEVEL</option>
          <option value="IMO ADVANCED LEVEL">IMO ADVANCED LEVEL</option>
        </select>
      </div>

      {/* Certificate Preview */}
      <div className="flex justify-center">
        <div className=" rounded-md p-2">
          <img
            src={certificate}
            alt="Certificate"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-col items-center gap-2">
        <button className="bg-[#003B87] text-white px-6 py-2 rounded-md flex items-center gap-2 w-52 justify-center hover:bg-[#002e6c] transition">
          <Download size={16} />
          Download As PDF
        </button>
        <span className="text-gray-500 text-sm">or</span>
        <button className="bg-[#003B87] text-white px-6 py-2 rounded-md flex items-center gap-2 w-52 justify-center hover:bg-[#002e6c] transition">
          <Download size={16} />
          Download As Image
        </button>
      </div>
    </div>
  );
};

export default Certificates;
