import { ArrowUpIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Listings', stat: '2,847', change: '12%', changeType: 'increase' },
  { name: 'Active Businesses', stat: '1,423', change: '8.2%', changeType: 'increase' },
  { name: 'Monthly Revenue', stat: '$54,375', change: '4.05%', changeType: 'increase' },
];

const topCategories = [
  { name: 'Restaurants', count: 486 },
  { name: 'Retail Shops', count: 342 },
  { name: 'Professional Services', count: 275 },
  { name: 'Entertainment', count: 198 },
];

const recentListings = [
  { name: 'The Coffee House', type: 'Restaurant', status: 'Active', date: '2025-05-07' },
  { name: 'Tech Solutions Inc', type: 'Services', status: 'Pending', date: '2025-05-06' },
  { name: 'Fashion Boutique', type: 'Retail', status: 'Active', date: '2025-05-05' },
];

function AdminDashboardPage({ isCollapsed }) {
  console.log(isCollapsed);
  return (
    <div className={`pt-10 transition-all duration-300 ml-[68px] lg:ml-0`}>
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Business Directory Overview</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                {item.stat}
              </div>
              <div className="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
                <ArrowUpIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Business Categories</h4>
          <div className="space-y-4">
            {topCategories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <span className="text-gray-600">{category.name}</span>
                <span className="text-indigo-600 font-semibold">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Listings</h4>
          <div className="space-y-4">
            {recentListings.map((listing) => (
              <div key={listing.name} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h5 className="font-medium text-gray-900">{listing.name}</h5>
                  <p className="text-sm text-gray-500">{listing.type}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      listing.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {listing.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{listing.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;