import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";

const UpdateStudent = () => {
  const [searchData, setSearchData] = useState({ class: "", schoolCode: "" });
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/students`, {
        schoolCode: searchData.schoolCode,
        className: searchData.class,
      });
      if (res.data.success && res.data.data.length > 0) {
        setStudents(res.data.data);
        console.log(res.data.data);
      } else {
        alert("No students found.");
        setStudents([]);
      }
    } catch (error) {
      console.error("Error fetching students", error);
      alert("Failed to fetch students.");
    }
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleMobileChange = (field, value) => {
    setUpdatedData({
      ...updatedData,
      "Mob No": { ...updatedData["Mob No"], [field]: value },
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      rollNo: updatedData["Roll No"][""],
      studentClass: updatedData["Class "],
      "Student Name ": updatedData["Student Name "],  // Note the space
      "Father Name": updatedData["Father Name"],
      "Mother Name": updatedData["Mother Name"],
      DOB: updatedData["DOB"],
      "Mob No": { "": updatedData["Mob No"][""] },   // Single mobile number field
    };
    try {
      const res = await axios.put(`${BASE_URL}/student`, payload);
      alert(res.data.message);
      setIsModalOpen(false);
      // Refresh the student list after update
      handleSearchSubmit(e);
    } catch (error) {
      console.error("Error updating student", error);
      alert("Failed to update student.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Form */}
        <div
          className={`bg-white shadow-xl rounded-xl p-8 transition-all duration-300 ${
            isModalOpen ? "opacity-50 blur-sm" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Student to Update
          </h2>
          <form onSubmit={handleSearchSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={searchData.class}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
                  placeholder="Enter class (e.g., 1)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Code
                </label>
                <input
                  type="text"
                  name="schoolCode"
                  value={searchData.schoolCode}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
                  placeholder="Enter school code (e.g., 141)"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
              >
                Search Student
              </button>
            </div>
          </form>
        </div>

        {/* Student List */}
        {students.length > 0 && (
          <div
            className={`bg-white shadow-xl rounded-xl p-6 mt-6 space-y-4 transition-all duration-300 ${
              isModalOpen ? "opacity-50 blur-sm" : "opacity-100"
            }`}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Select a Student to Update
            </h3>
            {students.map((stu, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {stu["Student Name "]} {/* Note the space */}
                  </p>
                  <p className="text-sm text-gray-600">
                    Roll No: {stu["Roll No"][""]} | Class: {stu["Class "]} | School Code: {stu["School Code"]}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const formatted = {
                      "Student Name ": stu["Student Name "] || "",  // Note the space
                      "Father Name": stu["Father Name"] || "",
                      "Mother Name": stu["Mother Name"] || "",
                      DOB: stu["DOB"] || "",
                      "Roll No": stu["Roll No"] || { "": "" },
                      "Mob No": stu["Mob No"] || { "": "" },        // Single field instead of code/number
                      "Class ": stu["Class "] || "",
                    };
                    setSelectedStudent(stu);
                    setUpdatedData(formatted);
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
            <div
              className={`absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
                isModalOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setIsModalOpen(false)}
            />
            <div
              className={`bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out ${
                isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex justify-between items-center rounded-t-xl">
                <h3 className="text-xl font-bold text-white">
                  Update Student Details
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Student Name ",
                    "Roll No",
                    "DOB",
                    "Father Name",
                    "Mother Name",
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.trim()} {/* Display without trailing space */}
                      </label>
                      <input
                        type={field === "DOB" ? "date" : "text"}
                        name={field}
                        value={
                          field === "Roll No"
                            ? updatedData["Roll No"][""]
                            : updatedData[field]
                        }
                        onChange={(e) =>
                          field === "Roll No"
                            ? setUpdatedData({
                                ...updatedData,
                                "Roll No": { "": e.target.value },
                              })
                            : handleUpdateChange(e)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="Mob No"
                      value={updatedData["Mob No"][""]}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          "Mob No": { "": e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
                      placeholder="Enter mobile number (e.g., 7880450475)"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateStudent;