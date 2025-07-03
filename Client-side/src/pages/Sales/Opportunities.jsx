import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialOpportunities = [
  {
    id: 1,
    title: "Enterprise Software License",
    company: "TechCorp Solutions",
    contact: "John Smith",
    value: 45000,
    stage: "Negotiation",
    probability: 75,
    closeDate: "2024-02-15",
    source: "Inbound Lead",
    owner: "You",
    lastActivity: "2025-07-02T07:17:00Z", // Adjusted to UTC (IST - 5:30)
    notes: "Final pricing discussion scheduled for next week",
  },
  {
    id: 2,
    title: "Marketing Automation Platform",
    company: "Digital Marketing Pro",
    contact: "Sarah Johnson",
    value: 28500,
    stage: "Proposal",
    probability: 60,
    closeDate: "2024-02-20",
    source: "Referral",
    owner: "You",
    lastActivity: "2025-07-01T07:17:00Z",
    notes: "Proposal sent, waiting for feedback",
  },
  {
    id: 3,
    title: "POS System Implementation",
    company: "Retail Solutions Inc",
    contact: "Mike Brown",
    value: 35000,
    stage: "Qualified",
    probability: 40,
    closeDate: "2024-02-25",
    source: "Cold Outreach",
    owner: "You",
    lastActivity: "2025-07-02T06:17:00Z",
    notes: "Demo scheduled for next Tuesday",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    company: "Fashion Store",
    contact: "Emily Davis",
    value: 18000,
    stage: "Discovery",
    probability: 25,
    closeDate: "2024-03-01",
    source: "Website",
    owner: "You",
    lastActivity: "2025-06-30T07:17:00Z",
    notes: "Gathering requirements",
  },
  {
    id: 5,
    title: "CRM Integration",
    company: "Consulting Group",
    contact: "David Wilson",
    value: 22000,
    stage: "Closed Won",
    probability: 100,
    closeDate: "2024-01-15",
    source: "Trade Show",
    owner: "You",
    lastActivity: "2025-06-25T07:17:00Z",
    notes: "Deal closed successfully",
  },
];

const stages = [
  "Discovery",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
];

