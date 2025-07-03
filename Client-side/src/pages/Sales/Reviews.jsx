import { useState } from "react";
import {
  MagnifyingGlassIcon,
  StarIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

const reviews = [
  {
    id: 1,
    reviewer: "John Smith",
    business: "The Coffee House",
    rating: 5,
    title: "Excellent coffee and service!",
    content:
      "Amazing coffee quality and friendly staff. The atmosphere is perfect for working or meeting friends.",
    date: "2024-01-15",
    status: "Approved",
    helpful: 12,
    reported: false,
  },
  {
    id: 2,
    reviewer: "Sarah Johnson",
    business: "Tech Solutions Inc",
    rating: 4,
    title: "Great technical support",
    content:
      "Very professional team with excellent technical knowledge. They solved our issues quickly.",
    date: "2024-01-14",
    status: "Pending",
    helpful: 0,
    reported: false,
  },
  {
    id: 3,
    reviewer: "Mike Brown",
    business: "Fashion Boutique",
    rating: 2,
    title: "Poor customer service",
    content:
      "Staff was rude and unhelpful. The quality of products was below expectations.",
    date: "2024-01-13",
    status: "Flagged",
    helpful: 3,
    reported: true,
  },
  {
    id: 4,
    reviewer: "Emily Davis",
    business: "Fitness Center Pro",
    rating: 5,
    title: "Best gym in the area!",
    content:
      "Modern equipment, clean facilities, and knowledgeable trainers. Highly recommended!",
    date: "2024-01-12",
    status: "Approved",
    helpful: 18,
    reported: false,
  },
  {
    id: 5,
    reviewer: "David Wilson",
    business: "Digital Marketing Agency",
    rating: 3,
    title: "Average service",
    content:
      "The service was okay but nothing exceptional. Results were mixed.",
    date: "2024-01-11",
    status: "Approved",
    helpful: 5,
    reported: false,
  },
];

export default function SalesReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

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
  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
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

      {/* Stats Overview */}
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
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
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

        <div className="divide-y divide-gray-200">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {review.reviewer}
                    </h3>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        review.status
                      )}`}
                    >
                      {review.status}
                    </span>
                    {review.reported && (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Reported
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <h4 className="text-sm font-medium text-gray-900">
                      {review.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      for {review.business}
                    </p>
                  </div>

                  <p className="mb-3 text-sm text-gray-700">{review.content}</p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{review.date}</span>
                    <span>{review.helpful} people found this helpful</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    className="p-1 text-blue-600 hover:text-blue-800"
                    title="View Details"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
