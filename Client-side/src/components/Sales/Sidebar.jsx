import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  StarIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  TrophyIcon,
  FlagIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import LogoImage from "../imgs/white-logo.png";
import CollapsedLogoImage from "../imgs/bizvility-logo.ico";

const navigation = [
  { name: "Sales Dashboard", href: "/sales-dashboard", icon: HomeIcon },
  { name: "Leads Management", href: "/sales-leads", icon: UserGroupIcon },
  {
    name: "My Customers",
    href: "/sales-customers",
    icon: BuildingStorefrontIcon,
  },
  { name: "Sales Reports", href: "/sales-reports", icon: ChartBarIcon },
  { name: "Sales Employee", href: "/sales-users-management", icon: UsersIcon },
  {
    name: "All Listings",
    href: "/sales-listings",
    icon: BuildingStorefrontIcon,
  },
  // { name: 'All Users', href: '/sales-users', icon: UserGroupIcon },
  {
    name: "Categories",
    href: "/sales-categories",
    icon: ClipboardDocumentListIcon,
  },
  // { name: "Reviews & Ratings", href: "/sales-reviews", icon: StarIcon },
  {
    name: "Revenue Analytics",
    href: "/sales-revenue",
    icon: CurrencyDollarIcon,
  },
  // { name: 'User Analytics', href: '/user-analytics', icon: ChartBarIcon },
  // { name: 'Listing Analytics', href: '/listing-analytics', icon: TrophyIcon },
  // { name: 'Platform Reports', href: '/platform-reports', icon: DocumentTextIcon },
  // { name: 'Flagged Content', href: '/flagged', icon: FlagIcon },
  // { name: 'Messages & Support', href: '/messages', icon: ChatBubbleLeftRightIcon },
  // { name: 'Profile', href: '/sales-profile', icon: UserIcon },
  // { name: 'Notifications', href: '/notifications', icon: BellIcon },
  // { name: 'Settings', href: '/sales-settings', icon: Cog6ToothIcon },
];

export default function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${isCollapsed ? "lg:w-16" : "lg:w-64"}
          w-64
          bg-gray-900 text-white transition-all duration-300 ease-in-out
          flex flex-col h-screen flex-shrink-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0 p-1 border-b border-gray-700">
          <Link to="/">
            <img
              src={isCollapsed ? CollapsedLogoImage : LogoImage}
              alt="Bizvility Logo"
              className={`h-11 ${
                isCollapsed ? "w-11 rounded-full" : "w-32"
              } object-contain transition-all duration-300`}
            />
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 transition-colors rounded hover:bg-gray-800"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>

          {/* Mobile close button */}
          {/* <button
            onClick={closeMobileMenu}
            className="p-1 transition-colors rounded lg:hidden hover:bg-gray-800"
          >
            <XMarkIcon className="w-6 h-6" />
          </button> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={closeMobileMenu}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    } ${
                      isCollapsed && window.innerWidth >= 1024
                        ? "justify-center"
                        : ""
                    }`}
                    title={
                      isCollapsed && window.innerWidth >= 1024 ? item.name : ""
                    }
                  >
                    <item.icon
                      className={`h-5 w-5 flex-shrink-0 ${
                        isCollapsed && window.innerWidth >= 1024 ? "" : "mr-3"
                      }`}
                    />
                    {(!isCollapsed || window.innerWidth < 1024) && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        {(!isCollapsed || window.innerWidth < 1024) && (
          <div className="flex-shrink-0 p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <div>Business Listing Platform</div>
              <div>© 2025 Bizvility</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
