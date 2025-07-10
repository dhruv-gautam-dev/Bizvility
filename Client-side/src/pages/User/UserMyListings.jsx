import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserListings } from "../../data/UserData/userBusinessLIsting";

const UserMyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch user listings
  useEffect(() => {
    const loadListings = async () => {
      try {
        setLoading(true);
        const data = await fetchUserListings(userId, token);
        console.log(data);

        const transformedListings = data.listings.map((listing) => {
          const parsedDate = new Date(listing.createdAt);
          const formattedDate = isNaN(parsedDate.getTime())
            ? "Unknown"
            : parsedDate.toLocaleDateString("en-IN");

          return {
            id: listing._id,
            title: listing.name,
            category: listing.category || "Unknown",
            location: listing.location
              ? `${listing.location.address}, ${listing.location.city}, ${listing.location.state}`
              : "Unknown",
            status: "Active",
            rating: listing.averageRating || 0,
            reviews: listing.numberOfReviews || 0,
            views: 0,
            date: formattedDate,
            featured: false,
            image: listing.profileImage
              ? `http://localhost:5000/${listing.profileImage.replace(
                  /\\/g,
                  "/"
                )}`
              : "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
          };
        });

        setListings(transformedListings);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, [userId, token]);

  // Filter listings based on search term and status
  const filteredListings = listings.filter((listing) => {
    const name = listing.title?.toLowerCase() || "";
    const location = listing.location?.toLowerCase() || "";
    const status = listing.status?.toLowerCase() || "";
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || status === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Helper function to get status color
  const getStatusColor = (status) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Inactive: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  // Handle view action (same as UserDashboard)
  const handleView = (listing) => {
    navigate(`/categories/health/store/${listing.id}`);
  };

  // Handle edit action (fetch business data and navigate to form)
  const handleEdit = async (listing) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/business/byid/${listing.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch business data: ${response.statusText}`
        );
      }

      const businessData = await response.json();
      console.log(businessData);
      navigate("/list-business/form", {
        state: { business: businessData },
      });
    } catch (err) {
      console.error("Error fetching business data:", err);
      toast.error("Failed to load business data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Handle delete action
  const handleDelete = (listing) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-900">
            Are you sure you want to delete "{listing.title}"?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={closeToast}
              className="px-3 py-1 text-sm text-gray-600 rounded hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setListings((prev) => prev.filter((l) => l.id !== listing.id));
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

  // Handle add new listing (navigate to form)
  const handleAddListing = () => {
    navigate("/list-business");
  };

  // Handle create event action (navigate to event form with listing ID and business ID)
  const handleCreateEvent = (listingId, businessId) => {
    navigate(`/list-event/form`, {
      state: { listingId },
    });
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!listings.length)
    return <div className="p-6 text-center">No listings found.</div>;

  return (
    <div className="p-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Listings</h1>
        <button
          onClick={handleAddListing}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Listing
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Listings</h3>
          <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active Listings</h3>
          <p className="text-2xl font-bold text-green-600">
            {listings.filter((l) => l.status === "Active").length}
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">
            {listings.reduce((sum, l) => sum + l.views, 0)}
          </p>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search my listings..."
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
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-4 ">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="p-6 border-2 rounded border-gray-50 hover:bg-gray-50"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="object-cover w-20 h-20 rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {listing.title}
                    </h3>
                    {listing.featured && (
                      <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-600">
                      {listing.category}
                    </span>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span>{listing.views} views</span>
                      {listing.reviews > 0 && (
                        <div className="flex items-center">
                          <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                          <span>
                            {listing.rating} ({listing.reviews} reviews)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-stretch text-sm text-gray-500">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={() => handleView(listing)}
                    className="p-2 text-blue-600 rounded hover:text-blue-800 hover:bg-blue-50"
                    title="View Listing"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(listing)}
                    className="p-2 text-green-600 rounded hover:text-green-800 hover:bg-green-50"
                    title="Edit Listing"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => handleCreateEvent(listing.id)}
                    className="p-2 text-purple-600 rounded hover:text-purple-800 hover:bg-purple-50"
                    title="Create Event for Listing"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserMyListings;
