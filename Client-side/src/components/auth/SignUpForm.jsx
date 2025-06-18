import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  UserPlus,
  Phone,
  MapPin,
  GlobeLock,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Step 1: Register the user
      const response = await axios.post(
        "http://localhost:5500/bizivility/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 5000,
        }
      );

      toast.success(
        response.data.message ||
          "Registration successful. You can now verify your account."
      );

      // Store temporary token
      localStorage.setItem("token", response.data.token);
      // console.log(token)

      // ✅ Step 2: Generate OTP using the user's email
      await axios.post(
        "http://localhost:5500/bizivility/users/generate-otp",
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          timeout: 5000,
        }
      );

      toast.success("OTP has been sent to your email.");

      // Step 3: Clear form and navigate to verification page
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        userName: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      console.log(formData);

      navigate("/verify-email", { state: { email: formData.email } });
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
      } else if (!error.response) {
        toast.error(
          "Network error. Please check your connection or backend server."
        );
      } else {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Something went wrong."
        );
      }
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-50 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <UserPlus className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="px-6 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              {
                id: "fullName",
                label: "Full Name",
                icon: <User className="w-5 h-5 text-gray-400" />,
                type: "text",
              },
              {
                id: "userName",
                label: "userName",
                icon: <User className="w-5 h-5 text-gray-400" />,
                type: "text",
              },
              {
                id: "email",
                label: "Email Address",
                icon: <Mail className="w-5 h-5 text-gray-400" />,
                type: "email",
              },
              {
                id: "phone",
                label: "Phone Number",
                icon: <Phone className="w-5 h-5 text-gray-400" />,
                type: "tel",
              },
              {
                id: "password",
                label: "Password",
                icon: <Lock className="w-5 h-5 text-gray-400" />,
                type: "password",
              },
              {
                id: "confirmPassword",
                label: "Confirm Password",
                icon: <Lock className="w-5 h-5 text-gray-400" />,
                type: "password",
              },
            ].map(({ id, label, icon, type }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {icon}
                  </div>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    value={formData[id]}
                    onChange={handleChange}
                    className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder={label}
                  />
                </div>
              </div>
            ))}

            {/* City and State Fields */}
            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {["city", "state"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id={field}
                      name={field}
                      type="text"
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                    />
                  </div>
                </div>
              ))}
            </div> */}

            {/* Accept Terms */}
            <div className="flex items-center">
              <input
                id="acceptTerms"
                name="acceptTerms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="acceptTerms"
                className="block ml-2 text-sm text-gray-900"
              >
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
