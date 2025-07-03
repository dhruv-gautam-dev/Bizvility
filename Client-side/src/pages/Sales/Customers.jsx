import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  UserIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialCustomers = [
  {
    id: 1,
    name: 'John Smith',
    company: 'TechCorp Solutions',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    type: 'Enterprise',
    totalValue: 125000,
    lastPurchase: '2024-01-15',
    joinDate: '2023-06-15',
    deals: 3,
    industry: 'Technology',
    location: 'San Francisco, CA',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    company: 'Digital Marketing Pro',
    email: 'sarah@digitalmarketing.com',
    phone: '+1 (555) 234-5678',
    status: 'Active',
    type: 'SMB',
    totalValue: 45000,
    lastPurchase: '2024-01-10',
    joinDate: '2023-08-20',
    deals: 2,
    industry: 'Marketing',
    location: 'New York, NY',
  },
  {
    id: 3,
    name: 'Mike Brown',
    company: 'Retail Solutions Inc',
    email: 'mike@retailsolutions.com',
    phone: '+1 (555) 345-6789',
    status: 'Active',
    type: 'Mid-Market',
    totalValue: 78000,
    lastPurchase: '2023-12-20',
    joinDate: '2023-04-10',
    deals: 4,
    industry: 'Retail',
    location: 'Chicago, IL',
  },
  {
    id: 4,
    name: 'Emily Davis',
    company: 'Fashion Store',
    email: 'emily@fashionstore.com',
    phone: '+1 (555) 456-7890',
    status: 'Inactive',
    type: 'SMB',
    totalValue: 22000,
    lastPurchase: '2023-09-15',
    joinDate: '2023-02-28',
    deals: 1,
    industry: 'Fashion',
    location: 'Los Angeles, CA',
  },
  {
    id: 5,
    name: 'David Wilson',
    company: 'Consulting Group',
    email: 'david@consultinggroup.com',
    phone: '+1 (555) 567-8901',
    status: 'Active',
    type: 'Enterprise',
    totalValue: 156000,
    lastPurchase: '2024-01-20',
    joinDate: '2023-01-15',
    deals: 5,
    industry: 'Consulting',
    location: 'Boston, MA',
  },
];

const statuses = ['Active', 'Inactive', 'Churned'];
const types = ['SMB', 'Mid-Market', 'Enterprise'];
const industries = ['Technology', 'Marketing', 'Retail', 'Fashion', 'Consulting', 'Healthcare', 'Finance'];

