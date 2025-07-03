import { useState } from "react";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
  UserIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const listings = [
  {
    id: 1,
    title: "The Coffee House",
    owner: "John Smith",
    ownerEmail: "john@coffeehouse.com",
    category: "Restaurant",
    location: "New York, NY",
    status: "Active",
    rating: 4.5,
    reviews: 128,
    views: 1247,
    revenue: 299,
    plan: "Premium",
    date: "2024-01-15",
    featured: true,
    description: "Cozy coffee shop with artisanal coffee and pastries",
  },
  {
    id: 2,
    title: "Tech Solutions Inc",
    owner: "Sarah Johnson",
    ownerEmail: "sarah@techsolutions.com",
    category: "Services",
    location: "San Francisco, CA",
    status: "Active",
    rating: 4.8,
    reviews: 89,
    views: 892,
    revenue: 599,
    plan: "Enterprise",
    date: "2024-01-14",
    featured: false,
    description: "Professional IT services and consulting",
  },
  {
    id: 3,
    title: "Fashion Boutique",
    owner: "Mike Brown",
    ownerEmail: "mike@fashionboutique.com",
    category: "Retail",
    location: "Los Angeles, CA",
    status: "Pending",
    rating: 4.2,
    reviews: 45,
    views: 567,
    revenue: 149,
    plan: "Basic",
    date: "2024-01-13",
    featured: true,
    description: "Trendy fashion boutique with latest styles",
  },
  {
    id: 4,
    title: "Fitness Center Pro",
    owner: "Emily Davis",
    ownerEmail: "emily@fitnesscenterpro.com",
    category: "Health & Fitness",
    location: "Chicago, IL",
    status: "Active",
    rating: 4.7,
    reviews: 203,
    views: 1456,
    revenue: 399,
    plan: "Professional",
    date: "2024-01-12",
    featured: false,
    description: "Modern fitness center with state-of-the-art equipment",
  },
  {
    id: 5,
    title: "Digital Marketing Agency",
    owner: "David Wilson",
    ownerEmail: "david@digitalmarketing.com",
    category: "Services",
    location: "Miami, FL",
    status: "Suspended",
    rating: 4.4,
    reviews: 67,
    views: 234,
    revenue: 199,
    plan: "Standard",
    date: "2024-01-11",
    featured: false,
    description: "Full-service digital marketing solutions",
  },
];

const categories = ["Restaurant", "Services", "Retail", "Health & Fitness"];
const plans = ["Basic", "Standard", "Professional", "Premium", "Enterprise"];

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [showDetails, setShowDetails] = useState(null);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      listing.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesCategory =
      filterCategory === "all" || listing.category === filterCategory;
    const matchesPlan = filterPlan === "all" || listing.plan === filterPlan;
    return matchesSearch && matchesStatus && matchesCategory && matchesPlan;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  const totalListings = listings.length;
  const activeListings = listings.filter(
    (l) => l.status.toLowerCase() === "active"
  ).length;
  const totalRevenue = listings.reduce((sum, l) => sum + l.revenue, 0);
  const totalViews = listings.reduce((sum, l) => sum + l.views, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          All Business Listings
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => alert("Export listings data")}
            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Export Data
          </button>
          <button
            onClick={() => alert("Add new listing manually")}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Add Listing
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Listings</h3>
          <p className="text-2xl font-bold text-gray-900">{totalListings}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
          <p className="text-2xl font-bold text-green-600">{activeListings}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">${totalRevenue}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">
            {totalViews.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
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
                <option key={category}>{category}</option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
            >
              <option value="all">All Plans</option>
              {plans.map((plan) => (
                <option key={plan}>{plan}</option>
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
                        {listing.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                        <span className="text-sm text-gray-900">
                          {listing.rating}
                        </span>
                        <span className="ml-1 text-sm text-gray-500">
                          ({listing.reviews})
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
                        ${listing.revenue}
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
                          onClick={() => setShowDetails(listing.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            alert(`Edit listing: ${listing.title}`)
                          }
                          className="text-green-600 hover:text-green-900"
                          title="Edit"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            confirm(`Delete listing: ${listing.title}?`) &&
                            alert("Listing deleted")
                          }
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <TrashIcon className="w-4 h-4" />
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

      {/* Modal for Details */}
      {showDetails !== null &&
        (() => {
          const selected = listings.find((l) => l.id === showDetails);
          if (!selected) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-2xl p-6 overflow-y-auto bg-white rounded-lg max-h-96">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selected.title}
                  </h3>
                  <button
                    onClick={() => setShowDetails(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Owner
                      </label>
                      <p className="text-sm text-gray-900">{selected.owner}</p>
                      <p className="text-sm text-gray-500">
                        {selected.ownerEmail}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <p className="text-sm text-gray-900">
                        {selected.category}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <p className="text-sm text-gray-900">
                        {selected.location}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Plan
                      </label>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(
                          selected.plan
                        )}`}
                      >
                        {selected.plan}
                      </span>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Revenue
                      </label>
                      <p className="text-sm text-gray-900">
                        ${selected.revenue}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Views
                      </label>
                      <p className="text-sm text-gray-900">
                        {selected.views.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <p className="text-sm text-gray-900">
                      {selected.description}
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() =>
                        alert(`Contact owner: ${selected.ownerEmail}`)
                      }
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      Contact Owner
                    </button>
                    <button
                      onClick={() => alert(`Edit listing: ${selected.title}`)}
                      className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Edit Listing
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
