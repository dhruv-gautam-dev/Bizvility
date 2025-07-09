import { useState } from "react";
import { CreditCard, BarChart3, Settings, FileText } from "lucide-react";

const transactions = [
  {
    id: 1,
    orderId: "order_123456789",
    paymentId: "pay_987654321",
    amount: 299.0,
    currency: "INR",
    status: "Captured",
    customer: "john@coffeehouse.com",
    method: "Card",
    date: "2024-01-20 10:30 AM",
    description: "Premium Listing Payment",
  },
  {
    id: 2,
    orderId: "order_123456788",
    paymentId: "pay_987654320",
    amount: 599.0,
    currency: "INR",
    status: "Captured",
    customer: "sarah@techsolutions.com",
    method: "UPI",
    date: "2024-01-19 3:45 PM",
    description: "Enterprise Plan Payment",
  },
  {
    id: 3,
    orderId: "order_123456787",
    paymentId: "pay_987654319",
    amount: 149.0,
    currency: "INR",
    status: "Failed",
    customer: "mike@fashionboutique.com",
    method: "Net Banking",
    date: "2024-01-18 8:20 AM",
    description: "Basic Listing Payment",
  },
  {
    id: 4,
    orderId: "order_123456786",
    paymentId: "pay_987654318",
    amount: 399.0,
    currency: "INR",
    status: "Captured",
    customer: "emily@fitnesscenterpro.com",
    method: "Wallet",
    date: "2024-01-17 2:15 PM",
    description: "Professional Plan Payment",
  },
];

const paymentMethods = [
  {
    name: "Credit/Debit Cards",
    enabled: true,
    transactions: 145,
    revenue: 43250,
  },
  { name: "UPI", enabled: true, transactions: 89, revenue: 26700 },
  { name: "Net Banking", enabled: true, transactions: 67, revenue: 20100 },
  { name: "Wallets", enabled: true, transactions: 34, revenue: 10200 },
  { name: "EMI", enabled: false, transactions: 0, revenue: 0 },
];

