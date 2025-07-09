import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PuzzlePieceIcon,
  CheckCircleIcon,
  XCircleIcon,
  Cog6ToothIcon,
  CloudArrowDownIcon
} from '@heroicons/react/24/outline';

const installedPlugins = [
  {
    id: 1,
    name: 'Advanced Search & Filter',
    description: 'Enhanced search functionality with multiple filters and sorting options',
    version: '2.1.5',
    author: 'ListingPro Team',
    status: 'Active',
    lastUpdated: '2024-01-15',
    category: 'Search',
    hasUpdate: false
  },
  {
    id: 2,
    name: 'Payment Gateway Integration',
    description: 'Multiple payment gateway support including PayPal, Stripe, and more',
    version: '1.8.2',
    author: 'Payment Solutions',
    status: 'Active',
    lastUpdated: '2024-01-10',
    category: 'Payment',
    hasUpdate: true
  },
  {
    id: 3,
    name: 'Social Media Login',
    description: 'Allow users to login with Facebook, Google, Twitter, and LinkedIn',
    version: '3.0.1',
    author: 'Social Connect',
    status: 'Inactive',
    lastUpdated: '2024-01-08',
    category: 'Authentication',
    hasUpdate: false
  },
  {
    id: 4,
    name: 'Email Marketing Integration',
    description: 'Connect with MailChimp, Constant Contact, and other email services',
    version: '1.5.7',
    author: 'Marketing Tools',
    status: 'Active',
    lastUpdated: '2024-01-05',
    category: 'Marketing',
    hasUpdate: false
  },
  {
    id: 5,
    name: 'Analytics & Reporting',
    description: 'Comprehensive analytics dashboard with detailed reporting features',
    version: '2.3.0',
    author: 'Analytics Pro',
    status: 'Inactive',
    lastUpdated: '2024-01-03',
    category: 'Analytics',
    hasUpdate: true
  }
];

const availablePlugins = [
  {
    id: 6,
    name: 'Multi-Language Support',
    description: 'Add multi-language functionality to your directory',
    version: '1.2.4',
    author: 'Language Pack',
    price: 'Free',
    rating: 4.8,
    downloads: 15420,
    category: 'Localization'
  },
  {
    id: 7,
    name: 'Advanced Booking System',
    description: 'Complete booking and reservation management system',
    version: '2.0.3',
    author: 'Booking Solutions',
    price: '$49',
    rating: 4.6,
    downloads: 8930,
    category: 'Booking'
  },
  {
    id: 8,
    name: 'Review Management Pro',
    description: 'Advanced review system with moderation and analytics',
    version: '1.7.1',
    author: 'Review Systems',
    price: '$29',
    rating: 4.7,
    downloads: 12340,
    category: 'Reviews'
  }
];

export default function SuperPlugins() {
  const [activeTab, setActiveTab] = useState('installed');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    'all',
    'Search',
    'Payment',
    'Authentication',
    'Marketing',
    'Analytics',
    'Localization',
    'Booking',
    'Reviews'
  ];

  const filteredInstalledPlugins = installedPlugins.filter(plugin => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || plugin.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredAvailablePlugins = availablePlugins.filter(plugin => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || plugin.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = status => {
    return status === 'Active' ? 'text-green-600' : 'text-gray-400';
  };

  const getStatusIcon = status => {
    return status === 'Active' ? CheckCircleIcon : XCircleIcon;
  };

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Plugins</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <CloudArrowDownIcon className="h-5 w-5" />
          Upload Plugin
        </button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('installed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'installed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Installed Plugins ({installedPlugins.length})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'available'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Available Plugins
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search plugins..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeTab === 'installed' && (
        <div className="space-y-4">
          {filteredInstalledPlugins.map(plugin => {
            const StatusIcon = getStatusIcon(plugin.status);
            return (
              <div key={plugin.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <PuzzlePieceIcon className="h-12 w-12 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{plugin.name}</h3>
                        <StatusIcon className={`h-5 w-5 ${getStatusColor(plugin.status)}`} />
                        <span className={`text-sm font-medium ${getStatusColor(plugin.status)}`}>
                          {plugin.status}
                        </span>
                        {plugin.hasUpdate && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                            Update Available
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{plugin.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Version {plugin.version}</span>
                        <span>by {plugin.author}</span>
                        <span>Updated {plugin.lastUpdated}</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {plugin.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {plugin.hasUpdate && (
                      <button className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">
                        Update
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                      <Cog6ToothIcon className="h-4 w-4" />
                    </button>
                    {plugin.status === 'Active' ? (
                      <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                        Deactivate
                      </button>
                    ) : (
                      <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                        Activate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvailablePlugins.map(plugin => (
            <div key={plugin.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <PuzzlePieceIcon className="h-8 w-8 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{plugin.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                      {plugin.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{plugin.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {renderStars(plugin.rating)}
                    <span className="ml-1 text-sm text-gray-500">({plugin.rating})</span>
                  </div>
                  <span className="text-lg font-bold text-green-600">{plugin.price}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Version {plugin.version}</span>
                  <span>{plugin.downloads.toLocaleString()} downloads</span>
                </div>

                <div className="text-xs text-gray-500 mb-4">by {plugin.author}</div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  {plugin.price === 'Free' ? 'Install' : 'Purchase & Install'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
