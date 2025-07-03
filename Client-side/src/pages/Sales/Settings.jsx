import { useState } from "react";
import {
  Cog6ToothIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export default function SalesSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    siteName: "ListingPro Directory",
    siteDescription: "Your trusted business directory platform",
    contactEmail: "admin@listingpro.com",
    timezone: "UTC",
    dateFormat: "Y-m-d",
    timeFormat: "24",
    language: "en",
    currency: "USD",
    enableRegistration: true,
    requireEmailVerification: true,
    enableReviews: true,
    moderateReviews: false,
    enableNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    enableSSL: true,
    enableCaptcha: true,
    maxFileSize: "10",
    allowedFileTypes: "jpg,jpeg,png,gif,pdf",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const timezones = [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Australia/Sydney",
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
  ];

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "INR"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Save All Changes
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Settings Navigation */}
        <nav className="w-full p-4 bg-white rounded-lg shadow lg:w-64">
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === "general"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("general")}
              >
                <Cog6ToothIcon className="w-5 h-5 mr-3" />
                General
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === "localization"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("localization")}
              >
                <GlobeAltIcon className="w-5 h-5 mr-3" />
                Localization
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === "security"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <ShieldCheckIcon className="w-5 h-5 mr-3" />
                Security
              </button>
            </li>
            <li>
              <button
                className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                  activeTab === "notifications"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <BellIcon className="w-5 h-5 mr-3" />
                Notifications
              </button>
            </li>
          </ul>
        </nav>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-6 text-lg font-medium text-gray-900">
                General Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      handleSettingChange("siteName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Site Description
                  </label>
                  <textarea
                    value={settings.siteDescription}
                    onChange={(e) =>
                      handleSettingChange("siteDescription", e.target.value)
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) =>
                      handleSettingChange("contactEmail", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableRegistration"
                      checked={settings.enableRegistration}
                      onChange={(e) =>
                        handleSettingChange(
                          "enableRegistration",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enableRegistration"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Enable user registration
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onChange={(e) =>
                        handleSettingChange(
                          "requireEmailVerification",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="requireEmailVerification"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Require email verification
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableReviews"
                      checked={settings.enableReviews}
                      onChange={(e) =>
                        handleSettingChange("enableReviews", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enableReviews"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Enable reviews and ratings
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="moderateReviews"
                      checked={settings.moderateReviews}
                      onChange={(e) =>
                        handleSettingChange("moderateReviews", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="moderateReviews"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Moderate reviews before publishing
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={(e) =>
                        handleSettingChange("maintenanceMode", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="maintenanceMode"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Enable maintenance mode
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "localization" && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-6 text-lg font-medium text-gray-900">
                Localization Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) =>
                      handleSettingChange("timezone", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) =>
                      handleSettingChange("dateFormat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Y-m-d">YYYY-MM-DD</option>
                    <option value="m/d/Y">MM/DD/YYYY</option>
                    <option value="d/m/Y">DD/MM/YYYY</option>
                    <option value="F j, Y">Month DD, YYYY</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Time Format
                  </label>
                  <select
                    value={settings.timeFormat}
                    onChange={(e) =>
                      handleSettingChange("timeFormat", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="24">24 Hour (14:30)</option>
                    <option value="12">12 Hour (2:30 PM)</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Default Language
                  </label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange("language", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <select
                    value={settings.currency}
                    onChange={(e) =>
                      handleSettingChange("currency", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-6 text-lg font-medium text-gray-900">
                Security Settings
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableSSL"
                      checked={settings.enableSSL}
                      onChange={(e) =>
                        handleSettingChange("enableSSL", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enableSSL"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Force SSL/HTTPS
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableCaptcha"
                      checked={settings.enableCaptcha}
                      onChange={(e) =>
                        handleSettingChange("enableCaptcha", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enableCaptcha"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Enable CAPTCHA for forms
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Maximum File Upload Size (MB)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.maxFileSize}
                    onChange={(e) =>
                      handleSettingChange("maxFileSize", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Allowed File Types
                  </label>
                  <input
                    type="text"
                    value={settings.allowedFileTypes}
                    onChange={(e) =>
                      handleSettingChange("allowedFileTypes", e.target.value)
                    }
                    placeholder="jpg,jpeg,png,gif,pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate file extensions with commas
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="mb-6 text-lg font-medium text-gray-900">
                Notification Settings
              </h2>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="enableNotifications"
                      checked={settings.enableNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "enableNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="enableNotifications"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Enable notifications system
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "emailNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="emailNotifications"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Send email notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={(e) =>
                        handleSettingChange(
                          "smsNotifications",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="smsNotifications"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Send SMS notifications
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-gray-50">
                  <h4 className="mb-3 text-sm font-medium text-gray-900">
                    Email Notification Types
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        New user registration
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        New business listing
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        defaultChecked
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        New review submitted
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        Payment received
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">
                        System maintenance
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