function OpportunityModal({
  isOpen,
  onClose,
  opportunity,
  onSubmit,
  isEdit,
  isView,
}) {
  const [formData, setFormData] = useState(
    opportunity || {
      title: "",
      company: "",
      contact: "",
      value: 0,
      stage: "Discovery",
      probability: 25,
      closeDate: "",
      source: "",
      owner: "You",
      lastActivity: new Date().toISOString(),
      notes: "",
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.value || formData.value <= 0)
      newErrors.value = "Value must be a positive number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!isView && validate()) {
      onSubmit({
        ...formData,
        value: Number(formData.value),
        probability: Number(formData.probability),
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          {isView
            ? "Opportunity Details"
            : isEdit
            ? "Edit Opportunity"
            : "New Opportunity"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.title || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? "border-red-500" : ""
                  }`}
                  placeholder="Enter opportunity title"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Company *
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.company || "Not set"}
              </p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.company || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.company ? "border-red-500" : ""
                  }`}
                  placeholder="Enter company name"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                )}
              </>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contact Person
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.contact || "Not set"}
              </p>
            ) : (
              <input
                type="text"
                value={formData.contact || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact name"
              />
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Value *
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  ${Number(formData.value || 0).toLocaleString()}
                </p>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.value || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        value: Number(e.target.value),
                      })
                    }
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.value ? "border-red-500" : ""
                    }`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.value && (
                    <p className="mt-1 text-xs text-red-500">{errors.value}</p>
                  )}
                </>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Probability
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.probability || 0}%
                </p>
              ) : (
                <select
                  value={formData.probability || 25}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      probability: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[10, 25, 50, 75, 90].map((prob) => (
                    <option key={prob} value={prob}>
                      {prob}%
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Stage
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.stage || "Not set"}
                </p>
              ) : (
                <select
                  value={formData.stage || "Discovery"}
                  onChange={(e) =>
                    setFormData({ ...formData, stage: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {stages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Close Date
              </label>
              {isView ? (
                <p className="text-sm text-gray-900">
                  {formData.closeDate || "Not set"}
                </p>
              ) : (
                <input
                  type="date"
                  value={formData.closeDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, closeDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Source
            </label>
            {isView ? (
              <p className="text-sm text-gray-900">
                {formData.source || "Not set"}
              </p>
            ) : (
              <input
                type="text"
                value={formData.source || ""}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter source"
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
                value={formData.notes || ""}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notes about this opportunity"
              />
            )}
          </div>
          {isView && (
            <>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Owner
                </label>
                <p className="text-sm text-gray-900">
                  {formData.owner || "Not set"}
                </p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Last Activity
                </label>
                <p className="text-sm text-gray-900">
                  {formData.lastActivity
                    ? new Date(formData.lastActivity).toLocaleString()
                    : "Not set"}
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
              {isEdit ? "Update Opportunity" : "Create Opportunity"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStage, setFilterStage] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (showAddModal || showEditModal || showViewModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showAddModal, showEditModal, showViewModal]);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === "all" || opp.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage) => {
    switch (stage) {
      case "Discovery":
        return "bg-gray-100 text-gray-800";
      case "Qualified":
        return "bg-blue-100 text-blue-800";
      case "Proposal":
        return "bg-yellow-100 text-yellow-800";
      case "Negotiation":
        return "bg-orange-100 text-orange-800";
      case "Closed Won":
        return "bg-green-100 text-green-800";
      case "Closed Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 75) return "text-green-600";
    if (probability >= 50) return "text-yellow-600";
    if (probability >= 25) return "text-orange-600";
    return "text-red-600";
  };

  const handleAddOpportunity = (newOpportunity) => {
    const opportunity = {
      id: opportunities.length + 1,
      title: newOpportunity.title,
      company: newOpportunity.company,
      contact: newOpportunity.contact || "",
      value: Number(newOpportunity.value) || 0,
      stage: newOpportunity.stage || "Discovery",
      probability: Number(newOpportunity.probability) || 25,
      closeDate: newOpportunity.closeDate || "",
      source: newOpportunity.source || "Unknown",
      owner: newOpportunity.owner || "You",
      lastActivity: new Date().toISOString(),
      notes: newOpportunity.notes || "",
    };
    setOpportunities([...opportunities, opportunity]);
    setShowAddModal(false);
    toast.success(`Opportunity "${opportunity.title}" added successfully!`);
  };

  const handleEditOpportunity = (updatedOpportunity) => {
    if (selectedOpportunity) {
      const opportunity = {
        ...selectedOpportunity,
        ...updatedOpportunity,
        value: Number(updatedOpportunity.value) || selectedOpportunity.value,
        probability:
          Number(updatedOpportunity.probability) ||
          selectedOpportunity.probability,
        lastActivity: new Date().toISOString(),
      };
      setOpportunities(
        opportunities.map((o) =>
          o.id === selectedOpportunity.id ? opportunity : o
        )
      );
      setShowEditModal(false);
      setSelectedOpportunity(null);
      toast.success(`Opportunity "${opportunity.title}" updated successfully!`);
    }
  };

  const handleDeleteOpportunity = (id, title) => {
    toast(
      <div>
        <p>Are you sure you want to delete the opportunity "{title}"?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setOpportunities(opportunities.filter((opp) => opp.id !== id));
              toast.success(`Opportunity "${title}" deleted successfully!`);
              toast.dismiss();
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

  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const activeOpportunities = opportunities.filter(
    (opp) => !opp.stage.includes("Closed")
  ).length;
  const wonDeals = opportunities.filter(
    (opp) => opp.stage === "Closed Won"
  ).length;
  const avgDealSize = opportunities.length
    ? Math.round(totalValue / opportunities.length)
    : 0;

  return (
    <div className="min-h-screen p-4 overflow-x-hidden sm:p-6 bg-gray-50">
      <ToastContainer />
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Sales Opportunities
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Manage your sales pipeline
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 sm:w-auto"
        >
          <PlusIcon className="w-5 h-5" />
          New Opportunity
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Pipeline",
            value: `$${totalValue.toLocaleString()}`,
            color: "text-gray-900",
          },
          {
            title: "Active Opportunities",
            value: activeOpportunities,
            color: "text-blue-600",
          },
          { title: "Won Deals", value: wonDeals, color: "text-green-600" },
          {
            title: "Avg Deal Size",
            value: `$${avgDealSize.toLocaleString()}`,
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
                placeholder="Search opportunities..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="all">All Stages</option>
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
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
                  Opportunity
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Company
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Value
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Stage
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Probability
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Close Date
                </th>
                <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOpportunities.map((opportunity) => (
                <tr key={opportunity.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {opportunity.title}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span className="truncate">{opportunity.contact}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(opportunity.lastActivity).toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <BuildingOfficeIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate">{opportunity.company}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {opportunity.source}
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      ${opportunity.value.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(
                        opportunity.stage
                      )}`}
                    >
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div
                      className={`text-sm font-medium ${getProbabilityColor(
                        opportunity.probability
                      )}`}
                    >
                      {opportunity.probability}%
                    </div>
                    <div className="w-24 h-2 mt-1 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{
                          width: `${Math.min(opportunity.probability, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="truncate">{opportunity.closeDate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium sm:px-6 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOpportunity(opportunity);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                        aria-label="View opportunity"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedOpportunity(opportunity);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                        aria-label="Edit opportunity"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteOpportunity(
                            opportunity.id,
                            opportunity.title
                          )
                        }
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        aria-label="Delete opportunity"
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
          {filteredOpportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="p-4 rounded-lg shadow bg-gray-50"
            >
              <div className="mb-2 text-sm font-medium text-gray-900 truncate">
                {opportunity.title}
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-500">
                <UserIcon className="w-4 h-4 mr-1" />
                <span className="truncate">{opportunity.contact}</span>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-900">
                <BuildingOfficeIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{opportunity.company}</span>
              </div>
              <div className="mb-2 text-sm text-gray-500">
                {opportunity.source}
              </div>
              <div className="flex items-center mb-2 text-sm font-medium text-gray-900">
                <CurrencyDollarIcon className="w-4 h-4 mr-1 text-gray-400" />$
                {opportunity.value.toLocaleString()}
              </div>
              <div className="mb-2">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStageColor(
                    opportunity.stage
                  )}`}
                >
                  {opportunity.stage}
                </span>
              </div>
              <div className="mb-2">
                <div
                  className={`text-sm font-medium ${getProbabilityColor(
                    opportunity.probability
                  )}`}
                >
                  {opportunity.probability}%
                </div>
                <div className="w-24 h-2 mt-1 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{
                      width: `${Math.min(opportunity.probability, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center mb-2 text-sm text-gray-900">
                <CalendarIcon className="w-4 h-4 mr-1 text-gray-400" />
                <span className="truncate">{opportunity.closeDate}</span>
              </div>
              <div className="mb-2 text-xs text-gray-400">
                {new Date(opportunity.lastActivity).toLocaleString()}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedOpportunity(opportunity);
                    setShowViewModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                  title="View"
                  aria-label="View opportunity"
                >
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedOpportunity(opportunity);
                    setShowEditModal(true);
                  }}
                  className="text-green-600 hover:text-green-900"
                  title="Edit"
                  aria-label="Edit opportunity"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    handleDeleteOpportunity(opportunity.id, opportunity.title)
                  }
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                  aria-label="Delete opportunity"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="py-8 text-center">
            <BuildingOfficeIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">No opportunities found</p>
          </div>
        )}
      </div>

      {/* Add Opportunity Modal */}
      <OpportunityModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        opportunity={null}
        onSubmit={handleAddOpportunity}
      />

      {/* Edit Opportunity Modal */}
      <OpportunityModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedOpportunity(null);
        }}
        opportunity={selectedOpportunity}
        onSubmit={handleEditOpportunity}
        isEdit
      />

      {/* View Opportunity Modal */}
      <OpportunityModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedOpportunity(null);
        }}
        opportunity={selectedOpportunity}
        onSubmit={() => {}}
        isView
      />
    </div>
  );
}
