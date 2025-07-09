import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChartBarIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import fullLogo from '../imgs/white-logo.png';
import collapsedLogo from '../imgs/bizvility-logo.ico';

const navigation = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: HomeIcon },
  { name: 'Businesses', href: '/admin-businesses', icon: BuildingStorefrontIcon },
  { name: 'Categories', href: '/admin-dashboard-categories', icon: DocumentTextIcon },
  { name: 'Users', href: '/admin-users-list', icon: UserGroupIcon },
  { name: 'Analytics', href: '/admin-analytics', icon: ChartBarIcon },
  // { name: 'Settings', href: '/admin-settings', icon: Cog6ToothIcon },
];

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
        setIsOpen(false); // Close overlay on resize below 768px
      } else {
        setIsCollapsed(false);
        setIsOpen(false); // Ensure no overlay on desktop
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (windowWidth <= 768) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const widthClass = isCollapsed && !isOpen ? 'w-20' : 'w-64';
  const sidebarClass = windowWidth <= 768 ? 'fixed z-50' : 'relative';
  const overlayClass = isOpen && windowWidth <= 768 ? 'opacity-100' : 'opacity-0 pointer-events-none';

  return (
    <>
      {/* Overlay for mobile with fade-in effect */}
      {windowWidth <= 768 && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${overlayClass}`}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen ${sidebarClass} ${widthClass}`}
      >
        {/* Header with Clickable Logo */}
        <div className="flex items-center justify-between p-2.5 border-b border-gray-700 flex-shrink-0">
          <Link to="/">
            <img
              src={isCollapsed && !isOpen ? collapsedLogo : fullLogo}
              alt="Logo"
              className={isCollapsed && !isOpen ? 'w-8 h-8 rounded-full cursor-pointer' : 'w-32 h-auto cursor-pointer'}
            />
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
          >
            {isCollapsed && !isOpen ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronDownIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-5.5 py-3.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    title={isCollapsed && !isOpen ? item.name : ''}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!(isCollapsed && !isOpen) && <span className="ml-3 truncate">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!(isCollapsed && !isOpen) && (
          <div className="p-4 border-t border-gray-700 flex-shrink-0">
            <div className="text-xs text-gray-400">
              <div>Version 2.1.0</div>
              <div>© 2024 Bizvility</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;