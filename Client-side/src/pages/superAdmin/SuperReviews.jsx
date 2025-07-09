import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SuperReviews() {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/api";

  const handleView = (review) => {
    console.log("Viewing listing:", review);
    navigate(`/categories/health/store/${review.businessId}`);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/signin");
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });
      console.log("Refresh Token Response:", response.data);
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      return accessToken;
    } catch (err) {
      console.error("Refresh Token Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/signin");
      return null;
    }
  };

  const fetchReviews = async (token) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/reviews/getreviewdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Raw API Response:", response.data);

      if (response.data.status !== "success") {
        throw new Error("Failed to fetch reviews");
      }

      const fetchedReviews = response.data.reviews || [];
      console.log("Fetched Reviews:", fetchedReviews);

      const mappedReviews = fetchedReviews.map((review) => ({
        id: review._id,
        reviewer: review.user?.fullName || "Anonymous",
        business: review.business?.name || "Unknown Business",
        businessId: review.businessId || "Unknown Business",
        rating: Number(review.rating) || 0,
        title: review.comment
          ? review.comment.split(" ").slice(0, 3).join(" ") + "..."
          : "No Title",
        content: review.comment || "No comment provided",
        date:
          new Date(review.createdAt).toISOString().split("T")[0] ||
          "Unknown Date",
        status: review.status || "Pending", // Default status if not provided
        helpful: review.helpful || 0, // Default to 0 if not provided
        reported: review.reported || false, // Default to false if not provided
      }));

      console.log("Mapped Reviews:", mappedReviews);
      setReviews(mappedReviews);
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      throw err;
    }
  };

  useEffect(() => {
    const loadReviews = async () => {
      let token = localStorage.getItem("token");
      console.log(
        "Retrieved Token:",
        token ? token.substring(0, 20) + "..." : "None"
      );
      if (!token) {
        toast.error("Please log in to view reviews.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        navigate("/signin");
        setLoading(false);
        return;
      }

      try {
        await fetchReviews(token);
      } catch (err) {
        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              await fetchReviews(newToken);
            } catch (retryErr) {
              setError(`Failed to load reviews: ${retryErr.message}`);
              toast.error(`Error: ${retryErr.message}`, {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
              });
            }
          }
        } else if (err.response?.status === 403) {
          setError("Access denied. Superadmin role required.");
          toast.error("Access denied. Superadmin role required.", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
          navigate("/signin");
        } else {
          setError(`Failed to load reviews: ${err.message}`);
          toast.error(`Error: ${err.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [navigate]);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || review.status.toLowerCase() === filterStatus;
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesStatus && matchesRating;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Flagged":
        return "bg-red-100 text-red-800";
      case "Rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const totalReviews = reviews.length;
  const pendingReviews = reviews.filter((r) => r.status === "Pending").length;
  const flaggedReviews = reviews.filter((r) => r.status === "Flagged").length;
  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : "0.0";

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  console.log("Rendering Reviews:", reviews);

  return (
    <div className="p-0">
      <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:justify-between sm:text-left sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Reviews Management
        </h1>
        <div className="flex gap-4 text-sm">
          <span className="font-medium text-yellow-600">
            Pending: {pendingReviews}
          </span>
          <span className="font-medium text-red-600">
            Flagged: {flaggedReviews}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
          <p className="text-2xl font-bold text-gray-900">{totalReviews}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <div className="flex items-center">
            <p className="mr-2 text-2xl font-bold text-gray-900">
              {averageRating}
            </p>
            <div className="flex">
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending Reviews</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingReviews}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Flagged Reviews</h3>
          <p className="text-2xl font-bold text-red-600">{flaggedReviews}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Reviewer
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Business
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Content
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Reported
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {console.log("Filtered Reviews:", filteredReviews)}
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {review.reviewer}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {review.business}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                    {review.title}
                  </td>
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-700 truncate">
                    {review.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        review.status
                      )}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {review.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {review.reported ? (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Reported
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View Details"
                        onClick={() => handleView(review)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      {review.status === "Pending" && (
                        <>
                          <button
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Reject"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {review.status === "Flagged" && (
                        <>
                          <button
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Remove"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
