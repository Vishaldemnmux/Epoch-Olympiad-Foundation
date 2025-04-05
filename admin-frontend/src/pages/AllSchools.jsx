import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Api"; // Ensure this is correctly set up

const AllSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/schools`);
        if (res.data.success) {
          setSchools(res.data.data);
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

    fetchSchools();
  }, []);

  // Handle school deletion
  const handleDelete = async (schoolCode) => {
    if (!window.confirm(`Are you sure you want to delete school with code ${schoolCode}?`)) {
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}/school`, {
        data: { schoolCode },
      });
      if (res.status === 200) {
        setSchools(schools.filter((school) => school["School Code"] !== schoolCode));
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error deleting school:", err);
      alert(err.response?.data?.message || "Failed to delete school.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          All Schools
        </h1>

        {/* Loading State */}
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

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
            <p>{error}</p>
          </div>
        )}

        {/* Schools List */}
        {!loading && !error && schools.length === 0 && (
          <div className="text-center text-gray-600">
            <p>No schools available.</p>
          </div>
        )}

        {!loading && !error && schools.length > 0 && (
          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schools.map((school, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {school["School Code"]}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {school["School Name"] || "N/A"} {/* Adjust based on your actual field */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {school["City"] || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(school["School Code"])}
                          className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSchools;