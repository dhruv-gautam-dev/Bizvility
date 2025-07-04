import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import {
  MagnifyingGlassIcon,
  EyeIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { fetchSalesListing } from "../../data/SalesData/ListingDAta";

// Default categories and plans (used as fallback if API doesn't provide them)
const defaultCategories = [
  "Restaurant",
  "Services",
  "Retail",
  "Health & Fitness",
];
const defaultPlans = [
  "Basic",
  "Standard",
  "Professional",
  "Premium",
  "Enterprise",
];

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [plans, setPlans] = useState(defaultPlans);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Hook for navigation

  // Fetch listings and dynamically set categories and plans
  useEffect(() => {
    const loadListings = async () => {
      if (!userId || !token) {
        setError("User ID or token is missing. Please log in.");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchSalesListing(userId, token);

        // Adjust based on API response structure
        const fetchedListings = data?.businesses || data || [];
        setListings(fetchedListings);

        // Dynamically extract categories and plans from data
        const uniqueCategories = [
          ...new Set(fetchedListings.map((item) => item.category)),
          ...defaultCategories,
        ];
        const uniquePlans = [
          ...new Set(fetchedListings.map((item) => item.plan)),
          ...defaultPlans,
        ];
        setCategories([...new Set(uniqueCategories)]);
        setPlans([...new Set(uniquePlans)]);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        setError("Failed to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [userId, token]);

  // Handle navigation to store details
  const handleViewDetails = useCallback(
    (listing) => {
      const category = listing.category?.toLowerCase() || "unknown";
      const storeId = listing._id || "unknown";
      navigate(`/categories/${category}/store/${storeId}`);
    },
    [navigate]
  );

  // Filter listings based on search and filter criteria
  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      listing.status?.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory =
      filterCategory === "all" || listing.category === filterCategory;
    const matchesPlan = filterPlan === "all" || listing.plan === filterPlan;
    return matchesSearch && matchesStatus && matchesCategory && matchesPlan;
  });

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get plan color
  const getPlanColor = (plan) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800";
      case "Premium":
        return "bg-blue-100 text-blue-800";
      case "Professional":
        return "bg-green-100 text-green-800";
      case "Standard":
        return "bg-yellow-100 text-yellow-800";
      case "Basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate stats safely
  const totalListings = listings.length || 0;
  const activeListings =
    listings.filter((l) => l.status?.toLowerCase() === "active").length || 0;
  const totalRevenue =
    listings.reduce((sum, l) => sum + (l.revenue || 0), 0) || 0;
  const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0) || 0;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          All Business Listings
        </h1>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="py-4 text-center">
          <p className="text-gray-500">Loading listings...</p>
        </div>
      )}
      {error && (
        <div className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {/* Stats Overview */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Listings
            </h3>
            <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Active Listings
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {activeListings}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">
              ${totalRevenue}
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
            <p className="text-2xl font-bold text-blue-600">
              {totalViews.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search listings, owners, locations..."
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
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="expired">Expired</option>
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
              >
                <option value="all">All Plans</option>
                {plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Listing Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Business & Owner
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Category & Location
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Plan & Revenue
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredListings.length > 0 ? (
                  filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          {listing.title}
                          {listing.featured && (
                            <span className="ml-2 text-xs font-medium text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <UserIcon className="w-4 h-4 mr-1" />
                          {listing.owner}
                        </div>
                        <div className="text-xs text-gray-400">
                          {listing.ownerEmail}
                        </div>
                        <div className="text-xs text-gray-400">
                          {listing.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {listing.category}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {listing.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {listing.views?.toLocaleString() || 0} views
                        </div>
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                          <span className="text-sm text-gray-900">
                            {listing.rating || "N/A"}
                          </span>
                          <span className="ml-1 text-sm text-gray-500">
                            ({listing.reviews || 0})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanColor(
                            listing.plan
                          )}`}
                        >
                          {listing.plan}
                        </span>
                        <div className="flex items-center mt-1 text-sm text-gray-900">
                          <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />
                          ${listing.revenue || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            listing.status
                          )}`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(listing)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No listings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
