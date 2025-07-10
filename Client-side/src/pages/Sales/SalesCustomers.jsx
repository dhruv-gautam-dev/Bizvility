import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const statuses = ["Active", "Inactive", "Churned"];
const types = ["SMB", "Mid-Market", "Enterprise"];
const industries = [
  "Technology",
  "Marketing",
  "Retail",
  "Fashion",
  "Consulting",
  "Healthcare",
  "Finance",
];

function CustomerModal({
  isOpen,
  onClose,
  customer,
  onSubmit,
  isEdit,
  isView,
}) {
  const [formData, setFormData] = useState(
    customer || {
      fullName: "",
      company: "",
      email: "",
      phone: "",
      status: "Active",
      type: "SMB",
      totalValue: 0,
      lastPurchase: "",
      joinDate: new Date().toISOString().split("T")[0],
      deals: 0,
      industry: "",
      location: "",
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (formData.totalValue < 0)
      newErrors.totalValue = "Total value cannot be negative";
    if (formData.deals < 0) newErrors.deals = "Deals cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!isView && validate()) {
      onSubmit({
        ...formData,
        totalValue: Number(formData.totalValue) || 0,
        deals: Number(formData.deals) || 0,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          {isView
            ? "Customer Details"
            : isEdit
            ? "Edit Customer"
            : "Add New Customer"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.fullName || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.fullName || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  placeholder="Enter customer name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.company || "Not set"}
              </p>
            ) : (
              <input
                type="text"
                value={formData.company || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.email || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Phone
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.phone || "Not set"}
              </p>
            ) : (
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Status
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.status || "Not set"}
                </p>
              ) : (
                <select
                  value={formData.status || "Active"}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Type
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.type || "Not set"}
                </p>
              ) : (
                <select
                  value={formData.type || "SMB"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Total Value
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  ${Number(formData.totalValue || 0).toLocaleString()}
                </p>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.totalValue || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalValue: Number(e.target.value),
                      })
                    }
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.totalValue ? "border-red-500" : ""
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.totalValue && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.totalValue}
                    </p>
                  )}
                </>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Deals
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.deals || 0}</p>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.deals || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deals: Number(e.target.value),
                      })
                    }
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.deals ? "border-red-500" : ""
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.deals && (
                    <p className="mt-1 text-xs text-red-500">{errors.deals}</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Last Purchase
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.lastPurchase || "Not set"}
                </p>
              ) : (
                <input
                  type="date"
                  value={formData.lastPurchase || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, lastPurchase: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Join Date
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.joinDate || "Not set"}
                </p>
              ) : (
                <input
                  type="date"
                  value={formData.joinDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, joinDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Industry
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.industry || "Not set"}
                </p>
              ) : (
                <select
                  value={formData.industry || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Location
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.location || "Not set"}
                </p>
              ) : (
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
          >
            {isView ? "Close" : "Cancel"}
          </button>
          {!isView && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {isEdit ? "Update Customer" : "Add Customer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SalesCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      console.log("Fetching customers with token:", token);
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
        setCustomers(mappedCustomers);
        console.log("Customers set to:", mappedCustomers);
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

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (showAddModal || showEditModal || showViewModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showAddModal, showEditModal, showViewModal]);

  const filteredCustomers =
    customers?.filter((customer) => {
      if (!customer) return false; // Skip undefined customers
      const matchesSearch =
        customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        customer.status.toLowerCase() === filterStatus;
      const matchesType = filterType === "all" || customer.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    }) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Churned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Enterprise":
        return "bg-purple-100 text-purple-800";
      case "Mid-Market":
        return "bg-blue-100 text-blue-800";
      case "SMB":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const totalRevenue = customers.reduce(
    (sum, c) => sum + (c.totalValue || 0),
    0
  );
  const avgCustomerValue = customers.length
    ? Math.round(totalRevenue / customers.length)
    : 0;

  return (
    <div className="min-h-screen p-4 overflow-x-hidden sm:p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Your Customer
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage your customer relationships
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Customers",
            value: totalCustomers,
            color: "text-gray-900",
          },
          {
            title: "Active Customers",
            value: activeCustomers,
            color: "text-green-600",
          },
          {
            title: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            color: "text-blue-600",
          },
          {
            title: "Avg Customer Value",
            value: `$${avgCustomerValue.toLocaleString()}`,
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

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Customer
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Contact
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Type
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Total Value
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="w-8 h-8 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {customer.fullName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center mb-1 text-sm text-gray-900">
                      <EnvelopeIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      {customer.phone && (
                        <>
                          <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="truncate">{customer.phone}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(
                        customer.type
                      )}`}
                    >
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        customer.status
                      )}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      ${Number(customer.totalValue || 0).toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {customer.deals || 0} deals
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="text-xs text-gray-500">
                      {customer.joinDate || "--"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="p-4 space-y-4 md:hidden">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="p-4 rounded-lg shadow bg-gray-50">
              <div className="mb-2 text-sm font-medium text-gray-900 truncate">
                {customer.name}
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                <BuildingOfficeIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.company}</span>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-900">
                <EnvelopeIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.phone}</span>
              </div>
              <div className="mb-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(
                    customer.type
                  )}`}
                >
                  {customer.type}
                </span>
              </div>
              <div className="mb-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </div>
              <div className="flex items-center mb-2 text-sm font-medium text-gray-900">
                <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />$
                {Number(customer.totalValue || 0).toLocaleString()}
              </div>
              <div className="mb-2 text-xs text-gray-500">
                {customer.deals || 0} deals
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-900">
                <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">
                  {customer.lastPurchase || "--"}
                </span>
              </div>
              <div className="mb-2 text-xs text-gray-500">
                Joined: {customer.joinDate || "--"}
              </div>
              <div className="mb-2 text-xs text-gray-400">
                {customer.industry} • {customer.location}
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="py-8 text-center">
            <UserIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No customers found</p>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        )}
      </div>

      {/* View Customer Modal */}
      <CustomerModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSubmit={() => {}}
        isView
      />
    </div>
  );
}
