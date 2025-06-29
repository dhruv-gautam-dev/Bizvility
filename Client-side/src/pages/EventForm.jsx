import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  LinkIcon,
  MapPinIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    link: "",
    location: "",
    bannerImage: null,
    bannerImagePreview: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const imageUrl = import.meta.env.VITE_Image_URL;
  const location = useLocation();
  const { businessId, listingId } = location.state || {}; // Extract from navigation state
  const navigate = useNavigate(); // Moved to top level

  // Validate businessId on mount
  useEffect(() => {
    if (!businessId && !listingId) {
      setError(
        "No business or listing ID provided. Please go back and try again."
      );
    }
  }, [businessId, listingId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, bannerImage: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          bannerImagePreview: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Create event API call
  const createEvent = async () => {
    if (!token) throw new Error("Authentication token missing");

    const data = new FormData();
    data.append("business", businessId || listingId); // Use businessId or listingId
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("startTime", formData.startTime);
    data.append("endTime", formData.endTime);
    data.append("link", formData.link);
    data.append("location", formData.location);
    if (formData.bannerImage) data.append("eventImages", formData.bannerImage);

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const result = await createEvent();
      toast.success(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setFormData({
        title: "",
        description: "",
        startTime: "",
        endTime: "",
        link: "",
        location: "",
        bannerImage: null,
        bannerImagePreview: "",
      });

      navigate("/user-events"); // Navigate after success
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      link: "",
      location: "",
      bannerImage: null,
      bannerImagePreview: "",
    });
    setError(null);
  };

  return (
    <div className="min-h-screen p-4 mt-20 sm:p-6 lg:p-8">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Create Event</h1>

        {error && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Title */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Event Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="4"
                disabled={loading}
              />
            </div>

            {/* Start Time */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Start Time <span className="text-red-500">*</span>
              </label>
              <CalendarIcon className="absolute w-5 h-5 text-gray-400 top-9 left-3" />
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                disabled={loading}
              />
            </div>

            {/* End Time */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                End Time <span className="text-red-500">*</span>
              </label>
              <CalendarIcon className="absolute w-5 h-5 text-gray-400 top-9 left-3" />
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                disabled={loading}
              />
            </div>

            {/* Link */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Event Link
              </label>
              <LinkIcon className="absolute w-5 h-5 text-gray-400 top-9 left-3" />
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>

            {/* Location */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              <MapPinIcon className="absolute w-5 h-5 text-gray-400 top-9 left-3" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 pl-10 transition-colors duration-200 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>

            {/* Banner Image */}
            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Banner Image
              </label>
              <div className="flex items-center gap-4">
                {formData.bannerImagePreview && (
                  <img
                    src={formData.bannerImagePreview}
                    alt="Banner Preview"
                    className="object-cover w-24 h-24 rounded-lg"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  name="bannerImage"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
              disabled={loading}
            >
              <XMarkIcon className="w-5 h-5" />
              Reset
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