function CustomerModal({ isOpen, onClose, customer, onSubmit, isEdit, isView }) {
  const [formData, setFormData] = useState(
    customer || {
      name: '',
      company: '',
      email: '',
      phone: '',
      status: 'Active',
      type: 'SMB',
      totalValue: 0,
      lastPurchase: '',
      joinDate: new Date().toISOString().split('T')[0],
      deals: 0,
      industry: '',
      location: '',
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.totalValue < 0) newErrors.totalValue = 'Total value cannot be negative';
    if (formData.deals < 0) newErrors.deals = 'Deals cannot be negative';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!isView && validate()) {
      onSubmit({
        ...formData,
        totalValue: Number(formData.totalValue) || 0,
        deals: Number(formData.deals) || 0,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-[90vw] sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {isView ? 'Customer Details' : isEdit ? 'Edit Customer' : 'Add New Customer'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            {isView ? (
              <p className="text-sm text-gray-900">{formData.name || 'Not set'}</p>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter customer name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            {isView ? (
              <p className="text-sm text-gray-900">{formData.company || 'Not set'}</p>
            ) : (
              <input
                type="text"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            {isView ? (
              <p className="text-sm text-gray-900">{formData.email || 'Not set'}</p>
            ) : (
              <>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            {isView ? (
              <p className="text-sm text-gray-900">{formData.phone || 'Not set'}</p>
            ) : (
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
              />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.status || 'Not set'}</p>
              ) : (
                <select
                  value={formData.status || 'Active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.type || 'Not set'}</p>
              ) : (
                <select
                  value={formData.type || 'SMB'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Value</label>
              {isView ? (
                <p className="text-sm text-gray-900">${Number(formData.totalValue || 0).toLocaleString()}</p>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.totalValue || ''}
                    onChange={(e) => setFormData({ ...formData, totalValue: Number(e.target.value) })}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.totalValue ? 'border-red-500' : ''}`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.totalValue && <p className="text-red-500 text-xs mt-1">{errors.totalValue}</p>}
                </>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deals</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.deals || 0}</p>
              ) : (
                <>
                  <input
                    type="number"
                    value={formData.deals || ''}
                    onChange={(e) => setFormData({ ...formData, deals: Number(e.target.value) })}
                    className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.deals ? 'border-red-500' : ''}`}
                    placeholder="0"
                    min="0"
                  />
                  {errors.deals && <p className="text-red-500 text-xs mt-1">{errors.deals}</p>}
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Purchase</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.lastPurchase || 'Not set'}</p>
              ) : (
                <input
                  type="date"
                  value={formData.lastPurchase || ''}
                  onChange={(e) => setFormData({ ...formData, lastPurchase: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.joinDate || 'Not set'}</p>
              ) : (
                <input
                  type="date"
                  value={formData.joinDate || ''}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.industry || 'Not set'}</p>
              ) : (
                <select
                  value={formData.industry || ''}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              {isView ? (
                <p className="text-sm text-gray-900">{formData.location || 'Not set'}</p>
              ) : (
                <input
                  type="text"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            {isView ? 'Close' : 'Cancel'}
          </button>
          {!isView && (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {isEdit ? 'Update Customer' : 'Add Customer'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (showAddModal || showEditModal || showViewModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showAddModal, showEditModal, showViewModal]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus;
    const matchesType = filterType === 'all' || customer.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'Churned':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'Mid-Market':
        return 'bg-blue-100 text-blue-800';
      case 'SMB':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCustomer = (newCustomer) => {
    const customer = {
      id: customers.length + 1,
      name: newCustomer.name,
      company: newCustomer.company || '',
      email: newCustomer.email,
      phone: newCustomer.phone || '',
      status: newCustomer.status || 'Active',
      type: newCustomer.type || 'SMB',
      totalValue: Number(newCustomer.totalValue) || 0,
      lastPurchase: newCustomer.lastPurchase || '',
      joinDate: newCustomer.joinDate || new Date().toISOString().split('T')[0],
      deals: Number(newCustomer.deals) || 0,
      industry: newCustomer.industry || '',
      location: newCustomer.location || '',
    };
    setCustomers([...customers, customer]);
    setShowAddModal(false);
    toast.success(`Customer "${customer.name}" added successfully!`);
  };

  const handleEditCustomer = (updatedCustomer) => {
    if (selectedCustomer) {
      const customer = {
        ...selectedCustomer,
        ...updatedCustomer,
        totalValue: Number(updatedCustomer.totalValue) || selectedCustomer.totalValue,
        deals: Number(updatedCustomer.deals) || selectedCustomer.deals,
      };
      setCustomers(customers.map((c) => (c.id === selectedCustomer.id ? customer : c)));
      setShowEditModal(false);
      setSelectedCustomer(null);
      toast.success(`Customer "${customer.name}" updated successfully!`);
    }
  };

  const handleDeleteCustomer = (id, name) => {
    toast(
      <div>
        <p>Are you sure you want to delete the customer "{name}"?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setCustomers(customers.filter((customer) => customer.id !== id));
              toast.success(`Customer "${name}" deleted successfully!`);
              toast.dismiss();
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: 'top-right',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalValue, 0);
  const avgCustomerValue = customers.length ? Math.round(totalRevenue / customers.length) : 0;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-x-hidden">
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 text-sm sm:text-base">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Customers', value: totalCustomers, color: 'text-gray-900' },
          { title: 'Active Customers', value: activeCustomers, color: 'text-green-600' },
          { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'text-blue-600' },
          { title: 'Avg Customer Value', value: `$${avgCustomerValue.toLocaleString()}`, color: 'text-purple-600' },
        ].map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {statuses.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Purchase
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-8 w-8 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 truncate">{customer.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                          <span className="truncate">{customer.company}</span>
                        </div>
                        <div className="text-xs text-gray-400">{customer.industry} • {customer.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center mb-1">
                      <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="truncate">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(customer.type)}`}>
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1 text-gray-400" />
                      ${customer.totalValue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">{customer.deals} deals</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="truncate">{customer.lastPurchase}</span>
                    </div>
                    <div className="text-xs text-gray-500">Joined: {customer.joinDate}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowViewModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                        aria-label="View customer"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowEditModal(true);
                        }}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                        aria-label="Edit customer"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                        aria-label="Delete customer"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden space-y-4 p-4">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <div className="text-sm font-medium text-gray-900 truncate mb-2">{customer.name}</div>
              <div className="text-sm text-gray-500 flex items-center mb-2">
                <BuildingOfficeIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.company}</span>
              </div>
              <div className="text-sm text-gray-900 flex items-center mb-2">
                <EnvelopeIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="text-sm text-gray-500 flex items-center mb-2">
                <PhoneIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.phone}</span>
              </div>
              <div className="mb-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(customer.type)}`}>
                  {customer.type}
                </span>
              </div>
              <div className="mb-2">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900 flex items-center mb-2">
                <CurrencyDollarIcon className="h-4 w-4 mr-1 text-gray-400" />
                ${customer.totalValue.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mb-2">{customer.deals} deals</div>
              <div className="text-sm text-gray-900 flex items-center mb-2">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                <span className="truncate">{customer.lastPurchase}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">Joined: {customer.joinDate}</div>
              <div className="text-xs text-gray-400 mb-2">{customer.industry} • {customer.location}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowViewModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-900"
                  title="View"
                  aria-label="View customer"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedCustomer(customer);
                    setShowEditModal(true);
                  }}
                  className="text-green-600 hover:text-green-900"
                  title="Edit"
                  aria-label="Edit customer"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                  aria-label="Delete customer"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No customers found</p>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      <CustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        customer={null}
        onSubmit={handleAddCustomer}
      />

      {/* Edit Customer Modal */}
      <CustomerModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSubmit={handleEditCustomer}
        isEdit
      />

      {/* View Customer Modal */}
      <CustomerModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSubmit={() => {}}
        isView
      />
    </div>
  );
}
