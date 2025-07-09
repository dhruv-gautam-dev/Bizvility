import { useState, useEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function AdminBusinessesPage() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [currentFAQIndex, setCurrentFAQIndex] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    location: "",
    email: "",
    businessHours: [
      { day: "Monday", isClosed: false, open: "", close: "" },
      { day: "Tuesday", isClosed: false, open: "", close: "" },
      { day: "Wednesday", isClosed: false, open: "", close: "" },
      { day: "Thursday", isClosed: false, open: "", close: "" },
      { day: "Friday", isClosed: false, open: "", close: "" },
      { day: "Saturday", isClosed: false, open: "", close: "" },
      { day: "Sunday", isClosed: false, open: "", close: "" },
    ],
    socialLinks: {
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
    },
    faq: [{ question: "", answer: "" }],
    galleryImages: [],
    profilePhoto: null,
    profilePhotoFile: null, // Added for raw file
    coverPhoto: null,
    licensesImage: null,
    category: "Restaurant",
    status: "Active",
    rating: 0,
    reviews: 0,
    featured: false,
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleView = (listing) => {
    console.log("Viewing listing:", listing);
    navigate(`/categories/health/store/${listing.id}`);
  };

  const categories = ["Restaurant", "Services", "Retail", "Health & Fitness"];
  const totalSteps = 5;
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:5000/api";
  const IMAGE_BASE_URL = "http://localhost:5000/";
  // ...existing imports...

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    console.log(
      "Refresh Token:",
      refreshToken ? refreshToken.substring(0, 20) + "..." : "None"
    );
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

  useEffect(() => {
    const fetchListings = async () => {
      let token = localStorage.getItem("token");
      console.log(
        "Retrieved Token:",
        token ? token.substring(0, 20) + "..." : "None"
      );
      if (!token) {
        toast.error("Please log in to view listings.", {
          position: "top-right",
          autoClose: 3000,
          theme: "light",
        });
        setLoading(false);
        return;
      }

      try {
        const IMAGEs_BASE_URL = import.meta.env.VITE_Image_URL;
        console.log("IMAGE_BASE_URL from .env:", IMAGEs_BASE_URL);
        // ...existing code...
        const response = await axios.get(
          `${API_BASE_URL}/superadmin/businesses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        console.log("API Response:", response.data);
        if (!response.data.success)
          throw new Error(response.data.message || "Failed to fetch listings");

        const data = response.data.data.map((listing) => {
          let category = listing.category?.trim() || "Health & Fitness";
          if (category === "Health" || category === "Health & Medical") {
            category = "Health & Fitness";
          } else if (!categories.includes(category)) {
            category = "Services";
          }

          console.log(
            "Raw profileImage:",
            listing.profileImage || listing.profile_image || "None"
          );

          const profileImage =
            listing.profileImage || listing.profile_image || null;
          let profilePhoto = null;
          if (profileImage) {
            const cleanedPath = profileImage
              .replace(/^Uploads[\\\/]?/, "")
              .replace(/\\/g, "/");
            profilePhoto = `${IMAGE_BASE_URL}uploads/${cleanedPath}`;
          }

          console.log("Mapped profilePhoto:", profilePhoto);

          return {
            id: listing._id || "",
            title: listing.name || "",
            category,
            location: listing.location?.address || "Unknown",
            status: listing.status || "Active",
            rating: Number(listing.rating) || 0,
            reviews: Number(listing.reviews) || 0,
            owner: listing.ownerName || listing.owner?.fullName || "Unknown",
            date: listing.createdAt
              ? new Date(listing.createdAt).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0],
            featured: listing.featured || false,
            profilePhoto,
          };
        });
        console.log("Mapped Listings:", data);
        setListings(data);
      } catch (err) {
        console.error("API Error:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        if (err.response?.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            try {
              const retryResponse = await axios.get(
                `${API_BASE_URL}/superadmin/businesses`,
                {
                  headers: {
                    Authorization: `Bearer ${newToken}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log("Retry API Response:", retryResponse.data);
              if (!retryResponse.data.success)
                throw new Error(
                  retryResponse.data.message || "Failed to fetch listings"
                );
              const data = retryResponse.data.data.map((listing) => {
                let category = listing.category?.trim() || "Health & Fitness";
                if (category === "Health" || category === "Health & Medical") {
                  category = "Health & Fitness";
                } else if (!categories.includes(category)) {
                  category = "Services";
                }

                console.log(
                  "Retry Raw profileImage:",
                  listing.profileImage || listing.profile_image || "None"
                );

                const profileImage =
                  listing.profileImage || listing.profile_image || null;
                let profilePhoto = null;
                if (profileImage) {
                  const cleanedPath = profileImage
                    .replace(/^Uploads[\\\/]?/, "")
                    .replace(/\\/g, "/");
                  profilePhoto = `${IMAGE_BASE_URL}uploads/${cleanedPath}`;
                }

                console.log("Retry Mapped profilePhoto:", profilePhoto);

                return {
                  id: listing._id || "",
                  title: listing.name || "",
                  category,
                  location: listing.location?.address || "Unknown",
                  status: listing.status || "Active",
                  rating: Number(listing.rating) || 0,
                  reviews: Number(listing.reviews) || 0,
                  owner:
                    listing.ownerName || listing.owner?.fullName || "Unknown",
                  date: listing.createdAt
                    ? new Date(listing.createdAt).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
                  featured: listing.featured || false,
                  profilePhoto,
                };
              });
              console.log("Retry Mapped Listings:", data);
              setListings(data);
            } catch (retryErr) {
              console.error("Retry Error:", {
                message: retryErr.message,
                status: retryErr.response?.status,
                data: retryErr.response?.data,
              });
              setError("Failed to load listings.");
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
          setError("Failed to load listings.");
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

    fetchListings();
  }, [navigate]);

  useEffect(() => {
    console.log(`Current step updated to: ${currentStep}`);
  }, [currentStep]);

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || listing.status.toLowerCase() === filterStatus;
    const matchesCategory =
      filterCategory === "all" || listing.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleOpenPopup = (listing = null) => {
    if (listing) {
      setEditingListing(listing);
      setFormData({
        title: listing.title,
        owner: listing.owner,
        location: listing.location,
        email: "",
        businessHours: [
          { day: "Monday", isClosed: false, open: "", close: "" },
          { day: "Tuesday", isClosed: false, open: "", close: "" },
          { day: "Wednesday", isClosed: false, open: "", close: "" },
          { day: "Thursday", isClosed: false, open: "", close: "" },
          { day: "Friday", isClosed: false, open: "", close: "" },
          { day: "Saturday", isClosed: false, open: "", close: "" },
          { day: "Sunday", isClosed: false, open: "", close: "" },
        ],
        socialLinks: {
          twitter: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          youtube: "",
        },
        faq: [{ question: "", answer: "" }],
        galleryImages: [],
        profilePhoto: listing.profilePhoto,
        profilePhotoFile: null, // Reset file
        coverPhoto: null,
        licensesImage: null,
        category: listing.category,
        status: listing.status,
        rating: listing.rating,
        reviews: listing.reviews,
        featured: listing.featured,
        date: listing.date,
      });
    } else {
      setEditingListing(null);
      setFormData({
        title: "",
        owner: "",
        location: "",
        email: "",
        businessHours: [
          { day: "Monday", isClosed: false, open: "", close: "" },
          { day: "Tuesday", isClosed: false, open: "", close: "" },
          { day: "Wednesday", isClosed: false, open: "", close: "" },
          { day: "Thursday", isClosed: false, open: "", close: "" },
          { day: "Friday", isClosed: false, open: "", close: "" },
          { day: "Saturday", isClosed: false, open: "", close: "" },
          { day: "Sunday", isClosed: false, open: "", close: "" },
        ],
        socialLinks: {
          twitter: "",
          facebook: "",
          instagram: "",
          linkedin: "",
          youtube: "",
        },
        faq: [{ question: "", answer: "" }],
        galleryImages: [],
        profilePhoto: null,
        profilePhotoFile: null,
        coverPhoto: null,
        licensesImage: null,
        category: "Restaurant",
        status: "Active",
        rating: 0,
        reviews: 0,
        featured: false,
        date: new Date().toISOString().split("T")[0],
      });
    }
    setCurrentStep(1);
    setCurrentFAQIndex(0);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingListing(null);
    setCurrentStep(1);
    setCurrentFAQIndex(0);
    setFormData({
      title: "",
      owner: "",
      location: "",
      email: "",
      businessHours: [
        { day: "Monday", isClosed: false, open: "", close: "" },
        { day: "Tuesday", isClosed: false, open: "", close: "" },
        { day: "Wednesday", isClosed: false, open: "", close: "" },
        { day: "Thursday", isClosed: false, open: "", close: "" },
        { day: "Friday", isClosed: false, open: "", close: "" },
        { day: "Saturday", isClosed: false, open: "", close: "" },
        { day: "Sunday", isClosed: false, open: "", close: "" },
      ],
      socialLinks: {
        twitter: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        youtube: "",
      },
      faq: [{ question: "", answer: "" }],
      galleryImages: [],
      profilePhoto: null,
      profilePhotoFile: null,
      coverPhoto: null,
      licensesImage: null,
      category: "Restaurant",
      status: "Active",
      rating: 0,
      reviews: 0,
      featured: false,
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("socialLinks.")) {
      const linkType = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [linkType]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleBusinessHoursChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedHours = [...prev.businessHours];
      updatedHours[index] = { ...updatedHours[index], [field]: value };
      if (field === "isClosed" && value) {
        updatedHours[index].open = "";
        updatedHours[index].close = "";
      }
      return { ...prev, businessHours: updatedHours };
    });
  };

  const handleFAQChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFAQ = [...prev.faq];
      updatedFAQ[index] = { ...updatedFAQ[index], [field]: value };
      return { ...prev, faq: updatedFAQ };
    });
  };

  const addFAQ = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
    setCurrentFAQIndex(formData.faq.length);
  };

  const removeFAQ = (index) => {
    setFormData((prev) => {
      const updatedFAQ = prev.faq.filter((_, i) => i !== index);
      return {
        ...prev,
        faq:
          updatedFAQ.length > 0 ? updatedFAQ : [{ question: "", answer: "" }],
      };
    });
    if (currentFAQIndex >= formData.faq.length - 1) {
      setCurrentFAQIndex(Math.max(0, formData.faq.length - 2));
    }
  };

  const prevFAQ = () => {
    setCurrentFAQIndex((prev) => Math.max(0, prev - 1));
  };

  const nextFAQ = () => {
    setCurrentFAQIndex((prev) => Math.min(formData.faq.length - 1, prev + 1));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log(`Selected ${field}:`, file.name);
      if (field === "profilePhoto") {
        setFormData((prev) => ({
          ...prev,
          profilePhoto: url,
          profilePhotoFile: file, // Store raw file
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [field]: url,
        }));
      }
    }
    e.target.value = "";
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 10 - formData.galleryImages.length;
    const newImages = files
      .slice(0, remainingSlots)
      .map((file) => URL.createObjectURL(file));
    console.log(
      "Selected gallery images:",
      files.map((f) => f.name)
    );
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages],
    }));
    e.target.value = "";
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.owner ||
      !formData.location ||
      !formData.category
    ) {
      toast.error("Please fill in all required fields!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    let token = localStorage.getItem("token");
    console.log(
      "Submit Token:",
      token ? token.substring(0, 20) + "..." : "None"
    );
    if (!token) {
      toast.error("Authentication required to save listing.", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.title);
    formDataToSend.append("ownerName", formData.owner);
    formDataToSend.append("location[address]", formData.location);
    formDataToSend.append(
      "category",
      formData.category === "Health & Fitness" ? "Health" : formData.category
    );
    if (formData.email) formDataToSend.append("email", formData.email);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("featured", formData.featured);
    formDataToSend.append(
      "businessHours",
      JSON.stringify(formData.businessHours)
    );
    formDataToSend.append("socialLinks", JSON.stringify(formData.socialLinks));
    formDataToSend.append(
      "faq",
      JSON.stringify(formData.faq.filter((faq) => faq.question && faq.answer))
    );

    if (formData.profilePhotoFile) {
      formDataToSend.append("profileImage", formData.profilePhotoFile);
      console.log("Appending profileImage:", formData.profilePhotoFile.name);
    }

    try {
      const response = await axios({
        method: editingListing ? "put" : "post",
        url: `${API_BASE_URL}/superadmin/businesses${
          editingListing ? `/${editingListing.id}` : ""
        }`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formDataToSend,
      });
      console.log("Submit Response:", response.data);
      if (!response.data.success)
        throw new Error(response.data.message || "Failed to save listing");
      const savedListing = response.data.data;
      const profileImage =
        savedListing.profileImage || savedListing.profile_image || null;
      let profilePhoto = null;
      if (profileImage) {
        const cleanedPath = profileImage
          .replace(/^Uploads[\\\/]?/, "")
          .replace(/\\/g, "/");
        profilePhoto = `${IMAGE_BASE_URL}uploads/${cleanedPath}`;
      }

      console.log("Saved profilePhoto:", profilePhoto);

      const updatedListing = {
        id: savedListing._id,
        title: savedListing.name,
        category:
          savedListing.category === "Health"
            ? "Health & Fitness"
            : savedListing.category,
        location: savedListing.location?.address || "Unknown",
        status: savedListing.status || "Active",
        rating: Number(savedListing.rating) || 0,
        reviews: Number(savedListing.reviews) || 0,
        owner:
          savedListing.ownerName || savedListing.owner?.fullName || "Unknown",
        date: savedListing.createdAt
          ? new Date(savedListing.createdAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        featured: savedListing.featured || false,
        profilePhoto,
      };

      if (editingListing) {
        setListings(
          listings.map((l) => (l.id === editingListing.id ? updatedListing : l))
        );
        toast.success("Listing updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      } else {
        setListings([...listings, updatedListing]);
        toast.success("Listing added successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
      }
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
            const retryResponse = await axios({
              method: editingListing ? "put" : "post",
              url: `${API_BASE_URL}/superadmin/businesses${
                editingListing ? `/${editingListing.id}` : ""
              }`,
              headers: {
                Authorization: `Bearer ${newToken}`,
                "Content-Type": "multipart/form-data",
              },
              data: formDataToSend,
            });
            console.log("Retry Submit Response:", retryResponse.data);
            if (!retryResponse.data.success)
              throw new Error(
                retryResponse.data.message || "Failed to save listing"
              );
            const savedListing = retryResponse.data.data;
            const profileImage =
              savedListing.profileImage || savedListing.profile_image || null;
            let profilePhoto = null;
            if (profileImage) {
              const cleanedPath = profileImage
                .replace(/^Uploads[\\\/]?/, "")
                .replace(/\\/g, "/");
              profilePhoto = `${IMAGE_BASE_URL}uploads/${cleanedPath}`;
            }

            console.log("Retry Saved profilePhoto:", profilePhoto);

            const updatedListing = {
              id: savedListing._id,
              title: savedListing.name,
              category:
                savedListing.category === "Health"
                  ? "Health & Fitness"
                  : savedListing.category,
              location: savedListing.location?.address || "Unknown",
              status: savedListing.status || "Active",
              rating: Number(savedListing.rating) || 0,
              reviews: Number(savedListing.reviews) || 0,
              owner:
                savedListing.ownerName ||
                savedListing.owner?.fullName ||
                "Unknown",
              date: savedListing.createdAt
                ? new Date(savedListing.createdAt).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
              featured: savedListing.featured || false,
              profilePhoto,
            };

            if (editingListing) {
              setListings(
                listings.map((l) =>
                  l.id === editingListing.id ? updatedListing : l
                )
              );
              toast.success("Listing updated successfully!", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
              });
            } else {
              setListings([...listings, updatedListing]);
              toast.success("Listing added successfully!", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
              });
            }
            handleClosePopup();
          } catch (retryErr) {
            console.error("Retry Submit Error:", {
              message: retryErr.message,
              status: retryErr.response?.status,
              data: retryErr.response?.data,
            });
            toast.error(`Error saving listing: ${retryErr.message}`, {
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
        toast.error(`Error saving listing: ${err.message}`, {
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
        <p>Are you sure you want to delete this listing?</p>
        <div className="flex mt-2 space-x-2">
          <button
            onClick={async () => {
              let token = localStorage.getItem("token");
              console.log(
                "Delete Token:",
                token ? token.substring(0, 20) + "..." : "None"
              );
              if (!token) {
                toast.error("Authentication required.", {
                  position: "top-right",
                  autoClose: 3000,
                  theme: "light",
                });
                toast.dismiss();
                return;
              }

              try {
                const response = await axios.delete(
                  `${API_BASE_URL}/superadmin/businesses/${id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log("Delete Response:", response.data);
                if (!response.data.success)
                  throw new Error(
                    response.data.message || "Failed to delete listing"
                  );
                setListings(listings.filter((listing) => listing.id !== id));
                toast.success("Listing deleted successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "light",
                });
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
                      const retryResponse = await axios.delete(
                        `${API_BASE_URL}/superadmin/businesses/${id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${newToken}`,
                            "Content-Type": "application/json",
                          },
                        }
                      );
                      console.log("Retry Delete Response:", retryResponse.data);
                      if (!retryResponse.data.success)
                        throw new Error(
                          retryResponse.data.message ||
                            "Failed to delete listing"
                        );
                      setListings(
                        listings.filter((listing) => listing.id !== id)
                      );
                      toast.success("Listing deleted successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        theme: "light",
                      });
                    } catch (retryErr) {
                      console.error("Retry Delete Error:", {
                        message: retryErr.message,
                        status: retryErr.response?.status,
                        data: retryErr.response?.data,
                      });
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
              toast.dismiss();
            }}
            className="px-3 py-1 text-white bg-red-600 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 text-gray-800 bg-gray-300 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "light",
      }
    );
  };

  const nextStep = () => {
    console.log(`Before nextStep - Current step: ${currentStep}`);
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const prevStep = () => {
    console.log(`Before prevStep - Current step: ${currentStep}`);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-0">
      <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:justify-between sm:text-left sm:items-center">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Business Listings
        </h1>
        <button
          onClick={() => handleOpenPopup()}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Listing
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
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
              <option value="expired">Expired</option>
            </select>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Business
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Owner
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {console.log("Filtered Listings:", filteredListings)}
              {filteredListings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {listing.profilePhoto ? (
                        <img
                          src={listing.profilePhoto}
                          alt={`${listing.title} profile`}
                          className="object-cover w-8 h-8 mr-2 rounded-full"
                          style={{ width: 150, height: 150 }}
                          onError={(e) => {
                            console.error(
                              `Failed to load image: ${listing.profilePhoto}`
                            );
                            e.target.style.display = "none";
                            e.target.parentElement.querySelector(
                              ".fallback-icon"
                            ).style.display = "flex";
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 mr-2 bg-gray-200 rounded-full fallback-icon">
                          <UserIcon className="w-5 h-5 text-gray-500" />
                        </div>
                      )}
                      <div className="flex items-center justify-center hidden w-8 h-8 mr-2 bg-gray-200 rounded-full fallback-icon">
                        <UserIcon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {listing.title}
                          </div>
                          {listing.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {listing.date}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {listing.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 mr-1 text-yellow-400" />
                      <span className="text-sm text-gray-900">
                        {listing.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({listing.reviews})
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        listing.status
                      )}`}
                    >
                      {listing.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {listing.owner}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        // onClick={handleView(listing)}
                        onClick={() => handleView(listing)}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenPopup(listing)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
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

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleClosePopup}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              {editingListing ? "Edit Listing" : "Add New Listing"}
            </h2>
            <div className="mb-4 text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="mb-4">
              <div className="flex justify-between">
                {[
                  "Basic Info",
                  "Business Hours",
                  "Social Links",
                  "FAQ",
                  "Images",
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`flex-1 text-center py-2 ${
                      currentStep === index + 1
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {currentStep === 1 && (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Listing Name
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      required
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      name="owner"
                      value={formData.owner}
                      onChange={handleFormChange}
                      required
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Expired">Expired</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleFormChange}
                        className="mr-2"
                      />
                      Featured
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Business Hours
                  </label>
                  {formData.businessHours.map((day, index) => (
                    <div
                      key={day.day}
                      className="flex items-center mb-2 space-x-2"
                    >
                      <span className="w-24 text-sm text-gray-600">
                        {day.day}
                      </span>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={day.isClosed}
                          onChange={(e) =>
                            handleBusinessHoursChange(
                              index,
                              "isClosed",
                              e.target.checked
                            )
                          }
                          className="mr-2"
                        />
                        Closed
                      </label>
                      {!day.isClosed && (
                        <>
                          <input
                            type="time"
                            value={day.open}
                            onChange={(e) =>
                              handleBusinessHoursChange(
                                index,
                                "open",
                                e.target.value
                              )
                            }
                            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-gray-600">to</span>
                          <input
                            type="time"
                            value={day.close}
                            onChange={(e) =>
                              handleBusinessHoursChange(
                                index,
                                "close",
                                e.target.value
                              )
                            }
                            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Twitter Link
                    </label>
                    <input
                      type="url"
                      name="socialLinks.twitter"
                      value={formData.socialLinks.twitter}
                      onChange={handleFormChange}
                      placeholder="https://twitter.com/yourhandle"
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Facebook Link
                    </label>
                    <input
                      type="url"
                      name="socialLinks.facebook"
                      value={formData.socialLinks.facebook}
                      onChange={handleFormChange}
                      placeholder="https://facebook.com/yourpage"
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Instagram Link
                    </label>
                    <input
                      type="url"
                      name="socialLinks.instagram"
                      value={formData.socialLinks.instagram}
                      onChange={handleFormChange}
                      placeholder="https://instagram.com/yourprofile"
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn Link
                    </label>
                    <input
                      type="url"
                      name="socialLinks.linkedin"
                      value={formData.socialLinks.linkedin}
                      onChange={handleFormChange}
                      placeholder="https://linkedin.com/company/yourcompany"
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      YouTube Link
                    </label>
                    <input
                      type="url"
                      name="socialLinks.youtube"
                      value={formData.socialLinks.youtube}
                      onChange={handleFormChange}
                      placeholder="https://youtube.com/channel/yourchannel"
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    FAQ
                  </label>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={prevFAQ}
                          disabled={currentFAQIndex === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        >
                          <ChevronLeftIcon className="w-5 h-5" />
                        </button>
                        <span className="text-sm text-gray-600">
                          FAQ {currentFAQIndex + 1} of {formData.faq.length}
                        </span>
                        <button
                          type="button"
                          onClick={nextFAQ}
                          disabled={currentFAQIndex === formData.faq.length - 1}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        >
                          <ChevronRightIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFAQ(currentFAQIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="pb-2 mb-4 border-b">
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Question
                        </label>
                        <input
                          type="text"
                          value={formData.faq[currentFAQIndex].question}
                          onChange={(e) =>
                            handleFAQChange(
                              currentFAQIndex,
                              "question",
                              e.target.value
                            )
                          }
                          className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Answer
                        </label>
                        <textarea
                          value={formData.faq[currentFAQIndex].answer}
                          onChange={(e) =>
                            handleFAQChange(
                              currentFAQIndex,
                              "answer",
                              e.target.value
                            )
                          }
                          className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addFAQ}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add FAQ
                  </button>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gallery Images (up to 10)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImagesChange}
                      disabled={formData.galleryImages.length >= 10}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.galleryImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Gallery ${index}`}
                            className="object-cover w-16 h-16 rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {formData.galleryImages.length >= 10 && (
                      <p className="mt-1 text-sm text-red-600">
                        Maximum of 10 images reached.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "profilePhoto")}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.profilePhoto && (
                      <div className="mt-2">
                        <img
                          src={formData.profilePhoto}
                          alt="Profile"
                          className="object-cover w-16 h-16 rounded"
                          onError={(e) => {
                            console.error(
                              `Failed to load profile image: ${formData.profilePhoto}`
                            );
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Photo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "coverPhoto")}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.coverPhoto && (
                      <div className="mt-2">
                        <img
                          src={formData.coverPhoto}
                          alt="Cover"
                          className="object-cover w-16 h-16 rounded"
                          onError={(e) => {
                            console.error(
                              `Failed to load cover image: ${formData.coverPhoto}`
                            );
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Licenses Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "licensesImage")}
                      className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {formData.licensesImage && (
                      <div className="mt-2">
                        <img
                          src={formData.licensesImage}
                          alt="License"
                          className="object-cover w-16 h-16 rounded"
                          onError={(e) => {
                            console.error(
                              `Failed to load license image: ${formData.licensesImage}`
                            );
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    Previous
                  </button>
                )}
                <div className="flex-1"></div>
                {currentStep < totalSteps ? (
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
