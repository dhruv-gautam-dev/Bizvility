import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [formData, setFormData] = useState({
    email,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    console.log("inside handle submit ");
    e.preventDefault();
    // TODO: Add password reset logic here
    try {
      console.log("inside response ", formData.email, formData.password);
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password`, // Correct API route for OTP verification
        {
          email: formData.email,
          password: formData.password,
          // confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Password saved successfully!");
      navigate("/signin");
      // setTimeout(() => {
      //   console.log(email);
      //   navigate("/forgot-password", {
      //     state: { email },
      //   }); // Redirect to sign-in page after successful verification
      // }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password not saved, Try again."
      );
    }
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="absolute space-y-2 text-center top-20">
        <div className="flex justify-center text-blue-600">
          <Mail className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Forgot Password?
        </h1>
        <p className="text-sm text-gray-500">
          Enter email to receive reset link.
        </p>
      </div>

      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-xl mt-36">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full py-2 pl-10 pr-3 text-gray-500 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full py-2 pl-10 pr-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save Password
          </button>

          <p
            className="mt-2 text-sm text-center text-blue-600 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Back to sign in
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
