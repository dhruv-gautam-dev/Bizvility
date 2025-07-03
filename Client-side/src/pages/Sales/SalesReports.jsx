import { useState } from "react";
import {
  ChartBarIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TrophyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const salesData = {
  thisMonth: {
    revenue: 125000,
    deals: 23,
    leads: 156,
    conversion: 14.7,
  },
  lastMonth: {
    revenue: 98000,
    deals: 18,
    leads: 142,
    conversion: 12.7,
  },
  thisQuarter: {
    revenue: 345000,
    deals: 67,
    leads: 456,
    conversion: 14.7,
  },
  lastQuarter: {
    revenue: 298000,
    deals: 54,
    leads: 398,
    conversion: 13.6,
  },
};

const monthlyData = [
  { month: "Jan", revenue: 85000, deals: 15, leads: 120 },
  { month: "Feb", revenue: 92000, deals: 18, leads: 135 },
  { month: "Mar", revenue: 78000, deals: 14, leads: 110 },
  { month: "Apr", revenue: 105000, deals: 21, leads: 145 },
  { month: "May", revenue: 118000, deals: 24, leads: 160 },
  { month: "Jun", revenue: 125000, deals: 23, leads: 156 },
];

const topPerformers = [
  { name: "You", revenue: 125000, deals: 23, conversion: 14.7 },
  { name: "Sarah Johnson", revenue: 98000, deals: 18, conversion: 12.8 },
  { name: "Mike Brown", revenue: 87000, deals: 16, conversion: 11.9 },
  { name: "Emily Davis", revenue: 76000, deals: 14, conversion: 10.5 },
];

const pipelineByStage = [
  { stage: "Discovery", count: 45, value: 450000 },
  { stage: "Qualified", count: 32, value: 320000 },
  { stage: "Proposal", count: 18, value: 270000 },
  { stage: "Negotiation", count: 12, value: 180000 },
  { stage: "Closed Won", count: 8, value: 120000 },
];

export default function SalesReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");
  const [reportType, setReportType] = useState("overview");

  const currentData = salesData[selectedPeriod];
  const previousData =
    selectedPeriod === "thisMonth"
      ? salesData.lastMonth
      : salesData.lastQuarter;

  const getGrowthPercentage = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const getGrowthColor = (growth) => {
    return parseFloat(growth) >= 0 ? "text-green-600" : "text-red-600";
  };

  const exportReport = () => {
    alert("Sales report exported successfully!");
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Sales Reports</h1>
        <div className="flex gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisQuarter">This Quarter</option>
            <option value="lastQuarter">Last Quarter</option>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${currentData.revenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm font-medium ${getGrowthColor(
                    getGrowthPercentage(
                      currentData.revenue,
                      previousData.revenue
                    )
                  )}`}
                >
                  {getGrowthPercentage(
                    currentData.revenue,
                    previousData.revenue
                  )}
                  %
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  vs previous period
                </span>
              </div>
            </div>
            <CurrencyDollarIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Deals Closed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentData.deals}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm font-medium ${getGrowthColor(
                    getGrowthPercentage(currentData.deals, previousData.deals)
                  )}`}
                >
                  {getGrowthPercentage(currentData.deals, previousData.deals)}%
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  vs previous period
                </span>
              </div>
            </div>
            <TrophyIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Leads</p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentData.leads}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm font-medium ${getGrowthColor(
                    getGrowthPercentage(currentData.leads, previousData.leads)
                  )}`}
                >
                  {getGrowthPercentage(currentData.leads, previousData.leads)}%
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  vs previous period
                </span>
              </div>
            </div>
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Conversion Rate
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {currentData.conversion}%
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`text-sm font-medium ${getGrowthColor(
                    getGrowthPercentage(
                      currentData.conversion,
                      previousData.conversion
                    )
                  )}`}
                >
                  {getGrowthPercentage(
                    currentData.conversion,
                    previousData.conversion
                  )}
                  %
                </span>
                <span className="ml-1 text-sm text-gray-500">
                  vs previous period
                </span>
              </div>
            </div>
            <ChartBarIcon className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setReportType("overview")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              reportType === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setReportType("performance")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              reportType === "performance"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setReportType("pipeline")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              reportType === "pipeline"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Pipeline
          </button>
        </nav>
      </div>

      {reportType === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Monthly Revenue Chart */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Monthly Revenue Trend
            </h3>
            <div className="h-64">
              <div className="flex items-end justify-between h-full space-x-2">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(data.revenue / 130000) * 100}%` }}
                      title={`$${data.revenue.toLocaleString()}`}
                    ></div>
                    <span className="mt-2 text-xs text-gray-500">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deals Closed Chart */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Deals Closed by Month
            </h3>
            <div className="h-64">
              <div className="flex items-end justify-between h-full space-x-2">
                {monthlyData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${(data.deals / 25) * 100}%` }}
                      title={`${data.deals} deals`}
                    ></div>
                    <span className="mt-2 text-xs text-gray-500">
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {reportType === "performance" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Sales Team Performance
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Sales Rep
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Deals Closed
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Conversion Rate
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topPerformers.map((performer, index) => (
                    <tr key={index} className={index === 0 ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index === 0 && (
                            <TrophyIcon className="w-5 h-5 mr-2 text-yellow-500" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {performer.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        ${performer.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {performer.deals}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                        {performer.conversion}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{
                              width: `${(performer.conversion / 15) * 100}%`,
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

      {reportType === "pipeline" && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="mb-6 text-lg font-medium text-gray-900">
              Sales Pipeline Analysis
            </h3>
            <div className="space-y-4">
              {pipelineByStage.map((stage, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {stage.stage}
                      </h4>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">
                          {stage.count} opportunities
                        </span>
                        <div className="text-sm text-gray-500">
                          ${stage.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div
                        className="h-3 bg-blue-600 rounded-full"
                        style={{ width: `${(stage.count / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
              <div className="p-4 text-center rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-gray-900">115</div>
                <div className="text-sm text-gray-500">Total Opportunities</div>
              </div>
              <div className="p-4 text-center rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-blue-600">$1.34M</div>
                <div className="text-sm text-gray-500">
                  Total Pipeline Value
                </div>
              </div>
              <div className="p-4 text-center rounded-lg bg-gray-50">
                <div className="text-2xl font-bold text-green-600">7%</div>
                <div className="text-sm text-gray-500">Win Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
