import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
} from '@heroicons/react/24/outline';

const ads = [
  {
    id: 1,
    title: 'Premium Restaurant Promotion',
    advertiser: 'The Coffee House',
    type: 'Banner',
    position: 'Header',
    status: 'Active',
    impressions: 12450,
    clicks: 234,
    ctr: 1.88,
    budget: 500,
    spent: 287,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  {
    id: 2,
    title: 'Tech Services Ad Campaign',
    advertiser: 'Tech Solutions Inc',
    type: 'Sidebar',
    position: 'Right Sidebar',
    status: 'Active',
    impressions: 8920,
    clicks: 156,
    ctr: 1.75,
    budget: 300,
    spent: 198,
    startDate: '2024-01-05',
    endDate: '2024-02-05',
  },
  {
    id: 3,
    title: 'Fashion Store Promotion',
    advertiser: 'Fashion Boutique',
    type: 'Featured Listing',
    position: 'Homepage',
    status: 'Paused',
    impressions: 5670,
    clicks: 89,
    ctr: 1.57,
    budget: 200,
    spent: 145,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
  },
  {
    id: 4,
    title: 'Fitness Center Special Offer',
    advertiser: 'Fitness Center Pro',
    type: 'Banner',
    position: 'Footer',
    status: 'Expired',
    impressions: 15230,
    clicks: 298,
    ctr: 1.96,
    budget: 400,
    spent: 400,
    startDate: '2023-12-01',
    endDate: '2023-12-31',
  },
];

export default function SuperAds() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAds = ads.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.advertiser.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ad.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRevenue = ads.reduce((sum, ad) => sum + ad.spent, 0);
  const activeAds = ads.filter((ad) => ad.status === 'Active').length;
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Advertisement Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <PlusIcon className="h-5 w-5" />
          Create New Ad
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Ads</h3>
          <p className="text-2xl font-bold text-gray-900">{activeAds}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Impressions</h3>
          <p className="text-2xl font-bold text-gray-900">{totalImpressions.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Clicks</h3>
          <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ads..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Budget
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
              {filteredAds.map((ad) => (
                <tr key={ad.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{ad.title}</div>
                      <div className="text-sm text-gray-500">{ad.advertiser}</div>
                      <div className="text-xs text-gray-400">
                        {ad.startDate} - {ad.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ad.type}</div>
                    <div className="text-sm text-gray-500">{ad.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ad.impressions.toLocaleString()} impressions
                    </div>
                    <div className="text-sm text-gray-500">
                      {ad.clicks} clicks ({ad.ctr}% CTR)
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${ad.spent} / ${ad.budget}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(ad.spent / ad.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ad.status)}`}>
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {ad.status === 'Active' ? (
                        <button className="text-yellow-600 hover:text-yellow-900" title="Pause">
                          <PauseIcon className="h-4 w-4" />
                        </button>
                      ) : ad.status === 'Paused' ? (
                        <button className="text-green-600 hover:text-green-900" title="Resume">
                          <PlayIcon className="h-4 w-4" />
                        </button>
                      ) : null}
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
    </div>
  );
}
