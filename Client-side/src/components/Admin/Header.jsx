import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import NotificationSidebar from "./NotificationSidebar";

function Header({ isCollapsed, profile }) {
  console.log(
    "Header rendering, isCollapsed:",
    isCollapsed,
    "profile:",
    profile
  ); // Debug prop
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "new-user",
      userId: "vishal",
      message: "New user registered: Vishal",
      timestamp: "2025-06-11 18:00",
      read: false,
    },
    {
      id: 2,
      type: "profile-update",
      userId: "rajat",
      message: "User Rajat updated their profile",
      timestamp: "2025-06-11 17:45",
      read: false,
    },
    {
      id: 3,
      type: "system",
      message: "System maintenance scheduled",
      timestamp: "2025-06-11 17:30",
      read: true,
    },
    {
      id: 4,
      type: "comment",
      postId: "123",
      message: "New comment on your post",
      timestamp: "2025-06-11 17:15",
      read: true,
    },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification) => {
    console.log("Handling notification click:", notification); // Debug
    markAsRead(notification.id);

    switch (notification.type) {
      case "new-user":
      case "profile-update":
        navigate(`/users/${notification.userId}`);
        break;
      case "system":
        navigate("/settings");
        break;
      case "comment":
        navigate(`/posts/${notification.postId}`);
        break;
      default:
        console.warn("Unknown notification type:", notification.type);
        break;
    }
  };

  const handleSignOut = () => {
    console.log("Signing out"); // Debug
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const profilePage = () => {
    console.log("Navigating to profile"); // Debug
    navigate("/profile-settings");
  };

  return (
    <>
      <header
        className={`bg-white shadow top-0 z-20 transition-all duration-300 h-16 flex items-center justify-between px-4 sm:px-6 ml-[70px] lg:ml-0`}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative w-full sm:w-64"
        >
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search"
          />
        </form>

        <div className="flex items-center gap-x-4">
          {/* Notification Dropdown */}
          <Menu as="div" className="relative">
            <div className="relative">
              <Menu.Button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Notifications"
              >
                <BellIcon className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full -top-2 -right-2">
                    {unreadCount}
                  </span>
                )}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-30 py-1 mt-2 overflow-y-auto bg-white rounded-md shadow-lg w-80 ring-1 ring-black ring-opacity-5 max-h-96">
                {notifications.length === 0 ? (
                  <div className="px-4 py-2 text-sm text-gray-700">
                    No notifications
                  </div>
                ) : (
                  <>
                    {notifications.slice(0, 5).map((notification) => (
                      <Menu.Item key={notification.id}>
                        {({ active }) => (
                          <div
                            onClick={() =>
                              handleNotificationClick(notification)
                            }
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                              notification.read ? "opacity-50" : "font-semibold"
                            }`}
                          >
                            <p>{notification.message}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(notification.timestamp).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      <div
                        onClick={() => {
                          setIsSidebarOpen(true);
                          markAllAsRead();
                        }}
                        className="block px-4 py-2 text-sm text-center text-blue-600 cursor-pointer hover:bg-gray-100"
                      >
                        View all notifications
                      </div>
                    </Menu.Item>
                  </>
                )}
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button
              className="flex items-center text-sm gap-x-2 focus:outline-none"
              aria-label="Profile Menu"
            >
              <UserCircleIcon className="w-8 h-8 text-gray-500" />
              <span className="hidden text-gray-700 sm:inline">
                {profile?.name || "Admin"}
              </span>
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
              <Menu.Items className="absolute right-0 z-30 w-48 py-1 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={profilePage}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block px-4 py-2 text-sm text-gray-700 cursor-pointer`}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </header>

      {/* Notification Sidebar with Error Boundary */}
      {typeof NotificationSidebar === "function" ? (
        <NotificationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          notifications={notifications}
        />
      ) : (
        <div>Notification Sidebar not loaded</div> // Fallback if component fails
      )}
    </>
  );
}

export default Header;
