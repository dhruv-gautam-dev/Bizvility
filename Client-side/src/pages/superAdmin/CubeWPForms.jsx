import { useState } from 'react';
import {
  DocumentTextIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

const forms = [
  {
    id: 1,
    name: 'Business Listing Submission',
    description: 'Form for submitting new business listings',
    fields: 12,
    submissions: 245,
    status: 'Active',
    lastModified: '2024-01-15',
    type: 'Listing Form'
  },
  {
    id: 2,
    name: 'Contact Us Form',
    description: 'General contact form for inquiries',
    fields: 6,
    submissions: 189,
    status: 'Active',
    lastModified: '2024-01-14',
    type: 'Contact Form'
  },
  {
    id: 3,
    name: 'Event Registration',
    description: 'Form for event registration and booking',
    fields: 8,
    submissions: 156,
    status: 'Active',
    lastModified: '2024-01-13',
    type: 'Registration Form'
  },
  {
    id: 4,
    name: 'Business Review Form',
    description: 'Form for submitting business reviews',
    fields: 5,
    submissions: 298,
    status: 'Active',
    lastModified: '2024-01-12',
    type: 'Review Form'
  },
  {
    id: 5,
    name: 'Job Application Form',
    description: 'Form for job applications',
    fields: 10,
    submissions: 67,
    status: 'Draft',
    lastModified: '2024-01-11',
    type: 'Application Form'
  }
];

const formFields = [
  { type: 'Text', icon: '📝', description: 'Single line text input' },
  { type: 'Textarea', icon: '📄', description: 'Multi-line text input' },
  { type: 'Email', icon: '📧', description: 'Email address input' },
  { type: 'Number', icon: '🔢', description: 'Numeric input field' },
  { type: 'Select', icon: '📋', description: 'Dropdown selection' },
  { type: 'Checkbox', icon: '☑️', description: 'Checkbox input' },
  { type: 'Radio', icon: '🔘', description: 'Radio button selection' },
  { type: 'File Upload', icon: '📎', description: 'File upload field' },
  { type: 'Date', icon: '📅', description: 'Date picker' },
  { type: 'Time', icon: '🕐', description: 'Time picker' }
];

export default function CubeWPForms() {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredForms = forms.filter(
    form =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalSubmissions = forms.reduce((sum, form) => sum + form.submissions, 0);
  const activeForms = forms.filter(form => form.status === 'Active').length;
  const totalFields = forms.reduce((sum, form) => sum + form.fields, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">CubeWP Forms</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Create New Form
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Forms</h3>
          <p className="text-2xl font-bold text-gray-900">{forms.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Active Forms</h3>
          <p className="text-2xl font-bold text-green-600">{activeForms}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Submissions</h3>
          <p className="text-2xl font-bold text-blue-600">{totalSubmissions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm text-gray-500">Total Fields</h3>
          <p className="text-2xl font-bold text-purple-600">{totalFields}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['forms', 'builder', 'submissions'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* All Forms */}
      {activeTab === 'forms' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Form Name', 'Type', 'Fields', 'Submissions', 'Status', 'Actions'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredForms.map((form) => (
                  <tr key={form.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-8 w-8 text-blue-500 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{form.name}</div>
                          <div className="text-sm text-gray-500">{form.description}</div>
                          <div className="text-xs text-gray-400">Modified: {form.lastModified}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {form.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{form.fields}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{form.submissions}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${getStatusColor(form.status)}`}>
                        {form.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900"><EyeIcon className="h-4 w-4" /></button>
                        <button className="text-green-600 hover:text-green-900"><PencilIcon className="h-4 w-4" /></button>
                        <button className="text-purple-600 hover:text-purple-900"><ClipboardDocumentListIcon className="h-4 w-4" /></button>
                        <button className="text-red-600 hover:text-red-900"><TrashIcon className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Builder */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Field Types</h3>
            <div className="space-y-3">
              {formFields.map((field, index) => (
                <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors">
                  <span className="text-2xl mr-3">{field.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{field.type}</div>
                    <div className="text-xs text-gray-500">{field.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">Form Builder</h3>
              <div className="flex space-x-2">
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">Preview</button>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Save Form</button>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-96">
              <div className="text-center text-gray-500">
                <DocumentTextIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Start Building Your Form</p>
                <p className="text-sm">Drag and drop field types from the left panel to create your form</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions */}
      {activeTab === 'submissions' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Form Submissions</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { name: 'Business Listing Submission', email: 'john@coffeehouse.com', date: '2024-01-20 10:30 AM' },
              { name: 'Contact Us Form', email: 'sarah@example.com', date: '2024-01-19 3:45 PM' },
              { name: 'Event Registration', email: 'mike@example.com', date: '2024-01-18 8:20 AM' }
            ].map((submission, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{submission.name}</h4>
                  <p className="text-sm text-gray-500">Submitted by: {submission.email}</p>
                  <p className="text-xs text-gray-400">{submission.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  <button className="text-green-600 hover:text-green-800 text-sm">{i === 1 ? 'Reply' : 'Approve'}</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">{i === 1 ? 'Archive' : 'Reject'}</button>
                </div>
              </div>
            ))}

            <div className="mt-6 flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm">Load More Submissions</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
