import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@coffeehouse.com",
    role: "Business Owner",
    status: "Active",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20 10:30 AM",
    listingsCount: 1,
    totalRevenue: 299,
    totalViews: 1247,
    plan: "Premium",
    avatar:
      "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@techsolutions.com",
    role: "Business Owner",
    status: "Active",
    joinDate: "2024-01-14",
    lastLogin: "2024-01-19 3:45 PM",
    listingsCount: 2,
    totalRevenue: 599,
    totalViews: 892,
    plan: "Enterprise",
    avatar:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    name: "Mike Brown",
    email: "mike@fashionboutique.com",
    role: "Business Owner",
    status: "Suspended",
    joinDate: "2024-01-13",
    lastLogin: "2024-01-18 8:20 AM",
    listingsCount: 1,
    totalRevenue: 149,
    totalViews: 567,
    plan: "Basic",
    avatar:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    phone: "+1 (555) 345-6789",
    location: "Los Angeles, CA",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@fitnesscenterpro.com",
    role: "Premium User",
    status: "Active",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-20 2:15 PM",
    listingsCount: 1,
    totalRevenue: 399,
    totalViews: 1456,
    plan: "Professional",
    avatar:
      "https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg",
    phone: "+1 (555) 456-7890",
    location: "Chicago, IL",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@digitalmarketing.com",
    role: "Regular User",
    status: "Inactive",
    joinDate: "2024-01-11",
    lastLogin: "2024-01-15 11:00 AM",
    listingsCount: 1,
    totalRevenue: 199,
    totalViews: 234,
    plan: "Standard",
    avatar:
      "https://images.pexels.com/photos/3184658/pexels-photo-3184658.jpeg",
    phone: "+1 (555) 567-8901",
    location: "Miami, FL",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    role: "Free User",
    status: "Active",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-20 9:00 AM",
    listingsCount: 0,
    totalRevenue: 0,
    totalViews: 0,
    plan: "Free",
    avatar: null,
    phone: "+1 (555) 678-9012",
    location: "Boston, MA",
  },
];

export default function SalesAllUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDetails, setShowDetails] = useState(null);

  const roles = ["Business Owner", "Premium User", "Regular User", "Free User"];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Business Owner":
        return "bg-purple-100 text-purple-800";
      case "Premium User":
        return "bg-blue-100 text-blue-800";
      case "Regular User":
        return "bg-yellow-100 text-yellow-800";
      case "Free User":
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
        return "bg-orange-100 text-orange-800";
      case "Free":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const businessOwners = users.filter(
    (u) => u.role === "Business Owner"
  ).length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalRevenue, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          All Platform Users
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => alert("Export users data")}
            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            Export Data
          </button>
          <button
            onClick={() => alert("Add new user manually")}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold text-green-600">{activeUsers}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Business Owners</h3>
          <p className="text-2xl font-bold text-purple-600">{businessOwners}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">${totalRevenue}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Role & Plan
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Listings & Revenue
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover w-10 h-10 rounded-full"
                          />
                        ) : (
                          <UserCircleIcon className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                    <div className="mt-1">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanColor(
                          user.plan
                        )}`}
                      >
                        {user.plan}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <BuildingStorefrontIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {user.listingsCount} listings
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      ${user.totalRevenue}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.totalViews.toLocaleString()} views
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      {user.lastLogin}
                    </div>
                    <div className="text-xs text-gray-500">
                      Joined: {user.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setShowDetails(
                            showDetails === user.id ? null : user.id
                          )
                        }
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => alert(`Edit user: ${user.name}`)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          confirm(`Delete user: ${user.name}?`) &&
                          alert("User deleted")
                        }
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 overflow-y-auto bg-white rounded-lg max-h-96">
            {(() => {
              const user = users.find((u) => u.id === showDetails);
              return user ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user.name}
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
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="text-sm text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <p className="text-sm text-gray-900">{user.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <p className="text-sm text-gray-900">{user.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Role
                        </label>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Plan
                        </label>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(
                            user.plan
                          )}`}
                        >
                          {user.plan}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Listings
                        </label>
                        <p className="text-sm text-gray-900">
                          {user.listingsCount}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Total Revenue
                        </label>
                        <p className="text-sm text-gray-900">
                          ${user.totalRevenue}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Total Views
                        </label>
                        <p className="text-sm text-gray-900">
                          {user.totalViews.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Join Date
                        </label>
                        <p className="text-sm text-gray-900">{user.joinDate}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => alert(`Contact user: ${user.email}`)}
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Contact User
                      </button>
                      <button
                        onClick={() => alert(`View ${user.name}'s listings`)}
                        className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        View Listings
                      </button>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
