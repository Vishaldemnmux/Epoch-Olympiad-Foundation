import React, { useEffect, useState } from "react";
import "../styles/StudyMaterials.css";
import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
import { BASE_API_URL } from "../Api";
import axios from "axios";

const StudyMaterials = () => {
  const [selectedOlympiad, setSelectedOlympiad] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [studyMaterials, setStudyMaterials] = useState([]); // store fetched data here

  const student = useSelector((state) => state.auth.user);

  const fetchStudyMaterials = async () => {
    try {
      const response = await axios.post(
        // `${BASE_API_URL}/fetch-study-material`,
       "http://localhost:5000/fetch-study-material",
        { mobNo: student["Mob No"] }
      );

      if (response.status === 200 && response.data) {
        // `response.data.data.data` is your array of study materials
        const fetchedMaterials = response.data.data.data;
        console.log("Study materials:", fetchedMaterials);
        
        // Store the materials in component state
        setStudyMaterials(fetchedMaterials);
      } else {
        console.error("Failed to fetch study materials.");
      }
    } catch (error) {
      console.error("Error fetching study materials:", error);
    }
  };

  useEffect(() => {
    if (student) {
      fetchStudyMaterials();
    }
  }, [student]);

  return (
    <div className="p-4 space-y-4 w-full h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 rounded-full w-9 h-9 flex items-center justify-center">
          <FileText />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Study Material
        </h2>
      </div>

      {/* Filters */}
      <div className="flex flex-col w-full items-center gap-4">
        <select
          className="bg-blue-50 w-full border border-blue-200 rounded-md px-4 py-2 text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
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

      {/* Study Materials Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-slideUp">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gradient-to-r from-blue-100 to-blue-50 text-sm font-medium">
          <div className="px-4 py-3">EXAM</div>
          <div className="px-4 py-3">TYPE</div>
          <div className="px-4 py-3">COST</div>
          <div className="px-4 py-3">BUY</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {studyMaterials.map((item, index) => (
            <div
              key={item._id || index} // use _id if it’s unique
              className="grid grid-cols-4 text-sm transition-colors duration-300 hover:bg-gray-50"
            >
              <div className="px-4 py-3">{item.examId}</div>
              <div className="px-4 py-3">{item.category}</div>
              <div className="px-4 py-3">{item.cost}</div>
              <div className="px-4 py-3">
                <a href={item.pdfLink} className="text-blue-600 font-medium hover:text-blue-800 transition-transform duration-300 transform hover:scale-105">
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;
