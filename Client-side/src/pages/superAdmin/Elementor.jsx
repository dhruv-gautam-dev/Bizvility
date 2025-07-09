import { useState } from 'react';
import {
  CodeBracketIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const elementorPages = [
  {
    id: 1,
    title: 'Homepage Design',
    type: 'Page',
    status: 'Published',
    lastModified: '2024-01-15',
    author: 'Admin',
    template: 'Landing Page',
    views: 1250,
  },
  {
    id: 2,
    title: 'About Us Template',
    type: 'Template',
    status: 'Draft',
    lastModified: '2024-01-14',
    author: 'Designer',
    template: 'About Page',
    views: 0,
  },
  {
    id: 3,
    title: 'Contact Form Widget',
    type: 'Widget',
    status: 'Published',
    lastModified: '2024-01-13',
    author: 'Developer',
    template: 'Contact Widget',
    views: 890,
  },
  {
    id: 4,
    title: 'Business Listing Card',
    type: 'Template',
    status: 'Published',
    lastModified: '2024-01-12',
    author: 'Designer',
    template: 'Listing Card',
    views: 567,
  },
  {
    id: 5,
    title: 'Header Navigation',
    type: 'Header',
    status: 'Published',
    lastModified: '2024-01-11',
    author: 'Admin',
    template: 'Navigation Header',
    views: 2340,
  },
];

const elementorWidgets = [
  { name: 'Business Card', category: 'Listing', usage: 45 },
  { name: 'Search Filter', category: 'Search', usage: 32 },
  { name: 'Review Display', category: 'Reviews', usage: 28 },
  { name: 'Map Integration', category: 'Location', usage: 23 },
  { name: 'Contact Form', category: 'Forms', usage: 67 },
  { name: 'Image Gallery', category: 'Media', usage: 41 },
];

export default function SuperElementor() {
  const [activeTab, setActiveTab] = useState('pages');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPages = elementorPages.filter(
    (page) =>
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Elementor Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Create New Template
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['pages', 'widgets', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab === 'pages' && 'Pages & Templates'}
              {tab === 'widgets' && 'Widgets'}
              {tab === 'settings' && 'Settings'}
            </button>
          ))}
        </nav>
      </div>

      {/* Pages & Templates Tab */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search pages and templates..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">All Types</option>
                <option value="page">Pages</option>
                <option value="template">Templates</option>
                <option value="widget">Widgets</option>
                <option value="header">Headers</option>
                <option value="footer">Footers</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Title', 'Type', 'Status', 'Author', 'Views', 'Actions'].map((th) => (
                    <th
                      key={th}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CodeBracketIcon className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{page.title}</div>
                          <div className="text-sm text-gray-500">{page.template}</div>
                          <div className="text-xs text-gray-400">Modified: {page.lastModified}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {page.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Widgets Tab */}
      {activeTab === 'widgets' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elementorWidgets.map((widget, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{widget.name}</h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {widget.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Usage Count</p>
                    <p className="text-2xl font-bold text-blue-600">{widget.usage}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Widget Performance</h3>
            <div className="space-y-4">
              {elementorWidgets.map((widget, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="text-sm font-medium text-gray-900">{widget.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(widget.usage / 70) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{widget.usage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Elementor Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Page Width</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Boxed (1200px)</option>
                <option>Full Width</option>
                <option>Custom</option>
              </select>
            </div>

            {/* Color Scheme Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Color Scheme</label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  ['bg-blue-500', 'bg-green-500'],
                  ['bg-purple-500', 'bg-pink-500'],
                  ['bg-orange-500', 'bg-red-500'],
                  ['bg-gray-800', 'bg-gray-600'],
                ].map((colors, idx) => (
                  <div
                    key={idx}
                    className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500"
                  >
                    <div className="flex space-x-1 mb-2">
                      {colors.map((color, i) => (
                        <div key={i} className={`w-4 h-4 ${color} rounded`}></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      {['Default', 'Purple', 'Warm', 'Dark'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              {[
                ['enable-css-print', 'Enable CSS Print Method'],
                ['enable-font-display', 'Improve Loading Time (Font Display)'],
                ['enable-optimized-dom', 'Optimized DOM Output'],
              ].map(([id, label]) => (
                <div className="flex items-center" key={id}>
                  <input
                    type="checkbox"
                    id={id}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                    {label}
                  </label>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
