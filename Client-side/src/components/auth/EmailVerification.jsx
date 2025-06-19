import React, { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  console.log(email);

  // Submit OTP for verification
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!verificationCode) {
      toast.error("Please enter the verification code.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/verify-forgot-otp`, // Correct API route for OTP verification
        { email, otp: verificationCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Email verified successfully!");
      setTimeout(() => {
        console.log(email);
        navigate("/forgot-password", {
          state: { email },
        }); // Redirect to sign-in page after successful verification
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed. Try again."
      );
    }
  };

  // Resend OTP
  const handleResendCode = async (e) => {
    e.preventDefault();

    // const { email, password } = formData;

    try {
      console.log(email);
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyForgotOTP",
        { email: email },
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
  // const handleResendCode = async () => {
  //   setIsResending(true);
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5500/bizivility/users/generate-otp", // Correct API route for generating OTP
  //       { email },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     toast.success(response.data.message || "Verification code resent");
  //   } catch (error) {
  //     if (error.code === "ECONNABORTED") {
  //       toast.error("Request timed out. Please try again.");
  //     } else if (!error.response) {
  //       toast.error("Network error. Please check your connection.");
  //     } else {
  //       const errorMessage =
  //         error.response?.data?.message ||
  //         error.response?.data?.error ||
  //         "Failed to resend code.";
  //       toast.error(errorMessage);
  //     }
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Mail className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-sm text-center text-gray-600">
          We've sent a verification code to your email address
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label
                htmlFor="verification-code"
                className="block text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="verification-code"
                  name="verification-code"
                  type="text"
                  maxLength={6}
                  required
                  pattern="\d{6}"
                  onPaste={(e) => e.preventDefault()}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Verify OTP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">
                  Didn't receive the code?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleResendCode}
                disabled={isResending}
                className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isResending ? "Sending..." : "Resend verification code"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
