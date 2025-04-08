import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Api";
import UpdateSchoolModal from "./UpdateSchoolModal";

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10); // Number of schools per page

  useEffect(() => {
    fetchSchools(currentPage);
  }, [currentPage]);

  const fetchSchools = async (page) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/all-schools?page=${page}&limit=${limit}`
      );
      if (res.data.success) {
        setSchools(res.data.schools);
        setTotalPages(res.data.totalPages); // Assuming API returns totalPages
        console.log(res.data);
      } else {
        setError("No schools found.");
      }
    } catch (err) {
      console.error("Error fetching schools:", err);
      setError("Failed to fetch schools. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (schoolCode) => {
    if (
      !window.confirm(
        `Are you sure you want to delete school with code ${schoolCode}?`
      )
    ) {
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}/school`, {
        data: { schoolCode },
      });
      if (res.status === 200) {
        setSchools(
          schools.filter((school) => school.schoolCode !== schoolCode)
        );
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error deleting school:", err);
      alert(err.response?.data?.message || "Failed to delete school.");
    }
  };

  const handleUpdateClick = (school) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  const handleSchoolUpdated = (updatedSchool) => {
    setSchools(
      schools.map((school) =>
        school.schoolCode === updatedSchool.schoolCode ? updatedSchool : school
      )
    );
    closeModal();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate pagination range with ellipsis
  const getPaginationRange = () => {
    const delta = 2; // Number of pages to show on each side of current page
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Schools</h1>

        {loading && (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
              />
            </svg>
            <p className="mt-2 text-gray-600">Loading schools...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && schools.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No schools available.</p>
          </div>
        )}

        {!loading && !error && schools.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3 text-left">School Name</th>
                    <th className="px-6 py-3 text-left">School Code</th>
                    <th className="px-6 py-3 text-left">City</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schools.length > 0 ? (
                    schools.map((school, idx) => (
                      <tr
                        key={idx}
                        className="border-b last:border-b-0 hover:bg-gray-50 transition duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                              {school.schoolName
                                ? school.schoolName.charAt(0)
                                : "N/A"}
                            </div>
                            <span className="ml-3 font-medium">
                              {school.schoolName || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {school.schoolCode || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">
                            {school.city || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateClick(school)}
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
                              ></path>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(school.schoolCode)}
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
                              ></path>
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No schools found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 flex items-center justify-between bg-gray-50 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages} | Showing{" "}
                  {(currentPage - 1) * limit + 1} to{" "}
                  {Math.min(
                    currentPage * limit,
                    (currentPage - 1) * limit + schools.length
                  )}{" "}
                  of {totalPages * limit} schools
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
        )}
      </div>

      {isModalOpen && (
        <UpdateSchoolModal
          school={selectedSchool}
          onClose={closeModal}
          onSchoolUpdated={handleSchoolUpdated}
        />
      )}
    </div>
  );
};

export default AllSchools;
