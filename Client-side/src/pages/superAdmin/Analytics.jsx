import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const metrics = [
  { name: 'Total Revenue', value: '$54,375', change: '+14.5%', trend: 'up' },
  { name: 'Active Listings', value: '2,847', change: '+7.8%', trend: 'up' },
  { name: 'User Signups', value: '487', change: '-2.4%', trend: 'down' },
  { name: 'Avg. Rating', value: '4.6', change: '+0.3%', trend: 'up' },
];

const topPerformers = [
  { rank: 1, name: 'The Coffee House', revenue: '$12,450', growth: '+24%' },
  { rank: 2, name: 'Tech Solutions Inc', revenue: '$10,850', growth: '+18%' },
  { rank: 3, name: 'Fitness Center', revenue: '$9,275', growth: '+15%' },
  { rank: 4, name: 'Fashion Boutique', revenue: '$8,640', growth: '+12%' },
  { rank: 5, name: 'Digital Marketing Pro', revenue: '$7,890', growth: '+10%' },
];

export default function SuperAnalytics() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {metric.trend === 'up' ? (
                  <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                )}
                <span className="ml-1">{metric.change}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Revenue Chart Placeholder</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">User Growth Chart Placeholder</p>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Businesses</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topPerformers.map((business) => (
                  <tr key={business.rank}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{business.rank}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{business.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{business.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
