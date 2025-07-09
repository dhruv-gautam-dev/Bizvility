import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const comments = [
  {
    id: 1,
    author: 'John Smith',
    email: 'john@example.com',
    content: 'Great article! Very informative and well written.',
    post: 'Welcome to Our Platform',
    status: 'Approved',
    date: '2024-01-15 10:30 AM'
  },
  {
    id: 2,
    author: 'Sarah Johnson',
    email: 'sarah@example.com',
    content: 'I have a question about the listing process. Can someone help?',
    post: 'How to Create Your First Listing',
    status: 'Pending',
    date: '2024-01-14 3:45 PM'
  },
  {
    id: 3,
    author: 'Mike Brown',
    email: 'mike@example.com',
    content: 'This is spam content with promotional links.',
    post: 'Platform Updates and Features',
    status: 'Spam',
    date: '2024-01-13 8:20 AM'
  },
  {
    id: 4,
    author: 'Emily Davis',
    email: 'emily@example.com',
    content: 'Thanks for the update! Looking forward to the new features.',
    post: 'Platform Updates and Features',
    status: 'Approved',
    date: '2024-01-12 2:15 PM'
  },
  {
    id: 5,
    author: 'David Wilson',
    email: 'david@example.com',
    content: 'Could you provide more details about the pricing?',
    post: 'Community Guidelines',
    status: 'Pending',
    date: '2024-01-11 11:00 AM'
  }
];

export default function SuperComments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || comment.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Spam':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Comments</h1>
        <div className="flex gap-2">
          <span className="text-sm text-gray-500">
            Pending: {comments.filter((c) => c.status === 'Pending').length}
          </span>
          <span className="text-sm text-gray-500">
            Spam: {comments.filter((c) => c.status === 'Spam').length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3/4 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search comments..."
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
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{comment.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{comment.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{comment.post}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comment.status)}`}>
                      {comment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      {comment.status === 'Pending' && (
                        <>
                          <button
                            className="p-1 text-green-600 hover:text-green-800"
                            title="Approve"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Mark as Spam"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="View"
                      >
                        <EyeIcon className="h-4 w-4" />
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