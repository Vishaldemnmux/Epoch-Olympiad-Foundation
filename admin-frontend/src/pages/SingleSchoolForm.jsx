import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../Api";

const SingleSchoolForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data["Mob No"] = {
      code: data.mobCode,
      number: data.mobNumber,
    };

    delete data.mobCode;
    delete data.mobNumber;

    try {
      const response = await axios.post(`${BASE_URL}/add-school`, data);
      console.log(response.data);
      alert(response.data.message);
      // reset();
    } catch (error) {
      console.error("❌ Error adding school:", error);
      alert("Failed to add school. Please check inputs.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-0 md:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white">Add New School</h2>
            <p className="text-teal-100 text-sm mt-1">
              Enter school details below to register a new institution
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-8">
              {/* School Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  School Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Code
                    </label>
                    <input
                      type="text"
                      {...register("School Code", {
                        required: "School Code is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter school code"
                    />
                    {errors["School Code"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["School Code"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      {...register("School Name", {
                        required: "School Name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter school name"
                    />
                    {errors["School Name"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["School Name"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email ID
                    </label>
                    <input
                      type="email"
                      {...register("Email Id", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="school@example.com"
                    />
                    {errors["Email Id"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["Email Id"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      FAX
                    </label>
                    <input
                      type="text"
                      {...register("FAX")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter FAX number"
                    />
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Area
                    </label>
                    <input
                      type="text"
                      {...register("Area")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter area"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      {...register("City", { required: "City is required" })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter city"
                    />
                    {errors.City && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.City.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      {...register("Country", {
                        required: "Country is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter country"
                    />
                    {errors.Country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Country.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Incharge
                    </label>
                    <input
                      type="text"
                      {...register("Incharge", {
                        required: "Incharge is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter incharge name"
                    />
                    {errors.Incharge && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Incharge.message}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                    />
                    {errors.DOB && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.DOB.message}
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
                        className="w-24 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                        placeholder="+91"
                      />
                      <input
                        type="text"
                        {...register("mobNumber", {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter a valid 10-digit number",
                          },
                        })}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {(errors.mobCode || errors.mobNumber) && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.mobCode?.message || errors.mobNumber?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Principal Name
                    </label>
                    <input
                      type="text"
                      {...register("Principal Name", {
                        required: "Principal Name is required",
                      })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter principal name"
                    />
                    {errors["Principal Name"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["Principal Name"].message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Remark
                    </label>
                    <input
                      type="text"
                      {...register("Remark")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
                      placeholder="Enter remarks (optional)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 shadow-sm"
              >
                Add School
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleSchoolForm;