export default function SuperRazorpay() {
  const [activeTab, setActiveTab] = useState("overview");
  const [settings, setSettings] = useState({
    keyId: "rzp_test_1234567890",
    keySecret: "••••••••••••••••",
    webhookSecret: "••••••••••••••••",
    testMode: true,
    autoCapture: true,
    currency: "INR",
    theme: "#3B82F6",
    companyName: "ListingPro Directory",
    companyLogo: "",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Captured":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = transactions
    .filter((t) => t.status === "Captured")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalTransactions = transactions.length;
  const successRate = (
    (transactions.filter((t) => t.status === "Captured").length /
      totalTransactions) *
    100
  ).toFixed(1);

  return (
    <div className="w-full max-w-full p-0">
      <style>
        {`
          .scrollbar-2px::-webkit-scrollbar { width: 2px; height: 2px; }
          .scrollbar-2px::-webkit-scrollbar-thumb { background: #9CA3AF; border-radius: 1px; }
          .scrollbar-2px::-webkit-scrollbar-track { background: #F3F4F6; }
          .scrollbar-2px { scrollbar-width: thin; scrollbar-color: #9CA3AF #F3F4F6; }
        `}
      </style>

      <div className="flex flex-col items-center gap-3 mb-6 text-center sm:flex-row sm:justify-between sm:text-left sm:items-center">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Razorpay Integration
        </h1>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          aria-label="Test Razorpay Payment"
        >
          Test Payment
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-4 sm:gap-6">
        <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-xl font-bold text-green-600 sm:text-2xl">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">
            Total Transactions
          </h3>
          <p className="text-xl font-bold text-blue-600 sm:text-2xl">
            {totalTransactions}
          </p>
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
          <p className="text-xl font-bold text-purple-600 sm:text-2xl">
            {successRate}%
          </p>
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
          <h3 className="text-sm font-medium text-gray-500">Mode</h3>
          <p className="text-xl font-bold text-orange-600 sm:text-2xl">
            {settings.testMode ? "Test" : "Live"}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex mb-6 overflow-x-auto border-b border-gray-200 scrollbar-2px">
        <nav
          className="flex px-4 space-x-2 sm:space-x-4 min-w-max sm:px-0"
          role="tablist"
          aria-label="Navigation tabs"
        >
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-2 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base flex items-center transition-colors duration-200 ${
              activeTab === "overview"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            role="tab"
            aria-selected={activeTab === "overview"}
            aria-controls="overview-panel"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`py-2 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base flex items-center transition-colors duration-200 ${
              activeTab === "transactions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            role="tab"
            aria-selected={activeTab === "transactions"}
            aria-controls="transactions-panel"
          >
            <FileText className="w-5 h-5 mr-2" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab("methods")}
            className={`py-2 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base flex items-center transition-colors duration-200 ${
              activeTab === "methods"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            role="tab"
            aria-selected={activeTab === "methods"}
            aria-controls="methods-panel"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Methods
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-2 px-2 sm:px-4 border-b-2 font-medium text-sm sm:text-base flex items-center transition-colors duration-200 ${
              activeTab === "settings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
            role="tab"
            aria-selected={activeTab === "settings"}
            aria-controls="settings-panel"
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </nav>
      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-2px px-0 sm:px-0">
        {activeTab === "overview" && (
          <div
            role="tabpanel"
            id="overview-panel"
            aria-labelledby="overview-tab"
            className="w-full space-y-4 sm:space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="w-full p-4 bg-white rounded-lg shadow sm:p-0">
                <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">
                  Payment Analytics
                </h3>
                <div className="flex items-center justify-center w-full bg-gray-100 rounded-lg min-h-64">
                  <p className="text-sm text-gray-500 sm:text-base">
                    Payment Analytics Chart
                  </p>
                </div>
              </div>

              <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
                <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">
                  Transaction Volume
                </h3>
                <div className="flex items-center justify-center w-full bg-gray-100 rounded-lg min-h-64">
                  <p className="text-sm text-gray-500 sm:text-base">
                    Transaction Volume Chart
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full p-4 bg-white rounded-lg shadow sm:p-6">
              <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg">
                Recent Activity
              </h3>
              <div className="w-full space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col justify-between gap-2 p-2 rounded sm:flex-row sm:items-center sm:gap-0 sm:p-3 bg-gray-50 text-start"
                  >
                    {/* Status on top for mobile */}
                    <span
                      className={`self-start sm:self-auto px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>

                    {/* Transaction details */}
                    <div className="text-xs font-medium text-gray-900 sm:text-sm">
                      <p>
                        ₹{transaction.amount} - {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.customer} • {transaction.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div
            role="tabpanel"
            id="transactions-panel"
            aria-labelledby="transactions-tab"
            className="w-full overflow-x-auto scrollbar-2px"
          >
            <table className="min-w-[600px] divide-y divide-gray-200 bg-white rounded-lg shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Transaction
                  </th>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Customer
                  </th>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Amount
                  </th>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Method
                  </th>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Status
                  </th>
                  <th className="px-2 py-1 text-xs font-medium tracking-wider text-left text-gray-500 uppercase sm:px-4 sm:py-2">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <div>
                        <div className="text-xs font-medium text-gray-900 sm:text-sm">
                          {transaction.orderId}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.paymentId}
                        </div>
                        <div className="text-xs text-gray-400">
                          {transaction.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-500 sm:px-4 sm:py-2 whitespace-nowrap sm:text-sm">
                      {transaction.customer}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-900 sm:text-sm">
                        ₹{transaction.amount}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.currency}
                      </div>
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-500 sm:px-4 sm:py-2 whitespace-nowrap sm:text-sm">
                      {transaction.method}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-2 py-1 text-xs text-gray-500 sm:px-4 sm:py-2 whitespace-nowrap sm:text-sm">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "methods" && (
          <div
            role="tabpanel"
            id="methods-panel"
            aria-labelledby="methods-tab"
            className="w-full space-y-4 sm:space-y-6"
          >
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="w-full p-4 bg-white rounded-lg shadow sm:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-blue-500 sm:h-8 sm:w-8" />
                    <div>
                      <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                        {method.name}
                      </h3>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        {method.enabled ? "Enabled" : "Disabled"} payment method
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:gap-6">
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      Transactions
                    </p>
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {method.transactions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">Revenue</p>
                    <p className="text-xl font-bold text-green-600 sm:text-2xl">
                      ₹{method.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      Success Rate
                    </p>
                    <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                      {method.transactions > 0 ? "95%" : "0%"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div
            role="tabpanel"
            id="settings-panel"
            aria-labelledby="settings-tab"
            className="w-full p-4 bg-white rounded-lg shadow sm:p-6"
          >
            <h3 className="mb-4 text-base font-medium text-gray-900 sm:text-lg sm:mb-6">
              Razorpay Configuration
            </h3>

            <div className="w-full space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="keyId"
                  >
                    Key ID
                  </label>
                  <input
                    id="keyId"
                    type="text"
                    value={settings.keyId}
                    onChange={(e) =>
                      handleSettingChange("keyId", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Razorpay Key ID"
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="keySecret"
                  >
                    Key Secret
                  </label>
                  <input
                    id="keySecret"
                    type="password"
                    value={settings.keySecret}
                    onChange={(e) =>
                      handleSettingChange("keySecret", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Razorpay Key Secret"
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="webhookSecret"
                  >
                    Webhook Secret
                  </label>
                  <input
                    id="webhookSecret"
                    type="password"
                    value={settings.webhookSecret}
                    onChange={(e) =>
                      handleSettingChange("webhookSecret", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Razorpay Webhook Secret"
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="currency"
                  >
                    Default Currency
                  </label>
                  <select
                    id="currency"
                    value={settings.currency}
                    onChange={(e) =>
                      handleSettingChange("currency", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Default Currency"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    value={settings.companyName}
                    onChange={(e) =>
                      handleSettingChange("companyName", e.target.value)
                    }
                    className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Company Name"
                  />
                </div>

                <div>
                  <label
                    className="block mb-2 text-xs font-medium text-gray-700 sm:text-sm"
                    htmlFor="theme"
                  >
                    Theme Color
                  </label>
                  <div className="flex items-center space-x-1">
                    <input
                      id="theme"
                      type="color"
                      value={settings.theme}
                      onChange={(e) =>
                        handleSettingChange("theme", e.target.value)
                      }
                      className="w-10 border border-gray-300 rounded cursor-pointer h-9"
                      aria-label="Theme Color Picker"
                    />
                    <input
                      type="text"
                      value={settings.theme}
                      onChange={(e) =>
                        handleSettingChange("theme", e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md sm:px-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Theme Color Hex"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="testMode"
                    checked={settings.testMode}
                    onChange={(e) =>
                      handleSettingChange("testMode", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    aria-label="Enable Test Mode"
                  />
                  <label
                    htmlFor="testMode"
                    className="block ml-2 text-xs text-gray-900 sm:text-sm"
                  >
                    Enable Test Mode
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoCapture"
                    checked={settings.autoCapture}
                    onChange={(e) =>
                      handleSettingChange("autoCapture", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    aria-label="Auto Capture Payments"
                  />
                  <label
                    htmlFor="autoCapture"
                    className="block ml-2 text-xs text-gray-900 sm:text-sm"
                  >
                    Auto Capture Payments
                  </label>
                </div>
              </div>

              <div className="flex flex-col justify-end space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button
                  className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                  aria-label="Test Razorpay Connection"
                >
                  Test Connection
                </button>
                <button
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  aria-label="Save Razorpay Settings"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
