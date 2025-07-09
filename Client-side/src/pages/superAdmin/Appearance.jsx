import { useState } from 'react';
import {
  SwatchIcon,
  PhotoIcon,
  Cog6ToothIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const themes = [
  {
    id: 1,
    name: 'ListingPro Default',
    description: 'Clean and modern design perfect for business directories',
    preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    status: 'Active',
    version: '2.1.0',
    author: 'ListingPro Team',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    name: 'Business Hub',
    description: 'Professional theme with advanced listing features',
    preview: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    status: 'Inactive',
    version: '1.8.5',
    author: 'ThemeForest',
    lastUpdated: '2024-01-10'
  },
  {
    id: 3,
    name: 'Directory Pro',
    description: 'Minimalist design focused on user experience',
    preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    status: 'Inactive',
    version: '3.0.2',
    author: 'Creative Studio',
    lastUpdated: '2024-01-08'
  }
];

const customizations = [
  { name: 'Primary Color', value: '#3B82F6', type: 'color' },
  { name: 'Secondary Color', value: '#10B981', type: 'color' },
  { name: 'Font Family', value: 'Inter', type: 'select', options: ['Inter', 'Roboto', 'Open Sans'] },
  { name: 'Header Height', value: '80px', type: 'text' },
  { name: 'Border Radius', value: '8px', type: 'text' },
  { name: 'Enable Shadows', value: true, type: 'checkbox' }
];

export default function SuperAppearance() {
  const [activeTab, setActiveTab] = useState('themes');
  const [customValues, setCustomValues] = useState(
    customizations.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {})
  );

  const handleCustomChange = (name, value) => {
    setCustomValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Appearance</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('themes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'themes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <SwatchIcon className="h-5 w-5 inline mr-2" />
            Themes
          </button>
          <button
            onClick={() => setActiveTab('customize')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customize'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Cog6ToothIcon className="h-5 w-5 inline mr-2" />
            Customize
          </button>
          <button
            onClick={() => setActiveTab('menus')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'menus'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <PhotoIcon className="h-5 w-5 inline mr-2" />
            Menus
          </button>
        </nav>
      </div>

      {/* Themes Tab */}
      {activeTab === 'themes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <div key={theme.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img src={theme.preview} alt={theme.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{theme.name}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        theme.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {theme.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
                  <div className="text-xs text-gray-500 mb-4">
                    <div>Version: {theme.version}</div>
                    <div>By: {theme.author}</div>
                    <div>Updated: {theme.lastUpdated}</div>
                  </div>
                  <div className="flex space-x-2">
                    {theme.status === 'Active' ? (
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700">
                        Customize
                      </button>
                    ) : (
                      <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700">
                        Activate
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Management</h3>
            <div className="space-y-4">
              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <span className="text-gray-600">Upload New Theme</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Tab */}
      {activeTab === 'customize' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Theme Customization</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {customizations.map((item) => (
                  <div key={item.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{item.name}</label>

                    {item.type === 'color' && (
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={customValues[item.name]}
                          onChange={(e) => handleCustomChange(item.name, e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customValues[item.name]}
                          onChange={(e) => handleCustomChange(item.name, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}

                    {item.type === 'select' && (
                      <select
                        value={customValues[item.name]}
                        onChange={(e) => handleCustomChange(item.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {item.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {item.type === 'text' && (
                      <input
                        type="text"
                        value={customValues[item.name]}
                        onChange={(e) => handleCustomChange(item.name, e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}

                    {item.type === 'checkbox' && (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={customValues[item.name]}
                          onChange={(e) => handleCustomChange(item.name, e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Enable</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Live Preview</h4>
                <div className="bg-white rounded border p-4 min-h-64">
                  <div
                    className="h-8 rounded mb-4"
                    style={{ backgroundColor: customValues['Primary Color'] }}
                  ></div>
                  <div style={{ fontFamily: customValues['Font Family'], color: '#1F2937' }}>
                    <h3 className="text-lg font-bold mb-2">Sample Heading</h3>
                    <p className="text-sm mb-4">
                      This is a preview of how your customizations will look.
                    </p>
                    <div
                      className="inline-block px-4 py-2 rounded text-white text-sm"
                      style={{
                        backgroundColor: customValues['Secondary Color'],
                        borderRadius: customValues['Border Radius']
                      }}
                    >
                      Sample Button
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menus Tab */}
      {activeTab === 'menus' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Menu Management</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Available Menu Items</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded p-4">
                {['Home', 'About', 'Services', 'Contact', 'Blog', 'Portfolio', 'Testimonials', 'FAQ'].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <span className="text-sm">{item}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Add</button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">Current Menu Structure</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded p-4">
                {['Home', 'Listings', 'Categories', 'About', 'Contact'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{item}</span>
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
