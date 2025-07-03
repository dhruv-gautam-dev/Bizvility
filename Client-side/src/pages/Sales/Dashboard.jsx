import { useState } from 'react';
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  StarIcon,
  EyeIcon,
  ClockIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TrophyIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

// Platform stats data
const platformStats = {
  totalUsers: 12847,
  activeUsers: 8934,
  totalListings: 5672,
  activeListings: 4891,
  totalRevenue: 285000,
  monthlyRevenue: 45600,
  totalReviews: 18934,
  averageRating: 4.3,
  totalViews: 1250000,
  conversionRate: 12.5,
  flaggedContent: 23,
  pendingApprovals: 156
};

// Sample listings
const recentListings = [
  {
    id: 1,
    title: 'The Coffee House',
    owner: 'John Smith',
    category: 'Restaurant',
    location: 'New York, NY',
    status: 'Active',
    views: 1247,
    rating: 4.5,
    revenue: 299,
    createdAt: '2 hours ago'
  },
  {
    id: 2,
    title: 'Tech Solutions Inc',
    owner: 'Sarah Johnson',
    category: 'Services',
    location: 'San Francisco, CA',
    status: 'Pending',
    views: 892,
    rating: 4.8,
    revenue: 599,
    createdAt: '4 hours ago'
  },
  {
    id: 3,
    title: 'Fashion Boutique',
    owner: 'Mike Brown',
    category: 'Retail',
    location: 'Los Angeles, CA',
    status: 'Active',
    views: 567,
    rating: 4.2,
    revenue: 149,
    createdAt: '1 day ago'
  }
];

// Sample users
const recentUsers = [
  { name: 'John Smith', email: 'john@example.com', joinedAt: '2 hours ago', listings: 1, status: 'Active' },
  { name: 'Sarah Johnson', email: 'sarah@example.com', joinedAt: '4 hours ago', listings: 2, status: 'Active' },
  { name: 'Mike Brown', email: 'mike@example.com', joinedAt: '1 day ago', listings: 1, status: 'Pending' },
  { name: 'Emily Davis', email: 'emily@example.com', joinedAt: '2 days ago', listings: 3, status: 'Active' }
];

// Sample categories
const topCategories = [
  { name: 'Restaurants', count: 1247, revenue: 85600, growth: '+12%' },
  { name: 'Services', count: 892, revenue: 67400, growth: '+8%' },
  { name: 'Retail', count: 756, revenue: 45200, growth: '+15%' },
  { name: 'Health & Fitness', count: 634, revenue: 38900, growth: '+5%' }
];

// Platform activity
const platformActivity = [
  { action: 'New listing created', user: 'John Smith - The Coffee House', time: '2 hours ago', type: 'listing' },
  { action: 'User registered', user: 'Sarah Johnson', time: '4 hours ago', type: 'user' },
  { action: 'Review submitted', user: 'Mike Brown for Tech Solutions', time: '6 hours ago', type: 'review' },
  { action: 'Payment received', user: 'Emily Davis - $299', time: '1 day ago', type: 'payment' }
];

