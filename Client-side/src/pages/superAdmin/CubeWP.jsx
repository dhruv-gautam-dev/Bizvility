import { useState } from 'react';
import {
  CubeIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const cubeWPFeatures = [
  {
    id: 1,
    name: 'Custom Post Types',
    description: 'Create and manage custom post types for your directory',
    status: 'Active',
    usage: 85,
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    name: 'Custom Fields',
    description: 'Add custom fields to enhance your listings',
    status: 'Active',
    usage: 92,
    lastUpdated: '2024-01-14'
  },
  {
    id: 3,
    name: 'Advanced Search',
    description: 'Powerful search functionality with filters',
    status: 'Active',
    usage: 78,
    lastUpdated: '2024-01-13'
  },
  {
    id: 4,
    name: 'User Dashboard',
    description: 'Frontend user dashboard for managing listings',
    status: 'Inactive',
    usage: 0,
    lastUpdated: '2024-01-10'
  }
];

const postTypes = [
  { name: 'Business Listings', count: 2847, fields: 12 },
  { name: 'Events', count: 156, fields: 8 },
  { name: 'Job Postings', count: 89, fields: 10 },
  { name: 'Real Estate', count: 234, fields: 15 }
];

export default function CubeWP() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">CubeWP Framework</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Configure CubeWP
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'post-types', 'fields', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cubeWPFeatures.map((feature) => (
              <div key={feature.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <CubeIcon className="h-8 w-8 text-blue-500" />
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      feature.status
                    )}`}
                  >
                    {feature.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Usage</p>
                    <p className="text-2xl font-bold text-blue-600">{feature.usage}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Updated</p>
                    <p className="text-xs text-gray-700">{feature.lastUpdated}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">CubeWP Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <ChartBarIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-500">Active Post Types</div>
              </div>
              <div className="text-center">
                <DocumentTextIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">45</div>
                <div className="text-sm text-gray-500">Custom Fields</div>
              </div>
              <div className="text-center">
                <Cog6ToothIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900">3,326</div>
                <div className="text-sm text-gray-500">Total Entries</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'post-types' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Custom Post Types</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Add New Post Type
              </button>
            </div>
            <div className="divide-y divide-gray-200">
              {postTypes.map((postType, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{postType.name}</h4>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">{postType.count} entries</span>
                        <span className="text-sm text-gray-500">{postType.fields} custom fields</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Manage Fields</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">View Entries</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fields' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Custom Fields Management</h3>

          {[
            {
              label: 'Business Address',
              type: 'Text',
              desc: 'Text field for business address',
              badge: 'blue'
            },
            {
              label: 'Business Hours',
              type: 'Repeater',
              desc: 'Repeater field for operating hours',
              badge: 'green'
            },
            {
              label: 'Business Category',
              type: 'Select',
              desc: 'Dropdown for business categories',
              badge: 'yellow'
            },
            {
              label: 'Featured Image Gallery',
              type: 'Image',
              desc: 'Image upload field for business photos',
              badge: 'purple'
            }
          ].map((field, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{field.label}</h4>
                  <p className="text-sm text-gray-500">{field.desc}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 bg-${field.badge}-100 text-${field.badge}-800 text-xs rounded`}>
                    {field.type}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                </div>
              </div>
            </div>
          ))}

          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Add New Field
            </button>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">CubeWP Settings</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Post Type
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Business Listings</option>
              <option>Events</option>
              <option>Job Postings</option>
              <option>Real Estate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Archive Page Template
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Grid Layout</option>
              <option>List Layout</option>
              <option>Card Layout</option>
              <option>Custom Template</option>
            </select>
          </div>

          {[
            'Enable frontend submission',
            'Enable user dashboard',
            'Enable advanced search filters',
            'Enable map integration'
          ].map((label, i) => (
            <div className="flex items-center" key={i}>
              <input
                type="checkbox"
                id={`setting-${i}`}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`setting-${i}`} className="ml-2 block text-sm text-gray-900">
                {label}
              </label>
            </div>
          ))}

          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}
