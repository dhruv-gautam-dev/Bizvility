import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  BuildingStorefrontIcon,
  StarIcon,
  ChartBarIcon,
  BellIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserListings } from "../../data/UserData/userBusinessLIsting";

const recentActivity = [
  {
    action: "New review received",
    item: "Vishal Raj Medical Mart",
    time: "2 hours ago",
    type: "review",
  },
  {
    action: "Listing viewed",
    item: "Agra college",
    time: "4 hours ago",
    type: "view",
  },
  {
    action: "Profile updated",
    item: "Your Profile",
    time: "1 day ago",
    type: "profile",
  },
  {
    action: "New listing created",
    item: "Vishal Raj Medical Mart",
    time: "3 days ago",
    type: "listing",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [userStats, setUserStats] = useState({
    totalListings: 0,
    activeListings: 0,
    pendingListings: 0,
    totalViews: 0,
    totalReviews: 0,
    averageRating: 0,
    monthlyViews: 0,
    profileViews: 89, // Static since API doesn't provide this
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quickActionExpanded, setQuickActionExpanded] = useState(true);
  const [recentActivityExpanded, setRecentActivityExpanded] = useState(true);
  const [performanceExpanded, setPerformanceExpanded] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalFade, setModalFade] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: "",
    status: "",
    image: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    fetchUserListings(userId, token)
      .then((data) => {
        const transformedListings = data.listings.map((listing) => {
          let formattedUpdatedDate = "Unknown";

          if (listing.updatedAt && typeof listing.updatedAt === "string") {
            const parsedDate = new Date(listing.updatedAt);
            if (!isNaN(parsedDate.getTime())) {
              formattedUpdatedDate = parsedDate.toISOString().split("T")[0];
            } else {
              console.warn("Invalid updatedAt date:", listing.updatedAt);
            }
          }

          return {
            id: listing._id,
            title: listing.name,
            status: "Active",
            views: 0,
            reviews: listing.numberOfReviews || 0,
            rating: listing.averageRating || 0,
            lastUpdated: formattedUpdatedDate,
            image: listing.profileImage
              ? `http://localhost:5000/${listing.profileImage.replace(
                  /\\/g,
                  "/"
                )}`
              : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
          };
        });

        const totalListings = transformedListings.length;
        const activeListings = transformedListings.filter(
          (l) => l.status === "Active"
        ).length;
        const pendingListings = transformedListings.filter(
          (l) => l.status === "Pending"
        ).length;
        const totalViews = transformedListings.reduce(
          (sum, l) => sum + l.views,
          0
        );
        const totalReviews = transformedListings.reduce(
          (sum, l) => sum + l.reviews,
          0
        );
        const averageRating = totalListings
          ? (
              transformedListings.reduce((sum, l) => sum + l.rating, 0) /
              totalListings
            ).toFixed(1)
          : 0;

        setListings(transformedListings);
        setUserStats({
          totalListings,
          activeListings,
          pendingListings,
          totalViews,
          totalReviews,
          averageRating,
          monthlyViews: 0,
          profileViews: 89,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "review":
        return "⭐";
      case "view":
        return "👁️";
      case "profile":
        return "👤";
      case "listing":
        return "🏢";
      default:
        return "📝";
    }
  };

  const handleViewModal = (listing) => {
    navigate(`/categories/health/store/${listing.id}`);
  };

  const handleOpenEditModal = (listing) => {
    setEditFormData({
      id: listing.id,
      title: listing.title,
      status: listing.status,
      image: listing.image,
    });
    setModalFade(true);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setModalFade(false);
    setTimeout(() => setIsEditModalOpen(false), 300);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSaveEdit = () => {
    if (!editFormData.title || !editFormData.status || !editFormData.image) {
      toast.warning("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setListings(
      listings.map((listing) =>
        listing.id === editFormData.id
          ? {
              ...listing,
              title: editFormData.title,
              status: editFormData.status,
              image: editFormData.image,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : listing
      )
    );

    toast.success("Listing updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    handleCloseEditModal();
  };

  const handleDelete = (listing) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">
            Are you sure you want to delete "{listing.title}"?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => closeToast()}
              className="px-3 py-1 text-sm text-gray-600 rounded hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setListings(listings.filter((l) => l.id !== listing.id));
                setUserStats((prev) => ({
                  ...prev,
                  totalListings: prev.totalListings - 1,
                  activeListings:
                    listing.status === "Active"
                      ? prev.activeListings - 1
                      : prev.activeListings,
                  pendingListings:
                    listing.status === "Pending"
                      ? prev.pendingListings - 1
                      : prev.pendingListings,
                  totalReviews: prev.totalReviews - listing.reviews,
                  averageRating:
                    prev.totalListings - 1
                      ? (
                          (prev.averageRating * prev.totalListings -
                            listing.rating) /
                          (prev.totalListings - 1)
                        ).toFixed(1)
                      : 0,
                }));
                closeToast();
                toast.success(
                  `${listing.title} has been deleted successfully!`,
                  {
                    position: "top-right",
                    autoClose: 3000,
                  }
                );
              }}
              className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <ToastContainer />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your listings today.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          Icon={BuildingStorefrontIcon}
          label="Total Listings"
          value={userStats.totalListings}
          color="text-blue-600"
        />
        <StatCard
          Icon={ChartBarIcon}
          label="Total Views"
          value={userStats.totalViews.toLocaleString()}
          color="text-green-600"
        />
        <StatCard
          Icon={StarIcon}
          label="Average Rating"
          value={userStats.averageRating}
          color="text-yellow-600"
        />
        <StatCard
          Icon={BellIcon}
          label="Total Reviews"
          value={userStats.totalReviews}
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CollapsibleSection
          title="Quick Actions"
          expanded={quickActionExpanded}
          setExpanded={setQuickActionExpanded}
        >
          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton
              navigate={navigate}
              icon={PlusIcon}
              label="Add Listing"
              href="/add-listing"
              color="text-blue-600"
            />
            <QuickActionButton
              navigate={navigate}
              icon={BuildingStorefrontIcon}
              label="My Listings"
              href="/user-my-listings"
              color="text-green-600"
            />
            <QuickActionButton
              navigate={navigate}
              icon={EyeIcon}
              label="View Profile"
              href="/profile"
              color="text-purple-600"
            />
            <QuickActionButton
              navigate={navigate}
              icon={ChartBarIcon}
              label="Analytics"
              href="/analytics"
              color="text-orange-600"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Recent Activity"
          expanded={recentActivityExpanded}
          setExpanded={setRecentActivityExpanded}
        >
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center p-3 space-x-3 rounded-lg bg-gray-50"
              >
                <span className="text-2xl">
                  {getActivityIcon(activity.type)}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CollapsibleSection>

        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">My Listings</h2>
            <button
              onClick={() => navigate("/user-my-listings")}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All
            </button>
          </div>
          <div className="p-4 space-y-4">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="flex items-center p-4 space-x-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-16 h-16 rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <div className="flex items-center mt-1 space-x-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {listing.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {listing.views} views
                    </span>
                    {listing.reviews > 0 && (
                      <span className="text-sm text-gray-500">
                        {listing.reviews} reviews
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewModal(listing)}
                    className="p-2 text-blue-600 hover:text-blue-800"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditModal(listing)}
                    className="p-2 text-green-600 hover:text-green-800"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(listing)}
                    className="p-2 text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CollapsibleSection
          title="Performance Overview"
          expanded={performanceExpanded}
          setExpanded={setPerformanceExpanded}
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PerformanceStat
              value={userStats.monthlyViews}
              label="Views This Month"
              color="text-blue-600"
            />
            <PerformanceStat
              value={userStats.profileViews}
              label="Profile Views"
              color="text-green-600"
            />
            <PerformanceStat
              value={userStats.activeListings}
              label="Active Listings"
              color="text-purple-600"
            />
          </div>
        </CollapsibleSection>
      </div>

      {isEditModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            modalFade ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseEditModal}
        >
          <div
            className="w-full max-w-md p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Listing</h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-500 transition-colors hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter listing title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 text-gray-600 rounded-md hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ Icon, label, value, color }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <div className="flex items-center">
      <Icon className={`h-8 w-8 ${color}`} />
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const QuickActionButton = ({ icon: Icon, label, href, color, navigate }) => (
  <button
    onClick={() => navigate(href)}
    className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50"
  >
    <Icon className={`h-8 w-8 ${color} mx-auto mb-2`} />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const CollapsibleSection = ({
  title,
  expanded,
  setExpanded,
  children,
  className = "",
}) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    <div
      className="flex items-center justify-between p-4 border-b cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-gray-400">{expanded ? "−" : "+"}</span>
    </div>
    {expanded && <div className="p-4">{children}</div>}
  </div>
);

const PerformanceStat = ({ value, label, color }) => (
  <div className="text-center">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default UserDashboard;
