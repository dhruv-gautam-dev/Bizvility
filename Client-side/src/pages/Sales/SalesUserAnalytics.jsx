import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EyeIcon,
  StarIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock data for the analytics
const salesUserData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@techsolutions.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
  role: "Sales Manager",
  joinDate: "2024-01-10",
  totalListings: 18,
  activeListings: 16,
  totalViews: 22340,
  totalRevenue: 12800,
  avgRating: 4.9,
  totalReviews: 134,
  conversionRate: 22.3,
  monthlyTarget: 15000,
};

const viewsData = [
  { name: "Tech Solutions Inc", views: 3456, color: "#3B82F6" },
  { name: "Digital Agency Pro", views: 2890, color: "#10B981" },
  { name: "Software Hub", views: 2340, color: "#F59E0B" },
  { name: "Cloud Services", views: 1890, color: "#EF4444" },
  { name: "Data Analytics Co", views: 1456, color: "#8B5CF6" },
  { name: "AI Solutions", views: 1234, color: "#EC4899" },
  { name: "Others", views: 9074, color: "#6B7280" },
];

const reviewsData = [
  { name: "5 Stars", count: 89, color: "#10B981" },
  { name: "4 Stars", count: 32, color: "#3B82F6" },
  { name: "3 Stars", count: 8, color: "#F59E0B" },
  { name: "2 Stars", count: 3, color: "#EF4444" },
  { name: "1 Star", count: 2, color: "#6B7280" },
];

const categoryData = [
  { name: "Technology", listings: 8, revenue: 6400, color: "#3B82F6" },
  { name: "Services", listings: 5, revenue: 3200, color: "#10B981" },
  { name: "Consulting", listings: 3, revenue: 2400, color: "#F59E0B" },
  { name: "Software", listings: 2, revenue: 800, color: "#8B5CF6" },
];

const monthlyPerformance = [
  { month: "Jan", views: 2800, reviews: 18, revenue: 2100 },
  { month: "Feb", views: 3200, reviews: 22, revenue: 2400 },
  { month: "Mar", views: 2900, reviews: 19, revenue: 2200 },
  { month: "Apr", views: 3800, reviews: 28, revenue: 2800 },
  { month: "May", views: 4200, reviews: 31, revenue: 3100 },
  { month: "Jun", views: 5340, reviews: 36, revenue: 3200 },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
];

