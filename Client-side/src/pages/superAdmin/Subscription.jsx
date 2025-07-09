import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CreditCardIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const subscriptions = [
  {
    id: 1,
    user: 'John Smith',
    email: 'john@coffeehouse.com',
    business: 'The Coffee House',
    plan: 'Professional',
    price: 79,
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    nextBilling: '2024-02-01',
    paymentMethod: 'Credit Card (**** 4532)',
    autoRenew: true
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    email: 'sarah@techsolutions.com',
    business: 'Tech Solutions Inc',
    plan: 'Enterprise',
    price: 199,
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    nextBilling: '2024-02-15',
    paymentMethod: 'Bank Transfer',
    autoRenew: true
  },
  {
    id: 3,
    user: 'Mike Brown',
    email: 'mike@fashionboutique.com',
    business: 'Fashion Boutique',
    plan: 'Basic',
    price: 29,
    status: 'Expired',
    startDate: '2023-12-01',
    endDate: '2024-01-01',
    nextBilling: null,
    paymentMethod: 'Credit Card (**** 1234)',
    autoRenew: false
  },
  {
    id: 4,
    user: 'Emily Davis',
    email: 'emily@fitnesscenterpro.com',
    business: 'Fitness Center Pro',
    plan: 'Professional',
    price: 79,
    status: 'Cancelled',
    startDate: '2023-11-01',
    endDate: '2024-01-01',
    nextBilling: null,
    paymentMethod: 'PayPal',
    autoRenew: false
  },
  {
    id: 5,
    user: 'David Wilson',
    email: 'david@digitalmarketing.com',
    business: 'Digital Marketing Agency',
    plan: 'Professional',
    price: 79,
    status: 'Pending',
    startDate: '2024-01-25',
    endDate: '2024-02-25',
    nextBilling: '2024-02-25',
    paymentMethod: 'Credit Card (**** 9876)',
    autoRenew: true
  }
];

export default function SuperSubscription() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  const plans = ['Basic', 'Professional', 'Enterprise'];

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch =
      sub.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || sub.status.toLowerCase() === filterStatus;

    const matchesPlan = filterPlan === 'all' || sub.plan === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case 'Active':
        return CheckCircleIcon;
      case 'Pending':
        return ClockIcon;
      case 'Expired':
      case 'Cancelled':
        return XCircleIcon;
      default:
        return ClockIcon;
    }
  };

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'Active').length;
  const monthlyRevenue = subscriptions
    .filter(sub => sub.status === 'Active')
    .reduce((sum, sub) => sum + sub.price, 0);
  const pendingSubscriptions = subscriptions.filter(sub => sub.status === 'Pending').length;
  const churnRate = (
    (subscriptions.filter(sub => sub.status === 'Cancelled').length / subscriptions.length) *
    100
  ).toFixed(1);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Subscriptions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Export Data
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Subscriptions</h3>
          <p className="text-2xl font-bold text-green-600">{activeSubscriptions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">${monthlyRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingSubscriptions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Churn Rate</h3>
          <p className="text-2xl font-bold text-red-600">{churnRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subscriptions..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPlan}
              onChange={e => setFilterPlan(e.target.value)}
            >
              <option value="all">All Plans</option>
              {plans.map(plan => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Subscriber', 'Plan', 'Status', 'Billing', 'Payment Method', 'Actions'].map(
                  (header, i) => (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map(sub => {
                const StatusIcon = getStatusIcon(sub.status);
                return (
                  <tr key={sub.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sub.user}</div>
                      <div className="text-sm text-gray-500">{sub.email}</div>
                      <div className="text-sm text-gray-500">{sub.business}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sub.plan}</div>
                      <div className="text-sm text-gray-500">${sub.price}/month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            sub.status
                          )}`}
                        >
                          {sub.status}
                        </span>
                      </div>
                      {sub.autoRenew && sub.status === 'Active' && (
                        <div className="text-xs text-green-600 mt-1">Auto-renew enabled</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {sub.startDate} - {sub.endDate}
                      </div>
                      {sub.nextBilling && (
                        <div className="text-sm text-gray-500">Next: {sub.nextBilling}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <CreditCardIcon className="h-4 w-4 mr-2" />
                        {sub.paymentMethod}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                        {sub.status === 'Active' && (
                          <button className="text-yellow-600 hover:text-yellow-900">Pause</button>
                        )}
                        {sub.status === 'Expired' && (
                          <button className="text-green-600 hover:text-green-900">Renew</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
