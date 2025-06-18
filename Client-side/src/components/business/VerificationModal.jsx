import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerificationModal = ({ isOpen, onClose, onVerificationComplete, method }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleVerification = async (e) => {
    e.preventDefault();

    // Validate code (6 digits)
    if (!/^\d{6}$/.test(verificationCode)) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expired. Please sign up again.');
        navigate('/signup');
        return;
      }

      const response = await axios.post(
        'http://localhost:5500/bizivility/verify-otp',
        { otp: verificationCode },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log('Verification response:', response.data); // Debug
      toast.success(response.data.message || 'Verification successful');
      onVerificationComplete();
    } catch (error) {
      console.error('Verification error:', error); // Debug
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Verification failed.';
        toast.error(errorMessage);
        console.error('Backend error:', {
          status: error.response?.status,
          message: errorMessage,
          data: error.response?.data,
        });
      }
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Session expired. Please sign up again.');
        navigate('/signup');
        return;
      }

      const response = await axios.post(
        'http://localhost:5500/bizivility/users/resend-verification',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      console.log('Resend response:', response.data); // Debug
      toast.success(response.data.message || 'Verification code resent successfully');
    } catch (error) {
      console.error('Resend error:', error); // Debug
      if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else if (!error.response) {
        toast.error('Network error. Please check your connection.');
      } else {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to resend code.';
        toast.error(errorMessage);
        console.error('Backend error:', {
          status: error.response?.status,
          message: errorMessage,
          data: error.response?.data,
        });
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Toaster />
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Verify Your {method === 'email' ? 'Email' : 'Phone'}</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification code to your {method === 'email' ? 'email address' : 'phone number'}.
          Please enter it below to continue.
        </p>

        <form onSubmit={handleVerification} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              maxLength={6}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Verify
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendCode}
            disabled={isResending}
            className="text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationModal;