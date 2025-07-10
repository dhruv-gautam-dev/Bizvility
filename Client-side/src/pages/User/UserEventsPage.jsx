import { useState, useEffect } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageUrl = import.meta.env.VITE_Image_URL;
  const token = localStorage.getItem("token");

  // Fetch events by authenticated user
  const fetchEvents = async () => {
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/events/my-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events");
      }
      const data = await response.json();
      return data.events || [];
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
        toast.error(`Error: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [token]);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
  };

  const isEventPast = (endTime) => {
    const now = new Date("2025-06-29T18:16:00+05:30"); // Current time: 06:16 PM IST
    return new Date(endTime) < now;
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      {/* <ToastContainer /> */}
      <div className="max-w-5xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Events</h1>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id}
                className="p-6 transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl"
              >
                {event.eventImages && (
                  <img
                    src={`${imageUrl}/${event.eventImages}`} // Added imageUrl before bannerImage
                    alt={event.title}
                    className="object-cover w-full h-48 mb-4 rounded-t-xl"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {event.description || "No description available"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  <CalendarIcon className="inline w-5 h-5 mr-1 text-gray-400" />
                  {formatDateTime(event.startTime)} -{" "}
                  {formatDateTime(event.endTime)}
                  {isEventPast(event.endTime) && (
                    <span className="ml-2 text-red-500">(Past Event)</span>
                  )}
                </p>
                {event.location && (
                  <p className="mt-1 text-sm text-gray-600">
                    <MapPinIcon className="inline w-5 h-5 mr-1 text-gray-400" />
                    {event.location}
                  </p>
                )}
                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-indigo-600 underline hover:text-indigo-800"
                  >
                    <LinkIcon className="inline w-4 h-4 mr-1" />
                    Read More
                  </a>
                )}
                {!event.isApproved && (
                  <p className="mt-2 text-sm text-yellow-600">
                    Pending Approval
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
