import { useState } from 'react';
import { MagnifyingGlassIcon, FlagIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const flaggedItems = [
  {
    id: 1,
    type: 'Listing',
    title: 'Suspicious Business Listing',
    reportedBy: 'John Smith',
    reason: 'Fake business information',
    description: 'This listing contains false contact information and fake reviews.',
    reportDate: '2024-01-15',
    status: 'Pending',
    priority: 'High',
    itemId: 'listing-123',
    itemTitle: 'Quick Cash Services'
  },
  {
    id: 2,
    type: 'Review',
    title: 'Inappropriate Review Content',
    reportedBy: 'Sarah Johnson',
    reason: 'Offensive language',
    description: 'Review contains inappropriate language and personal attacks.',
    reportDate: '2024-01-14',
    status: 'Under Review',
    priority: 'Medium',
    itemId: 'review-456',
    itemTitle: 'Review for The Coffee House'
  },
  {
    id: 3,
    type: 'User',
    title: 'Spam Account Activity',
    reportedBy: 'Mike Brown',
    reason: 'Spam/Bot activity',
    description: 'User is posting multiple fake listings and reviews.',
    reportDate: '2024-01-13',
    status: 'Resolved',
    priority: 'High',
    itemId: 'user-789',
    itemTitle: 'spammer123@email.com'
  },
  {
    id: 4,
    type: 'Comment',
    title: 'Promotional Spam Comment',
    reportedBy: 'Emily Davis',
    reason: 'Spam/Promotional content',
    description: 'Comment contains promotional links and spam content.',
    reportDate: '2024-01-12',
    status: 'Pending',
    priority: 'Low',
    itemId: 'comment-101',
    itemTitle: 'Comment on Platform Updates'
  },
  {
    id: 5,
    type: 'Listing',
    title: 'Duplicate Business Listing',
    reportedBy: 'David Wilson',
    reason: 'Duplicate content',
    description: 'This appears to be a duplicate of an existing business listing.',
    reportDate: '2024-01-11',
    status: 'Under Review',
    priority: 'Medium',
    itemId: 'listing-202',
    itemTitle: 'Tech Solutions Duplicate'
  }
];

export default function SuperFlag() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredFlags = flaggedItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || item.status.toLowerCase().replace(' ', '') === filterStatus;
    const matchesType = filterType === 'all' || item.type.toLowerCase() === filterType;
    const matchesPriority = filterPriority === 'all' || item.priority.toLowerCase() === filterPriority;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingCount = flaggedItems.filter(item => item.status === 'Pending').length;
  const underReviewCount = flaggedItems.filter(item => item.status === 'Under Review').length;
  const highPriorityCount = flaggedItems.filter(item => item.priority === 'High').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Flagged Content</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-red-600 font-medium">High Priority: {highPriorityCount}</span>
          <span className="text-yellow-600 font-medium">Pending: {pendingCount}</span>
          <span className="text-blue-600 font-medium">Under Review: {underReviewCount}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flagged items..."
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
              <option value="pending">Pending</option>
              <option value="underreview">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="listing">Listing</option>
              <option value="review">Review</option>
              <option value="user">User</option>
              <option value="comment">Comment</option>
            </select>

            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredFlags.map((flag) => (
            <div key={flag.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FlagIcon className="h-5 w-5 text-red-500" />
                    <h3 className="text-sm font-medium text-gray-900">{flag.title}</h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(flag.status)}`}>
                      {flag.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(flag.priority)}`}>
                      {flag.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600"><strong>Type:</strong> {flag.type}</p>
                      <p className="text-sm text-gray-600"><strong>Reported by:</strong> {flag.reportedBy}</p>
                      <p className="text-sm text-gray-600"><strong>Date:</strong> {flag.reportDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600"><strong>Reason:</strong> {flag.reason}</p>
                      <p className="text-sm text-gray-600"><strong>Item:</strong> {flag.itemTitle}</p>
                      <p className="text-sm text-gray-600"><strong>ID:</strong> {flag.itemId}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{flag.description}</p>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded" title="View Details">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  {(flag.status === 'Pending' || flag.status === 'Under Review') && (
                    <>
                      <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded" title="Resolve">
                        <CheckIcon className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded" title="Dismiss">
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
