import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import EmailVerification from "./EmailVerification";

export default function ForgotPassword({ onDone }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email.");

    setLoading(true);
    try {
      navigate("/EmailVerification");
      // await axios.post("/api/auth/forgot-password", { email });
      // toast.success("Reset link sent. Check your email.");
      // onDone?.(); // go back or next
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  // const EmailVerification = () => {
  //   // any logic like sending an email can go here
  //   Navigate("/EmailVerification");
  // };

  return (
    <div className="flex flex-col justify-center min-h-screen px-6 py-12 bg-gray-50 lg:px-8">
      <Toaster />
      <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
        <Mail className="w-12 h-12 mx-auto text-blue-600" />
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Forgot Password?
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter email to receive reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <form
          className="px-6 py-8 space-y-6 bg-white shadow sm:rounded-lg sm:px-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="block w-full py-2 pl-10 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={EmailVerification}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-sm text-center">
            <Link
              to="/signin"
              onClick={onDone}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>

      {/* <EmailVerification /> */}
    </div>
  );
}
