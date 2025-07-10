import { useEffect, useState } from "react";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  StarIcon,
  EyeIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrophyIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { fetchSalesListing } from "../../data/SalesData/ListingDAta";

// Platform stats data
const platformStats = {
  totalUsers: 12847,
  activeUsers: 8934,
  totalListings: 5672,
  activeListings: 4891,
  totalRevenue: 285000,
  monthlyRevenue: 45600,
  totalReviews: 18934,
  averageRating: 4.3,
  totalViews: 1250000,
  conversionRate: 12.5,
  flaggedContent: 23,
  pendingApprovals: 156,
};

// JSX Component
export default function SalesDashboard() {
  const [topListingsExpanded, setTopListingsExpanded] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentListings, setRecentListings] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch users from API
  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "No authentication token found. Please ensure you are logged in."
        );
        return;
      }
      try {
        const response = await fetch(
          "http://localhost:5000/api/user/getReferralUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch customers: ${response.status} - ${errorText}`
          );
        }
        const data = await response.json();
        // Ensure data.users is an array, provide fallback if undefined
        const customerData = Array.isArray(data.users) ? data.users : [];
        if (customerData.length === 0) {
          console.warn("No customers found in API response");
        }
        // Map API data to expected structure with fallbacks
        const mappedCustomers = customerData.map((user, index) => ({
          id: user.id || user._id || `temp-${index}`, // Fallback ID
          fullName: user.fullName || "Unknown",
          company: user.company || "",
          email: user.email || "",
          phone: user.phone || "",
          status: user.status || "Active",
          type: user.type || "SMB",
          totalValue: user.totalValue || 0,
          lastPurchase: user.lastPurchase || "",
          joinDate: user.joinDate || new Date().toISOString().split("T")[0],
          deals: user.deals || 0,
          industry: user.industry || "",
          location: user.location || "",
        }));
        setRecentUsers(mappedCustomers);
      } catch (err) {
        console.error("Fetch customers error:", err);
        setError(
          `Error fetching customers: ${err.message}. Please check your token or server connection.`
        );
        toast.error(`Error fetching customers: ${err.message}`);
      }
    };
    fetchCustomers();
  }, []);

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
        setRecentListings(fetchedListings);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        setError("Failed to load listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [userId, token]);

  // Return status color class
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Emoji icons for activity types
  const getActivityIcon = (type) => {
    switch (type) {
      case "listing":
        return "🏢";
      case "user":
        return "👤";
      case "review":
        return "⭐";
      case "payment":
        return "💰";
      default:
        return "📝";
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col mb-6 space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Sales Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your business listing platform performance
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => (window.location.href = "/Reacts/sales-listings")}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <BuildingStorefrontIcon className="w-5 h-5" />
            View All Listings
          </button>
          <button
            onClick={() =>
              (window.location.href = "/Reacts/sales-users-management")
            }
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            <UserGroupIcon className="w-5 h-5" />
            View All Users
          </button>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:mb-8">
        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center">
            <UserGroupIcon className="w-6 h-6 text-blue-600 lg:h-8 lg:w-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-xl font-semibold text-gray-900 lg:text-2xl">
                {platformStats.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+8.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="w-6 h-6 text-green-600 lg:h-8 lg:w-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Listings
              </p>
              <p className="text-xl font-semibold text-gray-900 lg:text-2xl">
                {platformStats.totalListings.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+12.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="w-6 h-6 text-purple-600 lg:h-8 lg:w-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-xl font-semibold text-gray-900 lg:text-2xl">
                ₹{platformStats.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+15.7%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center">
            <StarIcon className="w-6 h-6 text-yellow-600 lg:h-8 lg:w-8" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Rating</p>
              <p className="text-xl font-semibold text-gray-900 lg:text-2xl">
                {platformStats.averageRating}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">+0.3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:mb-8">
        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-lg font-semibold text-green-600 lg:text-xl">
                {platformStats.activeUsers.toLocaleString()}
              </p>
            </div>
            <UserGroupIcon className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Listings
              </p>
              <p className="text-lg font-semibold text-blue-600 lg:text-xl">
                {platformStats.activeListings.toLocaleString()}
              </p>
            </div>
            <BuildingStorefrontIcon className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-lg font-semibold text-purple-600 lg:text-xl">
                {platformStats.totalViews.toLocaleString()}
              </p>
            </div>
            <EyeIcon className="w-6 h-6 text-purple-600" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Flagged Content
              </p>
              <p className="text-lg font-semibold text-red-600 lg:text-xl">
                {platformStats.flaggedContent}
              </p>
            </div>
            <FlagIcon className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-lg shadow">
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
            onClick={() => setTopListingsExpanded(!topListingsExpanded)}
          >
            <h2 className="text-lg font-semibold">Recent Listings</h2>
            <button
              onClick={() => (window.location.href = "/Reacts/sales-listings")}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              View Details
            </button>
          </div>
          {topListingsExpanded && (
            <div className="p-4">
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900 truncate">
                          {listing.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            listing.status
                          )}`}
                        >
                          {listing.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 overflow-x-auto text-sm text-gray-500">
                        <span className="whitespace-nowrap">
                          by {listing.owner}
                        </span>
                        <span className="whitespace-nowrap">
                          {listing.category}
                        </span>
                        <span className="whitespace-nowrap">
                          {listing.views} views
                        </span>
                        <span className="whitespace-nowrap">
                          ⭐ {listing.rating}
                        </span>
                        <span className="whitespace-nowrap">
                          ${listing.revenue}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-xs text-gray-500">
                        {listing.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <button
              onClick={() => (window.location.href = "/Reacts/sales-customers")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All Users
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="w-8 h-8 text-gray-400" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {user?.listings} listings
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {user.joinedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
