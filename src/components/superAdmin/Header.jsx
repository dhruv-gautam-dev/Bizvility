import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import NotificationSidebar from './NotificationSidebar';

function Header() {
  const navigate = useNavigate();

  // State for notifications and sidebar
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered: Vishal', timestamp: '2025-06-11 18:00', read: false },
    { id: 2, message: 'User Rajat updated their profile', timestamp: '2025-06-11 17:45', read: false },
    { id: 3, message: 'System maintenance scheduled', timestamp: '2025-06-11 17:30', read: true },
    { id: 4, message: 'New comment on your post', timestamp: '2025-06-11 17:15', read: true },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const profilePage = () => {
    navigate('/profile'); // Updated to match the new route in App.jsx
  };

  return (
    <>
      <header className="bg-white shadow fixed top-0 left-64 right-0 z-10">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-x-4">
            <h2 className="text-lg font-semibold">Welcome, Admin</h2>
          </div>
          <div className="flex items-center gap-x-4">
            {/* Notification Icon with Dropdown */}
            <Menu as="div" className="relative">
              <div className="relative">
                <Menu.Button className="text-gray-500 hover:text-gray-700">
                  <BellIcon className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-80 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-gray-700">
                      No notifications
                    </div>
                  ) : (
                    <>
                      {notifications.slice(0, 5).map(notification => (
                        <Menu.Item key={notification.id}>
                          {({ active }) => (
                            <div
                              onClick={() => markAsRead(notification.id)}
                              className={`${
                                active ? 'bg-gray-100' : ''
                              } block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                                notification.read ? 'opacity-50' : 'font-semibold'
                              }`}
                            >
                              <p>{notification.message}</p>
                              <p className="text-xs text-gray-500">
                                {notification.timestamp}
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
                          className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 cursor-pointer text-center"
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
              <Menu.Button className="flex items-center gap-x-4 text-sm">
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={profilePage}
                        className={`${
                          active ? 'bg-gray-100' : ''
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
                          active ? 'bg-gray-100' : ''
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
        </div>
      </header>

      {/* Notification Sidebar */}
      <NotificationSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        notifications={notifications}
      />
    </>
  );
}

export default Header;