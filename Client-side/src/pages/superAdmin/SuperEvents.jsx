import { useState, useEffect } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Placeholder image for when images fail to load
const PLACEHOLDER_IMAGE =
  "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid&w=740";

export default function SuperEvents() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isImageSliderOpen, setIsImageSliderOpen] = useState(false);
  const [currentEventImages, setCurrentEventImages] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    price: 0,
    bannerImage: [],
    imageObjects: [],
    organizer: "User Organizer",
    attendees: 0,
    maxAttendees: 100,
    isApproved: true,
    category: "Networking",
  });

  const categories = [
    "Networking",
    "Workshop",
    "Fashion",
    "Fitness",
    "Education",
  ];
  const statuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"];
  const API_BASE_URL = "http://localhost:5000/api";
  const imageURL = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000/";

  // Cleanup all blob URLs when the component unmounts
  useEffect(() => {
    return () => {
      events.forEach((event) => {
        event.imageObjects.forEach((obj) => {
          if (obj.url.startsWith("blob:")) {
            URL.revokeObjectURL(obj.url);
          }
        });
      });
    };
  }, [events]);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/events/`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "application/json",
          },
        });

        console.log("Fetch Events API Response:", response.data);

        const eventsData = response.data.events;
        if (!Array.isArray(eventsData)) {
          throw new Error("No events array found in API response");
        }

        const transformedEvents = eventsData.map((event) => {
          const startDateTime = new Date(event.startTime);
          const endDateTime = new Date(event.endTime);
          let bannerImageUrl = event.bannerImage
            ? event.bannerImage.replace(/\\/g, "/")
            : null;
          bannerImageUrl = bannerImageUrl
            ? `${imageURL}${
                bannerImageUrl.startsWith("/")
                  ? bannerImageUrl.slice(1)
                  : bannerImageUrl
              }`
            : PLACEHOLDER_IMAGE;

          console.log("Banner Image URL for", event.title, ":", bannerImageUrl);

          return {
            id: event._id,
            title: event.title || "Untitled Event",
            description: event.description || "No description",
            startDate: startDateTime.toISOString().split("T")[0],
            startTime: startDateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            endDate: endDateTime.toISOString().split("T")[0],
            endTime: endDateTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            }),
            location: event.location || "Unknown Location",
            organizer: event.business || "Unknown Organizer",
            attendees: 0,
            maxAttendees: 100,
            status:
              event.isApproved !== undefined
                ? event.isApproved
                  ? "Completed"
                  : "Pending"
                : "Pending",
            category: event.category || "General",
            price: event.price || 0,
            images: bannerImageUrl ? [bannerImageUrl] : [],
            imageObjects: bannerImageUrl ? [{ url: bannerImageUrl }] : [],
            createdAt: event.createdAt
              ? new Date(event.createdAt).toISOString().split("T")[0]
              : "",
            updatedAt: event.updatedAt
              ? new Date(event.updatedAt).toISOString().split("T")[0]
              : "",
          };
        });
        setEvents(transformedEvents);
        console.log("Transformed Events:", transformedEvents);
      } catch (err) {
        console.error("Fetch Events Error:", err);
        toast.error(
          `Error fetching events: ${err.message || "Unknown error"}`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || event.status.toLowerCase() === filterStatus;
    const matchesCategory =
      filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Ongoing":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalEvents = events.length;
  const CompletedEvents = events.filter((e) => e.status === "Completed").length;
  const totalAttendees = events.reduce(
    (sum, event) => sum + event.attendees,
    0
  );
  const totalRevenue = events.reduce(
    (sum, event) => sum + event.price * event.attendees,
    0
  );

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Combine date and time for API
      const startDateTime = new Date(
        `${newEvent.startDate}T${newEvent.startTime}`
      );
      const endDateTime = new Date(`${newEvent.endDate}T${newEvent.endTime}`);

      // Append event fields to FormData
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      formData.append("startTime", startDateTime.toISOString());
      formData.append("endTime", endDateTime.toISOString());
      formData.append("location", newEvent.location);
      formData.append("price", newEvent.price);
      formData.append("isApproved", newEvent.isApproved);
      formData.append("category", newEvent.category);
      formData.append("business", newEvent.organizer);

      // Append new images (only those with a file object)
      newEvent.imageObjects.forEach((obj, index) => {
        if (obj.file) {
          formData.append("bannerImage", obj.file);
        }
      });

      console.log("Add Event FormData:", [...formData.entries()]);

      const response = await axios.post(`${API_BASE_URL}/events/`, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Add Event API Response:", response.data);

      // Transform API response to match events state structure
      const newEventData = response.data.event;
      const startDateTimeResponse = new Date(newEventData.startTime);
      const endDateTimeResponse = new Date(newEventData.endTime);
      let bannerImageUrl = newEventData.bannerImage
        ? newEventData.bannerImage.replace(/\\/g, "/")
        : null;
      bannerImageUrl = bannerImageUrl
        ? `${imageURL}${
            bannerImageUrl.startsWith("/")
              ? bannerImageUrl.slice(1)
              : bannerImageUrl
          }`
        : PLACEHOLDER_IMAGE;

      const transformedEvent = {
        id: newEventData._id,
        title: newEventData.title || "Untitled Event",
        description: newEventData.description || "No description",
        startDate: startDateTimeResponse.toISOString().split("T")[0],
        startTime: startDateTimeResponse.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        endDate: endDateTimeResponse.toISOString().split("T")[0],
        endTime: endDateTimeResponse.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        location: newEventData.location || "Unknown Location",
        organizer: newEventData.business || "Unknown Organizer",
        attendees: 0,
        maxAttendees: 100,
        status:
          newEventData.isApproved !== undefined
            ? newEventData.isApproved
              ? "Completed"
              : "Pending"
            : "Pending",
        category: newEventData.category || "General",
        price: newEventData.price || 0,
        images: bannerImageUrl ? [bannerImageUrl] : [],
        imageObjects: bannerImageUrl ? [{ url: bannerImageUrl }] : [],
        createdAt: newEventData.createdAt
          ? new Date(newEventData.createdAt).toISOString().split("T")[0]
          : "",
        updatedAt: newEventData.updatedAt
          ? new Date(newEventData.updatedAt).toISOString().split("T")[0]
          : "",
      };

      setEvents([...events, transformedEvent]);
      setIsAddFormOpen(false);
      setNewEvent({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        location: "",
        price: 0,
        bannerImage: [],
        imageObjects: [],
        organizer: "User Organizer",
        attendees: 0,
        maxAttendees: 100,
        isApproved: true,
        category: "Networking",
      });

      // Clean up blob URLs
      newEvent.imageObjects.forEach((obj) => {
        if (obj.url.startsWith("blob:")) {
          URL.revokeObjectURL(obj.url);
        }
      });

      toast.success("Event has been created successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (err) {
      console.error("Add Event Error:", err);
      toast.error(
        `Error adding event: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Combine date and time for API
      const startDateTime = new Date(
        `${editEvent.startDate}T${editEvent.startTime}`
      );
      const endDateTime = new Date(`${editEvent.endDate}T${editEvent.endTime}`);

      // Append event fields to FormData
      formData.append("title", editEvent.title);
      formData.append("description", editEvent.description);
      formData.append("startTime", startDateTime.toISOString());
      formData.append("endTime", endDateTime.toISOString());
      formData.append("location", editEvent.location);
      formData.append("price", editEvent.price);
      formData.append(
        "isApproved",
        editEvent.status === "Completed" ? true : false
      );
      formData.append("category", editEvent.category);
      formData.append("business", editEvent.organizer);

      // Append new images (only those with a file object)
      editEvent.imageObjects.forEach((obj, index) => {
        if (obj.file) {
          formData.append("bannerImage", obj.file);
        }
      });

      console.log("Edit Event FormData:", [...formData.entries()]);

      const response = await axios.put(
        `${API_BASE_URL}/events/approve/${editEvent.id}`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update Event API Response:", response.data);

      // Update local state with the API response
      const updatedEvent = response.data.event;
      const startDateTimeResponse = new Date(updatedEvent.startTime);
      const endDateTimeResponse = new Date(updatedEvent.endTime);
      let bannerImageUrl = updatedEvent.bannerImage
        ? updatedEvent.bannerImage.replace(/\\/g, "/")
        : null;
      bannerImageUrl = bannerImageUrl
        ? `${imageURL}${
            bannerImageUrl.startsWith("/")
              ? bannerImageUrl.slice(1)
              : bannerImageUrl
          }`
        : PLACEHOLDER_IMAGE;

      const transformedEvent = {
        id: updatedEvent._id,
        title: updatedEvent.title || "Untitled Event",
        description: updatedEvent.description || "No description",
        startDate: startDateTimeResponse.toISOString().split("T")[0],
        startTime: startDateTimeResponse.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        endDate: endDateTimeResponse.toISOString().split("T")[0],
        endTime: endDateTimeResponse.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        location: updatedEvent.location || "Unknown Location",
        organizer: updatedEvent.business || "Unknown Organizer",
        attendees: 0,
        maxAttendees: 100,
        status:
          updatedEvent.isApproved !== undefined
            ? updatedEvent.isApproved
              ? "Completed"
              : "Pending"
            : "Pending",
        category: updatedEvent.category || "General",
        price: updatedEvent.price || 0,
        images: bannerImageUrl ? [bannerImageUrl] : [],
        imageObjects: bannerImageUrl ? [{ url: bannerImageUrl }] : [],
        createdAt: updatedEvent.createdAt
          ? new Date(updatedEvent.createdAt).toISOString().split("T")[0]
          : "",
        updatedAt: updatedEvent.updatedAt
          ? new Date(updatedEvent.updatedAt).toISOString().split("T")[0]
          : "",
      };

      setEvents(
        events.map((event) =>
          event.id === editEvent.id ? transformedEvent : event
        )
      );
      setIsEditFormOpen(false);
      setEditEvent(null);

      // Clean up blob URLs for new images
      editEvent.imageObjects.forEach((obj) => {
        if (obj.url.startsWith("blob:")) {
          URL.revokeObjectURL(obj.url);
        }
      });

      toast.success("Event has been updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (err) {
      console.error("Update Event Error:", err);
      toast.error(
        `Error updating event: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleDeleteEvent = (id, title) => {
    toast.warning(
      <div>
        <p>
          Are you sure you want to delete "{title}"? This action cannot be
          undone.
        </p>
        <div className="flex mt-2 space-x-2">
          <button
            onClick={() => {
              const eventToDelete = events.find((event) => event.id === id);
              eventToDelete.imageObjects.forEach((obj) => {
                if (obj.url.startsWith("blob:")) {
                  URL.revokeObjectURL(obj.url);
                }
              });
              setEvents(events.filter((event) => event.id !== id));
              toast.dismiss();
              toast.success(`"${title}" has been deleted successfully!`, {
                position: "top-right",
                autoClose: 1500,
              });
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

  const handleImageClick = (images) => {
    setCurrentEventImages(images);
    setIsImageSliderOpen(true);
  };

  const sliderSettings = {
    dots: true,
    infinite: currentEventImages.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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
          Events Management
        </h1>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5" />
          Create New Event
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Events</h3>
          <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">
            Completed Events
          </h3>
          <p className="text-2xl font-bold text-gray-900">{CompletedEvents}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Attendees</h3>
          <p className="text-2xl font-bold text-gray-900">{totalAttendees}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search events..."
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
              <option value="Completed">Completed</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
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
                {[
                  "Event",
                  "Images",
                  "Date & Time",
                  "Location",
                  "Attendees",
                  "Price",
                  "Status",
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
              {filteredEvents.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No events found.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.organizer}
                        </div>
                        <div className="text-xs text-gray-400">
                          {event.category}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {event.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.images.length > 0 ? (
                        <img
                          src={event.bannerImage || event.images[0]}
                          alt={event.title}
                          className="object-cover w-12 h-12 rounded cursor-pointer"
                          onClick={() => handleImageClick(event.images)}
                          onError={(e) => {
                            console.error(
                              "Image load failed for:",
                              event.images[0]
                            );
                            e.target.src = PLACEHOLDER_IMAGE;
                          }}
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 text-xs text-gray-500 bg-gray-200 rounded">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div>
                            {event.startDate} {event.startTime}
                          </div>
                          <div className="text-gray-500">
                            to {event.endDate} {event.endTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <UserGroupIcon className="w-4 h-4 mr-2 text-gray-400" />
                        <div>
                          <div>
                            {event.attendees} / {event.maxAttendees}
                          </div>
                          <div className="w-16 h-1 mt-1 bg-gray-200 rounded-full">
                            <div
                              className="h-1 bg-blue-600 rounded-full"
                              style={{
                                width: `${
                                  (event.attendees / event.maxAttendees) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditEvent({
                              ...event,
                              imageObjects: event.imageObjects,
                              status: event.status, // Ensure status is carried over
                            });
                            setIsEditFormOpen(true);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteEvent(event.id, event.title)
                          }
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

      {/* Add Event Form Popup */}
      {isAddFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => {
                newEvent.imageObjects.forEach((obj) => {
                  if (obj.url.startsWith("blob:")) {
                    URL.revokeObjectURL(obj.url);
                  }
                });
                setNewEvent({
                  title: "",
                  description: "",
                  startDate: "",
                  startTime: "",
                  endDate: "",
                  endTime: "",
                  location: "",
                  price: 0,
                  bannerImage: [],
                  imageObjects: [],
                  organizer: "User Organizer",
                  attendees: 0,
                  maxAttendees: 100,
                  isApproved: true,
                  category: "Networking",
                });
                setIsAddFormOpen(false);
              }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Create New Event
            </h2>
            <form
              onSubmit={handleAddEvent}
              className="space-y-4 max-h-[80vh] overflow-y-scroll custom-scrollbar"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Browse Images for Event
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImageObjects = files.map((file) => ({
                      url: URL.createObjectURL(file),
                      file,
                    }));
                    setNewEvent({
                      ...newEvent,
                      bannerImage: [
                        ...newEvent.bannerImage,
                        ...newImageObjects.map((obj) => obj.url),
                      ],
                      imageObjects: [
                        ...newEvent.imageObjects,
                        ...newImageObjects,
                      ],
                    });
                    e.target.value = "";
                  }}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {newEvent.imageObjects.map((obj, index) => (
                    <div key={index} className="relative">
                      <img
                        src={obj.url}
                        alt={`Event ${index}`}
                        className="object-cover w-12 h-12 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedImageObjects =
                            newEvent.imageObjects.filter((_, i) => i !== index);
                          setNewEvent({
                            ...newEvent,
                            bannerImage: updatedImageObjects.map(
                              (obj) => obj.url
                            ),
                            imageObjects: updatedImageObjects,
                          });
                        }}
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Paragraph for Event
                </label>
                <textarea
                  required
                  value={newEvent.description}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, description: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.startDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.startTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, startTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newEvent.endDate}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={newEvent.endTime}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, endTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Location
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.location}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, location: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={newEvent.price}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Approved
                </label>
                <select
                  required
                  value={newEvent.isApproved ? "Completed" : "Pending"}
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      isApproved: e.target.value === "Completed",
                    })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
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

      {/* Edit Event Form Popup */}
      {isEditFormOpen && editEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={() => {
                const originalEvent = events.find((e) => e.id === editEvent.id);
                const originalUrls = new Set(
                  originalEvent.imageObjects.map((obj) => obj.url)
                );
                const removedUrls = new Set();
                const currentUrls = new Set(
                  editEvent.imageObjects.map((obj) => obj.url)
                );

                originalEvent.imageObjects.forEach((obj) => {
                  if (
                    !currentUrls.has(obj.url) &&
                    obj.url.startsWith("blob:")
                  ) {
                    removedUrls.add(obj.url);
                    URL.revokeObjectURL(obj.url);
                  }
                });

                editEvent.imageObjects.forEach((obj) => {
                  if (
                    !originalUrls.has(obj.url) &&
                    !currentUrls.has(obj.url) &&
                    obj.url.startsWith("blob:")
                  ) {
                    removedUrls.add(obj.url);
                    URL.revokeObjectURL(obj.url);
                  }
                });

                setEditEvent(null);
                setIsEditFormOpen(false);
              }}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Edit Event
            </h2>
            <form
              onSubmit={handleEditEvent}
              className="space-y-4 max-h-[80vh] overflow-y-scroll custom-scrollbar"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={editEvent.title}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, title: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Browse Images for Event
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const newImageObjects = files.map((file) => ({
                      url: URL.createObjectURL(file),
                      file,
                    }));
                    setEditEvent({
                      ...editEvent,
                      images: [
                        ...editEvent.images,
                        ...newImageObjects.map((obj) => obj.url),
                      ],
                      imageObjects: [
                        ...editEvent.imageObjects,
                        ...newImageObjects,
                      ],
                    });
                    e.target.value = "";
                  }}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {editEvent.imageObjects.map((obj, index) => (
                    <div key={index} className="relative">
                      <img
                        src={obj.url}
                        alt={`Event ${index}`}
                        className="object-cover w-12 h-12 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedImageObjects =
                            editEvent.imageObjects.filter(
                              (_, i) => i !== index
                            );
                          setEditEvent({
                            ...editEvent,
                            images: updatedImageObjects.map((obj) => obj.url),
                            imageObjects: updatedImageObjects,
                          });
                        }}
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-white bg-red-600 rounded-full"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Add Paragraph for Event
                </label>
                <textarea
                  required
                  value={editEvent.description}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, description: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editEvent.startDate}
                    onChange={(e) =>
                      setEditEvent({ ...editEvent, startDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event Start Time
                  </label>
                  <input
                    type="time"
                    required
                    value={editEvent.startTime}
                    onChange={(e) =>
                      setEditEvent({ ...editEvent, startTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={editEvent.endDate}
                    onChange={(e) =>
                      setEditEvent({ ...editEvent, endDate: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Event End Time
                  </label>
                  <input
                    type="time"
                    required
                    value={editEvent.endTime}
                    onChange={(e) =>
                      setEditEvent({ ...editEvent, endTime: e.target.value })
                    }
                    className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Location
                </label>
                <input
                  type="text"
                  required
                  value={editEvent.location}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, location: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editEvent.price}
                  onChange={(e) =>
                    setEditEvent({
                      ...editEvent,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Approved
                </label>
                <select
                  required
                  value={editEvent.status}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, status: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
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

      {/* Image Slider Popup */}
      {isImageSliderOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsImageSliderOpen(false)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageSliderOpen(false)}
              className="absolute text-white top-4 right-4 hover:text-gray-300"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <Slider {...sliderSettings}>
              {currentEventImages.map((image, index) => (
                <div key={index} className="p-4">
                  <img
                    src={image}
                    alt={`Event Image ${index + 1}`}
                    className="object-contain w-full rounded-lg h-96"
                    onError={(e) => {
                      console.error("Image load failed for:", image);
                      e.target.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