// JSX Component
export default function Dashboard() {
  const [quickActionExpanded, setQuickActionExpanded] = useState(true);
  const [recentActivityExpanded, setRecentActivityExpanded] = useState(true);
  const [topListingsExpanded, setTopListingsExpanded] = useState(true);

  // Return status color class
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Emoji icons for activity types
  const getActivityIcon = (type) => {
    switch (type) {
      case 'listing': return '🏢';
      case 'user': return '👤';
      case 'review': return '⭐';
      case 'payment': return '💰';
      default: return '📝';
    }
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Platform Dashboard</h1>
          <p className="text-gray-600">Monitor your business listing platform performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => window.location.href = '/listings'}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            <BuildingStorefrontIcon className="h-5 w-5" />
            View All Listings
          </button>
          <button
            onClick={() => window.location.href = '/users'}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
          >
            <UserGroupIcon className="h-5 w-5" />
            View All Users
          </button>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center">
            <UserGroupIcon className="h-6 lg:h-8 w-6 lg:w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">
                {platformStats.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+8.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-6 lg:h-8 w-6 lg:w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Listings</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">
                {platformStats.totalListings.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-6 lg:h-8 w-6 lg:w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">
                ${platformStats.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+15.7%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center">
            <StarIcon className="h-6 lg:h-8 w-6 lg:w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Rating</p>
              <p className="text-xl lg:text-2xl font-semibold text-gray-900">{platformStats.averageRating}</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+0.3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-lg lg:text-xl font-semibold text-green-600">
                {platformStats.activeUsers.toLocaleString()}
              </p>
            </div>
            <UserGroupIcon className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Listings</p>
              <p className="text-lg lg:text-xl font-semibold text-blue-600">
                {platformStats.activeListings.toLocaleString()}
              </p>
            </div>
            <BuildingStorefrontIcon className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-lg lg:text-xl font-semibold text-purple-600">
                {platformStats.totalViews.toLocaleString()}
              </p>
            </div>
            <EyeIcon className="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Flagged Content</p>
              <p className="text-lg lg:text-xl font-semibold text-red-600">{platformStats.flaggedContent}</p>
            </div>
            <FlagIcon className="h-6 w-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
            onClick={() => setQuickActionExpanded(!quickActionExpanded)}
          >
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <span className="text-gray-400">{quickActionExpanded ? '−' : '+'}</span>
          </div>

          {quickActionExpanded && (
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => window.location.href = '/listings'}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <BuildingStorefrontIcon className="h-6 lg:h-8 w-6 lg:w-8 text-blue-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Manage Listings</span>
                </button>

                <button
                  onClick={() => window.location.href = '/users'}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <UserGroupIcon className="h-6 lg:h-8 w-6 lg:w-8 text-green-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Manage Users</span>
                </button>

                <button
                  onClick={() => window.location.href = '/reviews'}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <StarIcon className="h-6 lg:h-8 w-6 lg:w-8 text-yellow-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Review Management</span>
                </button>

                <button
                  onClick={() => window.location.href = '/revenue'}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
                >
                  <CurrencyDollarIcon className="h-6 lg:h-8 w-6 lg:w-8 text-purple-600 mx-auto mb-2" />
                  <span className="text-sm font-medium">Revenue Analytics</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
            onClick={() => setRecentActivityExpanded(!recentActivityExpanded)}
          >
            <h2 className="text-lg font-semibold">Recent Platform Activity</h2>
            <span className="text-gray-400">{recentActivityExpanded ? '−' : '+'}</span>
          </div>

          {recentActivityExpanded && (
            <div className="p-4">
              <div className="space-y-3">
                {platformActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                      <p className="text-sm text-gray-600 truncate">{activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Top Categories</h2>
            <button
              onClick={() => window.location.href = '/categories'}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View All
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900 truncate">{category.name}</h3>
                      <span className="text-sm text-green-600 font-medium whitespace-nowrap">{category.growth}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{category.count} listings</span>
                      <span>${category.revenue.toLocaleString()} revenue</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-lg shadow">
          <div
            className="flex items-center justify-between p-4 border-b cursor-pointer"
            onClick={() => setTopListingsExpanded(!topListingsExpanded)}
          >
            <h2 className="text-lg font-semibold">Recent Listings</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">Latest submissions</span>
              <span className="text-gray-400">{topListingsExpanded ? '−' : '+'}</span>
            </div>
          </div>

          {topListingsExpanded && (
            <div className="p-4">
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-gray-900 truncate">{listing.title}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                          {listing.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 overflow-x-auto">
                        <span className="whitespace-nowrap">by {listing.owner}</span>
                        <span className="whitespace-nowrap">{listing.category}</span>
                        <span className="whitespace-nowrap">{listing.views} views</span>
                        <span className="whitespace-nowrap">⭐ {listing.rating}</span>
                        <span className="whitespace-nowrap">${listing.revenue}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-xs text-gray-500">{listing.createdAt}</div>
                      <button
                        onClick={() => window.location.href = '/listings'}
                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <button
              onClick={() => window.location.href = '/users'}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View All Users
            </button>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <UserGroupIcon className="h-8 w-8 text-gray-400" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{user.listings} listings</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{user.joinedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}