export default function SalesUserAnalytics() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.05) return null; // Don't show labels for slices smaller than 5%

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ToastContainer />
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/sales-users")}
          className="flex items-center gap-2 mb-4 text-blue-600 transition-colors hover:text-blue-800"
          aria-label="Back to Sales Users"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Sales Users
        </button>

        <div className="p-8 bg-white shadow-xl rounded-2xl">
          <div className="flex items-center gap-6">
            <img
              src={salesUserData.avatar}
              alt={salesUserData.name}
              className="object-cover w-24 h-24 border-4 border-blue-200 rounded-full"
              onError={(e) => (e.target.src = "https://via.placeholder.com/96")}
            />
            <div className="flex-1">
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                {salesUserData.name}
              </h1>
              <p className="mb-2 text-lg font-medium text-blue-600">
                {salesUserData.role}
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4" />
                  {salesUserData.email}
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4" />
                  {salesUserData.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {salesUserData.location}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="text-lg font-semibold text-gray-900">
                {salesUserData.joinDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          className="p-6 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl"
          style={{
            backgroundImage: "-webkit-linear-gradient(left, #3b82f6, #60a5fa)",
            backgroundImage: "linear-gradient(to right, #3b82f6, #60a5fa)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100">Total Views</p>
              <p className="text-3xl font-bold">
                {salesUserData.totalViews.toLocaleString()}
              </p>
            </div>
            <EyeIcon className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div
          className="p-6 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-2xl"
          style={{
            backgroundImage: "-webkit-linear-gradient(left, #10b981, #34d399)",
            backgroundImage: "linear-gradient(to right, #10b981, #34d399)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100">Total Reviews</p>
              <p className="text-3xl font-bold">{salesUserData.totalReviews}</p>
            </div>
            <StarIcon className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div
          className="p-6 text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl"
          style={{
            backgroundImage: "-webkit-linear-gradient(left, #6b21a8, #8b5cf6)",
            backgroundImage: "linear-gradient(to right, #6b21a8, #8b5cf6)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100">Total Revenue</p>
              <p className="text-3xl font-bold">
                ${salesUserData.totalRevenue.toLocaleString()}
              </p>
            </div>
            <CurrencyDollarIcon className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div
          className="p-6 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl"
          style={{
            backgroundImage: "-webkit-linear-gradient(left, #f97316, #fdba74)",
            backgroundImage: "linear-gradient(to right, #f97316, #fdba74)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100">Avg Rating</p>
              <p className="text-3xl font-bold">{salesUserData.avgRating}</p>
            </div>
            <TrophyIcon className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 bg-white shadow-xl rounded-2xl">
        <div className="border-b border-gray-200">
          <nav className="flex px-8 space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview Analytics
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "performance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Performance Trends
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "categories"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Category Analysis
            </button>
          </nav>
        </div>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Views Distribution Pie Chart */}
              <div
                className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl"
                style={{
                  backgroundImage:
                    "-webkit-linear-gradient(bottom right, #dbeafe, #eff6ff)",
                  backgroundImage:
                    "linear-gradient(to top left, #dbeafe, #eff6ff)",
                }}
              >
                <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900">
                  <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
                  Views Distribution by Listings
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={viewsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="views"
                      >
                        {viewsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {viewsData.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-xs text-gray-600 truncate">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Distribution Pie Chart */}
              <div
                className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl"
                style={{
                  backgroundImage:
                    "-webkit-linear-gradient(bottom right, #d1fae5, #ecfdf5)",
                  backgroundImage:
                    "linear-gradient(to top left, #d1fae5, #ecfdf5)",
                }}
              >
                <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900">
                  <StarIcon className="w-6 h-6 mr-2 text-green-600" />
                  Reviews Distribution by Rating
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reviewsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {reviewsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {reviewsData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-xs text-gray-600">
                        {item.name}: {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "performance" && (
            <div className="space-y-8">
              {/* Monthly Performance Chart */}
              <div
                className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl"
                style={{
                  backgroundImage:
                    "-webkit-linear-gradient(bottom right, #e9d5ff, #f5e7ff)",
                  backgroundImage:
                    "linear-gradient(to top left, #e9d5ff, #f5e7ff)",
                }}
              >
                <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900">
                  <ChartBarIcon className="w-6 h-6 mr-2 text-purple-600" />
                  Monthly Performance Trends
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stackId="1"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Views"
                      />
                      <Area
                        type="monotone"
                        dataKey="reviews"
                        stackId="2"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                        name="Reviews"
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#F59E0B"
                        strokeWidth={3}
                        name="Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <h4 className="mb-4 font-semibold text-gray-900">
                    Conversion Rate
                  </h4>
                  <div className="mb-2 text-3xl font-bold text-blue-600">
                    {salesUserData.conversionRate}%
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 bg-blue-600 rounded-full"
                      style={{ width: `${salesUserData.conversionRate}%` }}
                    ></div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <h4 className="mb-4 font-semibold text-gray-900">
                    Target Achievement
                  </h4>
                  <div className="mb-2 text-3xl font-bold text-green-600">
                    {(
                      (salesUserData.totalRevenue /
                        salesUserData.monthlyTarget) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 bg-green-600 rounded-full"
                      style={{
                        width: `${
                          (salesUserData.totalRevenue /
                            salesUserData.monthlyTarget) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl">
                  <h4 className="mb-4 font-semibold text-gray-900">
                    Active Listings
                  </h4>
                  <div className="mb-2 text-3xl font-bold text-purple-600">
                    {salesUserData.activeListings}/{salesUserData.totalListings}
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 transition-all duration-500 bg-purple-600 rounded-full"
                      style={{
                        width: `${
                          (salesUserData.activeListings /
                            salesUserData.totalListings) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="space-y-8">
              {/* Category Performance */}
              <div
                className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl"
                style={{
                  backgroundImage:
                    "-webkit-linear-gradient(bottom right, #fefcbf, #fffbeb)",
                  backgroundImage:
                    "linear-gradient(to top left, #fefcbf, #fffbeb)",
                }}
              >
                <h3 className="flex items-center mb-6 text-xl font-bold text-gray-900">
                  <BuildingStorefrontIcon className="w-6 h-6 mr-2 text-orange-600" />
                  Performance by Category
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar
                        dataKey="listings"
                        fill="#3B82F6"
                        name="Listings"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#10B981"
                        name="Revenue ($)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Details */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">
                        {category.name}
                      </h4>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Listings:</span>
                        <span className="font-medium">{category.listings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium">
                          ${category.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg per Listing:</span>
                        <span className="font-medium">
                          $
                          {Math.round(
                            category.revenue / category.listings
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
