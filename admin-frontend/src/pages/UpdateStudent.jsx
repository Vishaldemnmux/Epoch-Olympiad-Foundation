import React, { useState } from "react";

const UpdateStudent = () => {
  const [searchData, setSearchData] = useState({
    class: "",
    schoolCode: "",
  });
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  // Dummy student data (replace with API response)
  const dummyStudent = {
    id: "ST123",
    studentName: "John Doe",
    class: "10",
    schoolCode: "SCH001",
    rollNo: "101",
    email: "john.doe@example.com",
    mobile: { code: "+91", number: "9876543210" },
    fatherName: "Robert Doe",
    motherName: "Jane Doe",
    dob: "2008-05-15",
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to fetch student data
    // Example: const response = await axios.get(`/api/students?class=${searchData.class}&schoolCode=${searchData.schoolCode}`);
    // setStudent(response.data);

    // Using dummy data for now
    if (searchData.class && searchData.schoolCode) {
      setStudent(dummyStudent);
      setUpdatedData(dummyStudent);
      setIsModalOpen(true);
    }
  };

  // Handle update form input changes
  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle update form submission
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to update student data
    // Example: await axios.put(`/api/students/${student.id}`, updatedData);
    // console.log("Updated data:", updatedData);

    // For now, just close the modal and show a success message
    alert("Student details updated successfully!");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        {/* Search Form */}
        <div
          className={`bg-white shadow-xl rounded-xl p-8 transition-all duration-300 ${
            isModalOpen ? "blur-sm" : ""
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  placeholder="Enter class (e.g., 10)"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  placeholder="Enter school code (e.g., SCH001)"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
              >
                Search Student
              </button>
            </div>
          </form>
        </div>

        {/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">
                  Update Student Details
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 focus:outline-none"
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={updatedData.studentName}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roll No
                    </label>
                    <input
                      type="text"
                      name="rollNo"
                      value={updatedData.rollNo}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={updatedData.email}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={updatedData.dob}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father Name
                    </label>
                    <input
                      type="text"
                      name="fatherName"
                      value={updatedData.fatherName}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mother Name
                    </label>
                    <input
                      type="text"
                      name="motherName"
                      value={updatedData.motherName}
                      onChange={handleUpdateChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        name="mobile.code"
                        value={updatedData.mobile.code}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            mobile: {
                              ...updatedData.mobile,
                              code: e.target.value,
                            },
                          })
                        }
                        className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      />
                      <input
                        type="text"
                        name="mobile.number"
                        value={updatedData.mobile.number}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            mobile: {
                              ...updatedData.mobile,
                              number: e.target.value,
                            },
                          })
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
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
