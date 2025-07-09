import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  EyeIcon as EyeIconSolid,
  EyeSlashIcon,
  XMarkIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showPopup, setShowPopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "customer",
    password: "",
    confirmPassword: "",
    userImage: null,
    isVerified: false,
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Make sure this ends with a slash!
  const imageURl = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000/";
  const API_BASE_URL = "http://localhost:5000/api";
  const roles = ["customer", "admin", "superadmin"];

  // Helper to normalize image URLs
  const normalizeImageUrl = (userImage) => {
    if (!userImage) return null;
    if (userImage.startsWith("http") || userImage.startsWith("data:"))
      return userImage;
    return `${imageURl}${userImage.replace(/\\/g, "/")}`;
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return null;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      return accessToken;
    } catch (err) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view users.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_BASE_URL}/superadmin/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.data.success)
          throw new Error(response.data.message || "Failed to fetch users");
        const data = response.data.data.map((user) => ({
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          status: user.isVerified ? "Active" : "Inactive",
          createdAt: new Date(user.createdAt).toISOString().split("T")[0],
          updatedAt: new Date(user.updatedAt).toISOString().split("T")[0],
          businessCount: user.totalBusinesses || 0,
          userImage: normalizeImageUrl(user.userImage),
          city: user.city || "",
          state: user.state || "",
          country: user.country || "",
          zipCode: user.zipCode || "",
        }));
        setUsers(data);
      } catch (err) {
        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              const retryResponse = await axios.get(
                `${API_BASE_URL}/superadmin/users`,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              if (!retryResponse.data.success)
                throw new Error(
                  retryResponse.data.message || "Failed to fetch users"
                );
              const data = retryResponse.data.data.map((user) => ({
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                status: user.isVerified ? "Active" : "Inactive",
                createdAt: new Date(user.createdAt).toISOString().split("T")[0],
                updatedAt: new Date(user.updatedAt).toISOString().split("T")[0],
                businessCount: user.totalBusinesses || 0,
                userImage: normalizeImageUrl(user.userImage),
                city: user.city || "",
                state: user.state || "",
                country: user.country || "",
                zipCode: user.zipCode || "",
              }));
              setUsers(data);
            } catch (retryErr) {
              setError("Failed to load user data.");
              toast.error(`Error: ${retryErr.message}`);
            }
          }
        } else if (err.response?.status === 403) {
          toast.error("Access denied. Superadmin role required.");
        } else {
          setError("Failed to load user data.");
          toast.error(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      case "superadmin":
        return "bg-purple-100 text-purple-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      case "customer":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const businessOwners = users.filter((u) => u.role === "customer").length;
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length;

  const handleAddUserClick = () => {
    setEditingUser(null);
    setFormData({
      fullName: "",
      email: "",
      role: "customer",
      password: "",
      confirmPassword: "",
      userImage: null,
      isVerified: false,
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });
    setShowPopup(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
      userImage: user.userImage,
      isVerified: user.status === "Active",
      city: user.city,
      state: user.state,
      country: user.country,
      zipCode: user.zipCode,
    });
    setShowPopup(true);
  };

  const handleDeleteUser = (userId) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p>Are you sure you want to delete this user?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                setUsers(users.filter((user) => user.id !== userId));
                // Here you would also make an API call to delete the user
                // const token = localStorage.getItem("token");
                // console.log("Deleting User with token:", token, "ID:", id);
                // if (!token) {
                //   setError(
                //     "No authentication token found. Please ensure you are logged in."
                //   );
                //   setLoading(false);
                //   toast.error("No authentication token found. Please log in.");
                //   toast.dismiss();
                //   return;
                // }
                // try {
                //   const response = await fetch(
                //     `http://localhost:5000/api/leads/${id}`,
                //     {
                //       method: "DELETE",
                //       headers: getAuthHeaders(),
                //     }
                //   );
                //   if (!response.ok) {
                //     const errorText = await response.text();
                //     throw new Error(
                //       `Failed to delete lead: ${response.status} - ${errorText}`
                //     );
                //   }
                //   console.log("Deleted lead:", id);
                //   setLeads(leads.filter((lead) => lead.id !== id));
                //   toast.success(`Lead "${name}" deleted successfully!`);
                //   toast.dismiss();
                // } catch (err) {
                //   console.error("Delete lead error:", err);
                //   setError(`Error deleting lead: ${err.message}`);
                //   toast.error(`Error deleting lead: ${err.message}`);
                //   toast.dismiss();
                // } finally {
                //   setLoading(false);
                // }
                toast.success("User deleted successfully!");
                closeToast();
              }}
              className="px-4 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="px-4 py-1 text-white bg-gray-600 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
        theme: "light",
      }
    );
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, userImage: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      (!editingUser &&
        (!formData.password ||
          !formData.city ||
          !formData.state ||
          !formData.country ||
          !formData.zipCode))
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required to save user.");
      return;
    }

    const userData = editingUser
      ? {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
          userImage: formData.userImage,
          isVerified: formData.isVerified,
        }
      : {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          isVerified: formData.isVerified,
          userImage: formData.userImage,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipCode: formData.zipCode,
        };

    try {
      const response = await axios({
        method: editingUser ? "PUT" : "POST",
        url: editingUser
          ? `${API_BASE_URL}/superadmin/updateUser/${editingUser.id}`
          : `${API_BASE_URL}/superadmin/AddnewUser`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify(userData),
      });

      if (!response.data.data) {
        throw new Error(response.data.message || "Failed to save user");
      }

      const savedUser = response.data.data;
      const updatedUser = {
        id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        role: savedUser.role,
        status: savedUser.isVerified ? "Active" : "Inactive",
        createdAt: new Date(savedUser.createdAt).toISOString().split("T")[0],
        updatedAt: new Date(savedUser.updatedAt).toISOString().split("T")[0],
        businessCount: savedUser.totalBusinesses || 0,
        userImage: normalizeImageUrl(savedUser.userImage),
        city: savedUser.city || "",
        state: savedUser.state || "",
        country: savedUser.country || "",
        zipCode: savedUser.zipCode || "",
      };

      if (editingUser) {
        setUsers([
          ...users.map((u) => (u.id === editingUser.id ? updatedUser : u)),
        ]);
        toast.success("User updated successfully!");
      } else {
        setUsers([...users, updatedUser]);
        toast.success("User added successfully!");
      }
      setShowPopup(false);
    } catch (err) {
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          try {
            const retryResponse = await axios({
              method: editingUser ? "PUT" : "POST",
              url: editingUser
                ? `${API_BASE_URL}/superadmin/updateUser/${editingUser.id}`
                : `${API_BASE_URL}/superadmin/AddnewUser`,
              headers: {
                Authorization: `Bearer ${newToken}`,
                "Content-Type": "application/json",
              },
              data: JSON.stringify(userData),
            });

            if (!retryResponse.data.data) {
              throw new Error(
                retryResponse.data.message || "Failed to save user"
              );
            }

            const savedUser = retryResponse.data.data;
            const updatedUser = {
              id: savedUser._id,
              fullName: savedUser.fullName,
              email: savedUser.email,
              role: savedUser.role,
              status: savedUser.isVerified ? "Active" : "Inactive",
              createdAt: new Date(savedUser.createdAt)
                .toISOString()
                .split("T")[0],
              updatedAt: new Date(savedUser.updatedAt)
                .toISOString()
                .split("T")[0],
              businessCount: savedUser.totalBusinesses || 0,
              userImage: normalizeImageUrl(savedUser.userImage),
              city: savedUser.city || "",
              state: savedUser.state || "",
              country: savedUser.country || "",
              zipCode: savedUser.zipCode || "",
            };

            if (editingUser) {
              setUsers([
                ...users.map((u) =>
                  u.id === editingUser.id ? updatedUser : u
                ),
              ]);
              toast.success("User updated successfully!");
            } else {
              setUsers([...users, updatedUser]);
              toast.success("User added successfully!");
            }
            setShowPopup(false);
          } catch (retryErr) {
            toast.error(`Error saving user: ${retryErr.message}`);
          }
        }
      } else if (err.response?.status === 403) {
        toast.error("Access denied. Superadmin role required.");
      } else {
        toast.error(`Error saving user: ${err.message}`);
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingUser(null);
    setFormData({
      fullName: "",
      email: "",
      role: "customer",
      password: "",
      confirmPassword: "",
      userImage: null,
      isVerified: false,
      city: "",
      state: "",
      country: "",
      zipCode: "",
    });
  };

  const handleOutsideClick = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      handleClosePopup();
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="p-0">
      <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:justify-between sm:text-left sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
        <button
          onClick={handleAddUserClick}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add New User
        </button>
      </div>

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
          <h3 className="text-sm font-medium text-gray-500">Customers</h3>
          <p className="text-2xl font-bold text-orange-600">{businessOwners}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Suspended</h3>
          <p className="text-2xl font-bold text-red-600">{suspendedUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
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
                  {role.charAt(0).toUpperCase() + role.slice(1)}
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
                  Role
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Businesses
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Created
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
                        {user.userImage ? (
                          <img
                            src={user.userImage}
                            alt={user.fullName}
                            className="object-cover w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.target.src = "";
                            }}
                          />
                        ) : (
                          <UserCircleIcon className="w-10 h-10 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          Joined: {user.createdAt}
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
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
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
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4 text-gray-400" />
                      {user.city}, {user.state}, {user.country} {user.zipCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {user.businessCount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
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

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50"
          onClick={handleOutsideClick}
        >
          <div
            ref={formRef}
            className={`bg-white rounded-lg shadow-lg p-5 w-full max-w-[460px] overflow-y-auto max-h-[80vh] transform transition-all duration-300 ${
              showPopup ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!editingUser}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingUser}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-3/4"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIconSolid className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={!editingUser}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-3/4"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIconSolid className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Verified
                </label>
                <input
                  type="checkbox"
                  name="isVerified"
                  checked={formData.isVerified}
                  onChange={handleFormChange}
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  {formData.userImage ? (
                    <img
                      src={normalizeImageUrl(formData.userImage)}
                      alt="Profile Preview"
                      className="object-cover w-16 h-16 rounded-full"
                      onError={(e) => {
                        e.target.src = "";
                      }}
                    />
                  ) : (
                    <UserCircleIcon className="w-16 h-16 text-gray-400" />
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleUserImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      {formData.userImage ? "Change Image" : "Upload Image"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={handleClosePopup}
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
