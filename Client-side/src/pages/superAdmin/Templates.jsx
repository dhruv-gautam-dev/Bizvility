import { useState } from 'react';
import { MagnifyingGlassIcon, DocumentArrowDownIcon, EyeIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const templates = [
  {
    id: 1,
    name: 'Business Listing Template',
    category: 'Listing',
    type: 'Page Template',
    description: 'Modern business listing layout with image gallery and contact information',
    preview: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 245,
    rating: 4.8,
    author: 'Admin',
    lastUpdated: '2024-01-15',
    status: 'Active',
    tags: ['business', 'listing', 'modern']
  },
  {
    id: 2,
    name: 'Restaurant Menu Card',
    category: 'Restaurant',
    type: 'Component',
    description: 'Elegant menu card design for restaurant listings',
    preview: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 189,
    rating: 4.6,
    author: 'Designer',
    lastUpdated: '2024-01-14',
    status: 'Active',
    tags: ['restaurant', 'menu', 'food']
  },
  {
    id: 3,
    name: 'Service Provider Profile',
    category: 'Services',
    type: 'Profile Template',
    description: 'Professional profile template for service providers',
    preview: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 156,
    rating: 4.7,
    author: 'Developer',
    lastUpdated: '2024-01-13',
    status: 'Active',
    tags: ['services', 'profile', 'professional']
  },
  {
    id: 4,
    name: 'Event Listing Card',
    category: 'Events',
    type: 'Component',
    description: 'Eye-catching event card with date, time, and location display',
    preview: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 134,
    rating: 4.5,
    author: 'Designer',
    lastUpdated: '2024-01-12',
    status: 'Draft',
    tags: ['events', 'card', 'calendar']
  },
  {
    id: 5,
    name: 'Contact Form Widget',
    category: 'Forms',
    type: 'Widget',
    description: 'Responsive contact form with validation and styling',
    preview: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 298,
    rating: 4.9,
    author: 'Developer',
    lastUpdated: '2024-01-11',
    status: 'Active',
    tags: ['form', 'contact', 'widget']
  },
  {
    id: 6,
    name: 'Review Display Component',
    category: 'Reviews',
    type: 'Component',
    description: 'Star rating and review display component with user avatars',
    preview: 'https://images.unsplash.com/photo-1553028826-f4804151e2e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    downloads: 167,
    rating: 4.4,
    author: 'Designer',
    lastUpdated: '2024-01-10',
    status: 'Active',
    tags: ['reviews', 'rating', 'stars']
  },
];

const categories = ['All', 'Listing', 'Restaurant', 'Services', 'Events', 'Forms', 'Reviews'];
const types = ['All', 'Page Template', 'Component', 'Widget', 'Profile Template'];

export default function SuperTemplates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || template.category === filterCategory;
    const matchesType = filterType === 'All' || template.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const handlePreview = (templateId) => {
    console.log('Preview template:', templateId);
    // Implement preview functionality
  };

  const handleDownload = (templateId) => {
    console.log('Download template:', templateId);
    // Implement download functionality
  };

  const handleEdit = (templateId) => {
    console.log('Edit template:', templateId);
    // Implement edit functionality
  };

  const handleUploadTemplate = () => {
    console.log('Upload new template');
    // Implement upload functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Template Library</h1>
          <button 
            onClick={handleUploadTemplate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Upload Template
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Templates Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={template.preview} 
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900 truncate">{template.name}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {renderStars(template.rating)}
                      <span className="ml-1 text-sm text-gray-500">({template.rating})</span>
                    </div>
                    <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <div>by {template.author}</div>
                      <div>{template.lastUpdated}</div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePreview(template.id)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors" 
                        title="Preview"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDownload(template.id)}
                        className="p-1 text-green-600 hover:text-green-800 transition-colors" 
                        title="Download"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEdit(template.id)}
                        className="p-1 text-gray-600 hover:text-gray-800 transition-colors" 
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Downloads
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={template.preview} 
                          alt={template.name}
                          className="h-10 w-10 rounded object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-500">by {template.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {template.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {renderStars(template.rating)}
                        <span className="ml-1 text-sm text-gray-500">({template.rating})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handlePreview(template.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Preview"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDownload(template.id)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Download"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(template.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Edit"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Results count */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          Showing {filteredTemplates.length} of {templates.length} templates
        </div>
      </div>
    </div>
  );
}
