import { useEffect, useState } from "react";
import {
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { fetchNotification } from "../../data/Notification/notification";
import { useSocketEvent } from "../../hooks/useSocketEvent";
import axios from "axios";

export default function Header({
  toggleSidebar,
  sidebarCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Handle real-time notifications
  useSocketEvent("new_notification", (data) => {
    console.log("📥 New notification received:", data);
    // Ensure the new notification has the required fields
    const newNotification = {
      ...data,
      _id: data._id || `temp-${Date.now()}`, // Fallback ID if not provided
      isRead: false,
      createdAt: data.createdAt || new Date().toISOString(),
      title: data.title || "New Notification",
      message: data.message || "No message provided",
      type: data.type || "GENERAL",
    };
    setNotifications((prev) => {
      const updatedNotifications = [newNotification, ...prev];
      console.log("🔔 Updated notifications state:", updatedNotifications);
      return [...updatedNotifications]; // Create a new array to ensure re-render
    });
  });

  // Fetch initial notifications
  const loadNotification = async () => {
    if (!userId || !token) {
      setError("User ID or token is missing. Please log in.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotification(userId, token);
      const fetchedNotifications = data?.notifications || [];
      console.log("📋 Fetched notifications:", fetchedNotifications);
      setNotifications(
        fetchedNotifications.map((notification) => ({
          ...notification,
          isRead: notification.isRead || false,
        }))
      );
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err.message);
      setError("Failed to load notifications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotification();
  }, [userId, token]);

  // Mark all notifications as read
  const markNotificationsAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.isRead);
      if (unreadNotifications.length === 0) {
        console.log("ℹ️ No unread notifications to mark as read");
        return;
      }

      // const userRole = "t"; // Set role to 't' as specified
      const response = await axios.patch(
        "http://localhost:5000/api/notifications/mark-all-read",
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log(
        "✅ API Response: All notifications marked as read",
        response.data
      );

      // Update local state to reflect all notifications as read
      setNotifications((prev) => {
        const updatedNotifications = prev.map((notification) => ({
          ...notification,
          isRead: true,
        }));
        console.log(
          "🔔 Updated notifications state (marked as read):",
          updatedNotifications
        );
        return [...updatedNotifications]; // Create a new array to ensure re-render
      });
    } catch (err) {
      console.error(
        "❌ Failed to mark all notifications as read:",
        err.message
      );
      setError("Failed to mark notifications as read. Please try again.");
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    navigate("//");
    console.log("🗑️ Local storage cleared:", localStorage);
    window.location.reload(); // Reset app state
  };

  // Handle notification click and navigation
  const handleNotificationClick = (notification) => {
    setIsNotificationPopupOpen(false);
    setIsNotificationSidebarOpen(false);
    if (notification?.data?.businessId) {
      navigate(`/categories/health/store/${notification.data.businessId}`);
    }
  };

  // Handle notification popup toggle
  const handleNotificationPopupToggle = async () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
    setIsDropdownOpen(false);
    if (!isNotificationPopupOpen && notifications.some((n) => !n.isRead)) {
      await markNotificationsAsRead();
    }
  };

  const showAllNotifications = async () => {
    setIsNotificationPopupOpen(false);
    setIsNotificationSidebarOpen(true);
    if (notifications.some((n) => !n.isRead)) {
      await markNotificationsAsRead();
    }
  };

  const handleProfileAction = (action) => {
    setIsDropdownOpen(false);
    switch (action) {
      case "profile":
        navigate("/sales-profile");
        break;
      case "settings":
        navigate("/settings");
        break;
      case "signout":
        handleLogout();
        break;
      default:
        console.log("🔍 Profile action:", action);
    }
  };

  const handleMobileToggle = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      toggleSidebar();
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <>
      <header className="relative z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 mx-auto sm:px-6 max-w-screen-2xl">
          <div className="flex items-center w-full gap-x-3 sm:w-auto">
            <form
              onSubmit={handleSearch}
              className="relative flex-1 hidden max-w-sm sm:flex"
            ></form>
          </div>
          <div className="flex items-center gap-x-2 sm:gap-x-4">
            <button
              onClick={() => {
                const searchInput = prompt("Search for:");
                if (searchInput) {
                  alert(`Searching for: ${searchInput}`);
                }
              }}
              className="p-2 text-gray-500 transition-colors rounded-full sm:hidden hover:text-gray-700 hover:bg-gray-100"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>
            <div className="relative">
              <button
                className="relative p-2 text-gray-500 transition-colors rounded-full hover:text-gray-700 hover:bg-gray-100"
                onClick={handleNotificationPopupToggle}
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isNotificationPopupOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100 innerhalb:5000px)] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="overflow-y-auto max-h-96">
                    {notifications.length === 0 && (
                      <div className="p-4 text-sm text-gray-600">
                        No notifications available
                      </div>
                    )}
                    {console.log(notifications)}
                    {notifications.slice(0, 3).map((notification) => (
                      <button
                        key={notification._id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={showAllNotifications}
                      className="w-full text-sm font-medium text-center text-blue-600 hover:text-blue-800"
                    >
                      Show all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center p-2 text-sm transition-colors rounded-lg gap-x-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserCircleIcon className="w-8 h-8 text-gray-500" />
                <span className="hidden sm:block text-gray-700 truncate max-w-[150px]">
                  Admin User
                </span>
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleProfileAction("profile")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={() => handleProfileAction("settings")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => handleProfileAction("signout")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {isNotificationSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsNotificationSidebarOpen(false)}
          ></div>
          <div className="absolute top-0 right-0 w-full h-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                All Notifications
              </h2>
              <button
                onClick={() => setIsNotificationSidebarOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full pb-20 overflow-y-auto">
              {notifications.length === 0 && (
                <div className="p-4 text-sm text-gray-600">
                  No notifications available
                </div>
              )}
              {notifications.map((notification) => (
                <button
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            notification.type === "NEW_BUSINESS_BY_REFERRAL"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {notification.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="w-2 h-2 mt-2 ml-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {(isDropdownOpen || isNotificationPopupOpen) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setIsDropdownOpen(false);
            setIsNotificationPopupOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
