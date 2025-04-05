import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../Api";

const SingleStudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data["Roll No"] = { roll: data.rollNo };
    data["Mob No"] = { code: data.mobCode, number: data.mobNumber };

    delete data.rollNo;
    delete data.mobCode;
    delete data.mobNumber;

    try {
      const response = await axios.post(`${BASE_URL}/add-student`, data);
      console.log(response.data);
      alert(response.data.message);
      reset();
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Failed to add student");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-0 md:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">
              Student Registration
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Complete the form below to register a new student
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-8">
              {/* Basic Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Roll No
                    </label>
                    <input
                      type="text"
                      {...register("rollNo", {
                        required: "Roll No is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter roll number"
                    />
                    {errors.rollNo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.rollNo.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Code
                    </label>
                    <input
                      type="text"
                      {...register("School Code", {
                        required: "School Code is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter school code"
                    />
                    {errors["School Code"] && (
                      <p className="text-red-500 text-xs mt-1">
                        School Code is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <input
                      type="text"
                      {...register("Class", { required: "Class is required" })}
                      className="w-full px- IAOL1py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter class"
                    />
                    {errors.Class && (
                      <p className="text-red-500 text-xs mt-1">
                        Class is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Section
                    </label>
                    <input
                      type="text"
                      {...register("Section", {
                        required: "Section is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter section"
                    />
                    {errors.Section && (
                      <p className="text-red-500 text-xs mt-1">
                        Section is required
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      {...register("Student Name", {
                        required: "Student Name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter student name"
                    />
                    {errors["Student Name"] && (
                      <p className="text-red-500 text-xs mt-1">
                        Student Name is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("DOB", { required: "DOB is required" })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                    />
                    {errors.DOB && (
                      <p className="text-red-500 text-xs mt-1">
                        Date of Birth is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Father Name
                    </label>
                    <input
                      type="text"
                      {...register("Father Name", {
                        required: "Father Name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter father's name"
                    />
                    {errors["Father Name"] && (
                      <p className="text-red-500 text-xs mt-1">
                        Father Name is required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mother Name
                    </label>
                    <input
                      type="text"
                      {...register("Mother Name", {
                        required: "Mother Name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                      placeholder="Enter mother's name"
                    />
                    {errors["Mother Name"] && (
                      <p className="text-red-500 text-xs mt-1">
                        Mother Name is required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="text"
                        {...register("mobCode", {
                          required: "Country code is required",
                        })}
                        className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                        placeholder="+91"
                      />
                      <input
                        type="text"
                        {...register("mobNumber", {
                          required: "Mobile number is required",
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {(errors.mobCode || errors.mobNumber) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mobCode?.message || errors.mobNumber?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Exam Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Exam Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "IAOL1",
                    "IAOL1 Book",
                    "ITSTL1",
                    "ITSTL1 Book",
                    "IMOL1",
                    "IMOL1 Book",
                    "IENGOL1",
                    "IENGOL1 Book",
                    "IGKOL1",
                    "IGKOL1 Book",
                    "Total Basic Level Participated Exams",
                    "Basic Level Full Amount",
                    "Basic Level Paid Amount",
                    "Basic Level Amount Paid Online",
                  ].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field}
                      </label>
                      <input
                        type="text"
                        {...register(field, {
                          required: `${field} is required`,
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                        placeholder={`Enter ${field.toLowerCase()}`}
                      />
                      {errors[field] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[field].message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleStudentForm;
