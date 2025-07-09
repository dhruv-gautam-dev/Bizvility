import { useState } from 'react';
import { UserCircleIcon, BellIcon, MagnifyingGlassIcon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const initialNotifications = [
  {
    id: 1,
    title: 'New user registration',
    message: 'John Smith has registered as a new user',
    time: '5 minutes ago',
    read: false,
    type: 'user'
  },
  {
    id: 2,
    title: 'New business listing',
    message: 'Coffee House submitted a new listing for review',
    time: '15 minutes ago',
    read: false,
    type: 'listing'
  },
  {
    id: 3,
    title: 'Payment received',
    message: 'Payment of $299 received from Tech Solutions Inc',
    time: '1 hour ago',
    read: true,
    type: 'payment'
  },
  {
    id: 4,
    title: 'Review flagged',
    message: 'A review has been flagged for inappropriate content',
    time: '2 hours ago',
    read: false,
    type: 'review'
  },
  {
    id: 5,
    title: 'System maintenance',
    message: 'Scheduled maintenance completed successfully',
    time: '3 hours ago',
    read: true,
    type: 'system'
  }
];

export default function Header({ profile }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
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
        navigate('/super-admin-profile');
        break;
      case 'settings':
        navigate('/super-admin-user-settings');
        break;
      case 'signout':
        navigate('/signin');
        break;
      default:
        console.log('Profile action:', action);
    }
  };

  const handleNotificationNavigation = (notification) => {
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));

    let route = '';
    switch (notification.type) {
      case 'user':
        route = '/super-admin-users';
        break;
      case 'listing':
        route = '/super-admin-listings';
        break;
      case 'payment':
        route = '/super-admin-razorpay';
        break;
      case 'review':
        route = '/super-admin-reviews';
        break;
      case 'system':
        route = '/super-admin-settings';
        break;
      default:
        route = '/super-admin-dashboard';
    }

    navigate(route);
    setIsNotificationPopupOpen(false);
    setIsNotificationSidebarOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 relative z-40">
        <div className="flex flex-col sm:flex-row sm:h-16 items-center justify-between px-4 sm:px-6 py-2 sm:py-0 gap-2">
          <div className="flex items-center w-full sm:w-auto">
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>
          
          <div className="flex items-center gap-x-2 sm:gap-x-4">
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
                <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 max-w-[calc(100vw-2rem)]">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationNavigation(notification)}
                        className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
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
                      </button>
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
                className="flex items-center gap-x-1 sm:gap-x-2 text-sm p-2 rounded-lg hover:bg-gray-100 transition-colors max-w-[150px] sm:max-w-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-8 w-8 text-gray-500" />
                )}
                <span className="text-gray-700 hidden sm:inline truncate">{profile.name}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 max-w-[calc(100vw-2rem)]">
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
          <div className="absolute right-0 top-0 h-full w-80 sm:w-96 bg-white shadow-xl">
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
                <button
                  key={notification.id}
                  onClick={() => handleNotificationNavigation(notification)}
                  className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
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
                </button>
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