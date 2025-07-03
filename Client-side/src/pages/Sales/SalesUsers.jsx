import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  EyeIcon,
  CurrencyDollarIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChartBarIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const salesUsers = [
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john@coffeehouse.com",
//     phone: "+1 (555) 123-4567",
//     location: "New York, NY",
//     avatar:
//       "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
//     role: "Senior Sales Rep",
//     joinDate: "2024-01-15",
//     status: "Active",
//     totalListings: 12,
//     activeListings: 10,
//     totalViews: 15420,
//     totalRevenue: 8500,
//     conversionRate: 18.5,
//     avgRating: 4.8,
//     totalReviews: 89,
//     lastActivity: "2 hours ago",
//     topCategories: ["Restaurants", "Cafes", "Food Services"],
//     monthlyTarget: 10000,
//     achievements: ["Top Performer", "Customer Favorite"],
//     recentListings: [
//       { name: "The Coffee House", views: 1247, rating: 4.5 },
//       { name: "Pizza Corner", views: 892, rating: 4.7 },
//       { name: "Burger Palace", views: 567, rating: 4.3 },
//     ],
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     email: "sarah@techsolutions.com",
//     phone: "+1 (555) 234-5678",
//     location: "San Francisco, CA",
//     avatar:
//       "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
//     role: "Sales Manager",
//     joinDate: "2024-01-10",
//     status: "Active",
//     totalListings: 18,
//     activeListings: 16,
//     totalViews: 22340,
//     totalRevenue: 12800,
//     conversionRate: 22.3,
//     avgRating: 4.9,
//     totalReviews: 134,
//     lastActivity: "1 hour ago",
//     topCategories: ["Technology", "Services", "Consulting"],
//     monthlyTarget: 15000,
//     achievements: ["Sales Leader", "Innovation Award"],
//     recentListings: [
//       { name: "Tech Solutions Inc", views: 2340, rating: 4.8 },
//       { name: "Digital Agency Pro", views: 1890, rating: 4.9 },
//       { name: "Software Hub", views: 1456, rating: 4.7 },
//     ],
//   },
//   {
//     id: 3,
//     name: "Mike Brown",
//     email: "mike@retailsolutions.com",
//     phone: "+1 (555) 345-6789",
//     location: "Los Angeles, CA",
//     avatar:
//       "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
//     role: "Sales Associate",
//     joinDate: "2024-01-08",
//     status: "Active",
//     totalListings: 8,
//     activeListings: 7,
//     totalViews: 9870,
//     totalRevenue: 5200,
//     conversionRate: 15.2,
//     avgRating: 4.6,
//     totalReviews: 56,
//     lastActivity: "4 hours ago",
//     topCategories: ["Retail", "Fashion", "Shopping"],
//     monthlyTarget: 7500,
//     achievements: ["Rising Star"],
//     recentListings: [
//       { name: "Fashion Boutique", views: 1234, rating: 4.6 },
//       { name: "Style Store", views: 987, rating: 4.5 },
//       { name: "Trendy Shop", views: 756, rating: 4.4 },
//     ],
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     email: "emily@healthfitness.com",
//     phone: "+1 (555) 456-7890",
//     location: "Chicago, IL",
//     avatar:
//       "https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg",
//     role: "Sales Specialist",
//     joinDate: "2024-01-05",
//     status: "Active",
//     totalListings: 15,
//     activeListings: 14,
//     totalViews: 18650,
//     totalRevenue: 9800,
//     conversionRate: 19.7,
//     avgRating: 4.7,
//     totalReviews: 102,
//     lastActivity: "30 minutes ago",
//     topCategories: ["Health & Fitness", "Wellness", "Sports"],
//     monthlyTarget: 12000,
//     achievements: ["Health Expert", "Customer Champion"],
//     recentListings: [
//       { name: "Fitness Center Pro", views: 1890, rating: 4.7 },
//       { name: "Yoga Studio Plus", views: 1456, rating: 4.8 },
//       { name: "Gym Elite", views: 1234, rating: 4.6 },
//     ],
//   },
//   {
//     id: 5,
//     name: "David Wilson",
//     email: "david@autoservices.com",
//     phone: "+1 (555) 567-8901",
//     location: "Miami, FL",
//     avatar:
//       "https://images.pexels.com/photos/3184658/pexels-photo-3184658.jpeg",
//     role: "Junior Sales Rep",
//     joinDate: "2024-01-01",
//     status: "Active",
//     totalListings: 6,
//     activeListings: 5,
//     totalViews: 7230,
//     totalRevenue: 3800,
//     conversionRate: 12.8,
//     avgRating: 4.4,
//     totalReviews: 34,
//     lastActivity: "1 day ago",
//     topCategories: ["Automotive", "Services", "Repair"],
//     monthlyTarget: 5000,
//     achievements: ["New Talent"],
//     recentListings: [
//       { name: "Auto Repair Shop", views: 890, rating: 4.4 },
//       { name: "Car Wash Pro", views: 678, rating: 4.3 },
//       { name: "Tire Center", views: 567, rating: 4.2 },
//     ],
//   },
//   {
//     id: 6,
//     name: "Lisa Anderson",
//     email: "lisa@realestate.com",
//     phone: "+1 (555) 678-9012",
//     location: "Boston, MA",
//     avatar:
//       "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
//     role: "Sales Director",
//     joinDate: "2023-12-15",
//     status: "Active",
//     totalListings: 25,
//     activeListings: 23,
//     totalViews: 35670,
//     totalRevenue: 18500,
//     conversionRate: 25.4,
//     avgRating: 4.9,
//     totalReviews: 187,
//     lastActivity: "15 minutes ago",
//     topCategories: ["Real Estate", "Property", "Investment"],
//     monthlyTarget: 20000,
//     achievements: ["Top Director", "Excellence Award", "Leadership Star"],
//     recentListings: [
//       { name: "Premium Properties", views: 3456, rating: 4.9 },
//       { name: "Luxury Homes", views: 2890, rating: 4.8 },
//       { name: "Investment Group", views: 2340, rating: 4.7 },
//     ],
//   },
// ];

export default function SalesUsers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [salesUsers, setSalesUser] = useState([]);
  const imageUrl = import.meta.env.VITE_Image_URL;

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetching Users with token:", token);

      if (!token) {
        setError(
          "No authentication token found. Please ensure you are logged in."
        );
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/user/getAllSalesUsers",
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

        // Ensure it's an array
        const customerData = Array.isArray(data.users) ? data.users : [];
        if (customerData.length === 0) {
          console.warn("No users found in API response");
        }

        const mappedCustomers = customerData.map((user, index) => {
          const { profile = {} } = user; // default empty object
          return {
            id: user.id || user._id || `temp-${index}`,
            fullName: user.fullName || "Unknown",
            photo: profile.photo || "",
            company: user.company || "",
            email: user.email || "",
            phone: profile.phone || "",
            status: user.status || "Active",
            type: user.type || "SMB",
            totalValue: user.totalValue || 0,
            lastPurchase: user.lastPurchase || "",
            joinDate: user.joinDate || new Date().toISOString().split("T")[0],
            deals: user.deals || 0,
            role: user.role || "",
            location: user.location || "",
          };
        });

        setSalesUser(mappedCustomers);
        console.log("users set to:", mappedCustomers);
        setError(null); // clear any previous error
      } catch (err) {
        console.error("Fetch users error:", err);
        const msg = `Error fetching users: ${err.message}. Please check your token or server connection.`;
        setError(msg);
        toast.error(msg);
      }
    };

    fetchUsers();
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedUser) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [selectedUser]);

  const roles = [
    "Senior Sales Rep",
    "Sales Manager",
    "Sales Associate",
    "Sales Specialist",
    "Junior Sales Rep",
    "Sales Director",
  ];

  const filteredUsers = salesUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case " Ա0;On Leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Sales Director":
        return "bg-purple-100 text-purple-800";
      case "Sales Manager":
        return "bg-blue-100 text-blue-800";
      case "Senior Sales Rep":
        return "bg-green-100 text-green-800";
      case "Sales Specialist":
        return "bg-orange-100 text-orange-800";
      case "Sales Associate":
        return "bg-yellow-100 text-yellow-800";
      case "Junior Sales Rep":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAnalyticsClick = () => {
    try {
      navigate("/sales-user-analytics");
    } catch (error) {
      toast.error("Failed to navigate to analytics page");
      console.error("Navigation error:", error);
    }
  };

  const totalUsers = salesUsers.length;
  const activeUsers = salesUsers.filter((u) => u.status === "Active").length;
  const totalListings = salesUsers.reduce((sum, u) => sum + u.totalListings, 0);
  const totalRevenue = salesUsers.reduce((sum, u) => sum + u.totalRevenue, 0);

  return (
    <div className="min-h-screen p-4 overflow-x-hidden sm:p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Sales Users
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage and monitor all sales team members
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        {[
          {
            title: "Total Sales Users",
            value: totalUsers,
            color: "text-gray-900",
          },
          {
            title: "Active Users",
            value: activeUsers,
            color: "text-green-600",
          },
          {
            title: "Total Listings",
            value: totalListings || "0",
            color: "text-blue-600",
          },
          {
            title: "Total Revenue",
            value: totalRevenue || "0",
            color: "text-purple-600",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="p-4 bg-white rounded-lg shadow sm:p-6"
          >
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search sales users..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search sales users"
            />
          </div>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sales Users Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {filteredUsers.length === 0 ? (
          <div className="py-8 text-center col-span-full">
            <UserCircleIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No sales users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden transition-shadow bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              {/* User Header */}
              <div
                className="relative p-4 text-white card-header sm:p-6"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #3b82f6, #9333ea)",
                }}
              >
                <div className="flex items-center space-x-4">
                  {/* {imageUrl + user.photo} */}
                  <img
                    src={
                      (imageUrl && user.photo ? imageUrl + user.photo : "") ||
                      "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740"
                    }
                    alt={user.fullName}
                    className="object-cover w-16 h-16 border-4 border-white rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{user.fullName}</h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-white/20 text-white`}
                    >
                      {console.log(user)}
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                  <span className="text-sm opacity-90">
                    {user.lastActivity}
                  </span>
                </div>
              </div>

              {/* User Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <BuildingStorefrontIcon className="w-5 h-5 mr-1 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {user.totalListings}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Total Listings</p>
                    <p className="text-xs text-green-600">
                      {user.activeListings} active
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <EyeIcon className="w-5 h-5 mr-1 text-green-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {user?.totalViews?.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-xs text-blue-600">
                      {user.totalListings > 0
                        ? Math.round(
                            user?.totalViews / user?.totalListings || "1200"
                          )
                        : 0}{" "}
                      avg/listing
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <CurrencyDollarIcon className="w-5 h-5 mr-1 text-purple-500" />
                      <span className="text-lg font-bold text-gray-900">
                        ${user?.totalRevenue?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <div className="w-full h-2 mt-1 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-purple-600 rounded-full"
                        style={{
                          width: `${
                            user.monthlyTarget > 0
                              ? Math.min(
                                  (user.totalRevenue / user.monthlyTarget ||
                                    "0") * 100,
                                  100
                                )
                              : 0
                          }%`,
                        }}
                        title={`${(
                          (user.totalRevenue / user.monthlyTarget) *
                          100
                        ).toFixed(1)}% of target`}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {user.monthlyTarget > 0
                        ? (
                            (user.totalRevenue / user.monthlyTarget) *
                            100
                          ).toFixed(1)
                        : 0}
                      % of target
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <StarIcon className="w-5 h-5 mr-1 text-yellow-500" />
                      <span className="text-lg font-bold text-gray-900">
                        {user.avgRating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Avg Rating</p>
                    <p className="text-xs text-gray-600">
                      {user.totalReviews} reviews
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="pt-4 mb-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <EnvelopeIcon className="w-4 h-4 mr-2" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        <span className="truncate">{user.phone}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        <span className="truncate">{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Categories */}
                {user?.categories && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Top Categories:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {user?.topCategories
                        ?.slice(0, 3)
                        .map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded"
                          >
                            {category}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {user?.achievements?.length > 0 && (
                  <div className="mb-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Achievements:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {user.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="flex items-center px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded"
                        >
                          <TrophyIcon className="w-3 h-3 mr-1" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setSelectedUser(selectedUser === user.id ? null : user.id)
                    }
                    className="flex items-center justify-center flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                    aria-label={`View details for ${user.name}`}
                  >
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                  <button
                    onClick={handleAnalyticsClick}
                    className="flex items-center justify-center flex-1 px-3 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    aria-label={`View analytics for ${user.name}`}
                  >
                    <ChartBarIcon className="w-4 h-4 mr-1" />
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            {(() => {
              const user = salesUsers.find((u) => u.id === selectedUser);
              if (!user) {
                setSelectedUser(null);
                toast.error("User not found");
                return null;
              }
              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-gray-900 sm:text-xl">
                      {user.name} - Detailed View
                    </h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Close modal"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:gap-6">
                    <div>
                      <h4 className="mb-3 font-medium text-gray-900">
                        Performance Metrics
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Conversion Rate:
                          </span>
                          <span className="font-medium text-green-600">
                            {user.conversionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Target:</span>
                          <span className="font-medium">
                            ${user.monthlyTarget.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Achievement Rate:
                          </span>
                          <span className="font-medium">
                            {user.monthlyTarget > 0
                              ? (
                                  (user.totalRevenue / user.monthlyTarget) *
                                  100
                                ).toFixed(1)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Join Date:</span>
                          <span className="font-medium">{user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-3 font-medium text-gray-900">
                        All Recent Listings
                      </h4>
                      <div className="space-y-2 overflow-y-auto max-h-40">
                        {user.recentListings.map((listing, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded bg-gray-50"
                          >
                            <span className="text-sm font-medium text-gray-900 truncate">
                              {listing.name}
                            </span>
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-500">
                                {listing.views} views
                              </span>
                              <div className="flex items-center">
                                <StarIcon className="w-4 h-4 text-yellow-400" />
                                <span className="ml-1 text-sm text-gray-600">
                                  {listing.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6 space-x-3">
                    <button
                      onClick={handleAnalyticsClick}
                      className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700"
                      aria-label={`View analytics for ${user.name}`}
                    >
                      View Analytics
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                      aria-label={`View all listings for ${user.name}`}
                    >
                      View All Listings
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
