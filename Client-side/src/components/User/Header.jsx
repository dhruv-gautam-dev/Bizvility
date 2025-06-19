import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const initialNotifications = [
  {
    id: 1,
    title: "New review received",
    message: "John Smith left a 5-star review for The Coffee House",
    time: "5 minutes ago",
    read: false,
    type: "review",
    actionUrl: "/user-my-reviews",
  },
  {
    id: 2,
    title: "Listing approved",
    message:
      'Your listing "Tech Solutions Inc" has been approved and is now live',
    time: "2 hours ago",
    read: false,
    type: "listing",
    actionUrl: "/user-my-listings",
  },
  {
    id: 3,
    title: "Analytics Update",
    message:
      "Your listings received 150 views this week! Check your analytics for more insights.",
    time: "4 hours ago",
    read: true,
    type: "profile",
    actionUrl: "/user-analytics",
  },
  {
    id: 4,
    title: "Listing pending review",
    message: 'Your listing "Fashion Boutique" is pending admin review',
    time: "2 days ago",
    read: true,
    type: "listing",
    actionUrl: "/user-my-listings",
  },
];

export default function UserHeader() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({ name: "Admin User", avatar: "" });
  const [notifications, setNotifications] = useState(initialNotifications);

  // Function to load profile data from localStorage
  const loadProfileData = () => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfile({
          name: parsedProfile.name || "Admin User",
          avatar: parsedProfile.avatar || "",
        });
      } catch (error) {
        console.error("Error parsing userProfile from localStorage:", error);
        setProfile({ name: "Admin User", avatar: "" });
      }
    }
  };

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData();
  }, []);

  // Listen for custom profileUpdated event
  useEffect(() => {
    const handleProfileUpdate = () => {
      loadProfileData();
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () =>
      window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, []);

  // Re-fetch profile data when dropdown is opened
  useEffect(() => {
    if (isDropdownOpen) {
      loadProfileData();
    }
  }, [isDropdownOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      alert(`Searching for: ${searchTerm}`);
    }
  };

  const handleNotificationClick = () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
    setIsDropdownOpen(false);
  };

  const showAllNotifications = () => {
    setIsNotificationPopupOpen(false);
    setIsNotificationSidebarOpen(true);
  };

  const handleProfileAction = (action) => {
    setIsDropdownOpen(false);

    switch (action) {
      case "profile":
        navigate("/user-profile");
        break;
      case "Add Listing":
        navigate("/list-business");
        break;
      case "signout":
        if (window.confirm("Are you sure you want to sign out?")) {
          alert("Signing out...");
          // Implement sign out logic here
        }
        break;
      default:
        console.log("Profile action:", action);
    }
  };

  const handleNotificationNavigation = (notification) => {
    // Mark the notification as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Close popup and sidebar
    setIsNotificationPopupOpen(false);
    setIsNotificationSidebarOpen(false);

    // Navigate to the URL specified in actionUrl
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    } else {
      console.log("No actionUrl provided for notification:", notification);
    }
  };

  return (
    <>
      <header className="relative z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-x-4">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>

          <div className="flex items-center gap-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                className="relative p-2 text-gray-500 transition-colors rounded-full hover:text-gray-700 hover:bg-gray-100"
                onClick={handleNotificationClick}
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationPopupOpen && (
                <div className="absolute right-0 z-50 mt-2 bg-white rounded-lg shadow-lg w-80 ring-1 ring-black ring-opacity-5">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="overflow-y-auto max-h-96">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() =>
                          handleNotificationNavigation(notification)
                        }
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
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
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

            {/* User Dropdown */}
            <div className="relative">
              <button
                className="flex items-center p-2 text-sm transition-colors rounded-lg gap-x-2 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-8 h-8 text-gray-500" />
                )}
                <span className="text-gray-700">{profile.name}</span>
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
                    onClick={() => handleProfileAction("Add Listing")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Add Listing
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

      {/* Notification Sidebar */}
      {isNotificationSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsNotificationSidebarOpen(false)}
          ></div>
          <div className="absolute top-0 right-0 h-full bg-white shadow-xl w-96">
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
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleNotificationNavigation(notification)}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {notification.title}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            notification.type === "user"
                              ? "bg-green-100 text-green-800"
                              : notification.type === "listing"
                              ? "bg-blue-100 text-blue-800"
                              : notification.type === "payment"
                              ? "bg-yellow-100 text-yellow-800"
                              : notification.type === "review"
                              ? "bg-red-100 text-red-800"
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
                        {notification.time}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 mt-2 ml-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(isDropdownOpen || isNotificationPopupOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setIsDropdownOpen(false);
            setIsNotificationPopupOpen(false);
          }}
        ></div>
      )}
    </>
  );
}
