import { useState, useEffect } from "react";
import {
  CheckIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SuperPricingPlans() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    interval: "month",
    features: [],
    customFeature: "",
  });
  const [predefinedFeatures, setPredefinedFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/api";

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/signin");
      return null;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });
      console.log("Refresh Token Response:", response.data);
      const { accessToken } = response.data.data;
      localStorage.setItem("token", accessToken);
      return accessToken;
    } catch (err) {
      console.error("Refresh Token Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/signin");
      return null;
    }
  };

  const fetchPlans = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/plan/plans`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Raw API Response:", response.data);

      let fetchedPlans = [];
      if (Array.isArray(response.data)) {
        fetchedPlans = response.data;
      } else if (response.data.data) {
        fetchedPlans = response.data.data;
      } else if (response.data.plans) {
        fetchedPlans = response.data.plans;
      } else {
        throw new Error("Unexpected response structure");
      }

      console.log("Fetched Plans:", fetchedPlans);

      const uniqueFeatures = [
        ...new Set(
          fetchedPlans.flatMap((plan) =>
            (plan.features || []).map((f) => f.label)
          )
        ),
      ].filter(Boolean);
      console.log("Unique Features:", uniqueFeatures);
      setPredefinedFeatures(uniqueFeatures);

      const mappedPlans = fetchedPlans.map((plan) => ({
        id: plan._id,
        name: plan.priceName || "Unnamed Plan",
        price: Number(plan.price) || 0,
        interval:
          plan.duration === "monthly" ? "month" : plan.duration || "month",
        features: (plan.features || []).map((f) => ({
          name: f.label,
          included: true,
        })),
        subscribers: plan.subscribers || 0,
        status: plan.status || "Active",
      }));

      console.log("Mapped Plans:", mappedPlans);
      setPricingPlans(mappedPlans);

      setFormData((prev) => ({
        ...prev,
        features: uniqueFeatures.map((feature) => ({
          name: feature,
          included: false,
        })),
      }));
      setError(null);
    } catch (err) {
      console.error("Fetch Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      throw err;
    }
  };

  useEffect(() => {
    const loadPlans = async () => {
      let token = localStorage.getItem("token");
      console.log(
        "Retrieved Token:",
        token ? token.substring(0, 20) + "..." : "None"
      );
      if (!token) {
        toast.error("Please log in to view pricing plans.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        setLoading(false);
        return;
      }

      try {
        await fetchPlans(token);
      } catch (err) {
        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              await fetchPlans(newToken);
            } catch (retryErr) {
              setError(`Failed to load pricing plans: ${retryErr.message}`);
              toast.error(`Error: ${retryErr.message}`, {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
              });
            }
          }
        } else if (err.response?.status === 403) {
          setError("Access denied. Superadmin role required.");
          toast.error("Access denied. Superadmin role required.", {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        } else {
          setError(`Failed to load pricing plans: ${err.message}`);
          toast.error(`Error: ${err.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, [navigate]);

  const handleOpenPopup = (plan = null) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        price: plan.price,
        interval: plan.interval,
        features: predefinedFeatures.map((feature) => {
          const existingFeature = plan.features.find((f) => f.name === feature);
          return {
            name: feature,
            included: existingFeature ? existingFeature.included : false,
          };
        }),
        customFeature: "",
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: "",
        price: "",
        interval: "month",
        features: predefinedFeatures.map((feature) => ({
          name: feature,
          included: false,
        })),
        customFeature: "",
      });
    }
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingPlan(null);
    setFormData({
      name: "",
      price: "",
      interval: "month",
      features: predefinedFeatures.map((feature) => ({
        name: feature,
        included: false,
      })),
      customFeature: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index].included = !updatedFeatures[index].included;
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleAddCustomFeature = () => {
    if (formData.customFeature.trim() === "") return;

    const newFeature = {
      name: formData.customFeature.trim(),
      included: true,
    };

    if (!predefinedFeatures.includes(newFeature.name)) {
      setPredefinedFeatures((prev) => [...prev, newFeature.name]);
    }

    const updatedFeatures = [...formData.features, { ...newFeature }].filter(
      (feature, index, self) =>
        index === self.findIndex((f) => f.name === feature.name)
    );

    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
      customFeature: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to perform this action.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      navigate("/signin");
      return;
    }

    const planData = {
      priceName: formData.name,
      price: parseFloat(formData.price),
      duration: formData.interval === "month" ? "monthly" : formData.interval,
      features: formData.features
        .filter((feature) => feature.included)
        .map((feature) => ({ label: feature.name })),
    };
    console.log("Submitting Plan Data:", planData); // Debug log

    try {
      if (editingPlan) {
        const response = await axios.put(
          `${API_BASE_URL}/plan/plans/${editingPlan.id}`,
          planData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Update Response:", response.data);

        const updatedPlan = response.data.data || response.data;
        setPricingPlans((prev) =>
          prev.map((plan) =>
            plan.id === editingPlan.id
              ? {
                  id: updatedPlan._id,
                  name: updatedPlan.priceName,
                  price: Number(updatedPlan.price),
                  interval:
                    updatedPlan.duration === "monthly"
                      ? "month"
                      : updatedPlan.duration,
                  features: (updatedPlan.features || []).map((f) => ({
                    name: f.label,
                    included: true,
                  })),
                  subscribers: updatedPlan.subscribers || plan.subscribers,
                  status: updatedPlan.status || plan.status,
                }
              : plan
          )
        );
        toast.success("Plan updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      } else {
        const response = await axios.post(
          `${API_BASE_URL}/plan/plans`,
          planData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Create Response:", response.data);

        const newPlan = response.data.data || response.data;
        const mappedPlan = {
          id: newPlan._id,
          name: newPlan.priceName,
          price: Number(newPlan.price),
          interval: newPlan.duration === "monthly" ? "month" : newPlan.duration,
          features: (newPlan.features || []).map((f) => ({
            name: f.label,
            included: true,
          })),
          subscribers: newPlan.subscribers || 0,
          status: newPlan.status || "Active",
        };
        console.log("New Mapped Plan:", mappedPlan); // Debug log
        setPricingPlans((prev) => [...prev, mappedPlan]);
        setPredefinedFeatures((prev) => [
          ...new Set([...prev, ...mappedPlan.features.map((f) => f.name)]),
        ]);
        toast.success("Plan added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      }
      await fetchPlans(token);
      handleClosePopup();
    } catch (err) {
      console.error("Submit Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
      if (err.response?.status === 401) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          try {
            if (editingPlan) {
              const response = await axios.put(
                `${API_BASE_URL}/plan/plans/${editingPlan.id}`,
                planData,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("Retry Update Response:", response.data);
              const updatedPlan = response.data.data || response.data;
              setPricingPlans((prev) =>
                prev.map((plan) =>
                  plan.id === editingPlan.id
                    ? {
                        id: updatedPlan._id,
                        name: updatedPlan.priceName,
                        price: Number(updatedPlan.price),
                        interval:
                          updatedPlan.duration === "monthly"
                            ? "month"
                            : updatedPlan.duration,
                        features: (updatedPlan.features || []).map((f) => ({
                          name: f.label,
                          included: true,
                        })),
                        subscribers:
                          updatedPlan.subscribers || plan.subscribers,
                        status: updatedPlan.status || plan.status,
                      }
                    : plan
                )
              );
              toast.success("Plan updated successfully!", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
              });
            } else {
              const response = await axios.post(
                `${API_BASE_URL}/plan/plans`,
                planData,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("Retry Create Response:", response.data);
              const newPlan = response.data.data || response.data;
              const mappedPlan = {
                id: newPlan._id,
                name: newPlan.priceName,
                price: Number(newPlan.price),
                interval:
                  newPlan.duration === "monthly" ? "month" : newPlan.duration,
                features: (newPlan.features || []).map((f) => ({
                  name: f.label,
                  included: true,
                })),
                subscribers: newPlan.subscribers || 0,
                status: newPlan.status || "Active",
              };
              console.log("Retry New Mapped Plan:", mappedPlan); // Debug log
              setPricingPlans((prev) => [...prev, mappedPlan]);
              setPredefinedFeatures((prev) => [
                ...new Set([
                  ...prev,
                  ...mappedPlan.features.map((f) => f.name),
                ]),
              ]);
              toast.success("Plan added successfully!", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
              });
            }
            await fetchPlans(newToken);
            handleClosePopup();
          } catch (retryErr) {
            toast.error(`Error: ${retryErr.message}`, {
              position: "top-right",
              autoClose: 3000,
              theme: "light",
            });
          }
        }
      } else if (err.response?.status === 403) {
        toast.error("Access denied. Superadmin role required.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      } else {
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    toast.warning(
      <div>
        <p>Are you sure you want to delete this plan?</p>
        <div className="flex mt-2 space-x-2">
          <button
            onClick={async () => {
              let token = localStorage.getItem("token");
              if (!token) {
                toast.error("Please log in to perform this action.", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "light",
                });
                navigate("/signin");
                return;
              }

              try {
                await axios.delete(`${API_BASE_URL}/plan/plans/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                });
                console.log("Delete Response: Success");
                setPricingPlans((prev) =>
                  prev.filter((plan) => plan.id !== id)
                );
                toast.dismiss();
                toast.success("Plan deleted successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "light",
                });
                await fetchPlans(token);
              } catch (err) {
                console.error("Delete Error:", {
                  message: err.message,
                  status: err.response?.status,
                  data: err.response?.data,
                });
                if (err.response?.status === 401) {
                  const newToken = await refreshAccessToken();
                  if (newToken) {
                    try {
                      await axios.delete(`${API_BASE_URL}/plan/plans/${id}`, {
                        headers: {
                          Authorization: `Bearer ${newToken}`,
                          "Content-Type": "application/json",
                        },
                      });
                      console.log("Retry Delete Response: Success");
                      setPricingPlans((prev) =>
                        prev.filter((plan) => plan.id !== id)
                      );
                      toast.dismiss();
                      toast.success("Plan deleted successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "light",
                      });
                      await fetchPlans(newToken);
                    } catch (retryErr) {
                      toast.error(`Error: ${retryErr.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "light",
                      });
                    }
                  }
                } else if (err.response?.status === 403) {
                  toast.error("Access denied. Superadmin role required.", {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                  });
                } else {
                  toast.error(`Error: ${err.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                  });
                }
              }
            }}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-gray-800 bg-gray-100 rounded"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: true,
        theme: "light",
      }
    );
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  console.log("Rendering Plans:", pricingPlans);

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Plans</h3>
        <button
          onClick={() => handleOpenPopup()}
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Add New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border rounded-lg shadow-sm overflow-hidden h-[500px] flex flex-col"
          >
            <div className="flex-shrink-0 px-6 py-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {plan.name}
                  </h2>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenPopup(plan)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label="Edit plan"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete plan"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-shrink-0 mb-6">
                <div className="mb-2 text-sm text-gray-600">
                  {plan.subscribers} active subscribers
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    plan.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {plan.status}
                </span>
              </div>
            </div>

            <div
              className="flex-1 min-h-0 px-6 overflow-y-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#6B7280 transparent",
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 5px;
                }
                div::-webkit-scrollbar-track {
                  background: #e5e7eb;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: #6b7280;
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: #4b5563;
                }
              `}</style>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center">
                    {feature.included ? (
                      <CheckIcon className="w-5 h-5 mr-3 text-green-500" />
                    ) : (
                      <XMarkIcon className="w-5 h-5 mr-3 text-gray-300" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-shrink-0 px-6 py-4 mt-auto bg-gray-50">
              <button
                onClick={() => handleOpenPopup(plan)}
                className="w-full px-4 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 mt-8 bg-white border rounded-lg shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Plan Statistics
        </h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {pricingPlans.reduce((sum, plan) => sum + plan.subscribers, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ₹
              {pricingPlans
                .reduce((sum, plan) => sum + plan.price * plan.subscribers, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Monthly Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {pricingPlans.length}
            </div>
            <div className="text-sm text-gray-500">Active Plans</div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleClosePopup}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              {editingPlan ? "Edit Plan" : "Add New Plan"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price Amount (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                  min="0"
                  step="0.01"
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration Type
                </label>
                <select
                  name="interval"
                  value={formData.interval}
                  onChange={handleFormChange}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Features
                </label>
                <div className="p-2 overflow-y-auto border border-gray-300 rounded-md max-h-40">
                  {formData.features.map((feature, index) => (
                    <div key={feature.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={feature.included}
                        onChange={() => handleFeatureChange(index)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter Custom Feature
                  </label>
                  <input
                    type="text"
                    name="customFeature"
                    value={formData.customFeature}
                    onChange={handleFormChange}
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {formData.customFeature.trim() !== "" && (
                  <button
                    type="button"
                    onClick={handleAddCustomFeature}
                    className="px-3 py-1 mt-6 text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Add
                  </button>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {editingPlan ? "Update Plan" : "Add Plan"}
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
