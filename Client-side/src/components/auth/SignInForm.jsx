import React, { useEffect, useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import EmailVerification from "./EmailVerification";
// import OtpStep from "./OtpStep";
// const [mode, setMode] = useState("signin"); // modes: "signin", "otp", "reset"

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isEmailVerified, setIsEmailVerified] = useState(true); // initially true
  // const [showForgot, setShowForgot] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) {
      toast.error("Please fill Email ");
      return;
    }

    try {
      console.log(formData.email);
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000, // Increased timeout to 10s
        }
      );
      console.log(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong.";
      console.log(errorMessage);

      if (errorMessage === "User already verified") {
        setIsEmailVerified(false);
        console.log(formData);
        try {
          navigate("/forgot-password");
          console.log(response);
        } catch (error) {}
        return;
      }
    }

    navigate("/verify-email", {
      state: { email },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          timeout: 10000, // Increased timeout to 10s
        }
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("userId", response.data._id);
      localStorage.setItem("role", response.data.role);

      console.log(response.data._id);

      toast.success(response.data.message || "Login successful");
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refreshToken)
      );

      console.log("Sign in successful:", response.data);

      setFormData({ email: "", password: "", rememberMe: false });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong.";
      console.log(errorMessage);

      if (errorMessage === "Please verify your email first") {
        setIsEmailVerified(false);
        console.log(formData);
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/resend-otp",
            { email: formData.email },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              timeout: 10000,
            }
          );
          console.log(response);
        } catch (error) {}
        return;
      }

      if (error.code === "ECONNABORTED") {
        toast.error("Request timed out. Please try again.");
        console.error("Timeout error:", error.message);
      } else if (!error.response) {
        toast.error(
          "Network error. Please check your connection or backend server."
        );
        console.error("Network error:", error.message);
      } else {
        toast.error(errorMessage);
        console.error("Backend error:", {
          status: error.response?.status,
          message: errorMessage,
          data: error.response?.data,
        });
      }
    }
  };
  useEffect(() => {
    if (!isEmailVerified) {
      console.log(formData);
      navigate("/verify-email", { state: { email: formData.email } });
    }
  }, [isEmailVerified, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-50 lg:px-8">
      <Toaster />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <LogIn className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          Or{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="px-6 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/verify-email"
                  className="font-medium text-blue-600 hover:text-blue-500"
                  onClick={handleForgotPassword}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
