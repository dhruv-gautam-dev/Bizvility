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
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const businessTypes = [
  "Restaurant",
  "Retail",
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Consulting",
  "Fashion",
  "Digital Marketing",
  "Other",
];
const statuses = ["Pending", "Interested", "Rejected"];

function LeadModal({ isOpen, onClose, lead, onSubmit, isEdit, isView }) {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    businessType: "Restaurant",
    status: "Pending",
    notes: "",
    followUpDate: "",
    createdDate: "",
    updatedDate: "",
  });
  const [errors, setErrors] = useState({});

  // Sync formData with lead prop when lead changes
  useEffect(() => {
    console.log("LeadModal received lead:", lead);
    if (lead) {
      setFormData({
        name: lead.name || "",
        contact: lead.contact || "",
        businessType: lead.businessType || "Restaurant",
        status: lead.status || "Pending",
        notes: lead.notes || "",
        followUpDate: lead.followUpDate || "",
        createdDate: lead.createdDate || "",
        updatedDate: lead.updatedDate || "",
      });
    }
  }, [lead]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.contact) newErrors.contact = "Contact is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log("Submitting formData:", formData);
    if (!isView && validate()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          {isView ? "Lead Details" : isEdit ? "Edit Lead" : "Add New Lead"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.name || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Enter lead name"
                  disabled={isView}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contact *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.contact || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contact ? "border-red-500" : ""
                  }`}
                  placeholder="Phone number or email"
                  disabled={isView}
                />
                {errors.contact && (
                  <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Business Type
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.businessType || "Not set"}
              </p>
            ) : (
              <select
                value={formData.businessType}
                onChange={(e) =>
                  setFormData({ ...formData, businessType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isView}
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}
          </div>
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
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isView}
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
              Follow-up Date
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.followUpDate || "Not set"}
              </p>
            ) : (
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) =>
                  setFormData({ ...formData, followUpDate: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isView}
              />
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Notes
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.notes || "No notes"}
              </p>
            ) : (
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notes about this lead"
                disabled={isView}
              />
            )}
          </div>
          {isView && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Created Date
                </label>
                <p className="text-sm text-gray-900">
                  {formData.createdDate || "Not set"}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Updated Date
                </label>
                <p className="text-sm text-gray-900">
                  {formData.updatedDate || "Not set"}
                </p>
              </div>
            </>
          )}
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
              {isEdit ? "Update Lead" : "Add Lead"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reusable function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      console.log("Fetching leads with token:", token);
      if (!token) {
        setError(
          "No authentication token found. Please ensure you are logged in."
        );
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/leads", {
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to fetch leads: ${response.status} - ${errorText}`
          );
        }
        const data = await response.json();
        console.log("Fetched leads:", data);
        const formattedLeads = data.leads.map((lead) => ({
          id: lead._id,
          name: lead.name || "",
          contact: lead.contact || "",
          businessType: lead.businessType || "Unknown",
          status: lead.status || "Pending",
          notes: lead.notes || "",
          followUpDate: lead.followUpDate
            ? new Date(lead.followUpDate).toISOString().split("T")[0]
            : "",
          createdDate: new Date(lead.createdAt).toISOString().split("T")[0],
          updatedDate: new Date(lead.updatedAt).toISOString().split("T")[0],
        }));
        setLeads(formattedLeads);
      } catch (err) {
        console.error("Fetch leads error:", err);
        setError(
          `Error fetching leads: ${err.message}. Please check your token or server connection.`
        );
        toast.error(`Error fetching leads: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.contact || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.businessType || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (lead.status || "").toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Interested":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFollowUpColor = (followUpDate) => {
    if (!followUpDate) return "text-gray-400 bg-gray-50 border-gray-200";
    const today = new Date();
    const followUp = new Date(followUpDate);
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1
      ? "text-red-600 bg-red-50 border-red-200"
      : "text-green-600 bg-green-50 border-green-200";
  };

  const getFollowUpStatus = (followUpDate) => {
    if (!followUpDate) return "Not set";
    const today = new Date();
    const followUp = new Date(followUpDate);
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `${diffDays} days`;
  };

  const handleAddLead = async (newLead) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    console.log("Posting lead with token:", token, "Data:", newLead);
    if (!token) {
      setError(
        "No authentication token found. Please ensure you are logged in."
      );
      setLoading(false);
      toast.error("No authentication token found. Please log in.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newLead),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create lead: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      console.log("Created lead:", data);
      const formattedLead = {
        id: data.lead._id,
        name: data.lead.name || "",
        contact: data.lead.contact || "",
        businessType: data.lead.businessType || "Unknown",
        status: data.lead.status || "Pending",
        notes: data.lead.notes || "",
        followUpDate: data.lead.followUpDate
          ? new Date(data.lead.followUpDate).toISOString().split("T")[0]
          : "",
        createdDate: new Date(data.lead.createdAt).toISOString().split("T")[0],
        updatedDate: new Date(data.lead.updatedAt).toISOString().split("T")[0],
      };
      setLeads([...leads, formattedLead]);
      setShowAddModal(false);
      toast.success(`Lead "${newLead.name}" added successfully!`);
    } catch (err) {
      console.error("Create lead error:", err);
      setError(`Error creating lead: ${err.message}`);
      toast.error(`Error creating lead: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLead = async (updatedLead) => {
    if (!selectedLead) {
      console.error("No selected lead for editing");
      toast.error("No lead selected for editing.");
      return;
    }
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    console.log("Updating lead with token:", token, "Data:", updatedLead);
    if (!token) {
      setError(
        "No authentication token found. Please ensure you are logged in."
      );
      setLoading(false);
      toast.error("No authentication token found. Please log in.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5000/api/leads/${selectedLead.id}`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(updatedLead),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update lead: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      console.log("Updated lead:", data);
      const formattedLead = {
        id: data.lead._id,
        name: data.lead.name || "",
        contact: data.lead.contact || "",
        businessType: data.lead.businessType || "Unknown",
        status: data.lead.status || "Pending",
        notes: data.lead.notes || "",
        followUpDate: data.lead.followUpDate
          ? new Date(data.lead.followUpDate).toISOString().split("T")[0]
          : "",
        createdDate: new Date(data.lead.createdAt).toISOString().split("T")[0],
        updatedDate: new Date(data.lead.updatedAt).toISOString().split("T")[0],
      };
      setLeads(
        leads.map((l) => (l.id === selectedLead.id ? formattedLead : l))
      );
      setShowEditModal(false);
      setSelectedLead(null);
      toast.success(`Lead "${updatedLead.name}" updated successfully!`);
    } catch (err) {
      console.error("Update lead error:", err);
      setError(`Error updating lead: ${err.message}`);
      toast.error(`Error updating lead: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = (id, name) => {
    console.log("Initiating delete for lead ID:", id, "Name:", name);
    toast(
      <div>
        <p>Are you sure you want to delete the lead "{name}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              setLoading(true);
              setError(null);
              const token = localStorage.getItem("token");
              console.log("Deleting lead with token:", token, "ID:", id);
              if (!token) {
                setError(
                  "No authentication token found. Please ensure you are logged in."
                );
                setLoading(false);
                toast.error("No authentication token found. Please log in.");
                toast.dismiss();
                return;
              }
              try {
                const response = await fetch(
                  `http://localhost:5000/api/leads/${id}`,
                  {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                  }
                );
                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(
                    `Failed to delete lead: ${response.status} - ${errorText}`
                  );
                }
                console.log("Deleted lead:", id);
                setLeads(leads.filter((lead) => lead.id !== id));
                toast.success(`Lead "${name}" deleted successfully!`);
                toast.dismiss();
              } catch (err) {
                console.error("Delete lead error:", err);
                setError(`Error deleting lead: ${err.message}`);
                toast.error(`Error deleting lead: ${err.message}`);
                toast.dismiss();
              } finally {
                setLoading(false);
              }
            }}
            className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const totalLeads = leads.length;
  const pendingLeads = leads.filter((l) => l.status === "Pending").length;
  const interestLeads = leads.filter((l) => l.status === "Interested").length;
  const rejectedLeads = leads.filter((l) => l.status === "Rejected").length;
  const urgentFollowUps = leads.filter((lead) => {
    if (!lead.followUpDate) return false;
    const today = new Date();
    const followUp = new Date(lead.followUpDate);
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1;
  }).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 overflow-x-hidden sm:p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Daily Leads Management
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Create and manage your daily sales leads
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Lead
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { title: "Total Leads", value: totalLeads, color: "text-gray-900" },
          { title: "Pending", value: pendingLeads, color: "text-yellow-600" },
          {
            title: "Interested",
            value: interestLeads,
            color: "text-green-600",
          },
          { title: "Rejected", value: rejectedLeads, color: "text-red-600" },
          {
            title: "Urgent Follow-ups",
            value: urgentFollowUps,
            color: "text-red-600",
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
                placeholder="Search leads..."
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
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Lead Info
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Contact
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Business Type
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Status
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Follow-up Date
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="w-8 h-8 mr-3 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {lead.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {lead.createdDate}
                        </div>
                        <div className="text-xs text-gray-400">
                          Updated: {lead.updatedDate}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {lead.contact.includes("@") ? (
                        <EnvelopeIcon className="w-4 h-4 mr-1 text-gray-400" />
                      ) : (
                        <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                      )}
                      <span className="truncate">{lead.contact}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <BuildingOfficeIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate">{lead.businessType}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    {lead.followUpDate ? (
                      <div
                        className={`text-sm font-medium px-2 py-1 rounded border ${getFollowUpColor(
                          lead.followUpDate
                        )} flex items-center`}
                      >
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        <div>
                          <div className="truncate">{lead.followUpDate}</div>
                          <div className="text-xs">
                            {getFollowUpStatus(lead.followUpDate)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">
                        No follow-up set
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium sm:px-6 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          console.log("Opening view modal for lead:", lead);
                          setSelectedLead(lead);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                        aria-label="View lead"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          console.log("Opening edit modal for lead:", lead);
                          setSelectedLead(lead);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                        aria-label="Edit lead"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead.id, lead.name)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        aria-label="Delete lead"
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

        {/* Mobile Card Layout */}
        <div className="p-4 space-y-4 md:hidden">
          {filteredLeads.map((lead) => (
            <div key={lead.id} className="p-4 rounded-lg shadow bg-gray-50">
              <div className="mb-2 text-sm font-medium text-gray-900 truncate">
                {lead.name}
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                {lead.contact.includes("@") ? (
                  <EnvelopeIcon className="w-4 h-4 mr-1 text-gray-400" />
                ) : (
                  <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                )}
                <span className="truncate">{lead.contact}</span>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-900">
                <BuildingOfficeIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{lead.businessType}</span>
              </div>
              <div className="mb-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </div>
              <div className="mb-2">
                {lead.followUpDate ? (
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded border ${getFollowUpColor(
                      lead.followUpDate
                    )} flex items-center`}
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <div>
                      <div className="truncate">{lead.followUpDate}</div>
                      <div className="text-xs">
                        {getFollowUpStatus(lead.followUpDate)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">
                    No follow-up set
                  </span>
                )}
              </div>
              <div className="mb-2 text-xs text-gray-500">
                Created: {lead.createdDate}
              </div>
              <div className="mb-2 text-xs text-gray-400">
                Updated: {lead.updatedDate}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    console.log("Opening view modal for lead:", lead);
                    setSelectedLead(lead);
                    setShowViewModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                  title="View"
                  aria-label="View lead"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    console.log("Opening edit modal for lead:", lead);
                    setSelectedLead(lead);
                    setShowEditModal(true);
                  }}
                  className="text-green-600 hover:text-green-900"
                  title="Edit"
                  aria-label="Edit lead"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteLead(lead.id, lead.name)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                  aria-label="Delete lead"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLeads.length === 0 && !loading && !error && (
          <div className="py-8 text-center">
            <UserIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No leads found</p>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      <LeadModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        lead={null}
        onSubmit={handleAddLead}
      />

      {/* Edit Lead Modal */}
      <LeadModal
        isOpen={showEditModal}
        onClose={() => {
          console.log("Closing edit modal");
          setShowEditModal(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
        onSubmit={handleEditLead}
        isEdit
      />

      {/* View Lead Modal */}
      <LeadModal
        isOpen={showViewModal}
        onClose={() => {
          console.log("Closing view modal");
          setShowViewModal(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
        onSubmit={() => {}}
        isView
      />
    </div>
  );
}
