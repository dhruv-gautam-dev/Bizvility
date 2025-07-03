import { useState } from 'react';
import {
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const notifications = [
  { id: 1, title: 'New user registration', message: 'John Smith has registered as a new user', time: '5 minutes ago', read: false, type: 'user' },
  { id: 2, title: 'New business listing', message: 'Coffee House submitted a new listing for review', time: '15 minutes ago', read: false, type: 'listing' },
  { id: 3, title: 'Payment received', message: 'Payment of $299 received from Tech Solutions Inc', time: '1 hour ago', read: true, type: 'payment' },
  { id: 4, title: 'Review flagged', message: 'A review has been flagged for inappropriate content', time: '2 hours ago', read: false, type: 'review' },
  { id: 5, title: 'System maintenance', message: 'Scheduled maintenance completed successfully', time: '3 hours ago', read: true, type: 'system' }
];

export default function Header({ toggleSidebar, sidebarCollapsed, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
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
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'signout':
        if (window.confirm('Are you sure you want to sign out?')) {
          alert('Signing out...');
        }
        break;
      default:
        console.log('Profile action:', action);
    }
  };

  const handleMobileToggle = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      toggleSidebar();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-30">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-x-3">
            <button
              onClick={handleMobileToggle}
              className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={window.innerWidth < 1024 ? "Toggle menu" : (sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar")}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <h1 className="hidden sm:block text-lg lg:text-xl font-bold text-gray-900">
              Sales Dashboard
            </h1>

            <form onSubmit={handleSearch} className="relative hidden md:block">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 lg:w-64"
              />
            </form>
          </div>

          <div className="flex items-center gap-x-2 lg:gap-x-4">
            <button
              onClick={() => {
                const searchInput = prompt('Search for:');
                if (searchInput) {
                  alert(`Searching for: ${searchInput}`);
                }
              }}
              className="md:hidden p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            <div className="relative">
              <button
                className="text-gray-500 hover:text-gray-700 relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleNotificationClick}
              >
                <BellIcon className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationPopupOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button
                      onClick={showAllNotifications}
                      className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Show all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-x-2 text-sm p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
                <span className="text-gray-700 hidden sm:block">Admin User</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleProfileAction('profile')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </button>
                  <button
                    onClick={() => handleProfileAction('settings')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => handleProfileAction('signout')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsNotificationSidebarOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">All Notifications</h2>
              <button
                onClick={() => setIsNotificationSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full overflow-y-auto pb-20">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          notification.type === 'user' ? 'bg-green-100 text-green-800' :
                          notification.type === 'listing' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'payment' ? 'bg-yellow-100 text-yellow-800' :
                          notification.type === 'review' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 ml-2"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(isDropdownOpen || isNotificationPopupOpen) && (
        <div className="fixed inset-0 z-20" onClick={() => {
          setIsDropdownOpen(false);
          setIsNotificationPopupOpen(false);
        }}></div>
      )}
    </>
  );
}
