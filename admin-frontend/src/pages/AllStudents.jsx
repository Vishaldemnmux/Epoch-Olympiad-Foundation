import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"; // For multi-select dropdown
import { BASE_URL } from "../Api";

// List of fields that should be treated as booleans ("0" or "1")
const booleanFields = [
  "IENGOL1",
  "IENGOL1Book",
  "IENGOL2",
  "IAOL1",
  "IAOL1Book",
  "ITSTL1",
  "ITSTL1Book",
  "IMOL1",
  "IMOL1Book",
  "IGKOL1",
  "IGKOL1Book",
  "IAOL2",
  "ITSTL2",
  "IMOL2",
];

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle filter visibility
  const [searchData, setSearchData] = useState({
    studentName: "",
    classes: [], // Changed to array for multiple classes
    schoolCode: "",
    rollNo: "",
    section: "",
    subject: "",
  });

  // Predefined class options
  const classOptions = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
    { value: "4", label: "Class 4" },
    { value: "5", label: "Class 5" },
    { value: "6", label: "Class 6" },
    { value: "7", label: "Class 7" },
    { value: "8", label: "Class 8" },
    { value: "9", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];

  useEffect(() => {
    fetchStudents(currentPage);
  }, [currentPage]);

  const fetchStudents = async (page, filters = {}) => {
    try {
      let res;
      const hasFilters = Object.values(filters).some(
        (val) =>
          (Array.isArray(val) ? val.length > 0 : val !== "") &&
          val !== undefined
      );
      if (hasFilters) {
        res = await axios.post(
          `${BASE_URL}/students?page=${page}&limit=${limit}`,
          {
            schoolCode: filters.schoolCode
              ? Number(filters.schoolCode)
              : undefined,
            className: filters.classes.length > 0 ? filters.classes : undefined,
            rollNo: filters.rollNo,
            section: filters.section,
            studentName: filters.studentName,
            subject: filters.subject,
          }
        );
      } else {
        res = await axios.get(
          `${BASE_URL}/all-students?page=${page}&limit=${limit}`
        );
      }

      if (res.data.success) {
        setStudents(hasFilters ? res.data.data : res.data.allStudents);
        setTotalPages(res.data.totalPages);
      } else {
        setStudents([]);
        alert("No students found.");
      }
    } catch (err) {
      console.error("Failed to fetch students:", err);
      alert("Failed to fetch students.");
    } finally {
      setSearched(true);
    }
  };

  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleClassChange = (selectedOptions) => {
    setSearchData({
      ...searchData,
      classes: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
    });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchData.rollNo || !searchData.studentName) {
      alert("Student Name or Roll No is required");
      return;
    }
    setCurrentPage(1);
    await fetchStudents(1, searchData);
  };

  const handleClearFilters = () => {
    setSearchData({
      studentName: "",
      classes: [],
      schoolCode: "",
      rollNo: "",
      section: "",
      subject: "",
    });
    setSearched(false);
    setCurrentPage(1);
    fetchStudents(1);
  };

  const handleDelete = async (rollNo, studentClass) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const res = await axios.delete(`${BASE_URL}/student`, {
          data: { rollNo, class: studentClass },
        });
        alert(res.data.message);
        fetchStudents(currentPage, searchData);
      } catch (err) {
        alert("Failed to delete student");
      }
    }
  };

  const openUpdateModal = (student) => {
    setSelectedStudent(student);
    console.log(student);
    const formattedData = {};
    Object.keys(student).forEach((key) => {
      if (booleanFields.includes(key)) {
        formattedData[key] = student[key] === "1"; // Convert "1" to true, "0" to false
      } else {
        formattedData[key] = student[key] || "";
      }
    });
    setUpdatedData(formattedData);
    setIsModalOpen(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      Object.keys(updatedData).forEach((key) => {
        if (booleanFields.includes(key)) {
          payload[key] = updatedData[key] ? "1" : "0"; // Convert true to "1", false to "0"
        } else {
          payload[key] = updatedData[key];
        }
      });
      const res = await axios.put(`${BASE_URL}/student`, payload);
      alert(res.data.message);
      setIsModalOpen(false);
      fetchStudents(currentPage, searchData);
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update student");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= delta + 1) {
      end = Math.min(totalPages, delta * 2 + 1);
    }
    if (currentPage >= totalPages - delta) {
      start = Math.max(1, totalPages - delta * 2);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (start > 2) {
      rangeWithDots.push(1);
      rangeWithDots.push("...");
    }

    rangeWithDots.push(...range);

    if (end < totalPages - 1) {
      rangeWithDots.push("...");
      rangeWithDots.push(totalPages);
    } else if (end === totalPages - 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-17 4h14m-7 4h7m-14 4h14"
              />
            </svg>
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Search Filters */}
        {isFilterOpen && (
          <div className="bg-white shadow-md rounded-lg p-4 mb-6 transition-all duration-300">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-wrap items-end gap-4"
            >
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={searchData.studentName}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition duration-150"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={searchData.rollNo}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition duration-150"
                  placeholder="14100101"
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Classes
                </label>
                <Select
                  isMulti
                  name="classes"
                  options={classOptions}
                  value={classOptions.filter((opt) =>
                    searchData.classes.includes(opt.value)
                  )}
                  onChange={handleClassChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select classes..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "0.1rem",
                      borderRadius: "0.375rem",
                      borderColor: "#d1d5db",
                      fontSize: "0.875rem",
                      "&:hover": { borderColor: "#6366f1" },
                    }),
                    menu: (base) => ({
                      ...base,
                      zIndex: 50,
                    }),
                  }}
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  value={searchData.section}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition duration-150"
                  placeholder="A"
                />
              </div>
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  School Code
                </label>
                <input
                  type="number"
                  name="schoolCode"
                  value={searchData.schoolCode}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition duration-150"
                  placeholder="141"
                />
              </div>
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={searchData.subject}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-none text-sm transition duration-150"
                >
                  <option value="">Select Subject</option>
                  <option value="IAO">IAO</option>
                  <option value="ITST">ITST</option>
                  <option value="IMO">IMO</option>
                  <option value="IGKO">IGKO</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 border border-gray-300 rounded-md text-gray-600 text-sm hover:bg-gray-100 transition duration-150"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition duration-150"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Student Name</th>
                <th className="px-6 py-3 text-left">DOB</th>
                <th className="px-6 py-3 text-left">Roll No</th>
                <th className="px-6 py-3 text-left">Mobile</th>
                <th className="px-6 py-3 text-left">School Code</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((stu, idx) => (
                  <tr
                    key={idx}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {stu.studentName.charAt(0)}
                        </div>
                        <span className="ml-3 font-medium">
                          {stu.studentName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{stu.dob || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {stu.rollNo}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">
                        {stu.mobNo || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{stu.schoolCode}</span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => openUpdateModal(stu)}
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stu.rollNo, stu.class)}
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition duration-150"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    {searched ? "No students found" : "Loading students..."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 flex items-center justify-between bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Page {currentPage} of {totalPages} | Showing{" "}
                {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(
                  currentPage * limit,
                  (currentPage - 1) * limit + students.length
                )}{" "}
                of {totalPages * limit} students
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {getPaginationRange().map((item, idx) =>
                    item === "..." ? (
                      <span key={idx} className="px-3 py-1 text-gray-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(item)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === item
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out">
            <div
              className="absolute inset-0 bg-gray-700 bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto z-10 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Update Student Details
              </h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.keys(updatedData)
                    .filter(
                      (key) =>
                        key !== "_id" && key !== "__v" && key !== "updatedAt"
                    )
                    .map((field, idx) => (
                      <div key={idx}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field}
                        </label>
                        {booleanFields.includes(field) ? (
                          <div className="inline-flex border rounded-md">
                            <button
                              type="button"
                              onClick={() =>
                                setUpdatedData((prev) => ({
                                  ...prev,
                                  [field]: true,
                                }))
                              }
                              className={`px-4 py-2 text-sm font-medium ${
                                updatedData[field]
                                  ? "bg-green-600 text-white"
                                  : "bg-gray-100 text-gray-700"
                              } rounded-l-md hover:bg-green-500 hover:text-white transition`}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setUpdatedData((prev) => ({
                                  ...prev,
                                  [field]: false,
                                }))
                              }
                              className={`px-4 py-2 text-sm font-medium ${
                                !updatedData[field]
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-100 text-gray-700"
                              } rounded-r-md hover:bg-red-500 hover:text-white transition`}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <input
                            type={field === "dob" ? "date" : "text"}
                            name={field}
                            value={updatedData[field]}
                            onChange={handleUpdateChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                            placeholder={`Enter ${field}`}
                          />
                        )}
                      </div>
                    ))}
                </div>
                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-150"
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

export default AllStudents;
