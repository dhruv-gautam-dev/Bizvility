import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  ChartBarIcon,
  StarIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import LogoImage from "../imgs/white-logo.png";
import CollapsedLogoImage from "../imgs/bizvility-logo.ico";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard", icon: HomeIcon },
  {
    name: "My Listings",
    href: "/user-my-listings",
    icon: BuildingStorefrontIcon,
  },
  { name: "My Reviews", href: "/user-my-reviews", icon: StarIcon },
  { name: "Analytics", href: "/user-analytics", icon: ChartBarIcon },
  { name: "Invoices", href: "/user-invoices", icon: DocumentTextIcon },
  { name: "Events", href: "/user-events", icon: DocumentTextIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-900 text-white transition-all duration-300 flex flex-col h-screen ${
        isCollapsed ? "w-20" : "w-64"
      }`}
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon className="flex-shrink-0 w-5 h-5" />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="flex-shrink-0 p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            <div>User Dashboard</div>
            <div>© 2024 ListingPro</div>
          </div>
        </div>
      )}
    </div>
  );
}
