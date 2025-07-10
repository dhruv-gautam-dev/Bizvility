import {
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  StarIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Key Metrics Data
const metrics = [
  {
    name: "Total Views",
    value: "1,247",
    change: "+14.5%",
    trend: "up",
    icon: EyeIcon,
  },
  {
    name: "Profile Views",
    value: "89",
    change: "+7.8%",
    trend: "up",
    icon: UserGroupIcon,
  },
  {
    name: "Listing Views",
    value: "1,158",
    change: "+12.4%",
    trend: "up",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Avg. Rating",
    value: "4.6",
    change: "+0.3%",
    trend: "up",
    icon: StarIcon,
  },
];

// Listing Performance Data
const listingPerformance = [
  {
    name: "The Coffee House",
    views: 456,
    reviews: 12,
    rating: 4.8,
    growth: "+24%",
  },
  {
    name: "Tech Solutions Inc",
    views: 234,
    reviews: 6,
    rating: 4.5,
    growth: "+18%",
  },
  { name: "Fashion Boutique", views: 0, reviews: 0, rating: 0, growth: "New" },
];

// Monthly Data for Charts
const monthlyData = [
  { month: "Jan", views: 120, reviews: 3 },
  { month: "Feb", views: 180, reviews: 5 },
  { month: "Mar", views: 240, reviews: 8 },
  { month: "Apr", views: 320, reviews: 12 },
  { month: "May", views: 280, reviews: 10 },
  { month: "Jun", views: 380, reviews: 15 },
];

// Key Metrics Component
const KeyMetrics = () => (
  <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
    {metrics.map((metric) => {
      const IconComponent = metric.icon;
      return (
        <div key={metric.name} className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <IconComponent className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.name}
              </h3>
              <div className="flex items-baseline mt-2">
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <ArrowUpIcon className="self-center flex-shrink-0 w-4 h-4" />
                  ) : (
                    <ArrowDownIcon className="self-center flex-shrink-0 w-4 h-4" />
                  )}
                  <span className="ml-1">{metric.change}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

// Listing Performance Component
const ListingPerformanceTable = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <h3 className="mb-4 text-lg font-medium text-gray-900">
        Listing Performance
      </h3>
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Listing
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Views
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Reviews
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Rating
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Growth
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {listingPerformance.map((listing, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {listing.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {listing.views}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {listing.reviews}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {listing.rating > 0 ? listing.rating : "No ratings yet"}
                </td>
                <td className="px-6 py-4 text-sm text-green-600 whitespace-nowrap">
                  {listing.growth}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Main Analytics Component
export default function UserAnalytics() {
  const labels = monthlyData.map((data) => data.month);
  const viewsData = monthlyData.map((data) => data.views);
  const reviewsData = monthlyData.map((data) => data.reviews);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Analytics Dashboard
      </h1>

      {/* Key Metrics */}
      <KeyMetrics />

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        {/* Monthly Views Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Monthly Views (2025)
          </h3>
          <div className="h-64">
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Views",
                    data: viewsData,
                    backgroundColor: "#3B82F6",
                    borderColor: "#2563EB",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Views",
                    },
                    ticks: {
                      stepSize: 100,
                    },
                    max: 400,
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month (2025)",
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Views: ${context.raw}`,
                    },
                  },
                },
              }}
              height={250}
            />
          </div>
        </div>

        {/* Monthly Reviews Chart */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">
            Monthly Reviews (2025)
          </h3>
          <div className="h-64">
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: "Reviews",
                    data: reviewsData,
                    backgroundColor: "#10B981",
                    borderColor: "#059669",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Number of Reviews",
                    },
                    ticks: {
                      stepSize: 5,
                    },
                    max: 20,
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Month (2025)",
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Reviews: ${context.raw}`,
                    },
                  },
                },
              }}
              height={250}
            />
          </div>
        </div>
      </div>

      {/* Listing Performance Table */}
      <ListingPerformanceTable />
    </div>
  );
}
