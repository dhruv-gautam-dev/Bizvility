import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  DocumentTextIcon,
  PhotoIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  ListBulletIcon,
  CurrencyDollarIcon,
  MegaphoneIcon,
  CalendarIcon,
  FlagIcon,
  DocumentDuplicateIcon,
  CreditCardIcon,
  StarIcon,
  ExclamationTriangleIcon,
  PaintBrushIcon,
  CodeBracketIcon,
  DocumentArrowDownIcon,
  SwatchIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  CubeIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import BizvilityLogo from '../imgs/white-logo.png';
import BizvilityIconLogo from '../imgs/bizvility-logo.ico';

const navigation = [
  { name: 'Dashboard', href: '/super-admin-dashboard', icon: HomeIcon },
  { name: 'Listing', href: '/super-admin-listings', icon: ListBulletIcon },
  { name: 'Leads', href: '/super-admin-leads', icon: UserGroupIcon },
  { name: 'Pricing Plans', href: '/super-admin-pricingPlans', icon: CurrencyDollarIcon },
  { name: 'Events', href: '/super-admin-events', icon: CalendarIcon },
  { name: 'Invoices', href: '/super-admin-invoices', icon: DocumentDuplicateIcon },
  { name: 'Reviews', href: '/super-admin-reviews', icon: StarIcon },
  { name: 'Users', href: '/super-admin-users', icon: UserGroupIcon },
  { name: 'Razorpay', href: '/super-admin-razorpay', icon: CreditCardIcon },
  // { name: 'Settings', href: '/super-admin-settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const sidebarRef = useRef(null);

  // Auto-collapse based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle clicks outside sidebar to collapse on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        !isCollapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCollapsed]);

  // Focus management for accessibility
  useEffect(() => {
    if (!isCollapsed && window.innerWidth <= 768 && sidebarRef.current) {
      sidebarRef.current.focus();
    }
  }, [isCollapsed]);

  return (
    <>
      {/* Overlay for mobile when sidebar is expanded */}
      {window.innerWidth <= 768 && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}

      <div
        ref={sidebarRef}
        className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen
          ${window.innerWidth <= 768
            ? isCollapsed
              ? 'w-20 z-50'
              : 'fixed z-50 w-full max-w-[16rem]'
            : isCollapsed
              ? 'w-20'
              : 'w-64'
          }`}
        tabIndex={-1}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between p-2.5 md:p-2 border-b border-gray-700 flex-shrink-0">
          <Link to="/">
            {isCollapsed ? (
              <img
                src={BizvilityIconLogo}
                alt="Bizvility Icon Logo"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <img
                src={BizvilityLogo}
                alt="Bizvility Logo"
                className="h-12 w-auto"
              />
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-gray-800 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group flex items-center px-5.5 py-2.5 text-sm md:text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <Icon className="h-6 w-6 md:h-5 md:w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {!isCollapsed && (
          <div className="p-4 md:p-3 border-t border-gray-700 flex-shrink-0">
            <div className="text-xs md:text-[10px] text-gray-400">
              <div>Version 2.2.0</div>
              <div>© 2025 Bizvility</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}