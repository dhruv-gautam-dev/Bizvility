import { useState, useEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CalendarIcon,
  PhoneIcon,
  BriefcaseIcon,
  UserIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SuperLeads() {
  const [leads, setLeads] = useState([]);
  const [salesUsers, setSalesUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBusinessType, setFilterBusinessType] = useState("all");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isAssignFormOpen, setIsAssignFormOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [assignLead, setAssignLead] = useState(null);
  const [searchSalesUser, setSearchSalesUser] = useState("");
  const [selectedSalesUser, setSelectedSalesUser] = useState("");
  const [newLead, setNewLead] = useState({
    name: "",
    contact: "",
    businessType: "Retail",
    followUpDate: "",
    followUpTime: "",
    notes: "",
    salesUser: "",
    status: "Interested",
  });
  const [totalLeads, setTotalLeads] = useState(0);
  const [isLoadingSalesUsers, setIsLoadingSalesUsers] = useState(false);

  const businessTypes = [
    "Retail",
    "Technology",
    "Services",
    "Manufacturing",
    "Other",
    "Unknown",
    "Health",
    "Restaurant",
  ];
  const statuses = ["Interested", "Pending"];
  const API_BASE_URL = "http://localhost:5000/api";

  // Transform lead data with fallback values
  const transformLead = (lead) => {
    const followUpDateTime = lead.followUpDate
      ? new Date(lead.followUpDate)
      : null;
    return {
      id: lead._id || "",
      name: lead.name || "Unknown Lead",
      contact: lead.contact || "No contact",
      businessType: lead.businessType || "Other",
      followUpDate:
        followUpDateTime && !isNaN(followUpDateTime)
          ? followUpDateTime.toISOString().split("T")[0]
          : "",
      followUpTime:
        followUpDateTime && !isNaN(followUpDateTime)
          ? followUpDateTime.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "",
      notes: lead.notes || "No notes",
      salesUser: lead.salesUser || "",
      status: lead.status || "Pending",
      createdAt: lead.createdAt
        ? new Date(lead.createdAt).toISOString().split("T")[0]
        : "",
      updatedAt: lead.updatedAt
        ? new Date(lead.updatedAt).toISOString().split("T")[0]
        : "",
    };
  };

  // Fetch leads from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/leads/all`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        });

        console.log("Leads API Response:", response.data);

        const leadsData = Array.isArray(response.data.leads)
          ? response.data.leads
          : [];
        if (!leadsData.length && response.data.leads) {
          console.warn(
            "Leads array is empty or malformed:",
            response.data.leads
          );
        }

        setTotalLeads(response.data.totalLeads || leadsData.length);
        setLeads(leadsData.map(transformLead));
      } catch (err) {
        console.error("Fetch Leads Error:", err.response || err);
        toast.error(
          `Error fetching leads: ${
            err.response?.data?.message || err.message || "Unknown error"
          }`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setLeads([]);
        setTotalLeads(0);
      }
    };

    fetchLeads();
  }, []);

  // Fetch sales users from API
  useEffect(() => {
    const fetchSalesUsers = async () => {
      setIsLoadingSalesUsers(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_BASE_URL}/user/getAllSalesUsers`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Sales Users API Response:", response.data);

        const usersData = Array.isArray(response.data.users)
          ? response.data.users.map((user) => ({
              id: user._id || "",
              name: user.fullName || "Unknown User",
            }))
          : [];
        if (!usersData.length && response.data.users) {
          console.warn(
            "Sales users array is empty or malformed:",
            response.data.users
          );
        }

        setSalesUsers(usersData);
      } catch (err) {
        console.error("Fetch Sales Users Error:", err.response || err);
        toast.error(
          `Error fetching sales users: ${
            err.response?.data?.message || err.message || "Unknown error"
          }`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setSalesUsers([]);
      } finally {
        setIsLoadingSalesUsers(false);
      }
    };

    fetchSalesUsers();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBusinessType =
      filterBusinessType === "all" || lead.businessType === filterBusinessType;
    return matchesSearch && matchesBusinessType;
  });

  const filteredSalesUsers = salesUsers.filter((user) =>
    user.name.toLowerCase().includes(searchSalesUser.toLowerCase())
  );

  const totalRetailLeads = leads.filter(
    (l) => l.businessType === "Retail"
  ).length;
  const totalTechnologyLeads = leads.filter(
    (l) => l.businessType === "Technology"
  ).length;
  const totalInterestedLeads = leads.filter(
    (l) => l.status === "Interested"
  ).length;

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const followUpDateTime =
        newLead.followUpDate && newLead.followUpTime
          ? new Date(`${newLead.followUpDate}T${newLead.followUpTime}`)
          : undefined;
      const payload = {
        name: newLead.name,
        contact: newLead.contact,
        businessType: newLead.businessType,
        followUpDate: followUpDateTime
          ? followUpDateTime.toISOString()
          : undefined,
        notes: newLead.notes || undefined,
        salesUser: newLead.salesUser || undefined,
        status: newLead.status || "Pending",
      };

      console.log("Add Lead Payload:", payload);

      const response = await axios.post(`${API_BASE_URL}/leads/`, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      });

      console.log("Add API Response:", response.data);

      const newLeadData = response.data.lead || {};
      setLeads([...transformLead(newLeadData), ...leads]);
      setTotalLeads(totalLeads + 1);
      setIsAddFormOpen(false);
      setNewLead({
        name: "",
        contact: "",
        businessType: "Retail",
        followUpDate: "",
        followUpTime: "",
        notes: "",
        salesUser: "",
        status: "Interested",
      });
      toast.success("Lead created successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (err) {
      console.error("Add Lead Error:", err.response || err);
      toast.error(
        `Error creating lead: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleEditLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const followUpDateTime =
        editLead.followUpDate && editLead.followUpTime
          ? new Date(`${editLead.followUpDate}T${editLead.followUpTime}`)
          : undefined;
      const payload = {
        name: editLead.name,
        contact: editLead.contact,
        businessType: editLead.businessType,
        followUpDate: followUpDateTime
          ? followUpDateTime.toISOString()
          : undefined,
        notes: editLead.notes || undefined,
        salesUser: editLead.salesUser || undefined,
        status: editLead.status || "Pending",
      };

      console.log("Edit Lead Payload:", payload);

      const response = await axios.put(
        `${API_BASE_URL}/leads/${editLead.id}`,
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Edit API Response:", response.data);

      const updatedLead = response.data.lead || {};
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === editLead.id ? transformLead(updatedLead) : lead
        )
      );
      setIsEditFormOpen(false);
      setEditLead(null);
      toast.success("Lead updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (err) {
      console.error("Edit Lead Error:", err.response || err);
      toast.error(
        `Error updating lead: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleAssignLead = async (e) => {
    e.preventDefault();
    if (!assignLead?.id) {
      toast.error("Invalid lead selected. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsAssignFormOpen(false);
      setAssignLead(null);
      setSearchSalesUser("");
      setSelectedSalesUser("");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        salesUserId: selectedSalesUser || null, // Send null for unassigning
        leadIds: assignLead.id,
      };

      console.log("Assign Lead Payload:", payload);

      const response = await axios.put(
        `${API_BASE_URL}/leads/assign`,
        payload,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Assign API Response:", response.data);

      const updatedLead = response.data.lead || {};
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === assignLead.id ? transformLead(updatedLead) : lead
        )
      );
      setIsAssignFormOpen(false);
      setAssignLead(null);
      setSearchSalesUser("");
      setSelectedSalesUser("");
      toast.success(
        selectedSalesUser === assignLead.salesUser && assignLead.salesUser
          ? `Lead reassigned to ${getSalesUserName(
              selectedSalesUser
            )} successfully!`
          : `Lead assigned to ${
              selectedSalesUser
                ? getSalesUserName(selectedSalesUser)
                : "Unassigned"
            } successfully!`,
        {
          position: "top-right",
          autoClose: 1500,
        }
      );
    } catch (err) {
      console.error("Assign Lead Error:", err.response || err);
      let errorMessage =
        err.response?.data?.message || err.message || "Unknown error";
      if (errorMessage.includes("Cast to ObjectId failed")) {
        errorMessage = "Invalid sales user or lead ID. Please try again.";
      }
      toast.error(`Error assigning lead: ${errorMessage}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteLead = (id, name) => {
    toast.warning(
      <div>
        <p>
          Are you sure you want to delete "{name}"? This action cannot be
          undone.
        </p>
        <div className="flex mt-2 space-x-2">
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem("token");
                const response = await axios.delete(
                  `${API_BASE_URL}/leads/${id}`,
                  {
                    headers: {
                      Authorization: token ? `Bearer ${token}` : undefined,
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log("Delete API Response:", response.data);
                setLeads(leads.filter((lead) => lead.id !== id));
                setTotalLeads(totalLeads - 1);
                toast.dismiss();
                toast.success(`"${name}" deleted successfully!`, {
                  position: "top-right",
                  autoClose: 1500,
                });
              } catch (err) {
                console.error("Delete Lead Error:", err.response || err);
                toast.error(
                  `Error deleting lead: ${
                    err.response?.data?.message ||
                    err.message ||
                    "Unknown error"
                  }`,
                  {
                    position: "top-right",
                    autoClose: 3000,
                  }
                );
              }
            }}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            Yes, delete it!
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-gray-800 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Interested":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSalesUserName = (userId) => {
    const user = salesUsers.find((u) => u.id === userId);
    return user ? user.name : "Unassigned";
  };

  return (
    <div className="p-0">
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f3f4f6;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #a1a1aa;
            border-radius: 1px;
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #a1a1aa #f3f4f6;
          }
        `}
      </style>
      <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:justify-between sm:text-left sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Leads Management
        </h1>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Create New Lead
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
          <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Retail Leads</h3>
          <p className="text-2xl font-bold text-gray-900">{totalRetailLeads}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Interested Leads
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalInterestedLeads}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search leads by name or contact..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterBusinessType}
              onChange={(e) => setFilterBusinessType(e.target.value)}
            >
              <option value="all">All Business Types</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Lead",
                  "Contact",
                  "Business Type",
                  "Status",
                  "Follow-Up",
                  "Sales User",
                  "Notes",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        {lead.contact}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center">
                        <BriefcaseIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {lead.businessType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          {lead.followUpDate || lead.followUpTime ? (
                            <div>
                              {`${lead.followUpDate} ${lead.followUpTime}`.trim()}
                            </div>
                          ) : (
                            <div>No follow-up</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {getSalesUserName(lead.salesUser)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {lead.notes.length > 50
                        ? `${lead.notes.substring(0, 50)}...`
                        : lead.notes}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditLead({ ...lead });
                            setIsEditFormOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setAssignLead({ ...lead });
                            setSelectedSalesUser(lead.salesUser || "");
                            setSearchSalesUser("");
                            setIsAssignFormOpen(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          <BriefcaseIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id, lead.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Form Popup */}
      {isAddFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => {
                setNewLead({
                  name: "",
                  contact: "",
                  businessType: "Retail",
                  followUpDate: "",
                  followUpTime: "",
                  notes: "",
                  salesUser: "",
                  status: "Interested",
                });
                setIsAddFormOpen(false);
              }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Create New Lead
            </h2>
            <form
              onSubmit={handleAddLead}
              className="space-y-4 max-h-[85vh] custom-scrollbar"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lead Name
                </label>
                <input
                  type="text"
                  required
                  value={newLead.name}
                  onChange={(e) =>
                    setNewLead({ ...newLead, name: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  required
                  value={newLead.contact}
                  onChange={(e) =>
                    setNewLead({ ...newLead, contact: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Type
                </label>
                <select
                  required
                  value={newLead.businessType}
                  onChange={(e) =>
                    setNewLead({ ...newLead, businessType: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  required
                  value={newLead.status}
                  onChange={(e) =>
                    setNewLead({ ...newLead, status: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned Sales User
                </label>
                <select
                  value={newLead.salesUser}
                  onChange={(e) =>
                    setNewLead({ ...newLead, salesUser: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {salesUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={newLead.followUpDate}
                    onChange={(e) =>
                      setNewLead({ ...newLead, followUpDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Follow-Up Time
                  </label>
                  <input
                    type="time"
                    value={newLead.followUpTime}
                    onChange={(e) =>
                      setNewLead({ ...newLead, followUpTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={newLead.notes}
                  onChange={(e) =>
                    setNewLead({ ...newLead, notes: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end">
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

      {/* Edit Lead Form Popup */}
      {isEditFormOpen && editLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => {
                setEditLead(null);
                setIsEditFormOpen(false);
              }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Edit Lead
            </h2>
            <form
              onSubmit={handleEditLead}
              className="space-y-4 max-h-[85vh] custom-scrollbar"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lead Name
                </label>
                <input
                  type="text"
                  required
                  value={editLead.name}
                  onChange={(e) =>
                    setEditLead({ ...editLead, name: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  required
                  value={editLead.contact}
                  onChange={(e) =>
                    setEditLead({ ...editLead, contact: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Type
                </label>
                <select
                  required
                  value={editLead.businessType}
                  onChange={(e) =>
                    setEditLead({ ...editLead, businessType: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  required
                  value={editLead.status}
                  onChange={(e) =>
                    setEditLead({ ...editLead, status: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned Sales User
                </label>
                <select
                  value={editLead.salesUser}
                  onChange={(e) =>
                    setEditLead({ ...editLead, salesUser: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Unassigned</option>
                  {salesUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Follow-Up Date
                  </label>
                  <input
                    type="date"
                    value={editLead.followUpDate}
                    onChange={(e) =>
                      setEditLead({ ...editLead, followUpDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Follow-Up Time
                  </label>
                  <input
                    type="time"
                    value={editLead.followUpTime}
                    onChange={(e) =>
                      setEditLead({ ...editLead, followUpTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  value={editLead.notes}
                  onChange={(e) =>
                    setEditLead({ ...editLead, notes: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="flex justify-end">
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

      {/* Assign/Reassign Lead Form Popup */}
      {isAssignFormOpen && assignLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => {
                setAssignLead(null);
                setIsAssignFormOpen(false);
                setSearchSalesUser("");
                setSelectedSalesUser("");
              }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {assignLead.salesUser
                ? `Reassign Lead: ${assignLead.name}`
                : `Assign Lead: ${assignLead.name}`}
            </h2>
            <form onSubmit={handleAssignLead} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Sales User
                </label>
                <p className="mt-1 text-sm text-gray-500">
                  {getSalesUserName(assignLead.salesUser) || "Unassigned"}
                </p>
              </div>
              {isLoadingSalesUsers ? (
                <p className="text-sm text-gray-500">Loading sales users...</p>
              ) : !selectedSalesUser ||
                (selectedSalesUser === assignLead.salesUser &&
                  assignLead.salesUser) ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Search Sales User
                    </label>
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchSalesUser}
                      onChange={(e) => setSearchSalesUser(e.target.value)}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="overflow-y-auto max-h-40 custom-scrollbar">
                    {filteredSalesUsers.length === 0 && searchSalesUser ? (
                      <p className="p-2 text-sm text-gray-500">
                        No users found
                      </p>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedSalesUser("")}
                          className={`w-full text-left p-2 text-sm truncate ${
                            selectedSalesUser === ""
                              ? "bg-blue-100 text-blue-900"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Unassigned
                        </button>
                        {filteredSalesUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => setSelectedSalesUser(user.id)}
                            className={`w-full text-left p-2 text-sm truncate ${
                              selectedSalesUser === user.id
                                ? "bg-blue-100 text-blue-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {user.name}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-sm text-gray-700">
                    Selected:{" "}
                    {selectedSalesUser
                      ? getSalesUserName(selectedSalesUser)
                      : "Unassigned"}
                  </p>
                  {selectedSalesUser === assignLead.salesUser &&
                    assignLead.salesUser && (
                      <p className="mt-2 text-sm text-yellow-600">
                        Reassigning to the same user:{" "}
                        {getSalesUserName(selectedSalesUser)}
                      </p>
                    )}
                  <button
                    type="button"
                    onClick={() => setSelectedSalesUser("")}
                    className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Assign to Other
                  </button>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-yellow-600 rounded-md hover:bg-yellow-700"
                  disabled={
                    (!selectedSalesUser && selectedSalesUser !== "") ||
                    isLoadingSalesUsers
                  }
                >
                  {selectedSalesUser === assignLead.salesUser &&
                  assignLead.salesUser
                    ? "Reassign"
                    : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
