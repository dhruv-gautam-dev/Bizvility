import React, { useState } from "react";
import {
  CurrencyDollarIcon,
  ChartBarIcon,
  TrophyIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const revenueData = {
  thisMonth: {
    total: 45600,
    subscriptions: 38400,
    commissions: 7200,
    growth: 15.7,
  },
  lastMonth: {
    total: 39400,
    subscriptions: 33200,
    commissions: 6200,
    growth: 8.3,
  },
  thisYear: {
    total: 485000,
    subscriptions: 412000,
    commissions: 73000,
    growth: 22.5,
  },
};

const monthlyRevenue = [
  { month: "Jan", total: 32000, subscriptions: 27000, commissions: 5000 },
  { month: "Feb", total: 35000, subscriptions: 29500, commissions: 5500 },
  { month: "Mar", total: 38000, subscriptions: 32000, commissions: 6000 },
  { month: "Apr", total: 41000, subscriptions: 34500, commissions: 6500 },
  { month: "May", total: 43000, subscriptions: 36200, commissions: 6800 },
  { month: "Jun", total: 45600, subscriptions: 38400, commissions: 7200 },
];

const planRevenue = [
  { plan: "Enterprise", users: 34, revenue: 20400, avgRevenue: 600 },
  { plan: "Premium", users: 89, revenue: 15800, avgRevenue: 178 },
  { plan: "Professional", users: 156, revenue: 12480, avgRevenue: 80 },
  { plan: "Standard", users: 234, revenue: 9360, avgRevenue: 40 },
  { plan: "Basic", users: 345, revenue: 6900, avgRevenue: 20 },
];

const topEarners = [
  {
    name: "John Smith",
    business: "The Coffee House",
    plan: "Premium",
    revenue: 599,
    commission: 60,
  },
  {
    name: "Sarah Johnson",
    business: "Tech Solutions Inc",
    plan: "Enterprise",
    revenue: 599,
    commission: 60,
  },
  {
    name: "Emily Davis",
    business: "Fitness Center Pro",
    plan: "Professional",
    revenue: 399,
    commission: 40,
  },
  {
    name: "Mike Brown",
    business: "Fashion Boutique",
    plan: "Basic",
    revenue: 149,
    commission: 15,
  },
];

const categoryRevenue = [
  { category: "Restaurants", revenue: 15600, percentage: 34.2, listings: 245 },
  { category: "Services", revenue: 12800, percentage: 28.1, listings: 189 },
  { category: "Retail", revenue: 9200, percentage: 20.2, listings: 156 },
  {
    category: "Health & Fitness",
    revenue: 8000,
    percentage: 17.5,
    listings: 134,
  },
];

export default function SalesRevenue() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [activeTab, setActiveTab] = useState("overview");

  const currentData = revenueData[selectedPeriod];

  const exportReport = () => {
    alert("Revenue report exported successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Revenue Analytics
        </h1>
        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
          </select>
          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${currentData.total.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">
                  +{currentData.growth}%
                </span>
              </div>
            </div>
            <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Subscription Revenue
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ${currentData.subscriptions.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  {(
                    (currentData.subscriptions / currentData.total) *
                    100
                  ).toFixed(1)}
                  % of total
                </span>
              </div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Commission Revenue
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                ${currentData.commissions.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-600">
                  {(
                    (currentData.commissions / currentData.total) *
                    100
                  ).toFixed(1)}
                  % of total
                </span>
              </div>
            </div>
            <TrophyIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Growth Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentData.growth}%
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
                <span className="ml-1 text-sm text-green-600">
                  vs last period
                </span>
              </div>
            </div>
            <CalendarIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("plans")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "plans"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            By Plans
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "categories"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            By Categories
          </button>
        </nav>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly Revenue Chart */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Monthly Revenue Trend
            </h3>
            <div className="h-64">
              <div className="flex items-end justify-between h-full space-x-2">
                {monthlyRevenue.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div className="flex flex-col w-full">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{
                          height: `${(data.subscriptions / 50000) * 100}%`,
                        }}
                        title={`Subscriptions: $${data.subscriptions.toLocaleString()}`}
                      ></div>
                      <div
                        className="w-full bg-green-500"
                        style={{
                          height: `${(data.commissions / 50000) * 100}%`,
                        }}
                        title={`Commissions: $${data.commissions.toLocaleString()}`}
                      ></div>
                    </div>
                    <span className="mt-2 text-xs text-gray-500">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Subscriptions</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 mr-2 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Commissions</span>
              </div>
            </div>
          </div>

          {/* Top Earners */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Top Revenue Contributors
            </h3>
            <div className="space-y-4">
              {topEarners.map((earner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {earner.name}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                        {earner.plan}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {earner.business}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${earner.revenue}
                    </div>
                    <div className="text-xs text-gray-500">
                      Commission: ${earner.commission}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "plans" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Revenue by Subscription Plans
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Users
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Total Revenue
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Avg Revenue/User
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {planRevenue.map((plan, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {plan.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {plan.users}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        ${plan.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        ${plan.avgRevenue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{
                              width: `${(plan.revenue / 25000) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "categories" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Revenue by Business Categories
            </h3>
            <div className="space-y-4">
              {categoryRevenue.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {category.category}
                      </h4>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">
                          ${category.revenue.toLocaleString()}
                        </span>
                        <div className="text-sm text-gray-500">
                          {category.percentage}% of total
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        {category.listings} listings
                      </span>
                      <span className="text-sm text-gray-500">
                        ${Math.round(category.revenue / category.listings)}{" "}
                        avg/listing
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-blue-600 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
