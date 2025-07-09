import { useState, useRef } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Sample business data
const businesses = [
  {
    id: 1,
    name: "The Coffee House",
    featured: "2024-01-15",
    category: "Restaurant",
    location: "New York, NY",
    rating: 4.5,
    ratingCount: 128,
    status: "Active",
    owner: "John Smith",
    address: "123 Coffee St",
    email: "coffee@example.com",
    hours: [
      { day: "Monday", from: "09:00", to: "17:00" },
      { day: "Tuesday", from: "09:00", to: "17:00" },
      { day: "Wednesday", from: "09:00", to: "17:00" },
      { day: "Thursday", from: "09:00", to: "17:00" },
      { day: "Friday", from: "09:00", to: "17:00" },
    ],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "FAQ 1", answer: "Answer 1" }],
    gallery: ["img1.jpg", "img2.jpg"],
    profilePhoto: "profile1.jpg",
    coverPhoto: "cover1.jpg",
    licenses: "license1.jpg",
  },
  {
    id: 2,
    name: "Tech Solutions Inc",
    featured: "2024-01-14",
    category: "Services",
    location: "San Francisco, CA",
    rating: 4.8,
    ratingCount: 89,
    status: "Active",
    owner: "Sarah Johnson",
    address: "456 Tech Ave",
    email: "tech@example.com",
    hours: [
      { day: "Monday", from: "08:00", to: "17:00" },
      { day: "Tuesday", from: "08:00", to: "17:00" },
      { day: "Wednesday", from: "08:00", to: "17:00" },
      { day: "Thursday", from: "08:00", to: "17:00" },
      { day: "Friday", from: "08:00", to: "17:00" },
    ],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "Support?", answer: "24/7" }],
    gallery: ["img3.jpg", "img4.jpg"],
    profilePhoto: "profile2.jpg",
    coverPhoto: "cover2.jpg",
    licenses: "license2.jpg",
  },
  {
    id: 3,
    name: "Fashion Boutique",
    featured: "2024-01-13",
    category: "Retail",
    location: "Los Angeles, CA",
    rating: 4.2,
    ratingCount: 45,
    status: "Pending",
    owner: "Mike Brown",
    address: "789 Fashion Rd",
    email: "fashion@example.com",
    hours: [
      { day: "Monday", from: "10:00", to: "19:00" },
      { day: "Tuesday", from: "10:00", to: "19:00" },
      { day: "Wednesday", from: "10:00", to: "19:00" },
      { day: "Thursday", from: "10:00", to: "19:00" },
      { day: "Friday", from: "10:00", to: "19:00" },
    ],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "Returns?", answer: "30 days" }],
    gallery: ["img5.jpg"],
    profilePhoto: "profile3.jpg",
    coverPhoto: "cover3.jpg",
    licenses: "license3.jpg",
  },
  {
    id: 4,
    name: "Fitness Center Pro",
    featured: "2024-01-12",
    category: "Health & Fitness",
    location: "Chicago, IL",
    rating: 4.7,
    ratingCount: 203,
    status: "Active",
    owner: "Emily Davis",
    address: "101 Fitness Ln",
    email: "fitness@example.com",
    hours: [
      { day: "Monday", from: "06:00", to: "21:00" },
      { day: "Tuesday", from: "06:00", to: "21:00" },
      { day: "Wednesday", from: "06:00", to: "21:00" },
      { day: "Thursday", from: "06:00", to: "21:00" },
      { day: "Friday", from: "06:00", to: "21:00" },
    ],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "Classes?", answer: "Yes" }],
    gallery: ["img6.jpg", "img7.jpg"],
    profilePhoto: "profile4.jpg",
    coverPhoto: "cover4.jpg",
    licenses: "license4.jpg",
  },
  {
    id: 5,
    name: "Digital Marketing Agency",
    featured: "2024-01-11",
    category: "Services",
    location: "Miami, FL",
    rating: 4.4,
    ratingCount: 67,
    status: "Expired",
    owner: "David Wilson",
    address: "202 Digital St",
    email: "digital@example.com",
    hours: [
      { day: "Monday", from: "09:00", to: "18:00" },
      { day: "Tuesday", from: "09:00", to: "18:00" },
      { day: "Wednesday", from: "09:00", to: "18:00" },
      { day: "Thursday", from: "09:00", to: "18:00" },
      { day: "Friday", from: "09:00", to: "18:00" },
    ],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "Pricing?", answer: "Contact us" }],
    gallery: ["img8.jpg"],
    profilePhoto: "profile5.jpg",
    coverPhoto: "cover5.jpg",
    licenses: "license5.jpg",
  },
];

function AdminBusinessesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBusiness, setEditBusiness] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    featured: "",
    category: "",
    location: "",
    status: "Active",
    rating: 0,
    owner: "",
    address: "",
    email: "",
    hours: [{ day: "Monday", from: "09:00", to: "17:00" }],
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      youtube: "",
    },
    faq: [{ question: "", answer: "" }],
    gallery: [],
    profilePhoto: "",
    coverPhoto: "",
    licenses: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0);
  const fileInputRef = useRef(null);

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch = business.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || business.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      business.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [name]: value },
    }));
  };

  const handleHoursChange = (index, field, value) => {
    setFormData((prev) => {
      const newHours = [...prev.hours];
      newHours[index] = { ...newHours[index], [field]: value };
      return { ...prev, hours: newHours };
    });
  };

  const addHour = () => {
    setFormData((prev) => ({
      ...prev,
      hours: [...prev.hours, { day: "Saturday", from: "09:00", to: "17:00" }],
    }));
  };

  const removeHour = (index) => {
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => {
      const newFaq = [...prev.faq];
      newFaq[index] = { ...newFaq[index], [field]: value };
      return { ...prev, faq: newFaq };
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => {
      const newFaq = prev.faq.filter((_, i) => i !== index);
      setCurrentFaqIndex(Math.min(currentFaqIndex, newFaq.length - 1));
      return { ...prev, faq: newFaq };
    });
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    if (files.length > 10) {
      toast.error("Maximum 10 images allowed!");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      gallery: files,
    }));
  };

  const handlePhotoChange = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleRatingChange = (e) => {
    const newRating = parseFloat(e.target.value);
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBusiness) {
      const updatedBusinesses = businesses.map((b) =>
        b.id === editBusiness.id ? { ...b, ...formData } : b
      );
      toast.success("Business updated successfully!");
    } else {
      const newBusiness = { id: Date.now(), ...formData, ratingCount: 0 };
      businesses.push(newBusiness);
      toast.success("Business added successfully!");
    }
    setIsModalOpen(false);
    setEditBusiness(null);
    setFormData({
      id: null,
      name: "",
      featured: "",
      category: "",
      location: "",
      status: "Active",
      rating: 0,
      owner: "",
      address: "",
      email: "",
      hours: [{ day: "Monday", from: "09:00", to: "17:00" }],
      social: {
        facebook: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        youtube: "",
      },
      faq: [{ question: "", answer: "" }],
      gallery: [],
      profilePhoto: "",
      coverPhoto: "",
      licenses: "",
    });
    setCurrentStep(1);
    setCurrentFaqIndex(0);
  };

  const handleEdit = (business) => {
    setEditBusiness(business);
    setFormData({
      ...business,
      gallery: business.gallery.map((name) => ({ name })),
    });
    setIsModalOpen(true);
    setCurrentStep(1);
    setCurrentFaqIndex(0);
  };

  const handleDelete = (id) => {
    toast(
      <div>
        <p>Are you sure you want to delete this business?</p>
        <div className="flex justify-end gap-2 mt-3 xs:mt-4">
          <button
            onClick={() => toast.dismiss()}
            className="px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const index = businesses.findIndex((b) => b.id === id);
              if (index !== -1) {
                businesses.splice(index, 1);
                toast.success("Business deleted successfully!");
              }
              toast.dismiss();
            }}
            className="px-2 xs:px-3 py-1 xs:py-1.5 text-xs xs:text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
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

  const renderStars = (rating) => {
    const totalStars = 5;
    const starRating = Math.min(totalStars, Math.max(0, rating));
    const filledStars = Math.floor(starRating);
    const hasHalfStar = starRating % 1 !== 0;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        stars.push(
          <StarIcon
            key={i}
            className="w-3 xs:w-3.5 sm:w-4 md:w-4.5 h-3 xs:h-3.5 sm:h-4 md:h-4.5 text-yellow-400 fill-current"
          />
        );
      } else if (hasHalfStar && i === filledStars + 1) {
        stars.push(
          <div
            key={i}
            className="relative w-3 xs:w-3.5 sm:w-4 md:w-4.5 h-3 xs:h-3.5 sm:h-4 md:h-4.5"
          >
            <StarIcon className="absolute w-3 xs:w-3.5 sm:w-4 md:w-4.5 h-3 xs:h-3.5 sm:h-4 md:h-4.5 text-gray-300" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${(starRating % 1) * 100}%`, height: "100%" }}
            >
              <StarIcon className="w-3 xs:w-3.5 sm:w-4 md:w-4.5 h-3 xs:h-3.5 sm:h-4 md:h-4.5 text-yellow-400 fill-current" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            className="w-3 xs:w-3.5 sm:w-4 md:w-4.5 h-3 xs:h-3.5 sm:h-4 md:h-4.5 text-gray-300"
          />
        );
      }
    }
    return <div className="flex gap-0.5 xs:gap-1">{stars}</div>;
  };

  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Social Links" },
    { id: 3, name: "Business Hours" },
    { id: 4, name: "FAQ" },
    { id: 5, name: "Media" },
  ];

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col items-start justify-between gap-2 mb-3 sm:flex-row sm:items-center xs:mb-4 sm:mb-6 xs:gap-3 sm:gap-4">
        <h1 className="text-base font-semibold text-gray-900 xs:text-lg sm:text-xl md:text-2xl lg:text-3xl">
          Business Listings
        </h1>
        <Link
          to="/list-business"
          className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full sm:w-auto"
        >
          <PlusIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />
          Add New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-2 mb-3 xs:grid-cols-2 sm:grid-cols-3 xs:gap-3 sm:gap-4 xs:mb-4 sm:mb-6">
        <div className="relative w-full">
          <MagnifyingGlassIcon className="absolute w-3 xs:w-4 sm:w-5 h-3 xs:h-4 sm:h-5 text-gray-400 left-2 xs:left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search listings..."
            className="w-full py-1 xs:py-1.5 sm:py-2 pl-6 xs:pl-8 sm:pl-10 pr-2 xs:pr-3 sm:pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Menu as="div" className="relative w-full">
          <Menu.Button className="flex items-center w-full gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-xs xs:text-sm sm:text-base truncate">
            <span className="text-gray-700 truncate">{statusFilter}</span>
            <svg
              className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-36 xs:w-40 sm:w-48 py-1 mt-1 xs:mt-1.5 sm:mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              {["All Status", "Active", "Pending", "Expired"].map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      onClick={() => setStatusFilter(status)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm text-gray-700`}
                    >
                      {status}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative w-full">
          <Menu.Button className="flex items-center w-full gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-xs xs:text-sm sm:text-base truncate">
            <span className="text-gray-700 truncate">{categoryFilter}</span>
            <svg
              className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-36 xs:w-40 sm:w-48 py-1 mt-1 xs:mt-1.5 sm:mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              {[
                "All Categories",
                "Restaurant",
                "Services",
                "Retail",
                "Health & Fitness",
              ].map((category) => (
                <Menu.Item key={category}>
                  {({ active }) => (
                    <button
                      onClick={() => setCategoryFilter(category)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm text-gray-700`}
                    >
                      {category}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[120px] sm:min-w-[150px] md:min-w-[180px]">
                    Business
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[100px] sm:min-w-[120px]">
                    Category
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[100px] sm:min-w-[120px]">
                    Location
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[80px] sm:min-w-[100px]">
                    Rating
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[80px] sm:min-w-[100px]">
                    Status
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[100px] sm:min-w-[120px]">
                    Owner
                  </th>
                  <th className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium tracking-wider text-left text-gray-500 uppercase min-w-[80px] sm:min-w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBusinesses.map((business) => (
                  <tr key={business.id}>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <UserCircleIcon className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 mr-1 xs:mr-1.5 sm:mr-2 text-gray-400" />
                        <div>
                          <div className="text-xs xs:text-sm font-medium text-gray-900 truncate max-w-[100px] xs:max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[200px]">
                            {business.name}
                          </div>
                          {business.featured && (
                            <div className="text-xs text-yellow-600 truncate">
                              {business.featured} Featured
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 text-xs xs:text-sm text-gray-500 whitespace-nowrap truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px]">
                      {business.category}
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 text-xs xs:text-sm text-gray-500 whitespace-nowrap truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px]">
                      {business.location}
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(business.rating)}
                        <span className="ml-1 xs:ml-1.5 sm:ml-2 text-xs xs:text-sm text-gray-600">
                          {business.rating} ({business.ratingCount})
                        </span>
                      </div>
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 whitespace-nowrap">
                      <span
                        className={`px-1 xs:px-1.5 sm:px-2 py-0.5 text-xs xs:text-sm font-semibold rounded-full ${
                          business.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : business.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {business.status}
                      </span>
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 text-xs xs:text-sm text-gray-500 whitespace-nowrap truncate max-w-[80px] xs:max-w-[100px] sm:max-w-[120px]">
                      {business.owner}
                    </td>
                    <td className="px-2 xs:px-2.5 sm:px-3 md:px-4 py-2 xs:py-3 sm:py-4 text-xs xs:text-sm font-medium whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(business)}
                        className="mr-1 text-blue-600 xs:mr-2 sm:mr-3 hover:text-blue-800"
                      >
                        <PencilIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(business.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-2 space-y-2 xs:p-3 sm:p-4 xs:space-y-3 sm:space-y-4 md:hidden">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className="p-2 rounded-lg shadow xs:p-3 sm:p-4 bg-gray-50"
            >
              <div className="flex items-center mb-1.5 xs:mb-2">
                <UserCircleIcon className="w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 mr-1 xs:mr-1.5 sm:mr-2 text-gray-400" />
                <div>
                  <div className="text-xs font-medium text-gray-900 truncate xs:text-sm">
                    {business.name}
                  </div>
                  {business.featured && (
                    <div className="text-xs text-yellow-600 truncate">
                      {business.featured} Featured
                    </div>
                  )}
                </div>
              </div>
              <div className="text-xs text-gray-500 xs:text-sm">
                <strong>Category:</strong> {business.category}
              </div>
              <div className="text-xs text-gray-500 xs:text-sm">
                <strong>Location:</strong> {business.location}
              </div>
              <div className="flex items-center mt-1 xs:mt-1.5 sm:mt-2">
                <strong className="mr-1 xs:mr-1.5 sm:mr-2 text-xs xs:text-sm text-gray-500">
                  Rating:
                </strong>
                {renderStars(business.rating)}
                <span className="ml-1 xs:ml-1.5 sm:ml-2 text-xs xs:text-sm text-gray-600">
                  {business.rating} ({business.ratingCount})
                </span>
              </div>
              <div className="mt-1 xs:mt-1.5 sm:mt-2">
                <strong className="text-xs text-gray-500 xs:text-sm">
                  Status:
                </strong>
                <span
                  className={`ml-1 xs:ml-1.5 sm:ml-2 px-1 xs:px-1.5 sm:px-2 py-0.5 text-xs xs:text-sm font-semibold rounded-full ${
                    business.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : business.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {business.status}
                </span>
              </div>
              <div className="mt-1 xs:mt-1.5 sm:mt-2 text-xs xs:text-sm text-gray-500">
                <strong>Owner:</strong> {business.owner}
              </div>
              <div className="flex gap-2 mt-2 xs:gap-3 sm:gap-4 xs:mt-3 sm:mt-4">
                <button
                  onClick={() => handleEdit(business)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />
                </button>
                <button
                  onClick={() => handleDelete(business.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 xs:p-2.5 sm:p-3 md:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg shadow-lg w-full max-w-[calc(100vw-1rem)] xs:max-w-[360px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[768px] xl:max-w-[896px] 2xl:max-w-[1024px] max-h-[calc(100vh-2rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-sm font-semibold xs:text-base sm:text-lg md:text-xl xs:mb-3 sm:mb-4">
              {editBusiness ? "Edit Business" : "Add New Listing"}
            </h2>
            <div className="flex mb-2 overflow-x-auto border-b border-gray-200 xs:mb-3 sm:mb-4 md:mb-6 scrollbar-hidden">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex-1 py-1 xs:py-1.5 sm:py-2 px-1 xs:px-1.5 sm:px-2 md:px-4 text-xs xs:text-sm sm:text-base font-medium text-center whitespace-nowrap ${
                    currentStep === step.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {step.name}
                </button>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6"
            >
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Listing Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full p-1 xs:p-1.5 sm:p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Featured Date
                    </label>
                    <input
                      type="date"
                      name="featured"
                      value={formData.featured}
                      onChange={handleInputChange}
                      className="block w-full p-1 xs:p-1.5 sm:p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      name="owner"
                      value={formData.owner}
                      onChange={handleInputChange}
                      className="block w-full p-1 xs:p-1.5 sm:p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className="block w-full p-1 xs:p-1.5 sm:p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="block w-full p-1 xs:p-1.5 sm:p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                      required
                    />
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                    Social Links
                  </label>
                  {[
                    "facebook",
                    "instagram",
                    "linkedin",
                    "twitter",
                    "youtube",
                  ].map((platform) => (
                    <input
                      key={platform}
                      type="url"
                      name={platform}
                      value={formData.social[platform]}
                      onChange={handleSocialChange}
                      placeholder={
                        platform.charAt(0).toUpperCase() + platform.slice(1)
                      }
                      className="block w-full p-1 xs:p-1.5 sm:p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm sm:text-base"
                    />
                  ))}
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                    Business Hours
                  </label>
                  <div className="mt-1 xs:mt-1.5 sm:mt-2 space-y-2 xs:space-y-3 sm:space-y-4">
                    {formData.hours.map((hour, index) => (
                      <div
                        key={index}
                        className="flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-1.5 sm:gap-2"
                      >
                        <select
                          value={hour.day}
                          onChange={(e) =>
                            handleHoursChange(index, "day", e.target.value)
                          }
                          className="w-full xs:w-1/3 p-1 xs:p-1.5 sm:p-2 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base"
                        >
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                          ].map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <input
                          type="time"
                          value={hour.from}
                          onChange={(e) =>
                            handleHoursChange(index, "from", e.target.value)
                          }
                          className="w-full xs:w-1/3 p-1 xs:p-1.5 sm:p-2 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base"
                        />
                        <input
                          type="time"
                          value={hour.to}
                          onChange={(e) =>
                            handleHoursChange(index, "to", e.target.value)
                          }
                          className="w-full xs:w-1/3 p-1 xs:p-1.5 sm:p-2 border border-gray-300 rounded-md text-xs xs:text-sm sm:text-base"
                        />
                        <button
                          type="button"
                          onClick={() => removeHour(index)}
                          className="mt-1 text-red-600 xs:mt-0 hover:text-red-800"
                        >
                          <svg
                            className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9.293l4.243-4.243a1 1 0 011.414 1.414L11.414 10l4.243 4.243a1 1 0 01-1.414 1.414L10 11.414l-4.243 4.243a1 1 0 01-1.414-1.414L8.586 10 4.343 5.757a1 1 0 011.414-1.414L10 9.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addHour}
                      className="px-2 xs:px-2.5 sm:px-3 py-1 xs:py-1.5 sm:py-1.5 mt-1 xs:mt-1.5 sm:mt-2 text-xs xs:text-sm sm:text-base text-white bg-green-500 rounded-md hover:bg-green-600"
                    >
                      Add Hour
                    </button>
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-900 xs:mb-3 sm:mb-4 xs:text-base sm:text-lg">
                    Frequently Asked Questions
                  </label>
                  <p className="mb-2 text-xs text-gray-600 xs:mb-3 sm:mb-4 xs:text-sm sm:text-base">
                    Create and manage FAQs to help your customers.
                  </p>
                  <div className="space-y-3 xs:space-y-4 sm:space-y-5">
                    {formData.faq.length > 0 && (
                      <div className="p-2 rounded-lg shadow-sm xs:p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                        <div className="mb-2 xs:mb-3 sm:mb-4">
                          <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                            Question
                          </label>
                          <input
                            type="text"
                            value={formData.faq[currentFaqIndex].question}
                            onChange={(e) =>
                              handleFaqChange(
                                currentFaqIndex,
                                "question",
                                e.target.value
                              )
                            }
                            placeholder="Enter question"
                            className="block w-full mt-1 text-xs font-semibold text-gray-800 placeholder-gray-500 bg-transparent border-0 xs:text-sm sm:text-base focus:ring-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                            Answer
                          </label>
                          <textarea
                            value={formData.faq[currentFaqIndex].answer}
                            onChange={(e) =>
                              handleFaqChange(
                                currentFaqIndex,
                                "answer",
                                e.target.value
                              )
                            }
                            placeholder="Enter answer"
                            className="block w-full mt-1 text-xs text-gray-700 placeholder-gray-500 bg-transparent border-0 resize-none xs:text-sm sm:text-base focus:ring-0 focus:outline-none"
                            rows="3"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFaq(currentFaqIndex)}
                          className="mt-2 text-red-600 xs:mt-3 sm:mt-4 hover:text-red-800"
                        >
                          <svg
                            className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9.293l4.243-4.243a1 1 0 011.414 1.414L11.414 10l4.243 4.243a1 1 0 01-1.414 1.414L10 11.414l-4.243 4.243a1 1 0 01-1.414-1.414L8.586 10 4.343 5.757a1 1 0 011.414-1.414L10 9.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    {formData.faq.length > 1 && (
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentFaqIndex((prev) => Math.max(prev - 1, 0))
                          }
                          className="p-1 xs:p-1.5 sm:p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
                          disabled={currentFaqIndex === 0}
                        >
                          <svg
                            className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <div className="flex gap-1 xs:gap-1.5 sm:gap-2">
                          {formData.faq.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentFaqIndex(index)}
                              className={`w-1 xs:w-1.5 sm:w-2 h-1 xs:h-1.5 sm:h-2 rounded-full ${
                                index === currentFaqIndex
                                  ? "bg-blue-600"
                                  : "bg-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentFaqIndex((prev) =>
                              Math.min(prev + 1, formData.faq.length - 1)
                            )
                          }
                          className="p-1 xs:p-1.5 sm:p-2 bg-gray-300 rounded-full hover:bg-gray-400 disabled:opacity-50"
                          disabled={currentFaqIndex === formData.faq.length - 1}
                        >
                          <svg
                            className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={addFaq}
                      className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                      <PlusIcon className="w-3 h-3 xs:w-4 sm:w-5 xs:h-4 sm:h-5" />{" "}
                      Add New FAQ
                    </button>
                  </div>
                </div>
              )}
              {currentStep === 5 && (
                <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handlePhotoChange(e, "profilePhoto")}
                      className="block w-full mt-1 text-xs xs:text-sm sm:text-base text-gray-500 file:mr-2 xs:file:mr-3 sm:file:mr-4 file:py-1 xs:file:py-1.5 sm:file:py-2 file:px-2 xs:file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs xs:file:text-sm sm:file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept="image/*"
                      ref={fileInputRef}
                    />
                    {formData.profilePhoto && (
                      <img
                        src={
                          typeof formData.profilePhoto === "string"
                            ? formData.profilePhoto
                            : URL.createObjectURL(formData.profilePhoto)
                        }
                        alt="Profile Preview"
                        className="object-cover w-20 h-20 mt-1 rounded-md xs:w-24 sm:w-28 md:w-32 xs:h-24 sm:h-28 md:h-32 xs:mt-2"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Cover Photo
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handlePhotoChange(e, "coverPhoto")}
                      className="block w-full mt-1 text-xs xs:text-sm sm:text-base text-gray-500 file:mr-2 xs:file:mr-3 sm:file:mr-4 file:py-1 xs:file:py-1.5 sm:file:py-2 file:px-2 xs:file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs xs:file:text-sm sm:file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept="image/*"
                    />
                    {formData.coverPhoto && (
                      <img
                        src={
                          typeof formData.coverPhoto === "string"
                            ? formData.coverPhoto
                            : URL.createObjectURL(formData.coverPhoto)
                        }
                        alt="Cover Preview"
                        className="object-cover w-full h-16 mt-1 rounded-md xs:h-20 sm:h-24 md:h-32 xs:mt-2"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Licenses
                    </label>
                    <input
                      type="file"
                      onChange={(e) => handlePhotoChange(e, "licenses")}
                      className="block w-full mt-1 text-xs xs:text-sm sm:text-base text-gray-500 file:mr-2 xs:file:mr-3 sm:file:mr-4 file:py-1 xs:file:py-1.5 sm:file:py-2 file:px-2 xs:file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs xs:file:text-sm sm:file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept="image/*"
                    />
                    {formData.licenses && (
                      <img
                        src={
                          typeof formData.licenses === "string"
                            ? formData.licenses
                            : URL.createObjectURL(formData.licenses)
                        }
                        alt="License Preview"
                        className="object-cover w-20 h-20 mt-1 rounded-md xs:w-24 sm:w-28 md:w-32 xs:h-24 sm:h-28 md:h-32 xs:mt-2"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 xs:text-sm sm:text-base">
                      Gallery Images (max 10)
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleGalleryChange}
                      className="block w-full mt-1 text-xs xs:text-sm sm:text-base text-gray-500 file:mr-2 xs:file:mr-3 sm:file:mr-4 file:py-1 xs:file:py-1.5 sm:file:py-2 file:px-2 xs:file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs xs:file:text-sm sm:file:text-base file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      accept="image/*"
                    />
                    <p className="mt-1 text-xs text-gray-500 xs:text-sm">
                      Selected: {formData.gallery.length} / 10 images
                    </p>
                    <div className="grid grid-cols-1 gap-2 mt-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xs:gap-3 sm:gap-4 xs:mt-2">
                      {formData.gallery.map((file, index) => (
                        <img
                          key={index}
                          src={
                            typeof file === "string"
                              ? file
                              : URL.createObjectURL(file)
                          }
                          alt={`Gallery ${index}`}
                          className="object-cover w-20 h-20 rounded-md xs:w-24 sm:w-28 md:w-32 xs:h-24 sm:h-28 md:h-32"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-3 xs:mt-4 sm:mt-5 md:mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 text-xs xs:text-sm sm:text-base text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  >
                    Previous
                  </button>
                )}
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 ml-auto text-xs xs:text-sm sm:text-base text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-2 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 ml-auto text-xs xs:text-sm sm:text-base text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBusinessesPage;
