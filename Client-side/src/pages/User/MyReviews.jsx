import { useState, useEffect } from "react";
import {
  StarIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserReviews } from "../../data/UserData/userBusinessLIsting";

export default function UserMyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetchUserReviews(userId, token)
      .then((data) => {
        // Transform API data to match the expected structure
        const transformedReviews = data.reviews.map((review, index) => ({
          id: index + 1, // Generate a temporary ID since API doesn't provide one
          reviewer: review.reviewerName,
          business: review.businessName,
          rating: review.rating,
          title: review.comment.substring(0, 30) || "Review", // Use first 30 chars of comment as title
          content: review.comment,
          date: new Date(review.time).toISOString().split("T")[0],
          helpful: 0, // Default value since API doesn't provide it
          response: null, // Default to null since API doesn't provide responses
        }));
        setReviews(transformedReviews);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.reviewer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating =
      filterRating === "all" || review.rating.toString() === filterRating;
    return matchesSearch && matchesRating;
  });

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

  const handleReply = (reviewId) => {
    if (!replyText.trim()) {
      toast.warning("Please enter a response.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setReviews(
      reviews.map((review) =>
        review.id === reviewId ? { ...review, response: replyText } : review
      )
    );
    toast.success("Response added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    setReplyingTo(null);
    setReplyText("");
  };

  const totalReviews = reviews.length;
  const averageRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1
      )
    : 0;
  const pendingReplies = reviews.filter((r) => !r.response).length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Reviews</h1>
        <div className="text-sm text-gray-600">
          {pendingReplies} reviews need replies
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
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
          <h3 className="text-sm font-medium text-gray-500">Pending Replies</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingReplies}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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

        {/* Reviews List */}
        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {review.reviewer}
                    </h3>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>

                  <div className="mb-2">
                    {/* <h4 className="text-sm font-medium text-gray-900">
                      {review.title}
                    </h4> */}
                    <p className="text-sm text-gray-600">
                      for {review.business}
                    </p>
                  </div>

                  <p className="mb-3 text-sm text-gray-700">{review.content}</p>

                  <div className="mb-4 text-xs text-gray-500">
                    {review.helpful} people found this helpful
                  </div>

                  {/* Business Response */}
                  {review.response && (
                    <div className="p-4 mb-4 rounded-lg bg-blue-50">
                      <div className="flex items-center mb-2">
                        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">
                          Your Response
                        </span>
                      </div>
                      <p className="text-sm text-blue-800">{review.response}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === review.id && (
                    <div className="mt-4">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write your response..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleReply(review.id)}
                          className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() =>
                      alert(
                        `Viewing full review details for ${review.business}`
                      )
                    }
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  {!review.response && (
                    <button
                      onClick={() => setReplyingTo(review.id)}
                      className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
