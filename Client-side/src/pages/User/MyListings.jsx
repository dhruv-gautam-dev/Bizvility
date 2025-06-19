import { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialListings = [
  {
    id: 1,
    title: "The Coffee House",
    category: "Restaurant",
    location: "New York, NY",
    status: "Active",
    rating: 4.5,
    reviews: 128,
    views: 1247,
    date: "2024-01-15",
    featured: true,
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    id: 2,
    title: "Tech Solutions Inc",
    category: "Services",
    location: "San Francisco, CA",
    status: "Active",
    rating: 4.8,
    reviews: 89,
    views: 892,
    date: "2024-01-14",
    featured: false,
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
  },
  {
    id: 3,
    title: "Fashion Boutique",
    category: "Retail",
    location: "Los Angeles, CA",
    status: "Pending",
    rating: 0,
    reviews: 0,
    views: 0,
    date: "2024-01-13",
    featured: false,
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
];

export default function UserMyListings() {
  const [listings, setListings] = useState(initialListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFade, setModalFade] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "",
    location: "",
    image: null,
  });
  const [editingListing, setEditingListing] = useState(null);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || listing.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

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

  const handleOpenModal = (listing = null) => {
    if (listing) {
      setEditingListing(listing);
      setFormData({
        id: listing.id,
        title: listing.title,
        category: listing.category,
        location: listing.location,
        image: null,
      });
    } else {
      setEditingListing(null);
      setFormData({
        id: null,
        title: "",
        category: "",
        location: "",
        image: null,
      });
    }
    setModalFade(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalFade(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveListing = () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.location ||
      (!formData.image && !editingListing)
    ) {
      toast.warning("Please fill in all fields and select an image.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    let imageUrl = editingListing ? editingListing.image : null;

    if (formData.image) {
      imageUrl = URL.createObjectURL(formData.image);
    }

    if (editingListing) {
      setListings(
        listings.map((listing) =>
          listing.id === formData.id
            ? {
                ...listing,
                title: formData.title,
                category: formData.category,
                location: formData.location,
                image: imageUrl || listing.image,
              }
            : listing
        )
      );
      toast.success("Listing updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      const newListing = {
        id: listings.length + 1,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        status: "Pending",
        rating: 0,
        reviews: 0,
        views: 0,
        date: currentDate,
        featured: false,
        image: imageUrl,
      };
      setListings([...listings, newListing]);
      toast.success("Listing added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    }

    handleCloseModal();
  };

  const handleEdit = (listing) => {
    handleOpenModal(listing);
  };

  const handleDelete = (listing) => {
    // Show confirmation toast with buttons
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

  const handleView = (listing) => {
    window.open(listing.image, "_blank");
  };

  return (
    <div className="p-6">
      {/* <ToastContainer /> */}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Listings</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Listing
        </button>
      </div>

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

        <div className="divide-y divide-gray-200">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="p-6 hover:bg-gray-50">
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
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                  </div>
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
                    <span>Created: {listing.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                    onClick={() => handleDelete(listing)}
                    className="p-2 text-red-600 rounded hover:text-red-800 hover:bg-red-50"
                    title="Delete Listing"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
            modalFade ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-md p-8 transition-all duration-300 transform bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingListing ? "Edit Listing" : "Add New Listing"}
              </h2>
              <button
                onClick={handleCloseModal}
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
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter listing title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Services">Services</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location (e.g., New York, NY)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {editingListing && !formData.image && (
                  <p className="mt-1 text-sm text-gray-500">
                    Current image:{" "}
                    <a
                      href={editingListing.image}
                      target="_blank"
                      className="text-blue-600"
                    >
                      View
                    </a>
                  </p>
                )}
                {formData.image && (
                  <p className="mt-1 text-sm text-gray-500">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 rounded-md hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveListing}
                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <PlusIcon className="w-5 h-5" />
                {editingListing ? "Save Changes" : "Add Listing"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
