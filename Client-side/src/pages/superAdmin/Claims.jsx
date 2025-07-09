import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  BuildingStorefrontIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const claims = [
  {
    id: 1,
    claimant: 'John Smith',
    email: 'john@coffeehouse.com',
    business: 'The Coffee House',
    businessId: 'biz-001',
    reason: 'I am the owner of this business',
    documents: ['business_license.pdf', 'tax_certificate.pdf'],
    submittedDate: '2024-01-15',
    status: 'Pending',
    priority: 'High',
    notes: 'All documents appear to be valid. Verification in progress.',
    verificationMethod: 'Document Upload'
  },
  {
    id: 2,
    claimant: 'Sarah Johnson',
    email: 'sarah@techsolutions.com',
    business: 'Tech Solutions Inc',
    businessId: 'biz-002',
    reason: 'Business owner verification',
    documents: ['incorporation_cert.pdf', 'utility_bill.pdf'],
    submittedDate: '2024-01-14',
    status: 'Under Review',
    priority: 'Medium',
    notes: 'Waiting for additional verification documents.',
    verificationMethod: 'Phone Verification'
  },
  {
    id: 3,
    claimant: 'Mike Brown',
    email: 'mike@fashionboutique.com',
    business: 'Fashion Boutique',
    businessId: 'biz-003',
    reason: 'Incorrect business information listed',
    documents: ['business_registration.pdf'],
    submittedDate: '2024-01-13',
    status: 'Approved',
    priority: 'Low',
    notes: 'Claim verified and approved. Business ownership transferred.',
    verificationMethod: 'Document Upload'
  },
  {
    id: 4,
    claimant: 'Emily Davis',
    email: 'emily@fitnesscenterpro.com',
    business: 'Fitness Center Pro',
    businessId: 'biz-004',
    reason: 'Business ownership change',
    documents: ['purchase_agreement.pdf', 'new_license.pdf'],
    submittedDate: '2024-01-12',
    status: 'Rejected',
    priority: 'Medium',
    notes: 'Insufficient documentation provided. Additional proof required.',
    verificationMethod: 'Document Upload'
  },
  {
    id: 5,
    claimant: 'David Wilson',
    email: 'david@digitalmarketing.com',
    business: 'Digital Marketing Agency',
    businessId: 'biz-005',
    reason: 'Claiming business listing',
    documents: ['business_license.pdf', 'bank_statement.pdf'],
    submittedDate: '2024-01-11',
    status: 'Pending',
    priority: 'High',
    notes: 'Initial review completed. Awaiting final verification.',
    verificationMethod: 'Email Verification'
  }
];

export default function SuperClaims() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.business.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || claim.status.toLowerCase().replace(' ', '') === filterStatus;
    const matchesPriority = filterPriority === 'all' || claim.priority.toLowerCase() === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
      case 'Under Review':
        return ClockIcon;
      case 'Approved':
        return CheckIcon;
      case 'Rejected':
        return XMarkIcon;
      default:
        return ClockIcon;
    }
  };

  const pendingClaims = claims.filter((c) => c.status === 'Pending').length;
  const underReviewClaims = claims.filter((c) => c.status === 'Under Review').length;
  const approvedClaims = claims.filter((c) => c.status === 'Approved').length;
  const rejectedClaims = claims.filter((c) => c.status === 'Rejected').length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Business Claims</h1>
        <div className="flex gap-4 text-sm">
          <span className="text-yellow-600 font-medium">Pending: {pendingClaims}</span>
          <span className="text-blue-600 font-medium">Under Review: {underReviewClaims}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Pending Claims</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingClaims}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Under Review</h3>
          <p className="text-2xl font-bold text-blue-600">{underReviewClaims}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved</h3>
          <p className="text-2xl font-bold text-green-600">{approvedClaims}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
          <p className="text-2xl font-bold text-red-600">{rejectedClaims}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search claims..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
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
          {filteredClaims.map((claim) => {
            const StatusIcon = getStatusIcon(claim.status);
            return (
              <div key={claim.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <BuildingStorefrontIcon className="h-5 w-5 text-blue-500" />
                      <h3 className="text-sm font-medium text-gray-900">{claim.claimant}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(claim.status)}`}>
                        <StatusIcon className="h-3 w-3 inline mr-1" />
                        {claim.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(claim.priority)}`}>
                        {claim.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600"><strong>Business:</strong> {claim.business}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {claim.email}</p>
                        <p className="text-sm text-gray-600"><strong>Submitted:</strong> {claim.submittedDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600"><strong>Reason:</strong> {claim.reason}</p>
                        <p className="text-sm text-gray-600"><strong>Verification:</strong> {claim.verificationMethod}</p>
                        <p className="text-sm text-gray-600"><strong>Documents:</strong> {claim.documents.length} files</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3"><strong>Notes:</strong> {claim.notes}</p>

                    <div className="flex flex-wrap gap-2">
                      {claim.documents.map((doc, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded" title="View Details">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    {(claim.status === 'Pending' || claim.status === 'Under Review') && (
                      <>
                        <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded" title="Approve">
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded" title="Reject">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
